

import { put } from "@vercel/blob";
import { NextResponse } from "next/server";


export async function POST(request) {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get("filename");

    const blob = await put(filename, request.body, { access: "public" });
    return NextResponse.json({
      url: blob.url,
      pathname: blob.pathname,
      size: blob.size,
      contentType: blob.contentType,
      uploadedAt: blob.uploadedAt,
    }, { status: 200 });

  } catch (err) {
    console.error("Upload failed:", err);
    return NextResponse.json({ message: "Upload failed" }, { status: 500 });
  }
}
