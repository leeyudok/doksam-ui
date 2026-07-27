import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export const demo = (
  <Accordion type="single" collapsible defaultValue="shipping" className="w-full max-w-sm">
    <AccordionItem value="shipping">
      <AccordionTrigger>배송은 얼마나 걸리나요?</AccordionTrigger>
      <AccordionContent>
        일반적으로 결제 완료 후 2~3영업일 이내에 도착합니다. 도서산간 지역은 1~2일 추가될 수
        있습니다.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="refund">
      <AccordionTrigger>환불은 어떻게 진행되나요?</AccordionTrigger>
      <AccordionContent>
        상품 수령 후 7일 이내 신청 시 전액 환불됩니다. 마이페이지 &gt; 주문내역에서 신청할 수
        있습니다.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="exchange">
      <AccordionTrigger>교환도 가능한가요?</AccordionTrigger>
      <AccordionContent>
        사이즈·색상 교환은 재고가 있는 경우에만 가능하며, 고객센터로 문의해 주세요.
      </AccordionContent>
    </AccordionItem>
  </Accordion>
)

export const code = `<Accordion type="single" collapsible defaultValue="shipping">
  <AccordionItem value="shipping">
    <AccordionTrigger>배송은 얼마나 걸리나요?</AccordionTrigger>
    <AccordionContent>
      일반적으로 결제 완료 후 2~3영업일 이내에 도착합니다.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="refund">
    <AccordionTrigger>환불은 어떻게 진행되나요?</AccordionTrigger>
    <AccordionContent>
      상품 수령 후 7일 이내 신청 시 전액 환불됩니다.
    </AccordionContent>
  </AccordionItem>
</Accordion>`

export const dos = [
  "FAQ처럼 여러 섹션 중 일부만 훑어보는 콘텐츠에 사용한다.",
  "type='single'은 한 번에 하나만, type='multiple'은 동시에 여러 섹션을 펼칠 때 사용한다.",
]

export const donts = [
  "AccordionItem 3개 미만인 짧은 목록에는 굳이 접지 말고 그냥 다 펼쳐서 보여준다.",
  "AccordionTrigger 텍스트를 비워두거나 아이콘만 남겨 클릭 대상이 불명확하게 하지 않는다.",
]
