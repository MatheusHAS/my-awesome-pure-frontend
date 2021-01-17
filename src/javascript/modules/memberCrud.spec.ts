import * as memberCrud from './memberCrud'
import { LocalStorage } from './localStorage'
import { stateKeyName } from '../config'

describe('Testing [memberCrud] module', () => {
  test('Should createMember', () => {
    const spyOnCreate = jest.spyOn(memberCrud, 'createMember')
    memberCrud.createMember({
      name: 'Matheus',
      email: 'matheus@matheus.com',
      cpf: '12345678910',
      phone: '18912345678',
    })
    expect(spyOnCreate).toBeCalled()
    memberCrud.createMember({
      name: 'Matheus Two',
      email: 'matheus2@matheus.com',
      cpf: '12345678910',
      phone: '18912345678',
    })
    expect(spyOnCreate).toBeCalledTimes(2)
  })
  test('Should updateMemberByEmail', () => {
    // memberCrud.createMember({
    //   name: 'Matheus',
    //   email: 'matheus@matheus.com',
    //   cpf: '12345678910',
    //   phone: '18912345678',
    // })
    const spyOnUpdate = jest.spyOn(memberCrud, 'updateMemberByEmail')
    memberCrud.updateMemberByEmail('matheus@matheus.com', {
      name: 'Matheus Update',
      cpf: '12345678911',
      phone: '18912344321',
    })
    expect(spyOnUpdate).toBeCalledWith('matheus@matheus.com', {
      name: 'Matheus Update',
      cpf: '12345678911',
      phone: '18912344321',
    })
  })

  test('Should getMemberByEmail', () => {
    const spyOnGet = jest.spyOn(memberCrud, 'getMemberByEmail')
    memberCrud.getMemberByEmail('matheus@matheus.com')
    expect(spyOnGet).toBeCalled()
  })

  test('Should removeMemberByEmail', () => {
    const spyOnRemove = jest.spyOn(memberCrud, 'removeMemberByEmail')
    memberCrud.removeMemberByEmail('matheus@matheus.com')
    LocalStorage.removeItem(stateKeyName)
    memberCrud.removeMemberByEmail('test@test.com')
    expect(spyOnRemove).toBeCalled()
  })
})
