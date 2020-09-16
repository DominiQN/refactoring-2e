import { Performance, Invoice, Play, Plays } from "./types.ts";

export function statement(invoice: Invoice, plays: Plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;
  const format = (amount: number) => `${amount}원`;

  for (let performance of invoice.performances) {
    const play = plays[performance.playID];
    let thisAmount = amountFor(performance, play);

    volumeCredits += Math.max(performance.audience - 30, 0);
    if (play.type === "comedy") {
      volumeCredits += Math.floor(performance.audience / 5);
    }

    result += `${play.name}: ${
      format(thisAmount / 100)
    } (${performance.audience}석)\n`;
    totalAmount += thisAmount;
  }

  result += `총액: ${format(totalAmount / 100)}\n`;
  result += `적립 포인트: ${volumeCredits}점`;

  return result;

  function amountFor(performance: Performance, play: Play) {
    let thisAmount = 0;

    switch (play.type) {
      case "tragedy":
        thisAmount = 40000;
        if (performance.audience > 30) {
          thisAmount += 1000 * (performance.audience - 30);
        }
        break;
      case "comedy":
        thisAmount = 30000;
        if (performance.audience > 20) {
          thisAmount += 10000 + 500 * (performance.audience - 20);
        }
        thisAmount += 300 * performance.audience;
        break;
      default:
        throw new Error(`알 수 없는 장르: ${play.type}`);
    }

    return thisAmount;
  }
}
