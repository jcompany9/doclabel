// 사이트 전역 설정 — 모든 페이지의 메타/구조화데이터/광고/분석이 여기서 파생됩니다.
export const site = {
  name: "DocLabel",
  url: "https://www.doclabel.cloud",
  locale: "ko_KR",
  lang: "ko-KR",
  description: "화일철 라벨과 책등 라벨을 A4로 바로 출력할 수 있는 무료 웹 도구",
  // Google Analytics 4 측정 ID
  gaId: "G-9FXPQD0WLY",
  // AdSense 게시자 ID (ca-pub-XXXXXXXXXXXXXXXX). 환경변수 PUBLIC_ADSENSE_CLIENT 우선,
  // 비어 있으면 광고 로더/슬롯이 렌더되지 않습니다.
  adsenseClient: import.meta.env.PUBLIC_ADSENSE_CLIENT ?? "ca-pub-8499788425348927",
  // 검색엔진 소유확인(메타태그 방식). 값이 있을 때만 <meta>가 출력됩니다. 파일 방식과 병행 가능.
  // TODO(verification): 필요 시 환경변수 PUBLIC_GSC_VERIFICATION / PUBLIC_NAVER_VERIFICATION 설정.
  gscVerification: import.meta.env.PUBLIC_GSC_VERIFICATION ?? "",
  naverVerification: import.meta.env.PUBLIC_NAVER_VERIFICATION ?? "",
  // 기본 OG 이미지 (1200x630). 아직 파일이 없다면 제작 후 public/og-image.png 로 추가하세요.
  ogImage: "/og-image.png",
  // 문의 이메일. 환경변수 PUBLIC_CONTACT_EMAIL 가 있으면 그 값을, 없으면 아래 기본값을 사용.
  contactEmail: import.meta.env.PUBLIC_CONTACT_EMAIL ?? "doclabel.help@gmail.com",
};

// 서식 1개를 정의하는 데이터 형태. 이 한 객체가 메타/JSON-LD/본문/사이트맵을 모두 생성합니다.
export interface FormFaq {
  q: string;
  a: string;
}

// 폼 아래에 노출되는 사람이 읽는 원본 본문(작성법/항목/주의사항 등). 화면 전용(인쇄 제외).
export interface GuideSection {
  heading: string; // H2 제목
  paragraphs: string[]; // 문단
  bullets?: string[]; // 선택: 항목 목록
}

// ===== 제네릭 시트(DocumentSheet)용 — 폼 필드/미리보기를 데이터로 구동 =====
// label / employment-certificate 는 전용 시트를 그대로 쓰므로 아래 항목을 사용하지 않습니다(선택적).
export interface FormField {
  key: string; // data-field 키 (시트 안에서 고유)
  label: string; // 표의 항목명(th)
  placeholder?: string;
  type?: "text" | "date" | "daterange" | "textarea"; // 기본 text
  full?: boolean; // true면 한 행 전체 차지
  dateFormat?: "dot" | "korean"; // type=date 일 때 달력 → 칸 채움 형식
}

export interface FormSection {
  heading?: string; // 섹션 제목(예: "위임인(본인)")
  fields: FormField[];
}

export interface FormSignature {
  role: string; // 서명 주체(예: "위임인")
  seal?: boolean; // 직인/인감 날인란 표시
}

export interface FormDef {
  slug: string; // "" 이면 홈("/")에 매핑. 다단계 경로는 "a/b" 형태 허용
  title: string; // <title> 및 og:title
  description: string; // meta description
  keywords: string[];
  ogType?: string;
  h1: string;
  intro: string;
  steps: string[];
  features: string[];
  guideSections?: GuideSection[]; // 폼 아래 원본 본문(작성법·항목·주의사항 등)
  faq: FormFaq[];
  related?: string[]; // 다른 서식 slug — 내부링크 자동 생성
  applicationCategory?: string;
  featureList?: string[];

  // ↓ 제네릭 시트(DocumentSheet)를 쓰는 서식만 채웁니다. 없으면 전용 시트를 사용.
  parent?: string; // 상위(허브) slug — 브레드크럼 3단계용
  template?: string; // paper 클래스(.template-<x>) 및 상단 제목용 식별자
  docTitle?: string; // 시트 상단 큰 제목(예: "위 임 장")
  statement?: string; // 상단 본문 안내 문장(표 위)
  sections?: FormSection[]; // 입력 칸 묶음 → 시트가 자동 렌더
  closingStatement?: string; // 표 아래·서명 위 마무리 문장(예: "위와 같이 사직하고자…")
  signature?: FormSignature[]; // 서명/날인란
  recipient?: string; // 받는 사람 라인 placeholder(예: "○○ 주식회사 대표이사") → "귀하" 자동 부기
  attachments?: string[]; // 첨부서류 안내(인쇄에도 노출)
}

export function canonicalFor(slug: string): string {
  return slug ? `${site.url}/${slug}/` : `${site.url}/`;
}
