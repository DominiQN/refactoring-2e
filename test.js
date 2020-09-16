import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { statement } from "./statement.js";

const expected = `청구 내역 (고객명: BigCo)
Hamlet: 650원 (55석)
As You Like It: 580원 (35석)
Othello: 500원 (40석)
총액: 1730원
적립 포인트: 47점`;

Deno.test("refactor test", () => {
  const plays = JSON.parse(Deno.readTextFileSync("./plays.json"));
  const invoices = JSON.parse(Deno.readTextFileSync("./invoices.json"));
  for (const invoice of invoices) {
    assertEquals(
      statement(invoice, plays),
      expected,
    );
  }
});
