import { NextRequest, NextResponse } from "next/server";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});
// TODO:add admin check

export async function POST(req: NextRequest) {
  try {
    const { fileUrl } = await req.json();

    if (!fileUrl) {
      return NextResponse.json(
        { error: "fileUrl is required" },
        { status: 400 }
      );
    }

    const bucket = process.env.AWS_BUCKET!;
    const region = process.env.AWS_REGION!;

    //  extract key from URL

    const base = `https://s3.${region}.amazonaws.com/${bucket}/`;
    const key = fileUrl.replace(base, "");

    if (!key) {
      return NextResponse.json(
        { error: "Invalid file URL" },
        { status: 400 }
      );
    }

    //  create delete command
    const command = new DeleteObjectCommand({
      Bucket: bucket,
      Key: key,
    });

    //  generate signed delete URL
    const deleteUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 60 * 5,
    });

    return NextResponse.json({
      deleteUrl,
      key,
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}