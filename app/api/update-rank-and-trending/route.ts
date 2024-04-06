import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  // call two routes one to update trending notes and other to update rank like fetch("/api/update-trending") and fetch("/api/update-rank")
  // this needs to done because vercel does not allow multiple cron jobs in hobby plan
  try {
    const updatedTrendingResponse = await axios.get(
      "http://localhost:3000/api/update-trending"
    );
    const updatedRankResponse = await axios.get(
      "http://localhost:3000/api/update-rank"
    );
    return NextResponse.json(
      {
        updatedTrending: updatedTrendingResponse.data,
        updatedRank: updatedRankResponse.data,
      },
      { status: 200 }
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // If the error is an AxiosError, we can assume it has a response property
      const message = error.response?.data?.message || error.message;
      const status = error.response?.status || 500;
      return NextResponse.json({ error: message }, { status });
    } else {
      return NextResponse.json(
        { error: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
}
