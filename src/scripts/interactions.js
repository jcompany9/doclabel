import { track } from "./analytics.js";

// 모든 페이지 공통: SEO 본문 FAQ 펼침 / 개인정보처리방침 이동 추적
document.querySelectorAll(".seo-faq details").forEach((item) => {
  item.addEventListener("toggle", () => {
    if (item.open) {
      track("faq_open", { question: item.querySelector("summary")?.textContent.trim() || "" });
    }
  });
});

document.querySelectorAll('.footer-links a[href*="privacy"]').forEach((link) => {
  link.addEventListener("click", () => {
    track("privacy_click", {});
  });
});
