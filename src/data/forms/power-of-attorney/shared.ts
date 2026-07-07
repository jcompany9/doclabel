import type { FormSection, FormSignature } from "../../site";

// 위임장 5종이 공유하는 공통 입력 블록. 변형 파일은 이 조각들을 조합하고
// 변형 전용 섹션(자동차/부동산/관공서/업무)만 끼워 넣습니다.

export const principalSection: FormSection = {
  heading: "위임인(본인)",
  fields: [
    { key: "pName", label: "성명", placeholder: "홍길동" },
    { key: "pRRN", label: "주민등록번호", placeholder: "000000-0000000" },
    { key: "pAddr", label: "주소", placeholder: "서울특별시 ○○구 ○○로 00", full: true },
    { key: "pPhone", label: "연락처", placeholder: "010-0000-0000" },
  ],
};

export const agentSection: FormSection = {
  heading: "수임인(대리인)",
  fields: [
    { key: "aName", label: "성명", placeholder: "김대리" },
    { key: "aRRN", label: "주민등록번호", placeholder: "000000-0000000" },
    { key: "aAddr", label: "주소", placeholder: "서울특별시 ○○구 ○○로 00", full: true },
    { key: "aPhone", label: "연락처", placeholder: "010-0000-0000" },
    { key: "aRelation", label: "위임인과의 관계", placeholder: "본인 / 배우자 / 자녀 / 직원 등", full: true },
  ],
};

// 위임 사항(권한 범위)·사유·기간. 작성일은 표가 아니라 서명(위임인) 위 날짜란에서 입력합니다.
// 권한 범위 안내문구는 용도마다 달라 인자로 받습니다.
export function delegationSection(scopePlaceholder: string): FormSection {
  return {
    heading: "위임 내용",
    fields: [
      { key: "scope", label: "위임 사항(권한 범위)", placeholder: scopePlaceholder, type: "textarea", full: true },
      { key: "reason", label: "위임 사유", placeholder: "예) 본인의 해외 체류로 직접 처리가 어려움", full: true },
      { key: "period", label: "위임 기간", type: "daterange", full: true },
    ],
  };
}

export const principalSignature: FormSignature[] = [{ role: "위임인", seal: true }];

export const commonAttachments: string[] = [
  "위임인 인감증명서 1부 (제출처가 요구하는 경우)",
  "위임인·수임인 신분증 사본",
];

// 모든 위임장 시트 공통값
export const POA_DOC_TITLE = "위 임 장";
export const POA_STATEMENT =
  "본인(위임인)은 아래 사람을 정당한 대리인(수임인)으로 정하고, 다음의 권한을 위임합니다.";
export const POA_TEMPLATE = "power-of-attorney";
