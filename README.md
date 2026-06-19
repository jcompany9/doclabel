# DocLabel — 일회성 서식 인쇄 도구 모음

검색량이 많은 "일회성 서식"(라벨, 차용증, 영수증 등)을 브라우저에서 바로 입력하고 A4로 인쇄/PDF 저장하는 정적 웹 도구 모음입니다. Astro로 빌드되며, 서식 하나를 추가하는 일이 곧 데이터 파일 하나를 추가하는 일이 되도록 설계되어 있습니다.

## 기술 스택

- **Astro** (정적 출력) — 라우트별 정적 HTML 생성, SEO·속도 최적화
- **@astrojs/sitemap** — 사이트맵 자동 생성
- 순수 CSS + 바닐라 JS 에디터 엔진 (프레임워크 런타임 없음)
- 배포: Vercel (Astro 자동 감지)

## 실행 방법

```bash
npm install
npm run dev      # 개발 서버 (http://localhost:4321)
npm run build    # dist/ 로 정적 빌드
npm run preview  # 빌드 결과 미리보기
```

## 폴더 구조

```
src/
  layouts/BaseLayout.astro    # head/메타/JSON-LD/GA/AdSense/공통 골격
  components/
    LabelSheet.astro          # 라벨 전용 A4 시트 + 편집 도구막대
    SeoContent.astro          # h1/소개/사용법/FAQ — 데이터에서 렌더
    AdSlot.astro              # screen-only 광고 슬롯 (AdSense ID 있을 때만)
    SiteFooter.astro          # 공통 푸터
  scripts/
    editor.js                 # 시트 편집 엔진 (입력 클램프/스타일/인쇄)
    analytics.js              # GA4 track() 헬퍼
    interactions.js           # 전역 이벤트(FAQ 펼침/개인정보 클릭) 추적
  data/
    site.ts                   # 사이트 전역 설정 + 서식 타입 정의
    forms/                    # 서식 데이터 (서식당 1파일) + 등록소
  pages/
    index.astro               # 홈 = 라벨 도구
    privacy.astro             # 개인정보처리방침
  styles/global.css           # 화면 UI + A4 실측(mm) + 인쇄 전용 스타일
public/                       # 정적 자산(파비콘/매니페스트/robots/검증파일)
```

## 새 서식 추가하기

1. `src/data/forms/<name>.ts` — 서식 데이터(SEO 메타/소개/사용법/FAQ) 작성
2. `src/data/forms/index.ts` 의 `forms` 배열에 등록 → 메타·구조화데이터·사이트맵·내부링크 자동 반영
3. 해당 서식의 A4 시트 컴포넌트(`<name>Sheet.astro`)와 레이아웃 CSS 작성
4. `src/pages/<slug>/index.astro` 에서 `BaseLayout + Sheet + SeoContent` 로 조립

## 메모

- 입력값은 서버로 전송되지 않고 브라우저 안에서만 처리됩니다.
- 광고(AdSense)는 `src/data/site.ts` 의 `adsenseClient` 가 비어 있으면 렌더되지 않습니다. 승인 후 ID만 넣으면 전 서식 FAQ 아래에 일괄 노출되며, 인쇄 출력에는 항상 숨겨집니다(`screen-only`).
- og:image(`public/og-image.png`, 1200×630)는 아직 파일이 없으므로 제작 후 추가하세요.
