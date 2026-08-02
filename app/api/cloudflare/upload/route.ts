import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";
import { requireAdmin } from "@/lib/adminCheck";

const s3Client = new S3Client({
  region: process.env.CLOUDFLARE_REGION!,
  endpoint: process.env.CLOUDFLARE_ENDPOINT!,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY!,
  },
});

// TODO:add admin check



export async function POST(req: NextRequest) {
  try {

    await requireAdmin();
    const { fileName, fileType } = await req.json();

    if (!fileName || !fileType) {
      return NextResponse.json(
        { error: "fileName and fileType required" },
        { status: 400 }
      );
    }

    //  generate unique name
    const uniqueId = crypto.randomBytes(16).toString("hex");
    const extension = fileName.split(".").pop();
    const newFileName = `${uniqueId}.${extension}`;

    const key = `uploads/${newFileName}`;


    const command = new PutObjectCommand({
      Bucket: process.env.CLOUDFLARE_BUCKET!,
      Key: key,
      ContentType: fileType,
    });



    const fileUrl = `https://cdn.sscexamlife.info/${key}`;

    const url = await getSignedUrl(s3Client, command, {
      expiresIn: 300, // 5 min
    });

    return NextResponse.json({
      uploadUrl: url,
      fileKey: key,
      fileName: newFileName,
      fileUrl:fileUrl
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}