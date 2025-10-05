import { NextResponse } from "next/server";
import db from "@/lib/db";
type BodyType = {
  name: string;
  email: string;
  content: string;
};
// Post by quizId blogId conceptId postId
export async function POST(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("postId");
    const conceptId = searchParams.get("conceptId");
    const quizId = searchParams.get("quizId");
    const blogId = searchParams.get("blogId");

    const body:BodyType = await req.json();
    const {name, email,content} =body;


 

    // collect which IDs are provided
    const ids = [postId, conceptId, quizId, blogId].filter(Boolean);

    // ensure exactly ONE is passed
    if (ids.length !== 1) {
      return NextResponse.json(
        {
          error: "Provide exactly one of postId, conceptId, quizId, or blogId",
        },
        { status: 400 }
      );
    }
    const comment = await db.comment.create({
      data: {
        name, // must come from req body
        email, // must come from req body
        content,
        postId: postId ? Number(postId) : null,
        conceptId: conceptId ? Number(conceptId) : null,
        quizId: quizId ? Number(quizId) : null,
        blogId: blogId ? Number(blogId) : null,
      },
    });

    return NextResponse.json(comment, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("postId");
    const conceptId = searchParams.get("conceptId");
    const quizId = searchParams.get("quizId");
    const blogId = searchParams.get("blogId");


  const allComments = await db.comment.findMany({
  where: {
    OR: [
      { postId: postId ? Number(postId) : undefined },
      { conceptId: conceptId ? Number(conceptId) : undefined },
      { quizId: quizId ? Number(quizId) : undefined },
      { blogId: blogId ? Number(blogId) : undefined },
    ],
  },
  orderBy: { createdAt: "desc" },
});

return NextResponse.json(allComments ,{ status: 201 })

  } catch (error) {
    console.log("Error white fetching ");
  }
}
