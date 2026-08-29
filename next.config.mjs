/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      ["number_memory", "number-memory"],
      ["quick_match", "quick-match"],
      ["n_back", "n-back"],
      ["task_switch", "task-switch"],
      ["stroop", "stroop-test"]
    ].map(([gameType, slug]) => ({
      source: `/train/${gameType}`,
      destination: `/exercises/${slug}`,
      permanent: true
    }));
  }
};

export default nextConfig;
