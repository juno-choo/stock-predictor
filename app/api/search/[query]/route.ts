// app/api/search/[query]/route.ts
import yahooFinance from "yahoo-finance2";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { query: string } }
) {
  const { query } = params;
  try {
    // yahooFinance.search returns an object with a "quotes" array
    const searchResults = await yahooFinance.search(query);
    // We return the quotes (each usually contains symbol, shortname, etc.)
    return NextResponse.json(searchResults.quotes);
  } catch (error) {
    console.error("Error in search API:", error);
    return NextResponse.json(
      { error: "Error fetching search results" },
      { status: 500 }
    );
  }
}
