// GA4 이벤트 전송 헬퍼: gtag가 아직 로드되지 않았거나 차단된 경우 조용히 무시합니다.
export function track(eventName, params = {}) {
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
}
