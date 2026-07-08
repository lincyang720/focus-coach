export function GET() {
  return new Response(
    `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180">
      <rect width="180" height="180" rx="36" fill="#17806f"/>
      <text x="90" y="119" text-anchor="middle" font-family="Arial, sans-serif" font-size="96" font-weight="700" fill="#fff">F</text>
    </svg>`,
    {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=31536000, immutable"
      }
    }
  );
}
