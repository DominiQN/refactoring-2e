import { Performance, Invoice, Play, Plays } from "./types.ts";

export function statement(invoice: Invoice, plays: Plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;
  const format = (amount: number) => `${amount}원`;

  for (let performance of invoice.performances) {
    let thisAmount = amountFor(performance, playFor(performance));

    volumeCredits += Math.max(performance.audience - 30, 0);
    if (playFor(performance).type === "comedy") {
      volumeCredits += Math.floor(performance.audience / 5);
    }

    result += `${playFor(performance).name}: ${
      format(thisAmount / 100)
    } (${performance.audience}석)\n`;
    totalAmount += thisAmount;
  }

  result += `총액: ${format(totalAmount / 100)}\n`;
  result += `적립 포인트: ${volumeCredits}점`;

  return result;

  function amountFor(performance: Performance, play: Play) {
    let amount = 0;

    switch (play.type) {
      case "tragedy":
        amount = 40000;
        if (performance.audience > 30) {
          amount += 1000 * (performance.audience - 30);
        }
        break;
      case "comedy":
        amount = 30000;
        if (performance.audience > 20) {
          amount += 10000 + 500 * (performance.audience - 20);
        }
        amount += 300 * performance.audience;
        break;
      default:
        throw new Error(`알 수 없는 장르: ${play.type}`);
    }

    return amount;
  }

  function playFor(performance: Performance) {
    return plays[performance.playID];
  }
}
