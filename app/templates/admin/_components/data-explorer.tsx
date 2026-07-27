"use client"

import { useMemo, useState } from "react"
import type { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
import { TableSortable } from "@/components/table-sortable"
import { cn } from "@/lib/utils"
import type { AdminUserRow, UserRole, UserStatus } from "../_data/users-data"
import { ADMIN_USERS, ROLE_LABEL, STATUS_LABEL, TEAM_FACETS } from "../_data/users-data"
import { TeamFacetedFilter } from "./team-faceted-filter"
import { USER_SEARCH_FILTER_DEFAULT, UserSearchFilter, type UserSearchFilterValue } from "./user-search-filter"

const STATUS_BADGE_VARIANT: Record<UserStatus, "default" | "secondary" | "destructive" | "outline"> = {
  active: "default",
  invited: "secondary",
  suspended: "destructive",
}

const ROLE_BADGE_VARIANT: Record<UserRole, "default" | "secondary" | "outline"> = {
  admin: "default",
  editor: "secondary",
  viewer: "outline",
}

const COLUMNS: ColumnDef<AdminUserRow, unknown>[] = [
  {
    accessorKey: "name",
    header: "이름",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium text-foreground">{row.original.name}</span>
        <span className="text-xs text-muted-foreground">{row.original.email}</span>
      </div>
    ),
  },
  {
    accessorKey: "role",
    header: "역할",
    cell: ({ row }) => (
      <Badge variant={ROLE_BADGE_VARIANT[row.original.role]}>{ROLE_LABEL[row.original.role]}</Badge>
    ),
  },
  {
    accessorKey: "status",
    header: "상태",
    cell: ({ row }) => (
      <Badge variant={STATUS_BADGE_VARIANT[row.original.status]}>{STATUS_LABEL[row.original.status]}</Badge>
    ),
  },
  {
    accessorKey: "team",
    header: "팀",
    cell: ({ row }) => <span className="text-muted-foreground">{row.original.team}</span>,
  },
  {
    accessorKey: "joinedAt",
    header: "가입일",
    cell: ({ row }) => <span className="tabular-nums text-muted-foreground">{row.original.joinedAt}</span>,
  },
]

const TEAM_KEY_BY_LABEL: Record<string, string> = Object.fromEntries(
  TEAM_FACETS.map((facet) => [facet.label, facet.key]),
)

/**
 * "데이터 관리" 페이지의 상호작용 오케스트레이터 — 검색/역할/상태 필터
 * (UserSearchFilter), 팀 칩 필터(TeamFacetedFilter), 정렬 가능한 테이블
 * (components/table-sortable.tsx)을 하나의 controlled state로 묶는다.
 */
export function DataExplorer() {
  const [filter, setFilter] = useState<UserSearchFilterValue>(USER_SEARCH_FILTER_DEFAULT)
  const [team, setTeam] = useState("")

  const teamFiltered = useMemo(
    () => (team ? ADMIN_USERS.filter((user) => TEAM_KEY_BY_LABEL[user.team] === team) : ADMIN_USERS),
    [team],
  )

  const teamCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const facet of TEAM_FACETS) {
      counts[facet.key] = ADMIN_USERS.filter((user) => TEAM_KEY_BY_LABEL[user.team] === facet.key).length
    }
    return counts
  }, [])

  const filteredRows = useMemo(() => {
    const search = filter.search.trim().toLowerCase()
    return teamFiltered.filter((user) => {
      if (filter.role !== "all" && user.role !== filter.role) return false
      if (filter.status !== "all" && user.status !== filter.status) return false
      if (search && !`${user.name} ${user.email}`.toLowerCase().includes(search)) return false
      return true
    })
  }, [teamFiltered, filter])

  return (
    <div className={cn("flex w-full flex-col gap-4")}>
      <UserSearchFilter value={filter} onChange={setFilter} />
      <TeamFacetedFilter
        groups={TEAM_FACETS}
        counts={teamCounts}
        totalCount={ADMIN_USERS.length}
        value={team}
        onChange={setTeam}
      />
      <TableSortable data={filteredRows} columns={COLUMNS} getRowId={(row) => row.id} maxBodyHeight="28rem" />
    </div>
  )
}
