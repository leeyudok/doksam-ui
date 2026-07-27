import { CopyButton } from "@/components/copy-button";
import { Badge } from "@/components/ui/badge";
import { TranslatedText } from "@/components/showcase/translated-text";
import { RULES_MARKDOWN, RULES_SECTIONS } from "@/lib/rules-markdown";

export default function RulesPage() {
  return (
    <div className="flex max-w-3xl flex-col gap-10">
      <div className="flex flex-col gap-3">
        <Badge variant="secondary" className="w-fit">
          Rules
        </Badge>
        <h1 className="text-2xl font-semibold tracking-tight">Rules</h1>
        <p className="max-w-prose text-sm text-muted-foreground">
          <TranslatedText k="page.rules.description" ko="doksam 프로젝트에서 UI를 만들 때 지키는 규칙입니다. AI 에이전트에게는 이 페이지의 markdown 원문을 그대로 프롬프트에 붙여넣으면 됩니다." />
        </p>
      </div>

      <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-muted/40 p-4">
        <p className="text-sm text-muted-foreground">
          AI 프롬프트용 markdown 원문 전체를 복사합니다.
        </p>
        <CopyButton value={RULES_MARKDOWN} label="전체 markdown 복사" />
      </div>

      <div className="flex flex-col gap-6">
        {RULES_SECTIONS.map((section) => (
          <section key={section.title} className="flex flex-col gap-2">
            <h2 className="text-lg font-medium">{section.title}</h2>
            <ul className="flex flex-col gap-1.5 text-sm text-muted-foreground">
              {section.items.map((item) => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden="true">·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
