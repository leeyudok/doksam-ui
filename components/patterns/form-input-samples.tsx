import { CloudArrowUpIcon } from "@phosphor-icons/react/dist/ssr"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { PatternSampleData } from "@/components/showcase/pattern-sample"
import { SearchFilterDemoPreview } from "@/components/patterns/form-input/search-filter-demo"

const UPLOADS = [
  { name: "data_20260408.json", pct: 100, status: "완료" as const },
  { name: "users_backup.csv", pct: 65, status: "진행중" as const },
  { name: "report.xlsx", pct: 0, status: "실패" as const },
]

function uploadBadgeVariant(status: (typeof UPLOADS)[number]["status"]): "default" | "secondary" | "destructive" {
  if (status === "완료") return "default"
  if (status === "진행중") return "secondary"
  return "destructive"
}

export const FORM_INPUT_SAMPLES: PatternSampleData[] = [
  {
    num: 1,
    title: "기본 폼",
    description: "Input + Select + Button 조합으로 만드는 등록/수정 폼입니다.",
    demo: (
      <div className="w-full rounded-md border bg-muted/30 p-4">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <div className="space-y-1">
            <Label htmlFor="pattern-form-name" className="text-[10px]">
              이름
            </Label>
            <Input id="pattern-form-name" placeholder="홍길동" className="h-8 text-xs" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="pattern-form-email" className="text-[10px]">
              이메일
            </Label>
            <Input id="pattern-form-email" type="email" placeholder="user@example.com" className="h-8 text-xs" />
          </div>
          <div className="space-y-1">
            <Label className="text-[10px]">부서</Label>
            <Select>
              <SelectTrigger className="h-8 text-xs">
                <SelectValue placeholder="선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dev">개발팀</SelectItem>
                <SelectItem value="design">디자인팀</SelectItem>
                <SelectItem value="plan">기획팀</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label className="text-[10px]">직위</Label>
            <Select>
              <SelectTrigger className="h-8 text-xs">
                <SelectValue placeholder="선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="staff">사원</SelectItem>
                <SelectItem value="senior">대리</SelectItem>
                <SelectItem value="manager">과장</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="mt-3 flex justify-end gap-2">
          <Button size="sm" variant="outline">
            취소
          </Button>
          <Button size="sm">저장</Button>
        </div>
      </div>
    ),
    code: `<div className="rounded-md border bg-muted/30 p-4">
  <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
    <div className="space-y-1">
      <Label htmlFor="name" className="text-[10px]">이름</Label>
      <Input id="name" placeholder="홍길동" className="h-8 text-xs" />
    </div>
    {/* ... */}
  </div>
  <div className="mt-3 flex justify-end gap-2">
    <Button size="sm" variant="outline">취소</Button>
    <Button size="sm">저장</Button>
  </div>
</div>`,
    notes: [
      "폼 영역은 rounded-md border p-4 bg-muted/30 으로 감싸 본문과 구분한다.",
      "필드 그리드는 grid grid-cols-2 md:grid-cols-4 gap-3, Input 높이는 h-8 text-xs가 기본값이다.",
      "Label은 htmlFor로 대응 Input/Select와 연결해 접근성을 확보한다.",
    ],
  },
  {
    num: 2,
    title: "검색 + 필터",
    description: "검색어 입력 + 필터 드롭다운 조합으로 목록 상단에 두는 검색바입니다.",
    demo: <SearchFilterDemoPreview />,
    code: `interface SearchFilterValue {
  search: string
  status: "all" | "active" | "inactive"
  sort: "newest" | "oldest" | "name"
}

// 상태를 컴포넌트가 소유하지 않고 value/onChange로 부모가 소유하는 controlled 컴포넌트다.
function SearchFilterDemo({ value, onChange, onReset }: {
  value: SearchFilterValue
  onChange: (value: SearchFilterValue) => void
  onReset?: () => void
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Input value={value.search} onChange={(e) => onChange({ ...value, search: e.target.value })} className="h-8 pl-8 text-xs" />
      <Select value={value.status} onValueChange={(status) => onChange({ ...value, status })}>{/* 상태 필터 */}</Select>
      <Select value={value.sort} onValueChange={(sort) => onChange({ ...value, sort })}>{/* 정렬 필터 */}</Select>
      <Button size="sm" variant="outline" onClick={() => (onReset ? onReset() : onChange(SEARCH_FILTER_DEFAULT))}>초기화</Button>
      <Button size="sm">검색</Button>
    </div>
  )
}`,
    notes: [
      "검색어·상태·정렬을 하나의 value 객체로 묶고 controlled props(value/onChange)로 노출해, 부모가 서버 재조회·URL 동기화 등 실제 부수효과를 붙일 수 있게 한다.",
      "onReset을 생략하면 컴포넌트가 SEARCH_FILTER_DEFAULT로 되돌리는 기본 동작을 제공한다 — 부모는 필요할 때만 오버라이드한다.",
      "필터는 2개 이내로 제한하고, 그 이상이면 별도 필터 패널/다이얼로그로 분리한다.",
      "실시간 검색이 필요하면 300ms 안팎의 debounce를 onChange 호출 쪽에 적용해 과도한 요청을 막는다.",
    ],
  },
  {
    num: 3,
    title: "다이얼로그 폼",
    description: "Dialog 안에 폼을 담아 목록 화면에서 바로 등록/삭제 확인을 처리합니다.",
    demo: (
      <div className="flex gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm">등록 다이얼로그</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>새 항목 등록</DialogTitle>
              <DialogDescription>필요한 정보를 입력하고 저장 버튼을 클릭하세요.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-3 py-3">
              <div className="space-y-1">
                <Label htmlFor="pattern-dialog-name" className="text-[10px]">
                  이름
                </Label>
                <Input id="pattern-dialog-name" placeholder="항목 이름" className="h-8 text-xs" />
              </div>
              <div className="space-y-1">
                <Label className="text-[10px]">카테고리</Label>
                <Select>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue placeholder="선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="a">카테고리 A</SelectItem>
                    <SelectItem value="b">카테고리 B</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button size="sm" variant="outline">
                취소
              </Button>
              <Button size="sm">저장</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" variant="destructive">
              삭제 확인
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[400px]">
            <DialogHeader>
              <DialogTitle>삭제 확인</DialogTitle>
              <DialogDescription>이 작업은 되돌릴 수 없습니다. 정말 삭제하시겠습니까?</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button size="sm" variant="outline">
                취소
              </Button>
              <Button size="sm" variant="destructive">
                삭제
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    ),
    code: `<Dialog>
  <DialogTrigger asChild>
    <Button size="sm">등록 다이얼로그</Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>새 항목 등록</DialogTitle>
      <DialogDescription>필요한 정보를 입력하고 저장 버튼을 클릭하세요.</DialogDescription>
    </DialogHeader>
    <div className="grid gap-3 py-3">{/* 필드 */}</div>
    <DialogFooter>
      <Button size="sm" variant="outline">취소</Button>
      <Button size="sm">저장</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
    notes: [
      "등록처럼 필드가 적은 폼은 별도 페이지 대신 Dialog로 처리해 목록 컨텍스트를 유지한다.",
      "삭제 등 파괴적 액션 확인은 AlertDialog 대신 Dialog + variant='destructive' 버튼으로도 충분하다.",
      "Dialog 너비는 sm:max-w-[400~425px] 범위가 폼 다이얼로그의 기본값이다.",
    ],
  },
  {
    num: 4,
    title: "파일 업로드",
    description: "드래그앤드롭 영역 + 업로드 진행 상태 리스트 조합입니다.",
    demo: (
      <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2">
        <div className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border p-6 text-center transition-colors hover:border-primary/50">
          <CloudArrowUpIcon size={24} weight="regular" className="text-muted-foreground" />
          <p className="text-xs font-medium">파일을 드래그하거나 클릭해서 업로드</p>
          <p className="text-[10px] text-muted-foreground">JSON, CSV (최대 10MB)</p>
        </div>
        <div className="space-y-2">
          <p className="text-[11px] font-bold">업로드 진행</p>
          {UPLOADS.map((file) => (
            <div key={file.name} className="space-y-1 rounded border p-2">
              <div className="flex items-center justify-between">
                <span className="max-w-[180px] truncate text-xs font-medium">{file.name}</span>
                <Badge variant={uploadBadgeVariant(file.status)} className="px-1.5 py-0 text-[9px]">
                  {file.status}
                </Badge>
              </div>
              <Progress value={file.pct} className="h-1.5" />
            </div>
          ))}
        </div>
      </div>
    ),
    code: `<div className="rounded-lg border-2 border-dashed border-border p-6 text-center hover:border-primary/50">
  <CloudArrowUpIcon size={24} className="text-muted-foreground" />
  <p className="text-xs font-medium">파일을 드래그하거나 클릭해서 업로드</p>
  <p className="text-[10px] text-muted-foreground">JSON, CSV (최대 10MB)</p>
</div>

<div className="space-y-1 rounded border p-2">
  <div className="flex items-center justify-between">
    <span className="text-xs font-medium">{file.name}</span>
    <Badge variant={statusVariant}>{file.status}</Badge>
  </div>
  <Progress value={file.pct} className="h-1.5" />
</div>`,
    notes: [
      "드래그 영역은 border-2 border-dashed, 호버 시 border-primary/50 로 시각 피드백을 준다.",
      "업로드 진행률은 shadcn Progress로 표준화하고, 완료/진행중/실패를 Badge variant로 구분한다.",
      "허용 파일 형식·최대 크기를 드롭존 안내 문구에 명시한다.",
    ],
  },
]
