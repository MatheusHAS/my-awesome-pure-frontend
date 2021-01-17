export class LocalStorage {
  static getItem(key: string) {
    const result = JSON.parse(localStorage.getItem(key))
    if (!result) {
      return null
    }
    return result
  }

  static setItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
  }
}
