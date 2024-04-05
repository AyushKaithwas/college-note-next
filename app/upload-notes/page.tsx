"use client";
import * as React from "react";
import { Suspense } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import {
  MultiFileDropzone,
  type FileState,
} from "@/components/common/upload-file-dropzone";
import { useEdgeStore } from "@/lib/edgestore";
import institutionData from "@/public/combined_institutions_sorted.json";
import courseData from "@/public/courses.json";
import subjectData from "@/public/subjects.json";
import { type FileDetailsType } from "@/types";
import { Salutation } from "@/components/common/time-salutation";
import { Button } from "@/components/ui/button";
import Loading from "./loading";

export default function UploadPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const [selectedInstitution, setSelectedInstitution] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const fileDetails = React.useRef<FileDetailsType | null>(null);
  const [uploadSuccessful, setUploadSuccessful] = useState(false);
  const [uploadStart, setUploadStart] = useState(false);
  const { edgestore } = useEdgeStore();
  const options = {
    maxFiles: 1,
    maxSize: 20 * 1024 * 1024,
    accept: {
      "application/pdf": [".pdf"],
    },
  };
  function updateFileProgress(
    key: string,
    progress: FileState["progress"]
  ): void {
    setFileStates((currentFileStates) => {
      const newFileStates = structuredClone(currentFileStates);
      const targetFileState = newFileStates.find((state) => state.key === key);
      if (targetFileState) {
        targetFileState.progress = progress;
      }
      return newFileStates;
    });
  }
  const handleUpload = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    if (fileStates.length === 0) {
      // Show an error message to the user
      alert("Please upload at least one file");
      return;
    }
    const formData = new FormData(event.currentTarget);
    const formValues = Object.fromEntries(formData.entries());
    // console.log(formData);
    setUploadStart(true);
    await Promise.all(
      fileStates.map(async (fileState) => {
        try {
          const res = await edgestore.publicFiles.upload({
            file: fileState.file,
            onProgressChange: async (progress) => {
              updateFileProgress(fileState.key, progress);
              if (progress === 100) {
                await new Promise((resolve) => {
                  setTimeout(resolve, 1000);
                });
                updateFileProgress(fileState.key, "COMPLETE");
                setUploadSuccessful(true);
              }
            },
          });
          fileDetails.current = res;
        } catch (err) {
          updateFileProgress(fileState.key, "ERROR");
          throw err;
        }
      })
    );
    if (!session?.user?.email) {
      router.push("/login");
      return;
    }
    const userEmail = session.user.email;
    if (fileDetails.current) {
      const { size, url } = fileDetails.current;
      const postData = { ...formValues, size, url, userEmail };
      axios.post("/api/upload-note", postData).catch((err) => {
        console.error("Error occurred while uploading");
      });
    }
  };

  return (
    <div className="w-full flex flex-col items-center min-h-[80vh] py-10">
      <Suspense fallback={<Loading />}>
        <Salutation />
        <div className="flex flex-col w-[70%] min-w-[300px] max-w-[550px] items-left justify-between py-10 text-secondary ">
          <div className="flex flex-col  w-full border border-tertiary rounded-md p-10">
            {!uploadSuccessful ? (
              <form className="flex flex-col gap-3" onSubmit={handleUpload}>
                <MultiFileDropzone
                  onChange={(files) => {
                    setFileStates(files);
                  }}
                  onFilesAdded={(addedFiles) => {
                    setFileStates((prev) => [...prev, ...addedFiles]);
                  }}
                  value={fileStates}
                  dropzoneOptions={options}
                />
                <div>
                  <h2 className="font-bold text-white">Title</h2>
                  <input
                    className="bg-transparent border border-secondary rounded-lg p-3 w-full text-white"
                    name="title"
                    placeholder="Enter title"
                    required
                    type="text"
                  />
                </div>
                <div>
                  <h2 className="font-bold text-white">Description</h2>
                  <textarea
                    className="bg-transparent border border-secondary rounded-lg p-3 w-full h-[100px] text-white"
                    name="description"
                    placeholder="Enter description"
                  />
                </div>
                <div>
                  <h2 className="font-bold text-white">Institution</h2>
                  <select
                    className="w-full text-white bg-[#101010] border border-secondary rounded-lg p-3"
                    name="institution"
                    onChange={(e) => setSelectedInstitution(e.target.value)}
                    required
                    value={
                      selectedInstitution || institutionData[0].institution
                    }
                  >
                    <option value="Other">Other</option>
                    {institutionData.map((institution) => (
                      <option
                        key={institution.id}
                        value={institution.institution}
                      >
                        {institution.institution}
                      </option>
                    ))}
                  </select>
                  {selectedInstitution === "Other" && (
                    <input
                      className="bg-transparent border border-secondary rounded-lg p-3 w-full mt-2 text-white"
                      name="institution"
                      placeholder="Enter other institution"
                      required
                      type="text"
                    />
                  )}
                </div>
                <div>
                  <label
                    className="font-bold text-white"
                    htmlFor="fieldOfStudy"
                  >
                    Field of Study
                  </label>
                  <select
                    className="w-full text-white bg-[#101010] border border-secondary rounded-lg p-3"
                    id="fieldOfStudy"
                    name="fieldOfStudy"
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    required
                    value={selectedCourse || courseData[0].course}
                  >
                    <option value="Other">Other</option>
                    {courseData.map((course) => {
                      return (
                        <option key={course.id} value={course.course}>
                          {course.course}
                        </option>
                      );
                    })}
                  </select>
                  {selectedCourse === "Other" && (
                    <input
                      className="bg-transparent border border-secondary rounded-lg p-3 w-full mt-2 text-white"
                      name="fieldOfStudy"
                      placeholder="Enter other field of study"
                      required
                      type="text"
                    />
                  )}
                </div>
                <div>
                  <h2 className="font-bold text-white">Semester</h2>
                  <input
                    className="bg-transparent border border-secondary rounded-lg p-3 w-full text-white"
                    name="semester"
                    placeholder="Enter 0 if not applicable"
                    type="number"
                  />
                </div>
                <div>
                  <h2 className="font-bold text-white">Subject</h2>
                  <select
                    className="w-full text-white bg-[#101010] border border-secondary rounded-lg p-3"
                    name="subject"
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    required
                    value={selectedSubject || subjectData[0].subject} // Default to id: 1
                  >
                    <option value="Other">Other</option>{" "}
                    {subjectData.map((subject) => (
                      <option key={subject.id} value={subject.subject}>
                        {subject.subject}
                      </option>
                    ))}
                    {/* Option to select 'Other' */}
                  </select>
                  {/* Input box to appear if "Other" is selected */}
                  {selectedSubject === "Other" && (
                    <input
                      className="bg-transparent border border-secondary rounded-lg p-3 w-full mt-2 text-white"
                      name="subject"
                      placeholder="Enter other subject"
                      required
                      type="text"
                    />
                  )}
                </div>
                <Button
                  className="rounded-[0.5rem] font-bold text-[1rem] text-background hover:bg-[#FFE072]"
                  type="submit"
                  disabled={uploadStart}
                >
                  Upload
                </Button>
              </form>
            ) : (
              <div className="flex items-center justify-center">
                <h2
                  className="text-3xl font-bold bg-gradient-to-r bg-clip-text  text-transparent 
            from-indigo-500 via-purple-500 to-indigo-500
            animate-text"
                >
                  File Uploaded Successfully !
                </h2>
              </div>
            )}
          </div>
        </div>
      </Suspense>
    </div>
  );
}
