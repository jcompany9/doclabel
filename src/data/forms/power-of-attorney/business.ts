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

const businessSection: FormSection = {
  heading: "업무 사항",
  fields: [
    { key: "company", label: "회사/소속", placeholder: "예) (주)○○ 또는 본인 사업체" },
    { key: "counterparty", label: "거래처·상대방", placeholder: "예) ○○상사" },
    { key: "businessScope", label: "업무 범위", placeholder: "예) 계약 체결, 대금 수령, 서류 제출 등", type: "textarea", full: true },
  ],
};

// 회사/개인 업무 대리 위임장.
const businessPoa: FormDef = {
  slug: "power-of-attorney/business",
  parent: "power-of-attorney",
  template: POA_TEMPLATE,
  title: "업무 위임장 양식 무료 작성·인쇄 | 회사 업무 대리 위임장 | DocLabel",
  description:
    "회사·개인 사업의 업무(계약 체결, 대금 수령, 서류 제출 등)를 대리인에게 맡길 때 쓰는 업무 위임장을 브라우저에서 바로 작성하고 A4로 인쇄하는 무료 도구입니다. 업무 범위·거래처를 입력하고 인감을 날인해 사용하세요.",
  keywords: [
    "업무 위임장",
    "업무 위임장 양식",
    "회사 위임장",
    "대리 위임장",
    "업무 대리 위임장",
    "법인 위임장 양식",
    "업무 위임장 무료",
    "업무 위임장 인쇄",
  ],
  ogType: "website",
  applicationCategory: "BusinessApplication",
  featureList: [
    "회사·개인 업무 위임장 작성",
    "회사/소속·거래처 입력",
    "업무 범위 구체화",
    "A4 바로 인쇄",
    "인감(직인) 날인 공간 제공",
  ],
  h1: "업무 위임장 — 회사 업무 대리 처리용 A4 인쇄",
  intro:
    "업무 위임장은 회사나 개인 사업의 특정 업무(계약 체결, 대금 수령, 서류 제출 등)를 직원이나 제3자에게 대리하도록 맡길 때 쓰는 문서입니다. 위임할 업무 범위와 거래처를 구체적으로 적어 A4로 출력하고, 위임인(또는 대표자) 인감을 날인하면 됩니다.",
  steps: [
    "위임인(본인 또는 대표자)과 수임인(대리인)의 인적사항을 입력합니다.",
    "회사/소속과 거래처·상대방, 위임할 업무 범위를 입력합니다.",
    "위임 사항과 위임 기간·작성일을 선택합니다.",
    "인쇄 후 위임인(또는 법인) 인감을 날인합니다.",
  ],
  features: [
    "업무 범위·거래처 등 업무 위임에 필요한 항목이 미리 구성돼 있습니다.",
    "업무 범위를 여러 줄로 구체적으로 적을 수 있습니다.",
    "위임 기간·작성일은 달력에서 선택할 수 있습니다.",
    "입력 내용은 서버로 전송되지 않고 브라우저 안에서만 처리됩니다.",
    "인감(직인) 이미지를 올려 미리 날인된 상태로 인쇄할 수 있습니다.",
  ],
  faq: [
    {
      q: "업무 위임장에는 무엇을 적나요?",
      a: "위임인과 수임인의 인적사항, 회사/소속, 거래처, 위임할 업무 범위, 위임 기간을 적습니다. 업무 범위는 '계약 체결 및 대금 수령'처럼 구체적으로 명시하는 것이 좋습니다.",
    },
    {
      q: "법인 업무도 이 양식으로 되나요?",
      a: "네. 위임인 자리에 대표자를 적고 법인 인감(또는 사용인감)을 날인하면 법인 업무 위임장으로 사용할 수 있습니다. 제출처가 법인인감증명서를 요구하는지 확인하세요.",
    },
    {
      q: "위임 기간은 꼭 정해야 하나요?",
      a: "분쟁을 줄이기 위해 위임 기간을 구체적으로 정하는 것이 좋습니다. 특정 업무 1회에 한정하거나 기간을 명시할 수 있습니다.",
    },
    {
      q: "무료인가요? 입력한 내용이 저장되나요?",
      a: "회원가입 없이 무료로 사용할 수 있으며, 입력한 내용은 서버로 전송되지 않고 브라우저 안에서만 처리됩니다.",
    },
  ],
  related: [
    "power-of-attorney",
    "power-of-attorney/vehicle",
    "power-of-attorney/real-estate",
    "power-of-attorney/government",
    "employment-certificate",
  ],
  docTitle: POA_DOC_TITLE,
  statement: POA_STATEMENT,
  sections: [
    principalSection,
    agentSection,
    businessSection,
    delegationSection("예) 위 거래처와의 계약 체결 및 대금 수령·서류 제출에 관한 권한"),
  ],
  signature: principalSignature,
  attachments: [
    "위임인(또는 법인) 인감증명서 1부 (필요 시)",
    "위임인·수임인 신분증 사본",
    "사업자등록증 등 관련 서류 (필요 시)",
  ],
};

export default businessPoa;
