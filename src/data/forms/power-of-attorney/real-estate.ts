import type { FormDef, FormSection } from "../../site";
import {
  principalSection,
  agentSection,
  delegationSection,
  principalSignature,
  POA_DOC_TITLE,
  POA_STATEMENT,
  POA_TEMPLATE,
} from "./shared";

const realEstateSection: FormSection = {
  heading: "부동산의 표시",
  fields: [
    { key: "reAddress", label: "소재지", placeholder: "등기부등본상 소재지 (시·군·구, 도로명·지번)", full: true },
    { key: "reType", label: "구분", placeholder: "토지 / 건물 / 아파트 등" },
    { key: "reArea", label: "면적", placeholder: "예) 84.97㎡" },
    { key: "reContract", label: "계약 종류", placeholder: "매매 / 전세 / 월세 임대차 등", full: true },
  ],
};

// 부동산 매매·임대차 등 위임장.
const realEstatePoa: FormDef = {
  slug: "power-of-attorney/real-estate",
  parent: "power-of-attorney",
  template: POA_TEMPLATE,
  title: "부동산 위임장 양식 무료 작성·인쇄 | 매매·임대차 위임장 | DocLabel",
  description:
    "부동산 매매·임대차 계약 위임장을 브라우저에서 바로 작성하고 A4로 인쇄하는 무료 도구입니다. 부동산의 표시(소재지·면적), 위임 사항(계약 체결·서류 제출)을 구체적으로 입력하고 인감을 날인해 사용하세요.",
  keywords: [
    "부동산 위임장",
    "부동산 위임장 양식",
    "매매 위임장",
    "임대차 위임장",
    "부동산 계약 위임장",
    "전세 위임장 양식",
    "부동산 위임장 무료",
    "부동산 위임장 인쇄",
  ],
  ogType: "website",
  applicationCategory: "BusinessApplication",
  featureList: [
    "부동산 매매·임대차 위임장 작성",
    "부동산의 표시(소재지·면적) 입력",
    "위임 사항(권한 범위) 구체화",
    "A4 바로 인쇄",
    "인감(직인) 날인 공간 제공",
  ],
  h1: "부동산 위임장 — 매매·임대차 대리 계약용 A4 인쇄",
  intro:
    "부동산 위임장은 매매·임대차 계약 체결이나 관련 서류 제출을 본인이 직접 하지 못해 대리인에게 맡길 때 쓰는 문서입니다. 등기부등본상 부동산의 표시(소재지·면적)와 위임 사항을 구체적으로 적어 A4로 출력하고, 위임인 인감을 날인하면 됩니다.",
  steps: [
    "위임인(본인)과 수임인(대리인)의 인적사항을 입력합니다.",
    "등기부등본 기준으로 부동산의 표시(소재지·구분·면적)와 계약 종류를 입력합니다.",
    "위임 사항(계약 체결·서류 제출 등)을 구체적으로 적고 위임 기간·작성일을 선택합니다.",
    "인쇄 후 위임인 인감을 날인하고 인감증명서를 함께 준비합니다.",
  ],
  features: [
    "부동산의 표시(소재지·구분·면적) 항목이 미리 구성돼 있습니다.",
    "권한 범위를 '일체의 권한'이 아닌 구체적 문구로 적도록 안내합니다.",
    "위임 기간·작성일은 달력에서 선택할 수 있습니다.",
    "입력 내용은 서버로 전송되지 않고 브라우저 안에서만 처리됩니다.",
    "인감(직인) 이미지를 올려 미리 날인된 상태로 인쇄할 수 있습니다.",
  ],
  faq: [
    {
      q: "부동산 위임장에는 권한 범위를 어떻게 적나요?",
      a: "'상기 부동산에 대한 매매계약 체결 및 계약서 작성'처럼 대상 부동산과 계약 종류를 구체적으로 명시하는 것이 좋습니다. '일체의 권한'이라고만 적으면 해석을 두고 분쟁이 생길 수 있습니다.",
    },
    {
      q: "부동산의 표시는 무엇을 기준으로 적나요?",
      a: "등기부등본(등기사항전부증명서)의 '부동산의 표시'를 기준으로 소재지·지번·면적을 그대로 옮겨 적습니다.",
    },
    {
      q: "인감증명서가 꼭 필요한가요?",
      a: "부동산 거래는 위임인의 인감도장 날인과 인감증명서를 함께 요구하는 경우가 많습니다. 거래 상대방이나 중개사무소 안내를 확인하세요.",
    },
    {
      q: "무료인가요? 입력한 내용이 저장되나요?",
      a: "회원가입 없이 무료로 사용할 수 있으며, 입력한 내용은 서버로 전송되지 않고 브라우저 안에서만 처리됩니다.",
    },
  ],
  related: [
    "power-of-attorney",
    "power-of-attorney/vehicle",
    "power-of-attorney/government",
    "power-of-attorney/business",
    "employment-certificate",
  ],
  docTitle: POA_DOC_TITLE,
  statement: POA_STATEMENT,
  sections: [
    principalSection,
    agentSection,
    realEstateSection,
    delegationSection("예) 상기 부동산에 대한 매매계약 체결 및 계약서 작성·서류 제출에 관한 권한"),
  ],
  signature: principalSignature,
  attachments: [
    "위임인 인감증명서 1부",
    "위임인·수임인 신분증 사본",
    "등기부등본 등 부동산 관련 서류",
  ],
};

export default realEstatePoa;
