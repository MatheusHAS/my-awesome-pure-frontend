import { LocalStorage } from '@/javascript/modules'
import { stateKeyName } from '@/javascript/config'
import { IMember } from '@/javascript/interfaces/IMember'

export const createMember = (data) => {
  const members: IMember[] = LocalStorage.getItem(stateKeyName)
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
  const members: IMember[] = LocalStorage.getItem(stateKeyName)
  if (!members) {
    return
  } else {
    const searchMember: IMember[] = members.filter((member) => member.email === email)
    const member = searchMember?.shift()
    const currentMemberIndex: number = members.indexOf(member)
    members[currentMemberIndex] = {
      ...member,
      ...data,
    }
    LocalStorage.setItem(stateKeyName, members)
  }
}

export const getMemberByEmail = (email) => {
  const members: IMember[] = LocalStorage.getItem(stateKeyName)
  if (!members) {
    return null
  } else {
    const searchMember: IMember[] = members.filter((member) => member.email === email)
    return searchMember?.shift()
  }
}
