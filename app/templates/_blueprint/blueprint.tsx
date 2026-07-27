import type { ReactNode } from "react"
import { CaretRightIcon, ArrowDownIcon } from "@phosphor-icons/react/dist/ssr"

import styles from "./blueprint.module.css"

export type GateTone = "primary" | "secondary"

export interface BlueprintGate {
  label: string
  title: ReactNode
  tone: GateTone
}

export interface BlueprintNode {
  name: string
  units: string[]
}

export interface BlueprintDiagram {
  label: string
  entry: { icon: ReactNode; text: string }
  gates: BlueprintGate[]
  nodes: BlueprintNode[]
  footnote?: ReactNode
}

export interface BlueprintItem {
  text: ReactNode
  warn?: boolean
}

export interface BlueprintLayer {
  num: string
  title: string
  eq: string
  analogy: ReactNode
  items: BlueprintItem[]
}

export interface BlueprintTrouble {
  symptom: ReactNode
  where: ReactNode
}

export interface BlueprintGuideData {
  tag: string
  kicker: string
  title: ReactNode
  subtitle: ReactNode
  diagram: BlueprintDiagram
  conceptsNum: string
  conceptsCaption: string
  layers: BlueprintLayer[]
  troubleTitle: string
  troubleTag: string
  troubles: BlueprintTrouble[]
  devNote: ReactNode
  footer: string
}

/**
 * 블루프린트 가이드 — "설계도면" 스타일 교육용 인포그래픽 한 장을 데이터로 렌더한다.
 * k8s-firewall · docker-container 두 템플릿이 이 컴포넌트 하나를 공유하며 content 만
 * 갈아끼운다. 스타일은 blueprint.module.css 스코프에 갇혀 사이트 전역 토큰과 무관하다.
 */
export function BlueprintGuide({ data }: Readonly<{ data: BlueprintGuideData }>) {
  const { diagram } = data

  return (
    <div className={styles.shell}>
      <div className={styles.container}>
        <header className={styles.header}>
          <span className={styles.headerTag}>{data.tag}</span>
          <div className={styles.kicker}>{data.kicker}</div>
          <h1 className={styles.title}>{data.title}</h1>
          <div className={styles.subtitle}>{data.subtitle}</div>
        </header>

        <div className={styles.diagram}>
          <div className={styles.diagramLabel}>{diagram.label}</div>
          <div className={styles.complex}>
            <div className={styles.cloud}>
              {diagram.entry.icon}
              {diagram.entry.text}
            </div>
            {diagram.gates.map((gate, i) => (
              <div key={gate.label} className={styles.complex} style={{ width: "100%" }}>
                {i === 0 ? <FlowArrow /> : null}
                <div
                  className={`${styles.gate} ${gate.tone === "primary" ? styles.gatePrimary : styles.gateSecondary}`}
                >
                  <span className={styles.gateLabel}>{gate.label}</span>
                  {gate.title}
                </div>
                {i < diagram.gates.length - 1 ? <FlowArrow /> : null}
              </div>
            ))}
            <div className={styles.buildings}>
              {diagram.nodes.map((node) => (
                <div key={node.name} className={styles.building}>
                  <div className={styles.buildingName}>{node.name}</div>
                  {node.units.map((unit) => (
                    <div key={unit} className={styles.unit}>
                      {unit}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            {diagram.footnote ? <div className={styles.footnote}>{diagram.footnote}</div> : null}
          </div>
        </div>

        <div className={styles.layersIntro}>
          <div className={styles.layersNum}>{data.conceptsNum}</div>
          <div className={styles.layersCaption}>{data.conceptsCaption}</div>
        </div>

        {data.layers.map((layer) => (
          <div key={layer.num} className={styles.layer}>
            <div className={styles.layerHeader}>
              <div className={styles.layerNum}>{layer.num}</div>
              <div className={styles.layerTitle}>{layer.title}</div>
              <div className={styles.layerEq}>{layer.eq}</div>
            </div>
            <div className={styles.layerBody}>
              <div className={styles.analogy}>{layer.analogy}</div>
              <ul className={styles.list}>
                {layer.items.map((item, i) => (
                  <li key={i} className={`${styles.item} ${item.warn ? styles.itemWarn : ""}`}>
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}

        <div className={styles.sectionTitle}>
          <span>{data.troubleTitle}</span>
          <span className={styles.sectionTag}>{data.troubleTag}</span>
        </div>
        <div className={styles.trouble}>
          {data.troubles.map((row, i) => (
            <div key={i} className={styles.troubleRow}>
              <div className={styles.symptom}>{row.symptom}</div>
              <div className={styles.go}>
                <CaretRightIcon aria-hidden size={16} weight="bold" />
              </div>
              <div className={styles.where}>{row.where}</div>
            </div>
          ))}
        </div>

        <div className={styles.devTip}>
          <span className={styles.devTipTag}>{"// DEVELOPER NOTE"}</span>
          <div className={styles.devNote}>{data.devNote}</div>
        </div>

        <div className={styles.footer}>{data.footer}</div>
      </div>
    </div>
  )
}

function FlowArrow() {
  return (
    <div className={styles.arrow}>
      <ArrowDownIcon aria-hidden size={14} weight="bold" />
    </div>
  )
}

/** 템플릿 페이지에서 인라인 코드 조각을 블루프린트 code 스타일로 감쌀 때 쓴다. */
export function BpCode({ children }: Readonly<{ children: ReactNode }>) {
  return <code className={styles.code}>{children}</code>
}
