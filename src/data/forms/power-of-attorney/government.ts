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

const governmentSection: FormSection = {
  heading: "민원 사항",
  fields: [
    { key: "agency", label: "담당 기관", placeholder: "예) ○○구청 / ○○주민센터", full: true },
    { key: "civilType", label: "민원 종류", placeholder: "예) 등본 발급 / 인감 발급 / 신고", full: true },
  ],
};

// 관공서(행정기관) 민원 대리 위임장.
const governmentPoa: FormDef = {
  slug: "power-of-attorney/government",
  parent: "power-of-attorney",
  template: POA_TEMPLATE,
  title: "관공서 위임장 양식 무료 작성·인쇄 | 주민센터·구청 민원 대리 위임장 | DocLabel",
  description:
    "주민센터·구청 등 관공서 민원을 대리 신청할 때 쓰는 위임장을 브라우저에서 바로 작성하고 A4로 인쇄하는 무료 도구입니다. 담당 기관·민원 종류와 위임 사항을 입력하고 인감을 날인해 사용하세요.",
  keywords: [
    "관공서 위임장",
    "민원 위임장",
    "주민센터 위임장",
    "구청 위임장 양식",
    "행정기관 위임장",
    "대리 발급 위임장",
    "관공서 위임장 무료",
    "민원 대리 위임장 인쇄",
  ],
  ogType: "website",
  applicationCategory: "BusinessApplication",
  featureList: [
    "관공서 민원 대리 위임장 작성",
    "담당 기관·민원 종류 입력",
    "위임 사항(권한 범위) 입력",
    "A4 바로 인쇄",
    "인감(직인) 날인 공간 제공",
  ],
  h1: "관공서 위임장 — 주민센터·구청 민원 대리 신청용 A4 인쇄",
  intro:
    "관공서 위임장은 주민등록등본·인감증명 발급, 각종 신고 등 행정기관 민원을 본인이 직접 처리하지 못해 대리인에게 맡길 때 쓰는 문서입니다. 담당 기관과 민원 종류, 위임 사항을 입력해 A4로 출력하고, 위임인 인감을 날인하면 됩니다.",
  steps: [
    "위임인(본인)과 수임인(대리인)의 인적사항을 입력합니다.",
    "담당 기관(주민센터·구청 등)과 처리할 민원 종류를 입력합니다.",
    "위임 사항(발급·신고 등)과 위임 기간·작성일을 선택합니다.",
    "인쇄 후 위임인 인감을 날인하고 신분증 사본 등을 함께 준비합니다.",
  ],
  features: [
    "담당 기관·민원 종류 항목이 미리 구성돼 있습니다.",
    "발급·신고 등 위임 사항을 구체적으로 적을 수 있습니다.",
    "위임 기간·작성일은 달력에서 선택할 수 있습니다.",
    "입력 내용은 서버로 전송되지 않고 브라우저 안에서만 처리됩니다.",
    "인감(직인) 이미지를 올려 미리 날인된 상태로 인쇄할 수 있습니다.",
  ],
  faq: [
    {
      q: "관공서 민원을 대리로 처리할 때 무엇이 필요한가요?",
      a: "일반적으로 위임장과 위임인의 신분증 사본, 대리인의 신분증이 필요합니다. 인감증명·등본 등 민원 종류에 따라 추가 서류나 인감도장이 요구될 수 있으니 해당 기관 안내를 확인하세요.",
    },
    {
      q: "위임장에 막도장도 괜찮나요?",
      a: "단순 민원은 막도장과 신분증 사본으로 가능한 경우가 있으나, 인감증명서 발급 등은 인감도장을 요구합니다. 처리할 민원의 요건을 먼저 확인하는 것이 안전합니다.",
    },
    {
      q: "담당 기관은 어떻게 적나요?",
      a: "실제로 민원을 처리할 기관명을 적습니다. 예를 들어 '○○구 ○○동 주민센터', '○○구청 민원여권과'처럼 구체적으로 기재하면 좋습니다.",
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
    "power-of-attorney/business",
    "employment-certificate",
  ],
  docTitle: POA_DOC_TITLE,
  statement: POA_STATEMENT,
  sections: [
    principalSection,
    agentSection,
    governmentSection,
    delegationSection("예) 위 기관에 대한 ○○ 민원의 신청·서류 제출 및 발급물 수령 권한"),
  ],
  signature: principalSignature,
  attachments: [
    "위임인 신분증 사본 1부",
    "대리인 신분증",
    "민원 종류에 따른 인감증명서 등 추가 서류",
  ],
};

export default governmentPoa;
