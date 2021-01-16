import { LocalStorage } from '@/javascript/modules'
import { stateKeyName } from '@/javascript/config'

export const createMember = (data) => {
  console.log(data)

  const members = LocalStorage.getItem(stateKeyName)
  if (!members) {
    LocalStorage.setItem(stateKeyName, [{ ...data }])
  } else {
    members.push(data)
    LocalStorage.setItem(stateKeyName, members)
  }
}
