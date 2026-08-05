import type { FormDef } from "../site";
import label from "./label";
import employmentCertificate from "./employment-certificate";
import { powerOfAttorneyForms } from "./power-of-attorney";
import resignation from "./resignation";
import incidentReport from "./incident-report";
import factConfirmation from "./fact-confirmation";

// 모든 서식 등록소. 새 서식을 추가하려면 데이터 파일을 만들고 여기에 등록하면
// 메타·구조화데이터·사이트맵·내부링크가 자동으로 따라옵니다.
export const forms: FormDef[] = [
  label,
  employmentCertificate,
  ...powerOfAttorneyForms,
  resignation,
  incidentReport,
  factConfirmation,
];

export const formsBySlug: Record<string, FormDef> = Object.fromEntries(
  forms.map((f) => [f.slug, f]),
);

export function getForm(slug: string): FormDef | undefined {
  return formsBySlug[slug];
}
