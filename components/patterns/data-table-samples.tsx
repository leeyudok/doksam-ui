import type { PatternSampleData } from "@/components/showcase/pattern-sample"
import { DataTableDemo } from "@/components/patterns/data-table/data-table-demo"

export const DATA_TABLE_SAMPLES: PatternSampleData[] = [
  {
    num: 1,
    title: "행 선택 + 일괄 액션 + 페이지네이션",
    description:
      "table-sortable.tsx의 정렬 헤더 관례에 헤더/행 체크박스 선택과 하단 페이지네이션을 더한, 목록 화면에서 가장 자주 반복되는 데이터 테이블 조합입니다.",
    demo: <DataTableDemo />,
    code: `const table = useReactTable({
  data: orders,
  columns,
  state: { sorting },
  onSortingChange: setSorting,
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
})

const slice = paginate(sortedRows, page, PAGE_SIZE)          // 순수 함수 — 별도 단위 테스트
const headerState = pageSelectionState(slice.rows, getId, selection)  // "all" | "some" | "none"

<Checkbox
  checked={headerState === "all" ? true : headerState === "some" ? "indeterminate" : false}
  onCheckedChange={(checked) => setSelection(togglePageSelection(slice.rows, getId, selection, checked === true))}
/>

{selectedCount > 0 && (
  <div className="flex items-center gap-2">
    <span>{selectedCount}건 선택됨</span>
    <Button variant="outline" size="sm"><DownloadSimpleIcon />내보내기</Button>
    <Button variant="outline" size="sm" className="text-destructive"><TrashIcon />삭제</Button>
  </div>
)}`,
    notes: [
      "선택 상태는 id → boolean 맵(Record<string, boolean>)으로 관리해 정렬·페이지 이동과 무관하게 선택이 유지된다.",
      "헤더 체크박스는 페이지 단위로만 동작한다(pageSelectionState) — 전체 데이터가 아니라 현재 페이지 행 기준으로 all/some/none을 계산해 indeterminate 상태를 표시한다.",
      "선택 건수가 0을 넘는 순간에만 일괄 액션 바(내보내기·삭제)가 나타나고, 그 외에는 안내 텍스트로 자리를 대체해 레이아웃이 흔들리지 않는다.",
      "페이지 슬라이스(paginate)·선택 토글(toggleRowSelection/togglePageSelection) 로직은 lib/patterns/data-table/paginate.ts에 순수 함수로 분리해 렌더링과 독립적으로 단위 테스트한다.",
    ],
  },
]
