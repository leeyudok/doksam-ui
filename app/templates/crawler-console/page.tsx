import { Badge } from "@/components/ui/badge";
import { ScreenHelpDialog, type ScreenHelpItem } from "@/components/screen-help-dialog";

import { CrawlerConsole } from "./_components/crawler-console";

const HELP_ITEMS: ScreenHelpItem[] = [
  {
    title: "이 화면은 무엇인가요?",
    body: "여러 데이터 소스를 순회하며 원천 데이터를 갱신하는 크롤 파이프라인의 운영 콘솔입니다. 매일 04:00 자동 실행되며, 필요 시 수동으로 실행·중단할 수 있습니다.",
  },
  {
    title: "수집 파이프라인",
    body: "수집 → 갱신 → 감지 3단계로 진행됩니다. 상단 스텝플로우가 현재 진행 단계와 전체 진행률을, 우측 라이브 인디케이터가 스케줄러 상태를 보여줍니다.",
  },
  {
    title: "실행 이력",
    body: "각 실행의 시각·대상·방식(자동/수동)·갱신/실패 건수·결과를 최신순으로 보여줍니다. 실패가 있는 행은 옅게 강조되어 이상 실행을 바로 찾을 수 있습니다.",
  },
  {
    title: "수동 트리거",
    body: "대상 소스 코드를 줄바꿈·콤마로 구분해 입력하면 지정 대상만, 비워두면 전체 소스를 크롤합니다. 실행 중에는 입력·실행이 잠기고 중단 버튼이 활성화됩니다.",
  },
];

export default function CrawlerConsolePage() {
  return (
    <div className="mx-auto flex w-full max-w-[1300px] flex-col gap-6">
      <section className="flex flex-col gap-3">
        <Badge variant="secondary" className="w-fit">
          Crawler · 파이프라인 운영
        </Badge>
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
            데이터 파이프라인 운영 콘솔
          </h2>
          <ScreenHelpDialog
            title="크롤러 운영 콘솔 매뉴얼"
            description="데이터 파이프라인 운영 콘솔의 사용 방법입니다."
            items={HELP_ITEMS}
          />
        </div>
        <p className="max-w-prose text-sm leading-relaxed text-muted-foreground">
          수집 → 갱신 → 감지 파이프라인의 진행 상태와 실행 이력을 한눈에 확인하고, 필요 시
          수동으로 크롤을 실행·중단할 수 있는 관리자 콘솔입니다. 스케줄러는 매일 04:00 자동으로
          동작합니다.
        </p>
      </section>

      <CrawlerConsole />

      <footer className="rounded-lg border border-border bg-muted/40 px-4 py-3">
        <p className="text-[0.7rem] leading-relaxed text-muted-foreground">
          <span className="font-semibold text-foreground">가상 데이터 · 데모</span> — 실행 이력·
          대상·수치는 전부 가상으로 합성한 데모 데이터이며 실제 시스템·기업 데이터와 무관합니다.
          수동 트리거는 로컬 상태로만 동작하는 시뮬레이션입니다.
        </p>
      </footer>
    </div>
  );
}
