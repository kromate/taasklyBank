export const convertToCurrency = (value: number) => {
  if (!value && value !== 0) return
  let parseAmount
  if (typeof value !== 'number') {
    parseAmount = parseFloat((value as string).replace(',', '').replace(' ', ''))
  } else {
    parseAmount = value
  }
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN'
  }).format(parseAmount)
}

export const nairaToKobo = (amount) => {
      return (amount * 100).toFixed(0)
}

export const koboToNaira = (amount) => {
      return (amount / 100).toFixed(2)
}

export const calculateTransferFee = (amount: number): number => {
  if (amount <= 5000) {
    return 10
  } else if (amount > 5000 && amount <= 50000) {
    return 25
  } else {
    return 50
  }
}


export const paidAmount = (amount: string | number, percentage = 10) => {
  let parseAmount
  if (typeof amount !== 'number') {
    parseAmount = parseFloat(amount.replace(',', '').replace(' ', ''))
  } else {
    parseAmount = amount
  }
  return (parseAmount - (parseAmount * percentage) / 100)
}

export const serviceFee = (amount: string | number, percentage = 1.5) => {
  let parseAmount
  if (typeof amount !== 'number') {
    parseAmount = parseFloat(amount.replace(',', '').replace(' ', ''))
  } else {
    parseAmount = amount
  }

  if (parseAmount > 2500) {
      parseAmount = (parseAmount * percentage) / 100 + 100
  } else {
      parseAmount = (parseAmount * percentage) / 100
  }

  if (parseAmount > 2000) return 2000
  else return parseAmount
}


export const percentageOfAmount = (percentage: number, amount: number): number => {
  if (percentage < 0 || percentage > 100) {
    throw new Error('Percentage should be between 0 and 100.')
  }

  return (percentage / 100) * amount
}
