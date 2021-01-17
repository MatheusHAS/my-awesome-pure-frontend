import { LocalStorage } from '@/javascript/modules'
import { stateKeyName } from '@/javascript/config'

export const createMember = (data) => {
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

export const updateMemberByEmail = (email, data) => {
  let members = LocalStorage.getItem(stateKeyName)
  if (!members) {
    return
  } else {
    const searchMember = members.filter((member) => member.email === email)
    let member = searchMember?.shift()
    const currentMemberIndex = members.indexOf(member)
    console.log(currentMemberIndex)
    members[currentMemberIndex] = {
      ...member,
      ...data,
    }
    LocalStorage.setItem(stateKeyName, members)
  }
}

export const getMemberByEmail = (email) => {
  let members = LocalStorage.getItem(stateKeyName)
  if (!members) {
    return null
  } else {
    let searchMember = members.filter((member) => member.email === email)
    return searchMember?.shift()
  }
}
