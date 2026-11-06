/** IndexNow key is public (served at `public/<key>.txt`). Do not use it as an API secret. */
export const INDEXNOW_HOST = "www.focuscoach.dev";
export const INDEXNOW_KEY = "7e4a9c2f-8b1d-4630-a5e6-f7c9d8b0a1e2";
export const INDEXNOW_KEY_LOCATION = `https://${INDEXNOW_HOST}/${INDEXNOW_KEY}.txt`;

export const INDEXNOW_PRIORITY_URLS: readonly string[] = [
  `https://${INDEXNOW_HOST}/`,
  `https://${INDEXNOW_HOST}/games`,
  `https://${INDEXNOW_HOST}/blog/best-focus-apps-for-adhd-adults`
];

export type IndexNowSubmitResult = {
  ok: boolean;
  status: number;
  body: string;
};

export async function submitToIndexNow(urlList: string[]): Promise<IndexNowSubmitResult> {
  const response = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: INDEXNOW_HOST,
      key: INDEXNOW_KEY,
      keyLocation: INDEXNOW_KEY_LOCATION,
      urlList
    })
  });

  const body = await response.text();
  return { ok: response.ok, status: response.status, body };
}
