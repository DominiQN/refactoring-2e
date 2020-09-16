import { statement } from "./statement.ts";
import { Invoice } from "./types.ts";
const plays = JSON.parse(Deno.readTextFileSync("./plays.json"));
const invoices = JSON.parse(Deno.readTextFileSync("./invoices.json"));

function main() {
  const results: string[] = invoices.map((invoice: Invoice) =>
    statement(invoice, plays)
  );
  results.forEach((r) => console.log(r));
}

main();
