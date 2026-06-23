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

const vehicleSection: FormSection = {
  heading: "위임 대상 자동차",
  fields: [
    { key: "carNumber", label: "자동차등록번호", placeholder: "12가 3456" },
    { key: "carName", label: "차명", placeholder: "예) 아반떼" },
    { key: "carVin", label: "차대번호", placeholder: "차량등록증의 차대번호", full: true },
    { key: "seller", label: "양도인", placeholder: "파는 사람 성명" },
    { key: "buyer", label: "양수인", placeholder: "사는 사람 성명" },
  ],
};

// 자동차 이전등록(명의이전) 위임장.
const vehiclePoa: FormDef = {
  slug: "power-of-attorney/vehicle",
  parent: "power-of-attorney",
  template: POA_TEMPLATE,
  title: "자동차 이전등록 위임장 양식 무료 작성·인쇄 | 명의이전 위임장 | DocLabel",
  description:
    "자동차 이전등록(명의이전) 위임장을 브라우저에서 바로 작성하고 A4로 인쇄하는 무료 도구입니다. 자동차등록번호·차대번호·양도인·양수인 정보를 입력하고 인감을 날인해 차량등록사업소·정부24 대리 신청에 사용하세요.",
  keywords: [
    "자동차 위임장",
    "자동차 이전등록 위임장",
    "명의이전 위임장",
    "자동차 명의이전 위임장 양식",
    "차량 이전등록 위임장",
    "자동차 위임장 양식 무료",
    "중고차 명의이전 위임장",
    "자동차 위임장 인쇄",
  ],
  ogType: "website",
  applicationCategory: "BusinessApplication",
  featureList: [
    "자동차 이전등록 위임장 작성",
    "자동차등록번호·차대번호 입력",
    "양도인·양수인 정보 입력",
    "A4 바로 인쇄",
    "인감(직인) 날인 공간 제공",
  ],
  h1: "자동차 이전등록 위임장 — 명의이전 대리 신청용 A4 인쇄",
  intro:
    "자동차 이전등록 위임장은 자동차 명의이전(이전등록)을 본인이 직접 하지 못해 대리인이 차량등록사업소나 정부24에서 대신 신청할 때 쓰는 문서입니다. 자동차등록번호·차대번호·양도인·양수인 정보와 위임 사항을 입력해 A4로 출력하고, 위임인 인감을 날인하면 됩니다.",
  steps: [
    "위임인(본인)과 수임인(대리인)의 인적사항을 입력합니다.",
    "위임 대상 자동차의 등록번호·차명·차대번호와 양도인·양수인을 입력합니다.",
    "위임 사항(이전등록 신청 등)과 위임 기간·작성일을 선택합니다.",
    "인쇄 후 위임인 인감을 날인하고 인감증명서·신분증 사본을 함께 준비합니다.",
  ],
  features: [
    "자동차 이전등록에 필요한 차량 표시 항목(등록번호·차대번호 등)이 미리 구성돼 있습니다.",
    "양도인·양수인 정보를 한 장에 함께 정리할 수 있습니다.",
    "위임 기간·작성일은 달력에서 선택할 수 있습니다.",
    "입력 내용은 서버로 전송되지 않고 브라우저 안에서만 처리됩니다.",
    "인감(직인) 이미지를 올려 미리 날인된 상태로 인쇄할 수 있습니다.",
  ],
  faq: [
    {
      q: "자동차 명의이전을 대리인이 할 때 위임장이 꼭 필요한가요?",
      a: "네. 양도인 또는 양수인 본인이 아닌 사람이 이전등록을 신청하면 위임장이 필요합니다. 보통 위임인의 인감증명서와 신분증 사본을 함께 제출합니다.",
    },
    {
      q: "차대번호는 어디서 확인하나요?",
      a: "자동차등록증(차량등록증)에 자동차등록번호와 함께 차대번호가 기재되어 있습니다. 등록증의 표기를 그대로 옮겨 적으면 됩니다.",
    },
    {
      q: "위임장에 인감도장을 찍어야 하나요?",
      a: "자동차 이전등록은 위임인의 인감도장 날인과 인감증명서를 요구하는 경우가 많습니다. 정확한 요건은 관할 차량등록사업소나 정부24 안내를 확인하세요.",
    },
    {
      q: "무료인가요? 입력한 내용이 저장되나요?",
      a: "회원가입 없이 무료로 사용할 수 있으며, 입력한 내용은 서버로 전송되지 않고 브라우저 안에서만 처리됩니다.",
    },
  ],
  related: [
    "power-of-attorney",
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
    vehicleSection,
    delegationSection("예) 위 자동차의 이전등록 신청 및 관련 서류 제출·수령에 관한 일체의 권한"),
  ],
  signature: principalSignature,
  attachments: [
    "위임인 인감증명서 1부",
    "위임인·수임인 신분증 사본",
    "자동차등록증, 양도증명서 등 이전등록 구비서류",
  ],
};

export default vehiclePoa;
