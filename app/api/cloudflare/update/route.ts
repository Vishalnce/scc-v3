import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";

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
    const { oldUrl, fileName, fileType } = await req.json();

    if (!fileName || !fileType) {
      return NextResponse.json(
        { error: "fileName and fileType required" },
        { status: 400 }
      );
    }

    const bucket = process.env.AWS_BUCKET!;
    const region = process.env.AWS_REGION!;

    //  generate new file
    const uniqueId = crypto.randomBytes(16).toString("hex");
    const extension = fileName.split(".").pop() 
    const newFileName = `${uniqueId}.${extension}`;

    const key = `uploads/${newFileName}`;

    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      ContentType: fileType,
    });

    const uploadUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 60 * 5,
    });

    //  path-style URL 
    const fileUrl = `https://s3.${region}.amazonaws.com/${bucket}/${key}`;

    return NextResponse.json({
      uploadUrl,
      fileUrl,
      fileKey: key,
      oldUrl, 
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}