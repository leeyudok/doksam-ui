/**
 * 학습 콘텐츠 플레이어 데모 데이터 — 순수 데이터 모듈(컴포넌트 로직 없음).
 * kbitube 자동학습 페이지 구조만 참고한 가상 강의 코스 1개다. 실 기관·코스명은
 * 배제한 일반화 데이터이며, 실제 연동 시 이 파일을 교체한다.
 */

/** 강의 한 편 — 제목·길이(초)·완료 여부·요약 bullet. */
export interface Lesson {
  id: string
  /** 강의 제목. */
  title: string
  /** 재생 길이(초). meta 표기·전체 진행률 가중치에 쓰인다. */
  durationSec: number
  /** 이미 수강 완료한 강의인지. */
  completed: boolean
  /** AI 요약 모달에 노출할 3~4개 핵심 bullet. */
  summary: string[]
}

/** 챕터 — 강의 묶음. */
export interface Chapter {
  id: string
  /** 챕터 라벨. */
  title: string
  lessons: Lesson[]
}

/** 코스 — 챕터 배열 + 메타. */
export interface Course {
  title: string
  /** 총 챕터 수 배지 등에 노출할 부제. */
  subtitle: string
  chapters: Chapter[]
}

export const COURSE: Course = {
  title: "실전 데이터 분석 부트캠프",
  subtitle: "파이썬으로 배우는 데이터 파이프라인",
  chapters: [
    {
      id: "ch1",
      title: "1. 데이터 분석 기초",
      lessons: [
        {
          id: "l1",
          title: "데이터 분석가의 하루",
          durationSec: 612,
          completed: true,
          summary: [
            "데이터 분석 업무는 수집·정제·탐색·모델링·공유의 반복 사이클로 구성된다.",
            "분석의 시작은 도구가 아니라 명확한 질문 정의라는 점을 강조한다.",
            "이해관계자 커뮤니케이션이 분석 결과의 실제 가치를 좌우한다.",
          ],
        },
        {
          id: "l2",
          title: "분석 환경 세팅과 노트북 기초",
          durationSec: 845,
          completed: true,
          summary: [
            "가상환경으로 프로젝트별 의존성을 격리하는 방법을 다룬다.",
            "노트북 셀 실행 순서가 결과 재현성에 미치는 영향을 설명한다.",
            "매직 커맨드와 단축키로 반복 작업을 줄이는 팁을 소개한다.",
          ],
        },
        {
          id: "l3",
          title: "테이블 데이터 다루기 입문",
          durationSec: 1024,
          completed: true,
          summary: [
            "행·열 인덱싱과 슬라이싱의 기본 문법을 예제로 익힌다.",
            "결측치와 자료형 불일치를 초기에 발견하는 습관을 강조한다.",
            "요약 통계로 데이터의 전체 윤곽을 빠르게 파악한다.",
          ],
        },
        {
          id: "l4",
          title: "첫 번째 탐색적 분석 실습",
          durationSec: 733,
          completed: false,
          summary: [
            "가설을 세우고 그룹별 집계로 검증하는 흐름을 실습한다.",
            "단일 지표보다 분포를 함께 보는 것이 오해를 줄인다.",
            "이상치가 평균을 왜곡하는 사례를 직접 확인한다.",
          ],
        },
      ],
    },
    {
      id: "ch2",
      title: "2. 데이터 정제와 변환",
      lessons: [
        {
          id: "l5",
          title: "결측치 처리 전략",
          durationSec: 918,
          completed: false,
          summary: [
            "삭제·대치·보간 각 방식의 장단점과 선택 기준을 비교한다.",
            "결측 자체가 정보일 수 있어 무조건 채우면 안 되는 경우를 다룬다.",
            "처리 전후 분포 변화를 반드시 확인하도록 안내한다.",
          ],
        },
        {
          id: "l6",
          title: "범주형 데이터 인코딩",
          durationSec: 656,
          completed: false,
          summary: [
            "원-핫·라벨·타깃 인코딩의 적용 상황을 구분한다.",
            "고유값이 많은 범주는 차원 폭발에 주의해야 한다.",
            "학습·검증 분리 후 인코딩해야 누수를 막을 수 있다.",
          ],
        },
        {
          id: "l7",
          title: "날짜·시간 데이터 파싱",
          durationSec: 542,
          completed: false,
          summary: [
            "문자열을 표준 시간 자료형으로 변환하는 방법을 익힌다.",
            "시간대와 서머타임이 집계 오류를 만드는 사례를 본다.",
            "요일·주차 파생 변수로 시계열 패턴을 드러낸다.",
          ],
        },
        {
          id: "l8",
          title: "여러 테이블 병합하기",
          durationSec: 987,
          completed: false,
          summary: [
            "조인 종류별 결과 행 수 차이를 시각적으로 비교한다.",
            "키 중복이 카티전 곱을 유발하는 함정을 경고한다.",
            "병합 전 키의 유일성 검증을 습관화하도록 안내한다.",
          ],
        },
        {
          id: "l9",
          title: "정규화와 스케일링",
          durationSec: 611,
          completed: false,
          summary: [
            "표준화와 min-max 스케일링의 수식과 효과를 설명한다.",
            "거리 기반 모델에서 스케일링이 필수인 이유를 다룬다.",
            "이상치에 강건한 스케일링 대안을 소개한다.",
          ],
        },
      ],
    },
    {
      id: "ch3",
      title: "3. 시각화와 인사이트",
      lessons: [
        {
          id: "l10",
          title: "좋은 차트의 조건",
          durationSec: 704,
          completed: false,
          summary: [
            "데이터 유형에 맞는 차트 선택 원칙을 정리한다.",
            "잉크 대 정보 비율로 불필요한 장식을 줄인다.",
            "색과 축 조작이 왜곡을 만드는 사례를 경계한다.",
          ],
        },
        {
          id: "l11",
          title: "분포와 관계 시각화",
          durationSec: 823,
          completed: false,
          summary: [
            "히스토그램·박스플롯으로 분포를 읽는 법을 익힌다.",
            "산점도와 상관계수의 관계와 한계를 다룬다.",
            "상관이 인과가 아님을 반복해 강조한다.",
          ],
        },
        {
          id: "l12",
          title: "대시보드 스토리텔링",
          durationSec: 946,
          completed: false,
          summary: [
            "핵심 지표를 상단에 배치하는 레이아웃 원칙을 다룬다.",
            "필터·드릴다운으로 탐색 흐름을 설계한다.",
            "숫자에 맥락을 붙여 의사결정으로 연결한다.",
          ],
        },
      ],
    },
    {
      id: "ch4",
      title: "4. 파이프라인 자동화",
      lessons: [
        {
          id: "l13",
          title: "반복 작업 스크립트화",
          durationSec: 578,
          completed: false,
          summary: [
            "수작업 분석을 재사용 가능한 함수로 리팩터링한다.",
            "설정과 로직을 분리해 유지보수성을 높인다.",
            "작은 단위 테스트로 회귀를 조기에 잡는다.",
          ],
        },
        {
          id: "l14",
          title: "스케줄링과 배치 실행",
          durationSec: 690,
          completed: false,
          summary: [
            "정기 실행으로 최신 데이터를 자동 갱신하는 구조를 본다.",
            "실패 알림과 재시도 정책의 중요성을 강조한다.",
            "실행 이력을 남겨 문제를 추적하도록 안내한다.",
          ],
        },
        {
          id: "l15",
          title: "결과 공유와 리포팅 자동화",
          durationSec: 812,
          completed: false,
          summary: [
            "분석 결과를 정기 리포트로 자동 발송하는 흐름을 다룬다.",
            "받는 사람 눈높이에 맞춘 요약의 중요성을 강조한다.",
            "지표 정의를 문서화해 해석 혼선을 줄인다.",
          ],
        },
      ],
    },
  ],
}

/** 평탄화된 강의 목록(전역 순번 부여) — 사이드바·플레이어가 공유. */
export interface FlatLesson extends Lesson {
  /** 0부터의 전역 순번. */
  index: number
  /** 소속 챕터 id. */
  chapterId: string
}

export const FLAT_LESSONS: FlatLesson[] = COURSE.chapters.flatMap((ch) =>
  ch.lessons.map((l) => ({ ...l, index: 0, chapterId: ch.id })),
).map((l, i) => ({ ...l, index: i }))

export const TOTAL_LESSONS = FLAT_LESSONS.length
export const COMPLETED_LESSONS = FLAT_LESSONS.filter((l) => l.completed).length

/** 전체 진행률(완료 강의 수 기준, 0~100 정수). */
export const COURSE_PROGRESS = Math.round((COMPLETED_LESSONS / TOTAL_LESSONS) * 100)

/** 첫 미완료 강의의 전역 index(없으면 0). 자동 선택 기본값. */
export const FIRST_INCOMPLETE_INDEX = Math.max(
  0,
  FLAT_LESSONS.findIndex((l) => !l.completed),
)

/** 초 → "M:SS" 표기. */
export function formatDuration(sec: number): string {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${m}:${s < 10 ? "0" : ""}${s}`
}
