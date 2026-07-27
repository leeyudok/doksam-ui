# Vision Gate (수동/온디맨드)

Vision gate — 결정론 게이트(E2E/불변식, A·B영역)로 잡을 수 없는
"진짜 시각 판정"만 Claude 비전 API에 위임하는 수동 게이트. **CI에는 포함되지 않는다.**

## 무엇을 하나

1. Playwright(chromium)로 `rubric.mjs`에 정의된 페이지들을 풀페이지 스크린샷.
2. 각 스크린샷을 페이지별 루브릭과 함께 Claude 비전 API로 전송해 구조화 출력(JSON)으로 채점.
3. 결과를 콘솔에 요약 출력 + `vision-report.json`으로 저장. `fail` 판정이 하나라도 있으면 `exit 1`.

## 루브릭

모든 페이지에 공통 적용 (`rubric.mjs`의 `RUBRIC_CRITERIA`):

- (a) 텍스트 겹침/잘림 없나
- (b) 주요 요소(내비·제목·CTA) 보이나
- (c) 레이아웃 깨짐/요소 이탈 없나
- (d) 색/대비 이상 없나
- (e) 페이지 의도에 부합하나 (`rubric.mjs`의 `PAGES[].intent`)

페이지별 verdict는 `pass` / `warn` / `fail` 세 단계. `fail`만 게이트를 막는다.

## 대상 페이지

`rubric.mjs`의 `PAGES` 배열 참고. 비용 의식 때문에 **10개로 제한**했다 — 홈 +
주요 카탈로그 페이지(tokens/icons/components/patterns/rules/profiles) + 템플릿
샘플 3종(admin/brokerage/shop). 전체 템플릿 7종을 다 넣으면 예산 상한을
넘어가므로, 대표성 있는 3종만 우선 커버했다. 페이지 추가/변경은 `rubric.mjs`
편집만으로 가능.

## 사용법

```sh
# ANTHROPIC_API_KEY 필요 (하드코딩 금지 — env로만 주입)
ANTHROPIC_API_KEY=sk-ant-... pnpm test:vision

# 로컬 dev 서버 대상으로 실행하고 싶으면
VISION_BASE_URL=http://localhost:3000 ANTHROPIC_API_KEY=sk-ant-... pnpm test:vision
```

`VISION_BASE_URL` 기본값은 `https://ui.doksam.com`.

### `ANTHROPIC_API_KEY` 없이 실행하면

스크립트는 에러 대신 **dry-run**으로 동작한다 — chromium을 띄워 스크린샷은
실제로 찍고 각 페이지에 대해 Claude로 보낼 프롬프트를 조립해 콘솔에
출력하지만, 실제 API 호출은 하지 않는다. 스크린샷/프롬프트 조립 경로를
API 비용 없이 검증할 때 사용.

## 출력

- 콘솔: 페이지별 verdict(PASS/WARN/FAIL) + 발견된 issue 개수, 마지막에
  pass/warn/fail 집계.
- `vision-report.json` (이 디렉터리에 생성, git 미추적): 페이지별 전체 결과
  (`{page, verdict, issues, url, consoleErrors}`).
- `__screenshots__/*.jpg` (이 디렉터리에 생성, git 미추적): 실행 시 찍은
  스크린샷. jpeg quality 60으로 저장해 비전 토큰 비용을 낮춘다.

## 비용 소견

- 페이지 10개 × 이미지 1장(jpeg q60, 풀페이지 1280px 폭 기준 실측 54~323KB)
  + 루브릭 프롬프트(~250 토큰) + 구조화 출력(json_schema) 1회 호출.
- 모델: `claude-opus-4-8`, `output_config.effort: "low"`로 채점 비용을 낮춤.
- 이미지 토큰은 페이지 높이(풀페이지 캡처)에 비례해 커진다 — 스크린샷이
  유난히 크게 나오는 페이지가 있으면(현재 `rules.jpg` 274KB, `template-brokerage.jpg`
  219KB) 리사이즈/뷰포트 조정을 고려할 것.
- 대략 실행 1회당 미화 몇 센트 수준(정확한 금액은 이미지 크기·실제 토큰
  사용량에 따라 달라짐 — `pnpm test:vision` 실행 후 Anthropic 콘솔의 사용량으로
  확인 권장).
