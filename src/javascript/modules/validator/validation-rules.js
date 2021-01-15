import { regex } from './rules'

export default {
  email(value) {
    return regex.isValidEmail.test(value)
  },

  minlength(value, min) {
    if (min >= 1 && value.length >= min) {
      return true
    }
    return false
  },

  maxlength(value, max) {
    if (max >= 1 && value.length <= max) {
      return true
    }
    return false
  },
}
