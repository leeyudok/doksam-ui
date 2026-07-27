import { TableSortableDemo } from "./table-sortable.demo.client"

export const demo = <TableSortableDemo />

export const code = `interface Task {
  id: string
  title: string
  owner: string
  status: "진행중" | "완료" | "대기"
  progress: number
}

const columns: ColumnDef<Task, unknown>[] = [
  { accessorKey: "title", header: "작업", enableHiding: false },
  { accessorKey: "owner", header: "담당자" },
  {
    accessorKey: "status",
    header: "상태",
    cell: ({ getValue }) => <Badge>{getValue<Task["status"]>()}</Badge>,
  },
  { accessorKey: "progress", header: "진행률" },
]

<TableSortable
  data={tasks}
  columns={columns}
  getRowId={(row) => row.id}
  onReorder={(next) => setTasks(next)}
/>`

export const dos = [
  "getRowId는 데이터의 안정적인 고유 키(DB PK 등)를 반환해야 한다 — index를 그대로 쓰면 드래그 중 행이 잘못 매칭된다.",
  "행 순서를 서버에 반영해야 하면 onReorder 콜백으로 재정렬된 배열을 받아 저장한다.",
  "숨길 수 없는 핵심 식별 컬럼(제목·이름 등)은 enableHiding: false로 컬럼 토글에서 제외한다.",
]

export const donts = [
  "정렬이 켜진 상태에서 행 드래그로 원본 순서를 바꾸지 않는다 — 정렬 해제 전까지 드래그 핸들이 비활성화되는 것은 의도된 동작이다.",
  "행이 아주 많을 때(수천 건) 가상 스크롤 없이 그대로 렌더링하지 않는다 — 페이지네이션이나 별도 가상화를 함께 적용한다.",
]
