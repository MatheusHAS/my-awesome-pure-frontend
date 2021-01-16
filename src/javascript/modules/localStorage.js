export class LocalStorage {
  static getItem(key) {
    const result = JSON.parse(localStorage.getItem(key))
    if (!result) {
      return null
    }
    return result
  }

  static setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  }
}
