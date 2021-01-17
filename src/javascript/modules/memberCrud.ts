import { LocalStorage } from '@/javascript/modules'
import { stateKeyName } from '@/javascript/config'
import { IMember } from '@/javascript/interfaces/IMember'

export const createMember = (data: IMember) => {
  const members: IMember[] = LocalStorage.getItem(stateKeyName)
  if (!members) {
    LocalStorage.setItem(stateKeyName, [{ ...data }])
  } else {
    members.push(data)
    LocalStorage.setItem(stateKeyName, members)
  }
}

export const removeMemberByEmail = (email: string) => {
  let members = LocalStorage.getItem(stateKeyName)
  if (!members) {
    return
  } else {
    members = members.filter((member) => member.email !== email)
    LocalStorage.setItem(stateKeyName, members)
  }
}

export const updateMemberByEmail = (email: string, data: IMember) => {
  const members: IMember[] = LocalStorage.getItem(stateKeyName)
  const searchMember: IMember[] = members.filter((member) => member.email === email)
  const member = searchMember.shift()
  const currentMemberIndex: number = members.indexOf(member)
  members[currentMemberIndex] = {
    ...member,
    ...data,
  }
  LocalStorage.setItem(stateKeyName, members)
}

export const getMemberByEmail = (email: string) => {
  const members: IMember[] = LocalStorage.getItem(stateKeyName)
  const searchMember: IMember[] = members.filter((member) => member.email === email)
  return searchMember.shift()
}
