export function GET() {
  return new Response(
    `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
      <rect width="32" height="32" rx="7" fill="#17806f"/>
      <text x="16" y="22" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" font-weight="700" fill="#fff">F</text>
    </svg>`,
    {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=31536000, immutable"
      }
    }
  );
}
