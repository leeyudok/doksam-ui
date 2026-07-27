import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { FAQ_ITEMS } from "@/app/templates/saas/_lib/data"

export function FaqSection() {
  return (
    <section className="flex flex-col gap-6">
      <div className="mx-auto flex max-w-xl flex-col items-center gap-2 text-center">
        <h2 className="text-2xl font-semibold tracking-tight">자주 묻는 질문</h2>
        <p className="text-sm text-muted-foreground">궁금한 점이 더 있다면 언제든 문의해주세요.</p>
      </div>

      <div className="mx-auto w-full max-w-2xl rounded-xl border border-border bg-card px-5">
        <Accordion type="single" collapsible>
          {FAQ_ITEMS.map((item, idx) => (
            <AccordionItem key={item.question} value={`faq-${idx}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
