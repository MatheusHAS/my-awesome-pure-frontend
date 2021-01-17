export const cpf = (value: string) => {
  value = value.replace(/[^\d]/g, '')
  var formattedCpf = [value.slice(0, 3), '.', value.slice(3, 6), '.', value.slice(6, 9), '-', value.slice(9, 12)].join(
    ''
  )
  return formattedCpf
}

export const phone = (value: string) => {
  value = value.replace(/[^\d]/g, '')
  var formattedPhone = ['(', value.slice(0, 2), ') ', value.slice(2, 7), '-', value.slice(7, 12)].join('')
  return formattedPhone
}

export default {
  cpf,
  phone,
}
