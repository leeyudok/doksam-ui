"use client";

/** 지도·카토그램이 공유하는 시/도 1건의 값. */
export interface RegionDatum {
  /** 시/도 공식 명칭 — korea-map-paths.ts 의 region 과 일치해야 한다. */
  region: string;
  count: number;
}

export interface RegionStats {
  total: number;
  maxCount: number;
  minCount: number;
  /** count 내림차순 정렬본 — 툴팁 상위 랭킹 표시용. */
  ranked: RegionDatum[];
  rankOf: Map<string, number>;
}

export function buildRegionStats(regions: RegionDatum[]): RegionStats {
  const ranked = [...regions].sort((a, b) => b.count - a.count);
  return {
    total: regions.reduce((s, r) => s + r.count, 0),
    maxCount: ranked[0]?.count ?? 0,
    minCount: ranked[ranked.length - 1]?.count ?? 0,
    ranked,
    rankOf: new Map(ranked.map((r, i) => [r.region, i + 1])),
  };
}

export function regionShare(count: number, total: number): string {
  return total > 0 ? ((count / total) * 100).toFixed(1) : "0.0";
}

/**
 * 색 스케일 — 투명도 대신 oklch 단색 보간이라 지도가 이어진 색 면으로 보인다.
 * pow 0.45 는 특정 지역 쏠림(수도권 등)으로 중간·하위 색이 뭉개지는 것을 보정.
 * --map-low 는 RegionMap 루트가 primary·background 조합으로 파생 정의한다.
 */
export function regionFillColor(count: number, maxCount: number): string {
  const ratio = maxCount > 0 ? count / maxCount : 0;
  const t = Math.round((0.1 + Math.pow(ratio, 0.45) * 0.9) * 100);
  return `color-mix(in oklch, var(--primary) ${t}%, var(--map-low))`;
}

const TIP_OFFSET = 14;
const TOP_RANKS = 5;

interface RegionHoverTipProps {
  region: RegionDatum;
  stats: RegionStats;
  /** 툴팁 항목명 (예: "사업자", "가맹점"). */
  valueLabel: string;
  /** 값 단위 접미사 (예: "건", "곳"). */
  unit: string;
  /** 컨테이너 기준 커서 좌표 — 컨테이너를 넘치면 반대편으로 플립한다. */
  x: number;
  y: number;
  /** 컨테이너 크기 — 이벤트 핸들러에서 측정해 넘긴다(렌더 중 ref 접근 금지). */
  containerWidth: number;
  containerHeight: number;
}

/** 리치 툴팁 — 값·비중·순위 + 상위 5개 지역 랭킹 바. */
export function RegionHoverTip({
  region,
  stats,
  valueLabel,
  unit,
  x,
  y,
  containerWidth,
  containerHeight,
}: RegionHoverTipProps) {
  const rows = stats.ranked.slice(0, TOP_RANKS);
  if (!rows.some((r) => r.region === region.region)) {
    rows.push(region);
  }

  // 툴팁 크기 근사치로 플립 판정 — 실측 폭 재계산은 과한 리렌더.
  const approxW = 200;
  const approxH = 190;
  let left = x + TIP_OFFSET;
  let top = y + TIP_OFFSET;
  if (containerWidth > 0 && left + approxW > containerWidth) left = x - approxW - TIP_OFFSET;
  if (containerHeight > 0 && top + approxH > containerHeight) {
    top = Math.max(0, y - approxH - TIP_OFFSET);
  }

  return (
    <div
      role="tooltip"
      className="bg-popover text-popover-foreground pointer-events-none absolute z-10 min-w-44 rounded-md border p-3 text-xs shadow-md"
      style={{ left, top }}
    >
      <div className="mb-1 text-[13px] font-semibold">{region.region}</div>
      <TipRow label={valueLabel} value={`${region.count.toLocaleString()}${unit}`} />
      <TipRow label="비중" value={`${regionShare(region.count, stats.total)}%`} />
      <TipRow
        label="순위"
        value={`${stats.rankOf.get(region.region)}위 / ${stats.ranked.length}`}
      />
      <div className="bg-muted mt-2 h-1 overflow-hidden rounded-sm">
        <div
          className="bg-primary h-full"
          style={{ width: `${regionShare(region.count, stats.total)}%` }}
        />
      </div>
      <div className="mt-2 flex flex-col gap-1">
        {rows.map((r) => (
          <RankRow key={r.region} row={r} stats={stats} current={r.region === region.region} />
        ))}
      </div>
    </div>
  );
}

function TipRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-muted-foreground flex justify-between gap-4 tabular-nums">
      <span>{label}</span>
      <b className="text-popover-foreground font-semibold">{value}</b>
    </div>
  );
}

function RankRow({
  row,
  stats,
  current,
}: {
  row: RegionDatum;
  stats: RegionStats;
  current: boolean;
}) {
  return (
    <div
      className={`grid grid-cols-[4.5em_1fr_3.5em] items-center gap-1.5 text-[11px] tabular-nums ${
        current ? "text-popover-foreground font-semibold" : "text-muted-foreground"
      }`}
    >
      <span>{row.region.slice(0, 4)}</span>
      <span className="bg-muted h-1 overflow-hidden rounded-sm">
        <span
          className={`bg-primary block h-full ${current ? "" : "opacity-45"}`}
          style={{
            width: `${stats.maxCount > 0 ? (row.count / stats.maxCount) * 100 : 0}%`,
          }}
        />
      </span>
      <span className="text-right">{regionShare(row.count, stats.total)}%</span>
    </div>
  );
}
