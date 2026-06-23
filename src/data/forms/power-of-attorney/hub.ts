import type { FormDef } from "../../site";
import {
  principalSection,
  agentSection,
  delegationSection,
  principalSignature,
  commonAttachments,
  POA_DOC_TITLE,
  POA_STATEMENT,
  POA_TEMPLATE,
} from "./shared";

// 위임장 허브(일반 위임장). /power-of-attorney/ 에 매핑되며, 4개 변형의 상위 페이지.
const powerOfAttorney: FormDef = {
  slug: "power-of-attorney",
  template: POA_TEMPLATE,
  title: "위임장 양식 무료 작성·인쇄 | 표준 위임장 온라인 작성기 | DocLabel",
  description:
    "표준 위임장 양식을 브라우저에서 바로 작성하고 A4로 인쇄하거나 PDF로 저장하는 무료 도구입니다. 위임인·수임인 인적사항, 위임 사항(권한 범위)·기간을 입력하고 인감을 날인해 사용하세요. 자동차·부동산·관공서·업무용 위임장도 제공합니다.",
  keywords: [
    "위임장",
    "위임장 양식",
    "위임장 양식 무료",
    "위임장 작성",
    "위임장 인쇄",
    "표준 위임장",
    "위임장 다운로드",
    "온라인 위임장",
  ],
  ogType: "website",
  applicationCategory: "BusinessApplication",
  featureList: [
    "표준 위임장 양식 작성",
    "위임인·수임인 인적사항 입력",
    "위임 사항·기간 입력",
    "A4 바로 인쇄",
    "인감(직인) 날인 공간 제공",
  ],
  h1: "위임장 양식 — 온라인 무료 작성 후 A4 인쇄",
  intro:
    "위임장은 본인(위임인)이 특정 행위를 할 권한을 다른 사람(수임인·대리인)에게 맡긴다는 것을 밝히는 문서입니다. 이 도구는 위임인·수임인 인적사항과 위임 사항(권한 범위)·위임 기간을 브라우저에서 바로 입력하고 A4로 인쇄하거나 PDF로 저장할 수 있는 무료 위임장 양식입니다. 자동차 이전등록, 부동산, 관공서 민원, 업무 위임 등 용도별 양식도 함께 제공합니다.",
  steps: [
    "위임인(본인)의 성명·주민등록번호·주소·연락처를 입력합니다.",
    "수임인(대리인)의 인적사항과 위임인과의 관계를 입력합니다.",
    "위임 사항(권한 범위)을 구체적으로 적고, 위임 기간과 작성일을 선택합니다.",
    "인쇄 버튼을 눌러 A4로 출력한 뒤, 위임인 성명 옆에 인감(도장)을 날인합니다.",
  ],
  features: [
    "표준 위임장 항목(위임인·수임인·위임 내용)이 미리 구성돼 있습니다.",
    "위임 기간·작성일은 직접 입력하거나 달력에서 선택할 수 있습니다.",
    "화면 미리보기와 인쇄 결과가 동일한 A4 레이아웃입니다.",
    "입력 내용은 서버로 전송되지 않고 브라우저 안에서만 처리됩니다.",
    "인감(직인) 이미지를 올려 미리 날인된 상태로 인쇄할 수 있습니다.",
  ],
  faq: [
    {
      q: "위임장에는 무엇을 꼭 적어야 하나요?",
      a: "위임인과 수임인의 인적사항(성명·주민등록번호·주소·연락처), 위임 사항(권한 범위), 위임 기간, 작성일, 그리고 위임인의 서명 또는 날인이 기본적으로 들어가야 합니다. 권한 범위는 '일체의 권한'처럼 막연하게 적기보다 구체적으로 명시하는 것이 분쟁을 줄입니다.",
    },
    {
      q: "위임장에 인감도장이 꼭 필요한가요?",
      a: "제출처에 따라 다릅니다. 부동산·금융 등 중요한 거래는 위임인의 인감도장과 인감증명서를 함께 요구하는 경우가 많습니다. 단순 민원은 막도장과 신분증 사본으로 가능한 경우도 있으니 제출처 안내를 확인하세요.",
    },
    {
      q: "어떤 용도의 위임장을 고르면 되나요?",
      a: "자동차 명의이전은 자동차 위임장, 부동산 매매·임대차는 부동산 위임장, 관공서 민원 대리는 관공서 위임장, 회사 업무 대리는 업무 위임장을 사용하면 용도에 맞는 항목이 미리 채워져 있어 편리합니다.",
    },
    {
      q: "무료인가요? 입력한 내용이 저장되나요?",
      a: "회원가입 없이 무료로 사용할 수 있습니다. 입력한 내용은 서버로 전송되지 않고 브라우저 안에서만 처리됩니다.",
    },
    {
      q: "PDF로 저장할 수 있나요?",
      a: "네. 인쇄 창에서 프린터 대신 'PDF로 저장'을 선택하면 A4 크기의 PDF 파일로 저장됩니다.",
    },
  ],
  related: [
    "power-of-attorney/vehicle",
    "power-of-attorney/real-estate",
    "power-of-attorney/government",
    "power-of-attorney/business",
    "employment-certificate",
  ],
  docTitle: POA_DOC_TITLE,
  statement: POA_STATEMENT,
  sections: [
    principalSection,
    agentSection,
    delegationSection("예) 본인 명의의 ○○에 관한 신청·서류 제출 및 수령 등 일체의 행위"),
  ],
  signature: principalSignature,
  attachments: commonAttachments,
};

export default powerOfAttorney;
