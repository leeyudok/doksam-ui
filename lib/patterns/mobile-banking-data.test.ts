import { describe, expect, it } from "vitest"

import {
  ACCOUNTS,
  TRANSACTIONS,
  formatDateHeader,
  getPrimaryAccount,
  getTotalBalance,
  groupTransactionsByDate,
} from "./mobile-banking-data"

describe("getPrimaryAccount", () => {
  it("returns the account flagged as primary", () => {
    expect(getPrimaryAccount(ACCOUNTS).id).toBe("acc-1")
  })

  it("falls back to the first account when none is flagged primary", () => {
    const accounts = ACCOUNTS.map((a) => ({ ...a, isPrimary: false }))
    expect(getPrimaryAccount(accounts).id).toBe(accounts[0].id)
  })
})

describe("getTotalBalance", () => {
  it("sums every account balance", () => {
    expect(getTotalBalance(ACCOUNTS)).toBe(ACCOUNTS.reduce((sum, a) => sum + a.balance, 0))
  })
})

describe("groupTransactionsByDate", () => {
  it("groups consecutive same-date transactions together in order", () => {
    const groups = groupTransactionsByDate(TRANSACTIONS)
    const dates = groups.map((g) => g.date)
    expect(new Set(dates).size).toBe(dates.length)
    expect(groups.reduce((sum, g) => sum + g.items.length, 0)).toBe(TRANSACTIONS.length)
  })
})

describe("formatDateHeader", () => {
  it("formats an ISO date into a Korean month/day/weekday label", () => {
    expect(formatDateHeader("2026-07-12")).toBe("7월 12일 (일)")
  })

  it("returns the original string when the date cannot be parsed", () => {
    expect(formatDateHeader("not-a-date")).toBe("not-a-date")
  })
})
