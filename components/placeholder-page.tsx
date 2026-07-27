import { ClockCountdownIcon } from "@phosphor-icons/react/dist/ssr";

interface PlaceholderPageProps {
  title: string;
  description: string;
}

/**
 * /tokens · /icons · /components · /rules 가 콘텐츠 준비 전까지 공유하는
 * placeholder. 실제 콘텐츠가 들어오면 각 app/<route>/page.tsx 에서 이
 * 컴포넌트 사용을 걷어내면 된다.
 */
export function PlaceholderPage({ title, description }: Readonly<PlaceholderPageProps>) {
  return (
    <div className="flex flex-col items-start gap-3">
      <div className="flex items-center gap-2 text-muted-foreground">
        <ClockCountdownIcon size={20} weight="regular" />
        <span className="text-sm">준비 중</span>
      </div>
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      <p className="max-w-prose text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
