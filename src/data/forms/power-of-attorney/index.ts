import type { FormDef } from "../../site";
import powerOfAttorney from "./hub";
import vehiclePoa from "./vehicle";
import realEstatePoa from "./real-estate";
import governmentPoa from "./government";
import businessPoa from "./business";

// 위임장 허브 + 변형 4종. 변형을 추가하려면 데이터 파일을 만들고 이 배열에 넣으면
// 라우트(getStaticPaths)·사이트맵·내부링크가 자동으로 따라옵니다.
export const powerOfAttorneyHub: FormDef = powerOfAttorney;

export const powerOfAttorneyVariants: FormDef[] = [
  vehiclePoa,
  realEstatePoa,
  governmentPoa,
  businessPoa,
];

export const powerOfAttorneyForms: FormDef[] = [
  powerOfAttorneyHub,
  ...powerOfAttorneyVariants,
];
