import { ComboboxDemo } from "./combobox.demo.client"

export const demo = <ComboboxDemo />

export const code = `const FRAMEWORKS = ["Next.js", "Remix", "Astro", "SvelteKit", "Nuxt"]

<Combobox items={FRAMEWORKS} defaultValue="Next.js">
  <ComboboxInput placeholder="프레임워크 검색" />
  <ComboboxContent>
    <ComboboxEmpty>일치하는 결과가 없습니다.</ComboboxEmpty>
    <ComboboxList>
      {(item) => (
        <ComboboxItem key={item} value={item}>
          {item}
        </ComboboxItem>
      )}
    </ComboboxList>
  </ComboboxContent>
</Combobox>`

export const dos = [
  "선택지가 많아 스크롤이 필요한 목록에는 Select 대신 Combobox를 사용한다.",
  "일치 결과가 없을 때 ComboboxEmpty로 안내 문구를 반드시 보여준다.",
  "옵션이 10개 미만이면 Select가 더 가볍다 — 검색이 필요할 때만 Combobox를 쓴다.",
]

export const donts = [
  "itemToStringLabel 없이 객체 배열을 그대로 넘겨 입력창에 [object Object]가 보이게 하지 않는다.",
  "비동기 검색 결과 로딩 중에 빈 목록만 보여주고 로딩 상태를 생략하지 않는다.",
]
