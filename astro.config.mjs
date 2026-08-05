// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// 정적 출력(기본). Vercel이 Astro를 자동 감지해 dist/를 서빙합니다.
export default defineConfig({
  site: "https://www.doclabel.cloud",
  trailingSlash: "always",
  integrations: [
    sitemap({
      // privacy 등 색인은 하되, 가중치는 페이지별 기본값을 사용
      changefreq: "weekly",
      lastmod: new Date(),
    }),
  ],
});
