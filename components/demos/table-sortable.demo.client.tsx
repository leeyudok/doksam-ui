"use client"

import type { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
import { TableSortable } from "@/components/table-sortable"

interface Task {
  id: string
  title: string
  owner: string
  status: "진행중" | "완료" | "대기"
  progress: number
}

const TASKS: Task[] = [
  { id: "t-1", title: "정렬 헤더 구현", owner: "김서연", status: "완료", progress: 100 },
  { id: "t-2", title: "드래그 재정렬 연동", owner: "이도현", status: "진행중", progress: 60 },
  { id: "t-3", title: "컬럼 표시 토글", owner: "박지민", status: "진행중", progress: 40 },
  { id: "t-4", title: "폐쇄망 빌드 검증", owner: "최유나", status: "대기", progress: 0 },
]

const columns: ColumnDef<Task, unknown>[] = [
  {
    accessorKey: "title",
    header: "작업",
    enableHiding: false,
  },
  {
    accessorKey: "owner",
    header: "담당자",
  },
  {
    accessorKey: "status",
    header: "상태",
    cell: ({ getValue }) => {
      const status = getValue<Task["status"]>()
      return (
        <Badge variant={status === "완료" ? "default" : status === "진행중" ? "secondary" : "outline"}>
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "progress",
    header: "진행률",
    cell: ({ getValue }) => <span className="tabular-nums">{getValue<number>()}%</span>,
  },
]

export function TableSortableDemo() {
  return <TableSortable data={TASKS} columns={columns} getRowId={(row) => row.id} maxBodyHeight="16rem" />
}
