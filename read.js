const xlsx = require('node-xlsx');
const Table = require('cli-table2')

if(process.argv.length < 4){
  console.log("Anna kummatkit excelit")
  process.exit(1);
}

const fillerFile = process.argv[2]
const finalFile = process.argv[3]

const filler = xlsx.parse(`${__dirname}/${fillerFile}`);
const final = xlsx.parse(`${__dirname}/${finalFile}`);

fillerEmails = filler[0].data
.map(x => x[3])
.filter(x => !!x)
.filter(x => x.includes("@"))

finalEmails = final[0].data
.map(x => x[3])
.filter(x => !!x)
.filter(x => x.includes("@"))

let missingEmails = []

filler[0].data
.filter(x => x.length > 1)
.filter(x => !!x[2])
.filter(x => {
  if(x[7] === undefined) return false
  return x[7].trim().toLowerCase() === "x"
} )
.forEach(x => {
    const isInFinal = final[0].data
    .filter(x => x[2] && x[1])
    .find(y => {
      const match = y[2].trim() === x[0].trim() && y[1].trim() === x[1].trim()
      return match
    })

    if(!isInFinal && x.length > 1){
      missingEmails.push(x)
    }
})

// console.log(missingEmails)
console.log("Puuttuu ", missingEmails.length)

// instantiate
const table = new Table({
  head: ['Etunimi', 'Sukunimi', 'Sähköposti', 'Organisaatio']
});

// table is an Array, so you can `push`, `unshift`, `splice` and friends
missingEmails.forEach(person => {
  table.push([
    person[1], person[0], person[3], person[2]
  ])
})


console.log(table.toString());