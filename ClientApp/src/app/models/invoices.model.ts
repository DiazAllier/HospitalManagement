
export class invoicesModel {
  idPerson: string;
  orderId: string;
  createTime: string;
  updateTime: string;
  payer: Payer;
  purchaseUnits: purchaseUnits;
  status: string;
}

export class purchaseUnits {
  amount: MoneyDTO
}
export class MoneyDTO {
  currencyCode: string;
  value: string;
}
export class Payer {
  emailAdress: string;
}




