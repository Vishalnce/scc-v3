import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";


// Fetch all post or get post by date
export async function GET(req: NextRequest) {
    try {
    // const url = new URL(req.url);
    // const dateStr = url.searchParams.get("date");

    // if (!dateStr) {
    //   return NextResponse.json(
    //     { error: "Missing 'date' query param" },
    //     { status: 400 }
    //   );
    // }
    // const start = new Date(dateStr);
    // const end = new Date(start);
    // end.setDate(end.getDate() + 1);

    const contents = await db.liner.findMany({
      // where: {
      //   createdAt: {
      //     gte: start,
      //     lt: end,
      //   },
      // },
      orderBy: { id: "desc" },
    });

    return NextResponse.json({ contents }, { status: 200 });
  } catch (error) {
    console.error("Error fetching liner contents:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
 
}

// Create a post
export async function POST(req: NextRequest) {

 try {
  const body = await req.json();
  const { text  } = body;
  const contents = await db.liner.create({
    data: {
      content:text,
    }
  })

  return NextResponse.json({ success: true, contents }, { status: 200 });


 } catch (error) {
  console.error("Error creating liner content:", error);
  return NextResponse.json(
    { error: "Internal Server Error" },
    { status: 500 }
  );
 }
}


//edit the post
export async function PATCH(req:NextRequest) {

  try {

    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Missing 'id' query param" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { content } = body;
    const updatedContent = await db.liner.update({
      where: { id: parseInt(id) },
      data: { content },
    });
    return NextResponse.json({ success: true, updatedContent }, { status: 200 });


  }catch (error) {
    console.error("Error updating liner content:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Delte the Post
export async function DELETE(req:NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Missing 'id' query param" },
        { status: 400 }
      );
    }

    const deletedContent = await db.liner.delete({
      where: { id: parseInt(id) }
    });

    return NextResponse.json({ success: true, deletedContent }, { status: 200 });
  }catch (error) {
    console.error("Error deleting liner content:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
