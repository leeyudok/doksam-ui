import { TableToggleDemo } from "./table-toggle.demo.client"

export const demo = <TableToggleDemo />

export const code = `interface Source {
  id: string
  name: string
  domain: string
  enabled: boolean
}

const columns: TableToggleColumn<Source>[] = [
  { header: "소스", cell: (row) => row.name },
  { header: "도메인", cell: (row) => row.domain },
]

async function handleToggle(row: Source, nextEnabled: boolean) {
  await fetch(\`/api/sources/\${row.id}\`, {
    method: "PATCH",
    body: JSON.stringify({ enabled: nextEnabled }),
  })
}

<TableToggle
  data={sources}
  getRowId={(row) => row.id}
  getEnabled={(row) => row.enabled}
  getRowLabel={(row) => row.name}
  onToggle={handleToggle}
  columns={columns}
/>`

export const dos = [
  "onToggle이 reject되면 에러를 삼키지 말고 그대로 throw한다 — 컴포넌트가 롤백과 사유 표시를 처리한다.",
  "getRowId는 데이터의 안정적인 고유 키(DB PK 등)를 반환해야 한다.",
  "부모가 refetch로 새 data를 내려줄 때, 진행 중이 아닌 행은 그대로 새 값을 반영하므로 별도 동기화 로직이 필요 없다.",
]

export const donts = [
  "onToggle 내부에서 실패를 catch해 조용히 무시하지 않는다 — 사용자가 실패를 알 수 없게 된다.",
  "행마다 다른 로딩 컴포넌트를 별도로 두지 않는다 — 진행 중인 행의 Switch가 disabled되는 것으로 충분하다.",
]
