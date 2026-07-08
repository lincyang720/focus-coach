export function GET() {
  return new Response(
    `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
      <rect width="1200" height="630" fill="#f6f8f9"/>
      <rect x="72" y="72" width="92" height="92" rx="18" fill="#17806f"/>
      <text x="118" y="134" text-anchor="middle" font-family="Arial, sans-serif" font-size="54" font-weight="800" fill="#fff">F</text>
      <text x="188" y="130" font-family="Arial, sans-serif" font-size="34" font-weight="700" fill="#102033">Focus Coach</text>
      <text x="72" y="285" font-family="Arial, sans-serif" font-size="72" font-weight="800" fill="#102033">10-minute focus training</text>
      <text x="72" y="365" font-family="Arial, sans-serif" font-size="72" font-weight="800" fill="#102033">for clearer work sessions</text>
      <text x="72" y="450" font-family="Arial, sans-serif" font-size="30" fill="#526070">Five short games, adaptive difficulty, and weekly AI recaps.</text>
    </svg>`,
    {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=86400"
      }
    }
  );
}
