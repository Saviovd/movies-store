export function usePriceFormatter() {
  const formattedPrice = (price: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)

  return { formattedPrice }
}
