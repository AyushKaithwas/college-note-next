import Image from "next/image";

export function GridWrapper({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <>
      <Image
        alt="Picture of the author"
        height={150}
        src="/landing-page-grid-element.svg"
        style={{
          position: "absolute",
          top: "90px",
          right: "40px",
          zIndex: -1,
        }}
        width={150}
      />
      {children}
      <Image
        alt="Grid design element"
        height={200}
        src="/landing-page-grid-element.svg"
        style={{
          position: "absolute",
          bottom: "130px",
          left: "120px",
          WebkitTransform: "scaleX(-1)",
          transform: "scaleX(-1)",
          zIndex: -1,
        }}
        width={200}
      />
    </>
  );
}
