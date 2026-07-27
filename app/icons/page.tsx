import type { ComponentType } from "react";

import { TranslatedText } from "@/components/showcase/translated-text";
import { IconGallery } from "@/app/icons/_components/icon-gallery";
import {
  HeartIcon,
  StarIcon as PhosphorStarIcon,
  HouseIcon as PhosphorHouseIcon,
  MagnifyingGlassIcon as PhosphorMagnifyingGlassIcon,
  BellIcon as PhosphorBellIcon,
  GearIcon as PhosphorGearIcon,
  UserIcon as PhosphorUserIcon,
  TrashIcon as PhosphorTrashIcon,
} from "@phosphor-icons/react/dist/ssr";
import {
  Star as LucideStar,
  Home as LucideHome,
  Search as LucideSearch,
  Bell as LucideBell,
  Settings as LucideSettings,
  User as LucideUser,
  Heart as LucideHeart,
  Trash2 as LucideTrash2,
} from "lucide-react";
import {
  IconStar,
  IconHome,
  IconSearch,
  IconBell,
  IconSettings,
  IconUser,
  IconHeart,
  IconTrash,
} from "@tabler/icons-react";
import {
  HomeIcon as HeroHomeIcon,
  MagnifyingGlassIcon as HeroMagnifyingGlassIcon,
  BellIcon as HeroBellIcon,
  Cog6ToothIcon as HeroCog6ToothIcon,
  UserIcon as HeroUserIcon,
  StarIcon as HeroStarIcon,
  HeartIcon as HeroHeartIcon,
  TrashIcon as HeroTrashIcon,
} from "@heroicons/react/24/outline";
import {
  HomeIcon as RadixHomeIcon,
  MagnifyingGlassIcon as RadixMagnifyingGlassIcon,
  BellIcon as RadixBellIcon,
  GearIcon as RadixGearIcon,
  PersonIcon as RadixPersonIcon,
  StarIcon as RadixStarIcon,
  HeartIcon as RadixHeartIcon,
  TrashIcon as RadixTrashIcon,
} from "@radix-ui/react-icons";
import {
  Home as AkarHome,
  Search as AkarSearch,
  Bell as AkarBell,
  Gear as AkarGear,
  Person as AkarPerson,
  Star as AkarStar,
  Heart as AkarHeart,
  TrashCan as AkarTrashCan,
} from "akar-icons";

import { CopyButton } from "@/components/copy-button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface LibraryRow {
  name: string;
  role: string;
  rule: string;
}

const LIBRARY_ROWS: LibraryRow[] = [
  {
    name: "Phosphor (@phosphor-icons/react)",
    role: "기본",
    rule: "regular 기본, 강조/활성은 duotone·fill. 서버 컴포넌트는 /dist/ssr",
  },
  {
    name: "Lucide (lucide-react)",
    role: "shadcn 내장 공존",
    rule: "직접 쓸 땐 strokeWidth={1.5}로 Phosphor 굵기에 맞춤",
  },
  {
    name: "Tabler (@tabler/icons-react)",
    role: "백업",
    rule: "Phosphor에 없는 특수 아이콘만",
  },
];

const SIZES = [16, 20, 24] as const;

const CLIENT_IMPORT = `import { HeartIcon } from "@phosphor-icons/react";

export function LikeButton() {
  return <HeartIcon weight="regular" />;
}`;

const SERVER_IMPORT = `import { HeartIcon } from "@phosphor-icons/react/dist/ssr";

export function LikeIcon() {
  return <HeartIcon weight="regular" />;
}`;

function LibraryTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>라이브러리</TableHead>
          <TableHead>역할</TableHead>
          <TableHead>규칙</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {LIBRARY_ROWS.map((row) => (
          <TableRow key={row.name}>
            <TableCell className="font-medium">{row.name}</TableCell>
            <TableCell>
              <Badge variant="outline">{row.role}</Badge>
            </TableCell>
            <TableCell className="text-muted-foreground">{row.rule}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function LibraryComparison() {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-medium">라이브러리별 비교</h2>
        <p className="text-sm text-muted-foreground">
          같은 개념(별 아이콘)을 세 라이브러리로 그렸을 때의 굵기·형태 차이입니다.
        </p>
      </div>
      <div className="flex flex-wrap gap-4">
        <div className="flex flex-col items-center gap-2 rounded-lg border border-border p-4">
          <PhosphorStarIcon size={28} weight="regular" className="text-primary" />
          <code className="text-xs text-muted-foreground">Phosphor Star</code>
        </div>
        <div className="flex flex-col items-center gap-2 rounded-lg border border-border p-4">
          <LucideStar size={28} strokeWidth={1.5} className="text-primary" />
          <code className="text-xs text-muted-foreground">Lucide Star</code>
        </div>
        <div className="flex flex-col items-center gap-2 rounded-lg border border-border p-4">
          <IconStar size={28} stroke={1.5} className="text-primary" />
          <code className="text-xs text-muted-foreground">Tabler IconStar</code>
        </div>
      </div>
    </section>
  );
}

function SizeGuide() {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-medium">사이즈 가이드</h2>
        <p className="text-sm text-muted-foreground">
          16 · 20 · 24px 세 단계를 기준으로 컨텍스트에 맞게 고릅니다.
        </p>
      </div>
      <div className="flex flex-wrap items-end gap-4">
        {SIZES.map((size) => (
          <div
            key={size}
            className="flex flex-col items-center gap-2 rounded-lg border border-border p-4"
          >
            <PhosphorStarIcon size={size} weight="regular" className="text-primary" />
            <code className="text-xs text-muted-foreground">{size}px</code>
          </div>
        ))}
      </div>
    </section>
  );
}

function ImportExamples() {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-medium">import 예시</h2>
        <p className="text-sm text-muted-foreground">
          클라이언트 컴포넌트와 서버 컴포넌트에서 import 경로가 다릅니다.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="flex flex-col gap-2 rounded-lg border border-border p-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">클라이언트 컴포넌트</span>
            <CopyButton value={CLIENT_IMPORT} />
          </div>
          <pre className="overflow-x-auto rounded-md bg-muted p-3 text-xs">
            <code>{CLIENT_IMPORT}</code>
          </pre>
        </div>
        <div className="flex flex-col gap-2 rounded-lg border border-border p-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">서버 컴포넌트 (/dist/ssr)</span>
            <CopyButton value={SERVER_IMPORT} />
          </div>
          <pre className="overflow-x-auto rounded-md bg-muted p-3 text-xs">
            <code>{SERVER_IMPORT}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}

/** {@link CompareLibraryRow.icons}에 쓰는 아이콘 컴포넌트 타입 — className 만으로 사이즈를 통일한다. */
type CompareIconComponent = ComponentType<{ className?: string }>;

const COMPARE_ICON_LABELS = [
  "Home",
  "Search",
  "Bell",
  "Settings",
  "User",
  "Star",
  "Heart",
  "Trash",
] as const;

interface CompareLibraryRow {
  name: string;
  packageName: string;
  note: string;
  standard: boolean;
  icons: CompareIconComponent[];
}

const COMPARE_LIBRARIES: CompareLibraryRow[] = [
  {
    name: "Phosphor",
    packageName: "@phosphor-icons/react",
    note: "기본 표준 — regular 기본, 강조/활성은 duotone·fill.",
    standard: true,
    icons: [
      PhosphorHouseIcon,
      PhosphorMagnifyingGlassIcon,
      PhosphorBellIcon,
      PhosphorGearIcon,
      PhosphorUserIcon,
      PhosphorStarIcon,
      HeartIcon,
      PhosphorTrashIcon,
    ],
  },
  {
    name: "Lucide",
    packageName: "lucide-react",
    note: "shadcn/ui 내장 의존성 — 원본 컴포넌트 유지 목적으로 표준 허용.",
    standard: true,
    icons: [
      LucideHome,
      LucideSearch,
      LucideBell,
      LucideSettings,
      LucideUser,
      LucideStar,
      LucideHeart,
      LucideTrash2,
    ],
  },
  {
    name: "Tabler",
    packageName: "@tabler/icons-react",
    note: "4000+ 아이콘, IconX 네이밍 — Phosphor에 없는 아이콘의 백업 표준.",
    standard: true,
    icons: [IconHome, IconSearch, IconBell, IconSettings, IconUser, IconStar, IconHeart, IconTrash],
  },
  {
    name: "Heroicons",
    packageName: "@heroicons/react",
    note: "Tailwind 팀 제작. outline/solid 두 세트.",
    standard: false,
    icons: [
      HeroHomeIcon,
      HeroMagnifyingGlassIcon,
      HeroBellIcon,
      HeroCog6ToothIcon,
      HeroUserIcon,
      HeroStarIcon,
      HeroHeartIcon,
      HeroTrashIcon,
    ],
  },
  {
    name: "Radix Icons",
    packageName: "@radix-ui/react-icons",
    note: "15px 고정 그리드 — 다른 라이브러리와 시각 크기가 어긋나 표준에서 제외됨.",
    standard: false,
    icons: [
      RadixHomeIcon,
      RadixMagnifyingGlassIcon,
      RadixBellIcon,
      RadixGearIcon,
      RadixPersonIcon,
      RadixStarIcon,
      RadixHeartIcon,
      RadixTrashIcon,
    ],
  },
  {
    name: "Akar Icons",
    packageName: "akar-icons",
    note: "라운드·미니멀 스트로크 스타일.",
    standard: false,
    icons: [AkarHome, AkarSearch, AkarBell, AkarGear, AkarPerson, AkarStar, AkarHeart, AkarTrashCan],
  },
];

function CompareIconSample({
  label,
  icon: Icon,
}: {
  label: string;
  icon: CompareIconComponent;
}) {
  return (
    <div className="flex w-14 flex-col items-center gap-1">
      <Icon className="size-5" />
      <span className="text-[11px] text-muted-foreground">{label}</span>
    </div>
  );
}

function CompareLibraryCard({ library }: { library: CompareLibraryRow }) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border p-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium">{library.name}</span>
        <code className="text-xs text-muted-foreground">{library.packageName}</code>
        {!library.standard && <Badge variant="outline">표준 아님 — 비교 참고용</Badge>}
      </div>
      <p className="text-xs text-muted-foreground">{library.note}</p>
      <div className="flex flex-wrap gap-4">
        {library.icons.map((Icon, index) => (
          <CompareIconSample key={COMPARE_ICON_LABELS[index]} label={COMPARE_ICON_LABELS[index]} icon={Icon} />
        ))}
      </div>
    </div>
  );
}

function LibraryComparisonAll() {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-medium">라이브러리 비교 (참고)</h2>
        <p className="text-sm text-muted-foreground">
          Phosphor · Lucide · Tabler 표준 3종에 Heroicons · Radix Icons · Akar Icons를 더해
          같은 의미의 아이콘 8개(Home·Search·Bell·Settings·User·Star·Heart·Trash)로 나란히
          비교합니다. 뒤 3종은 표준이 아니라 비교 참고용입니다.
        </p>
      </div>
      <div className="flex flex-col gap-3">
        {COMPARE_LIBRARIES.map((library) => (
          <CompareLibraryCard key={library.name} library={library} />
        ))}
      </div>
    </section>
  );
}

export default function IconsPage() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <Badge variant="secondary" className="w-fit">
          Icons
        </Badge>
        <h1 className="text-2xl font-semibold tracking-tight">Icons</h1>
        <p className="max-w-prose text-sm text-muted-foreground">
          <TranslatedText k="page.icons.description" ko="Phosphor · Lucide · Tabler 3종 표준과 사용 규칙입니다. 이모지는 아이콘 대용으로 사용하지 않습니다." />
        </p>
      </div>
      <LibraryTable />
      <section className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-medium">
            <TranslatedText k="page.icons.gallery.title" ko="아이콘 검색" />
          </h2>
          <p className="text-sm text-muted-foreground">
            <TranslatedText
              k="page.icons.gallery.description"
              ko="Phosphor 큐레이션 250+종을 이름·한글 키워드로 검색합니다. weight·size 토글이 전체에 반영되고, 아이콘을 클릭하면 import 문이 복사됩니다."
            />
          </p>
        </div>
        <IconGallery />
      </section>
      <LibraryComparison />
      <SizeGuide />
      <ImportExamples />
      <LibraryComparisonAll />
    </div>
  );
}
