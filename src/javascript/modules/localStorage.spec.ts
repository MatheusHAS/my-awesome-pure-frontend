import { LocalStorage } from './localStorage'

describe('Testing [LocalStorage] module', () => {
  test('Should use setItem', () => {
    const spySet = jest.spyOn(LocalStorage, 'setItem')
    LocalStorage.setItem('local_test', 1)
    expect(spySet).toBeCalledWith('local_test', 1)
  })

  test('Should use getItem', () => {
    const spyGet = jest.spyOn(LocalStorage, 'getItem')
    const getResult = LocalStorage.getItem('local_test')
    expect(spyGet).toBeCalledWith('local_test')
    expect(getResult).toBe(1)

    const getResultUndefined = LocalStorage.getItem('__not_exists__')
    expect(getResultUndefined).toBeNull()
  })
})
