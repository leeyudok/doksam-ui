"use client";

import { useState } from "react";

import { RegionMap } from "@/components/patterns/dataviz/region-map";

// 시연용 실측 규모 데이터 (bizinfo 2026-07 시/도별 사업자 집계 스냅샷).
const SAMPLE_DATA = [
  { region: "서울특별시", count: 1072118 },
  { region: "경기도", count: 1313368 },
  { region: "인천광역시", count: 253830 },
  { region: "강원특별자치도", count: 128470 },
  { region: "충청북도", count: 118249 },
  { region: "충청남도", count: 161794 },
  { region: "세종특별자치시", count: 26089 },
  { region: "대전광역시", count: 123041 },
  { region: "전북특별자치도", count: 128483 },
  { region: "광주광역시", count: 100668 },
  { region: "전라남도", count: 117137 },
  { region: "대구광역시", count: 186065 },
  { region: "경상북도", count: 185628 },
  { region: "경상남도", count: 228334 },
  { region: "울산광역시", count: 68148 },
  { region: "부산광역시", count: 261055 },
  { region: "제주특별자치도", count: 66971 },
];

function RegionMapDemo() {
  const [selected, setSelected] = useState("");
  return (
    <div className="flex w-full max-w-xl flex-col gap-2">
      <RegionMap
        data={SAMPLE_DATA}
        valueLabel="사업자"
        unit="건"
        selectedRegion={selected}
        onRegionClick={(region) => setSelected((prev) => (prev === region ? "" : region))}
      />
      <p className="text-muted-foreground text-xs">
        선택 필터: {selected || "없음"} — 지역 클릭으로 토글 (같은 지역 재클릭 시 해제)
      </p>
    </div>
  );
}

export const demo = <RegionMapDemo />;

export const code = `import { RegionMap } from "@/components/patterns/dataviz/region-map";

<RegionMap
  data={[
    { region: "서울특별시", count: 1072118 },
    { region: "경기도", count: 1313368 },
    // ... 시/도 공식 명칭으로 17개
  ]}
  valueLabel="사업자"
  unit="건"
  selectedRegion={selected}
  onRegionClick={(region) =>
    setSelected((prev) => (prev === region ? "" : region))
  }
/>`;

export const dos = [
  "region 은 시/도 공식 명칭(\"서울특별시\", \"전북특별자치도\")으로 넘긴다 — 경계 path 와 이름으로 조인된다.",
  "값이 특정 지역에 쏠린 데이터(인구·사업자 등)는 카토그램 토글을 그대로 두고 사용자에게 두 시점을 모두 제공한다.",
  "지도 색은 primary 토큰에서 자동 파생된다 — 테마 프리셋을 바꾸면 함께 따라오므로 색을 직접 덮어쓰지 않는다.",
  "클릭 필터가 필요 없으면 onRegionClick 을 생략한다 — 표시 전용으로 동작하고 커서·role 도 자동 제거된다.",
];

export const donts = [
  "시/도보다 세밀한(시군구·읍면동) 데이터를 이 컴포넌트에 넣지 않는다 — 경계 path 가 17개 시/도 고정이다.",
  "지리 지도 하나만 보고 지역 간 규모를 판단하게 두지 않는다 — 면적 큰 지역이 과대평가된다(카토그램·툴팁 순위가 보완).",
  "count 에 비율(%)을 넣지 않는다 — 절대값을 넣어야 비중·순위·타일 면적이 올바르게 계산된다.",
];
