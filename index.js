const { Parser, transforms: { unwind } } = require('json2csv');
const fs = require('fs');

let rawdata = fs.readFileSync('response-july-for-dev.json');
let data = JSON.parse(rawdata);

const fields = [
  'id',
  'orderId',
  'atomicId',
  'status',
  'fromCurrency',
  'toCurrency',
  'amountSend',
  'amountReceive',
  'payinAddress',
  'payinExtraId',
  'payoutAddress',
  'payoutExtraId',
  'refundAddress',
  'refundExtraId',
  'payinHash',
  'payoutHash',
  'createdAt',
  'updatedAt',
  'Cashbacks.id',
  'Cashbacks.atomicId',
  'Cashbacks.paymentId',
  'Cashbacks.orderId',
  'Cashbacks.bnbAddress',
  'Cashbacks.ethAddress',
  'Cashbacks.expectedCashbackAmount',
  'Cashbacks.awcBep2Balance',
  'Cashbacks.awcBep2Rate',
  'Cashbacks.exchangeService',
  'Cashbacks.platform',
  'Cashbacks.walletVersion',
  'Cashbacks.order_id'
];
const transforms = [unwind({ paths: ['Cashbacks'] })];
const json2csvParser = new Parser({ fields, transforms });
const csv = json2csvParser.parse(data);
fs.writeFile('response.csv', csv, function (err) {
  if (err) return console.log(err);
  console.log('wrote!');
});
