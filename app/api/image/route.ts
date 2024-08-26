import axios from "axios";
import { NextRequest } from "next/server";

const API_KEY = "AIzaSyDLdxxTTGnQMcWmQnnG1BWQjNU7A7iGS6c"; // Replace with your API key
const CX = "550050b2384de4ec8"; // Replace with your Custom Search Engine ID

export async function POST(req: NextRequest) {
  const body = await req.json();
  const query = await body.query;
  console.log(query);
  try {
    const url = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&q=${query}&searchType=image`;
    const res = await axios.get(url);
    const imgurl = await res.data.items[1];
    return Response.json(imgurl);
  } catch (error) {
    console.error("Error fetching the images", error);
  }
}
