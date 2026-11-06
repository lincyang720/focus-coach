import { NextResponse } from "next/server";
import { INDEXNOW_PRIORITY_URLS, submitToIndexNow } from "@/lib/indexnow";

function isAuthorized(req: Request, secret: string): boolean {
  const auth = req.headers.get("authorization");
  const bearer = auth?.startsWith("Bearer ") ? auth.slice(7) : null;
  const headerSecret = req.headers.get("x-indexnow-submit-secret");
  return bearer === secret || headerSecret === secret;
}

function normalizeUrlList(input: unknown): string[] | null {
  if (!Array.isArray(input) || input.length === 0) return null;
  if (!input.every((item) => typeof item === "string" && item.startsWith("https://"))) {
    return null;
  }
  return input;
}

export async function POST(req: Request) {
  const secret = process.env.INDEXNOW_SUBMIT_SECRET;
  if (!secret) {
    return NextResponse.json(
      { success: false, error: "IndexNow submit is not configured (set INDEXNOW_SUBMIT_SECRET)" },
      { status: 503 }
    );
  }

  if (!isAuthorized(req, secret)) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  let urlList: string[] = [...INDEXNOW_PRIORITY_URLS];
  try {
    const payload = (await req.json()) as { urlList?: unknown };
    const custom = normalizeUrlList(payload.urlList);
    if (custom) urlList = custom;
  } catch {
    // Empty body: use default priority URLs.
  }

  const result = await submitToIndexNow(urlList);

  if (!result.ok && result.status !== 202) {
    return NextResponse.json(
      {
        success: false,
        error: "IndexNow API rejected the submission",
        indexNowStatus: result.status,
        indexNowBody: result.body,
        urlCount: urlList.length
      },
      { status: 502 }
    );
  }

  return NextResponse.json({
    success: true,
    indexNowStatus: result.status,
    urlCount: urlList.length,
    urls: urlList
  });
}
