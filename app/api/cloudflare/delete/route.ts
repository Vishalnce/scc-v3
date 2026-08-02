import { NextRequest, NextResponse } from "next/server";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
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
    const { fileUrl } = await req.json();

    if (!fileUrl) {
      return NextResponse.json(
        { error: "fileUrl is required" },
        { status: 400 }
      );
    }

    const bucket = process.env.CLOUDFLARE_BUCKET!;
    const region = process.env.CLOUDFLARE_REGION!;

    //  extract key from URL

    const base = `https://cdn.sscexamlife.info/`;
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