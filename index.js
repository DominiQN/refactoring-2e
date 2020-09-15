const { statement } = require('./statement')
const plays = require('./plays.json')
const invoices = require('./invoices.json')

function main() {
  const results = invoices.map((invoice) => statement(invoice, plays))
  console.log(results)
}

main()
