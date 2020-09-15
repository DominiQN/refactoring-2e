import { statement } from "./statement.js";
const plays = JSON.parse(Deno.readTextFileSync("./plays.json"));
const invoices = JSON.parse(Deno.readTextFileSync("./invoices.json"));

function main() {
  const results = invoices.map((invoice) => statement(invoice, plays));
  results.forEach((r) => console.log(r));
}

main();
