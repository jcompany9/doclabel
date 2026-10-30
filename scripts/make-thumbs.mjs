// 서식 썸네일 생성 — 각 서식 페이지의 A4 용지만 잘라 public/thumbs/<slug>.png 로 저장합니다.
//
//   npm run build
//   npx astro preview --port 4400     (다른 터미널)
//   node scripts/make-thumbs.mjs
//
// 서식을 추가하거나 시트 디자인을 바꾸면 다시 실행하세요.
import { execFile } from "node:child_process";
import { mkdir, writeFile, rm } from "node:fs/promises";
import { promisify } from "node:util";
import path from "node:path";

const run = promisify(execFile);

const CHROME =
  process.env.CHROME_PATH ?? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = process.env.THUMB_PORT ?? "4400";
const BASE = `http://localhost:${PORT}`;
const OUT = path.resolve("public/thumbs");
const WRAPPER = path.resolve("dist/__thumb.html");

// slug "" 은 홈(화일철 라벨)
const SLUGS = [
  "",
  "employment-contract",
  "employment-certificate",
  "resume",
  "resignation",
  "quote",
  "transaction-statement",
  "power-of-attorney",
  "power-of-attorney/vehicle",
  "power-of-attorney/real-estate",
  "power-of-attorney/government",
  "power-of-attorney/business",
  "fact-confirmation",
  "incident-report",
];

const PAPER_W = 794; // 210mm @96dpi
const PAPER_H = 1123; // 297mm @96dpi
const W = 420;
const SCALE = W / PAPER_W;
const H = Math.round(PAPER_H * SCALE);

// 같은 출처(iframe)라 내부 문서에 스타일을 주입해 화면 크롬을 걷어내고 용지만 남깁니다.
const wrapperHtml = `<!doctype html><meta charset="utf-8">
<style>
  html,body{margin:0;width:${W}px;height:${H}px;overflow:hidden;background:#fff}
  iframe{border:0;width:${PAPER_W}px;height:${PAPER_H}px;
         transform:scale(${SCALE});transform-origin:top left;display:block}
</style>
<iframe id="f"></iframe>
<script>
  const target = new URLSearchParams(location.search).get("p") || "/";
  const f = document.getElementById("f");
  f.addEventListener("load", () => {
    const d = f.contentDocument;
    const s = d.createElement("style");
    s.textContent = \`
      .top-toolbar,.field-panel,.seo-content,.site-footer{display:none!important}
      .simple-app{padding:0!important;max-width:none!important}
      .page-body{display:block!important;min-height:0!important}
      .paper-wrap{padding:0!important;overflow:visible!important;display:block!important}
      html,body{background:#fff!important}
      .paper{box-shadow:none!important;margin:0!important;transform:none!important}
    \`;
    d.head.appendChild(s);
    document.title = "READY";
  });
  f.src = target;
</script>`;

await mkdir(OUT, { recursive: true });
await writeFile(WRAPPER, wrapperHtml, "utf-8");

try {
  for (const slug of SLUGS) {
    const name = slug === "" ? "label" : slug.replace(/\//g, "-");
    const target = `/${slug}${slug ? "/" : ""}`;
    const file = path.join(OUT, `${name}.png`);
    await run(CHROME, [
      "--headless=new",
      "--disable-gpu",
      "--hide-scrollbars",
      `--window-size=${W},${H}`,
      "--virtual-time-budget=6000",
      `--screenshot=${file}`,
      `${BASE}/__thumb.html?p=${encodeURIComponent(target)}`,
    ]);
    console.log("thumb:", name);
  }
} finally {
  await rm(WRAPPER, { force: true });
}

console.log(`done → ${OUT} (${W}x${H})`);
