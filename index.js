const { Parser, transforms: { unwind } } = require('json2csv');
const fs = require('fs');

let rawdata = fs.readFileSync('response-4.json');
let data = JSON.parse(rawdata);

const fields = [
  'id',
  'status',
  'usdValue',
  'Cashbacks.bnbAddress',
  'Cashbacks.ethAddress',
  'Cashbacks.expectedCashbackAmount',
  'Cashbacks.awcBep2Balance',
  'Cashbacks.awcBep2Rate'
];
const transforms = [unwind({ paths: ['Cashbacks'] })];
const json2csvParser = new Parser({ fields, transforms });
const csv = json2csvParser.parse(data);
fs.writeFile('response-4.csv', csv, function (err) {
  if (err) return console.log(err);
  console.log('wrote!');
});
