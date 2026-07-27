"use client";

import { useRef, useState, type MouseEvent } from "react";

import { Button } from "@/components/ui/button";

import {
  KOREA_MAP_INSET,
  KOREA_MAP_PATHS,
  KOREA_MAP_VIEWBOX,
  type KoreaMapInset,
} from "./korea-map-paths";
import { RegionCartogram } from "./cartogram";
import {
  RegionHoverTip,
  buildRegionStats,
  regionFillColor,
  type RegionDatum,
  type RegionStats,
} from "./shared";

// 3D 돌출 — 바닥(0,0)→윗면(EXTRUDE_X,Y) 사이를 레이어로 채워 한몸 프리즘으로 보이게.
const EXTRUDE_X = -4;
const EXTRUDE_Y = -8;
const EXTRUDE_STEPS = 8;

// 범례 숫자 축약 (131만·2.6만) — 값 규모가 달라도 같은 포맷으로 통일.
const COMPACT = new Intl.NumberFormat("ko", { notation: "compact" });

/**
 * hover 강조에 쓰는 파생 색 2종 — 테마 프리셋에 새 토큰을 요구하지 않도록
 * primary·background·foreground 조합으로 루트에서 정의한다(모든 프리셋 자동 대응).
 * --map-low: 색 스케일 하한(옅은 틴트) / --map-side: 3D 돌출 측면(어두운 면).
 */
const DERIVED_TOKEN_CLASS = [
  "[--map-low:color-mix(in_oklch,var(--primary)_15%,var(--background))]",
  "[--map-side:color-mix(in_oklch,var(--primary)_55%,var(--foreground))]",
  "dark:[--map-side:color-mix(in_oklch,var(--primary)_60%,var(--background))]",
].join(" ");

export type RegionMapView = "geo" | "carto";

export interface RegionMapProps {
  /** 시/도별 값 — region 은 공식 명칭("서울특별시" 등)과 일치해야 한다. */
  data: RegionDatum[];
  /** 툴팁·aria 에 쓰는 값 이름 (예: "사업자", "가맹점"). */
  valueLabel?: string;
  /** 값 단위 접미사 (예: "건", "곳"). */
  unit?: string;
  /** 클릭 필터 연동 — 미지정 시 표시 전용으로 동작한다. */
  selectedRegion?: string;
  onRegionClick?: (region: string) => void;
  defaultView?: RegionMapView;
}

/**
 * 한국 시/도 분포 지도 (bizinfo #233 이식, #56).
 *
 * 지리 지도(디폴트) ↔ 타일 카토그램 토글. hover 시 지역이 3D 프리즘으로
 * 돌출하고 리치 툴팁(값·비중·순위·상위 5 랭킹 바)이 따라붙는다.
 * 카토그램은 타일 면적이 값에 비례해 지리 면적 왜곡을 보완한다.
 */
export function RegionMap({
  data,
  valueLabel = "값",
  unit = "",
  selectedRegion = "",
  onRegionClick,
  defaultView = "geo",
}: RegionMapProps) {
  const [view, setView] = useState<RegionMapView>(defaultView);

  if (data.length === 0) {
    return (
      <div className="text-muted-foreground flex h-64 items-center justify-center text-sm">
        표시할 지역 데이터가 없습니다.
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-3 ${DERIVED_TOKEN_CLASS}`}>
      <div className="flex justify-end gap-1">
        {(
          [
            { key: "geo", label: "지리 지도" },
            { key: "carto", label: "카토그램" },
          ] as const
        ).map((v) => (
          <Button
            key={v.key}
            type="button"
            size="xs"
            variant={view === v.key ? "default" : "outline"}
            onClick={() => setView(v.key)}
          >
            {v.label}
          </Button>
        ))}
      </div>

      {view === "geo" ? (
        <GeoMapView
          data={data}
          valueLabel={valueLabel}
          unit={unit}
          selectedRegion={selectedRegion}
          onRegionClick={onRegionClick}
        />
      ) : (
        <RegionCartogram
          data={data}
          valueLabel={valueLabel}
          unit={unit}
          selectedRegion={selectedRegion}
          onRegionClick={onRegionClick}
        />
      )}
    </div>
  );
}

interface GeoMapViewProps {
  data: RegionDatum[];
  valueLabel: string;
  unit: string;
  selectedRegion: string;
  onRegionClick?: (region: string) => void;
}

function GeoMapView({ data, valueLabel, unit, selectedRegion, onRegionClick }: GeoMapViewProps) {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [tipPos, setTipPos] = useState({ x: 0, y: 0, w: 0, h: 0 });

  const stats = buildRegionStats(data);
  const countByRegion = new Map(data.map((r) => [r.region, r.count]));
  const regions = KOREA_MAP_PATHS.map((p) => ({
    region: p.region,
    d: p.d,
    count: countByRegion.get(p.region) ?? 0,
  }));

  function handleMove(e: MouseEvent) {
    const box = boxRef.current;
    if (!box) return;
    const b = box.getBoundingClientRect();
    setTipPos({ x: e.clientX - b.left, y: e.clientY - b.top, w: b.width, h: b.height });
  }

  // hover 지역은 SVG 마지막에 그려 돌출·측면이 이웃에 가리지 않게 한다.
  const hoveredRegion = regions.find((r) => r.region === hovered);
  const extrudeLayers = hoveredRegion
    ? Array.from({ length: EXTRUDE_STEPS + 1 }, (_, i) => ({
        key: i,
        x: (EXTRUDE_X * i) / EXTRUDE_STEPS,
        y: (EXTRUDE_Y * i) / EXTRUDE_STEPS,
      }))
    : [];

  return (
    <div className="flex flex-col items-center gap-3">
      <div ref={boxRef} className="relative w-full max-w-md self-center">
        <svg
          viewBox={KOREA_MAP_VIEWBOX}
          className="h-auto w-full overflow-visible"
          role="img"
          aria-label={`시/도별 ${valueLabel} 분포 지도`}
        >
          {regions
            .filter((r) => r.region !== hovered)
            .map((r) => (
              <RegionPath
                key={r.region}
                region={r}
                stats={stats}
                dimmed={hovered !== null}
                hovered={false}
                selected={selectedRegion === r.region}
                unit={unit}
                onRegionClick={onRegionClick}
                onHover={setHovered}
                onMove={handleMove}
              />
            ))}
          <MapInsetGroup
            inset={KOREA_MAP_INSET}
            regions={regions}
            stats={stats}
            hovered={hovered}
            onRegionClick={onRegionClick}
            onHover={setHovered}
            onMove={handleMove}
          />
          {hoveredRegion && (
            <>
              {extrudeLayers.map((l) => (
                <path
                  key={l.key}
                  d={hoveredRegion.d}
                  className="pointer-events-none"
                  style={{ fill: "var(--map-side)", stroke: "var(--map-side)" }}
                  strokeWidth={0.8}
                  strokeLinejoin="round"
                  transform={`translate(${l.x}, ${l.y})`}
                />
              ))}
              <RegionPath
                region={hoveredRegion}
                stats={stats}
                dimmed={false}
                hovered
                selected={selectedRegion === hoveredRegion.region}
                unit={unit}
                onRegionClick={onRegionClick}
                onHover={setHovered}
                onMove={handleMove}
              />
            </>
          )}
        </svg>
        {hoveredRegion && (
          <RegionHoverTip
            region={hoveredRegion}
            stats={stats}
            valueLabel={valueLabel}
            unit={unit}
            x={tipPos.x}
            y={tipPos.y}
            containerWidth={tipPos.w}
            containerHeight={tipPos.h}
          />
        )}
      </div>
      <div className="text-muted-foreground flex items-center gap-2 text-xs tabular-nums">
        <span>{COMPACT.format(stats.minCount)}</span>
        <div
          className="h-3 w-28 rounded"
          style={{
            background: "linear-gradient(to right, var(--map-low), var(--primary))",
          }}
        />
        <span>{COMPACT.format(stats.maxCount)}</span>
      </div>
      <p className="text-muted-foreground text-xs">
        색 농도 = {valueLabel}(√ 보정) · 경계는 단순화된 개략 형상
      </p>
    </div>
  );
}

interface RegionPathProps {
  region: RegionDatum & { d: string };
  stats: RegionStats;
  dimmed: boolean;
  hovered: boolean;
  selected: boolean;
  unit: string;
  onRegionClick?: (region: string) => void;
  onHover: (region: string | null) => void;
  onMove: (e: MouseEvent) => void;
}

function RegionPath({
  region,
  stats,
  dimmed,
  hovered,
  selected,
  unit,
  onRegionClick,
  onHover,
  onMove,
}: RegionPathProps) {
  return (
    <path
      d={region.d}
      data-region={region.region}
      data-count={region.count}
      style={{
        fill: regionFillColor(region.count, stats.maxCount),
        stroke: hovered ? "var(--map-side)" : "var(--card)",
        cursor: onRegionClick ? "pointer" : undefined,
        transition: "filter 150ms, transform 150ms",
        transformBox: "fill-box",
        transformOrigin: "center",
        transform: hovered ? `translate(${EXTRUDE_X}px, ${EXTRUDE_Y}px)` : undefined,
        filter: pathFilter(hovered, dimmed),
      }}
      strokeWidth={pathStrokeWidth(selected, hovered)}
      strokeLinejoin="round"
      strokeLinecap="round"
      role={onRegionClick ? "button" : undefined}
      tabIndex={onRegionClick ? 0 : undefined}
      aria-label={`${region.region} ${region.count.toLocaleString()}${unit}${selected ? " (선택됨)" : ""}`}
      aria-pressed={onRegionClick ? selected : undefined}
      onClick={onRegionClick ? () => onRegionClick(region.region) : undefined}
      onKeyDown={
        onRegionClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onRegionClick(region.region);
              }
            }
          : undefined
      }
      onMouseEnter={() => onHover(region.region)}
      onMouseLeave={() => onHover(null)}
      onMouseMove={onMove}
      onFocus={() => onHover(region.region)}
      onBlur={() => onHover(null)}
    />
  );
}

function pathFilter(hovered: boolean, dimmed: boolean): string | undefined {
  if (hovered) return "brightness(1.1) saturate(1.15)";
  if (dimmed) return "saturate(0.55) brightness(1.04) opacity(0.75)";
  return undefined;
}

function pathStrokeWidth(selected: boolean, hovered: boolean): number {
  if (selected) return 2;
  return hovered ? 0.8 : 0.6;
}

interface MapInsetGroupProps {
  inset: KoreaMapInset;
  regions: Array<RegionDatum & { d: string }>;
  stats: RegionStats;
  hovered: string | null;
  onRegionClick?: (region: string) => void;
  onHover: (region: string | null) => void;
  onMove: (e: MouseEvent) => void;
}

/** 울릉도·독도 인셋(#58) — hover/클릭은 parent(경상북도)로 연동한다. */
function MapInsetGroup({
  inset,
  regions,
  stats,
  hovered,
  onRegionClick,
  onHover,
  onMove,
}: MapInsetGroupProps) {
  const parent = regions.find((r) => r.region === inset.parent);
  const fill = parent
    ? regionFillColor(parent.count, stats.maxCount)
    : "var(--map-low)";
  const dimmed = hovered !== null && hovered !== inset.parent;

  return (
    <g>
      <rect
        x={inset.box.x}
        y={inset.box.y}
        width={inset.box.w}
        height={inset.box.h}
        rx={6}
        style={{
          fill: "color-mix(in oklch, var(--card) 55%, transparent)",
          stroke: "var(--muted-foreground)",
          strokeWidth: 0.8,
          strokeDasharray: "4 3",
        }}
      />
      <text
        x={inset.box.x + inset.box.w - 8}
        y={inset.box.y + 14}
        textAnchor="end"
        className="text-[10px] tracking-widest"
        style={{ fill: "var(--muted-foreground)" }}
      >
        {inset.seaLabel}
      </text>
      {inset.islands.map((island) => (
        <g key={island.name}>
          <path
            d={island.d}
            style={{
              fill,
              stroke: "var(--card)",
              strokeWidth: 0.6,
              strokeLinejoin: "round",
              cursor: onRegionClick ? "pointer" : undefined,
              transition: "filter 150ms",
              filter: dimmed
                ? "saturate(0.55) brightness(1.04) opacity(0.75)"
                : undefined,
            }}
            aria-label={`${island.name} (${inset.parent})`}
            onClick={
              onRegionClick ? () => onRegionClick(inset.parent) : undefined
            }
            onMouseEnter={() => onHover(inset.parent)}
            onMouseLeave={() => onHover(null)}
            onMouseMove={onMove}
          />
          <text
            x={island.labelX}
            y={island.labelY}
            textAnchor="middle"
            className="pointer-events-none text-[10.5px]"
            style={{ fill: "var(--muted-foreground)" }}
          >
            {island.name}
          </text>
        </g>
      ))}
    </g>
  );
}
