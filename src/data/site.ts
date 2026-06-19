// 사이트 전역 설정 — 모든 페이지의 메타/구조화데이터/광고/분석이 여기서 파생됩니다.
export const site = {
  name: "DocLabel",
  url: "https://doclabel.vercel.app",
  locale: "ko_KR",
  lang: "ko-KR",
  description: "화일철 라벨과 책등 라벨을 A4로 바로 출력할 수 있는 무료 웹 도구",
  // Google Analytics 4 측정 ID
  gaId: "G-9FXPQD0WLY",
  // AdSense 게시자 ID (ca-pub-XXXXXXXXXXXXXXXX). 비어 있으면 광고 슬롯은 렌더되지 않습니다.
  adsenseClient: "",
  // 기본 OG 이미지 (1200x630). 아직 파일이 없다면 제작 후 public/og-image.png 로 추가하세요.
  ogImage: "/og-image.png",
};

// 서식 1개를 정의하는 데이터 형태. 이 한 객체가 메타/JSON-LD/본문/사이트맵을 모두 생성합니다.
export interface FormFaq {
  q: string;
  a: string;
}

export interface FormDef {
  slug: string; // "" 이면 홈("/")에 매핑
  title: string; // <title> 및 og:title
  description: string; // meta description
  keywords: string[];
  ogType?: string;
  h1: string;
  intro: string;
  steps: string[];
  features: string[];
  faq: FormFaq[];
  related?: string[]; // 다른 서식 slug — 내부링크 자동 생성
  applicationCategory?: string;
  featureList?: string[];
}

export function canonicalFor(slug: string): string {
  return slug ? `${site.url}/${slug}/` : `${site.url}/`;
}
