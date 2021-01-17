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

export const removeMemberByEmail = (email) => {
  let members = LocalStorage.getItem(stateKeyName)
  if (!members) {
    return
  } else {
    members = members.filter((member) => member.email !== email)
    LocalStorage.setItem(stateKeyName, members)
  }
}
