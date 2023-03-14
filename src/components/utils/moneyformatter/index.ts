export const moneyFormatter = (balance: number) => {
  // TODO: Write Util's logic

  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(balance)
}
