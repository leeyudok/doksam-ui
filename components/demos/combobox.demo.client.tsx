"use client"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"

const FRAMEWORKS = ["Next.js", "Remix", "Astro", "SvelteKit", "Nuxt"]

export function ComboboxDemo() {
  return (
  <Combobox items={FRAMEWORKS} defaultValue="Next.js">
    <ComboboxInput placeholder="프레임워크 검색" />
    <ComboboxContent>
      <ComboboxEmpty>일치하는 결과가 없습니다.</ComboboxEmpty>
      <ComboboxList>
        {(item: string) => (
          <ComboboxItem key={item} value={item}>
            {item}
          </ComboboxItem>
        )}
      </ComboboxList>
    </ComboboxContent>
  </Combobox>
)
}
