import { regex } from './rules'
import { getMemberByEmail } from '@/javascript/modules/memberCrud'

const BLOCKED_CPFS: string[] = [
  '00000000000',
  '11111111111',
  '22222222222',
  '33333333333',
  '44444444444',
  '55555555555',
  '66666666666',
  '77777777777',
  '88888888888',
  '99999999999',
]

export default {
  name(value: string) {
    return regex.isValidName.test(value)
  },

  email(value: string) {
    return regex.isValidEmail.test(value)
  },

  existemail(value: any) {
    const member = getMemberByEmail(value)
    return !member
  },

  minlength(value: string, min: number) {
    if (min >= 1 && value.length >= min) {
      return true
    }
    return false
  },

  maxlength(value: string, max: number) {
    if (max >= 1 && value.length <= max) {
      return true
    }
    return false
  },

  cpf(value: string) {
    value = value.replace(/[^\d]+/g, '')
    if (!value) return false

    if (value.length !== 11 || BLOCKED_CPFS.includes(value)) return false

    let add = 0
    for (let i = 0; i < 9; i++) add += parseInt(value.charAt(i)) * (10 - i)
    let rev = 11 - (add % 11)
    if (rev === 10 || rev === 11) rev = 0
    if (rev !== parseInt(value.charAt(9))) return false

    add = 0
    for (let i = 0; i < 10; i++) add += parseInt(value.charAt(i)) * (11 - i)
    rev = 11 - (add % 11)
    if (rev === 10 || rev === 11) rev = 0
    if (rev !== parseInt(value.charAt(10))) return false
    return true
  },

  phone(value: string) {
    value = value.replace(/[^\d]+/g, '')
    if (!value) {
      return false
    }
    return value.length === 11
  },
}
