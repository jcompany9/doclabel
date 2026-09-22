// 사이트 탐색(상단 "전체 서식" 메뉴 · /forms/ 허브 · 하단 푸터)이 공유하는 서식 분류.
// 새 서식을 추가하면 여기 분류에도 한 줄 넣어야 메뉴·허브·푸터에 노출됩니다.
export interface NavItem {
  slug: string; // FormDef.slug 와 동일("" = 홈)
  name: string; // 메뉴에 보일 짧은 이름
  desc: string; // 허브 카드 설명 한 줄
}

export interface NavCategory {
  name: string;
  items: NavItem[];
}

export const navCategories: NavCategory[] = [
  {
    name: "인사·노무",
    items: [
      { slug: "employment-contract", name: "표준근로계약서", desc: "근로시간·임금·사회보험 등 근로조건 작성" },
      { slug: "employment-certificate", name: "재직증명서", desc: "재직 사실 증명, 직인 이미지 날인" },
      { slug: "resume", name: "이력서", desc: "증명사진·학력·경력·자격 사항 입력" },
      { slug: "resignation", name: "사직서", desc: "사직 사유·사직 희망일 작성" },
    ],
  },
  {
    name: "거래·회계",
    items: [
      { slug: "quote", name: "견적서", desc: "품목·수량·단가 입력 시 합계 자동 계산" },
      { slug: "transaction-statement", name: "거래명세서", desc: "공급가액·부가세·합계 자동 계산" },
    ],
  },
  {
    name: "위임·확인",
    items: [
      { slug: "power-of-attorney", name: "위임장", desc: "일반·자동차·부동산·관공서·업무용 위임" },
      { slug: "fact-confirmation", name: "사실확인서", desc: "사실관계를 확인하는 문서" },
      { slug: "incident-report", name: "경위서", desc: "사건 발생 경위를 정리해 제출" },
    ],
  },
  {
    name: "라벨",
    items: [{ slug: "", name: "화일철 라벨", desc: "책등·문서철 라벨 A4 출력" }],
  },
];

export function navHref(slug: string): string {
  return slug ? `/${slug}/` : "/";
}
