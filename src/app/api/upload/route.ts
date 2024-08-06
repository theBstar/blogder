"use server";

import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function POST(request: NextRequest) {
  if (process.env.NEXT_PUBLIC_ENVIRONMENT === "production") {
    return NextResponse.json(
      { error: "API routes are not available in production" },
      { status: 403 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const publicPath = "/public";
    const uploadPath = "/uploads";
    const uploadDir = path.join(process.cwd(), publicPath, uploadPath);
    //  path.join(process.cwd(), "/public/uploads");
    const filePath = path.join(uploadDir, file.name);

    // @ts-ignore
    await writeFile(filePath, buffer);

    console.log("File saved to", filePath);

    const formattedResponseForEditorJs = {
      success: 1,
      file: {
        url: `${uploadPath}/${file.name}`,
      },
    };

    return NextResponse.json(formattedResponseForEditorJs);
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Error uploading file" },
      { status: 500 }
    );
  }
}
