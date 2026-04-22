export const deleteImage = async (url: string) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000); // 10s timeout

  try {
    // 1. Get presigned delete URL
    const res = await fetch("/api/aws/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    body: JSON.stringify({ fileUrl: url }), 
      signal: controller.signal,
    });

    if (!res.ok) {
      console.error("Failed to get deleteUrl:", res.status);
      return;
    }

    const data = await res.json();

    if (!data?.deleteUrl) {
      console.error("deleteUrl missing in response");
      return;
    }

    //  Call S3 delete URL
    const s3Res = await fetch(data.deleteUrl, {
      method: "DELETE",
    });

    if (!s3Res.ok) {
      console.error("S3 delete failed:", s3Res.status);
      return;
    }

  } catch (err: any) {
    if (err.name === "AbortError") {
      console.error("Request timed out:", url);
    } else {
      console.error("Delete failed:", url, err);
    }
  } finally {
    clearTimeout(timeout);
  }
};
