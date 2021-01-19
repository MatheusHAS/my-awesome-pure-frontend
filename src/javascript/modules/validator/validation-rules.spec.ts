import { LocalStorage } from '@/javascript/modules'
import { stateKeyName } from '@/javascript/config'
import validationRules from './validation-rules'

describe('Testing [validation-rules]', () => {
  test('CPF validation method', () => {
    expect(validationRules.cpf('')).toBe(false)
    expect(validationRules.cpf('111.111.111-11')).toBe(false)
    expect(validationRules.cpf('123.456.789-10')).toBe(false)
    expect(validationRules.cpf('760.173.530-39')).toBe(true)
    expect(validationRules.cpf('867.710.910-24')).toBe(false)
    expect(validationRules.cpf('999.999.001-05')).toBe(false)
  })

  test('NAME validation method', () => {
    expect(validationRules.name('')).toBe(false)
    expect(validationRules.name('matheus azambuja')).toBe(true)
  })

  test('PHONE validation method', () => {
    expect(validationRules.phone('')).toBe(false)
    expect(validationRules.phone('18912345671')).toBe(true)
    expect(validationRules.phone('1234567891')).toBe(false)
  })

  test('EMAIL validation method', () => {
    expect(validationRules.email('matheus.com')).toBe(false)
    expect(validationRules.email('matheus@matheus.com')).toBe(true)
  })

  test('MIN LENGTH validation method', () => {
    expect(validationRules.minlength('ma', 3)).toBe(false)
    expect(validationRules.minlength('matheus', 3)).toBe(true)
    expect(validationRules.maxlength('matheus', 7)).toBe(true)
    expect(validationRules.maxlength('matheus azambuja', 7)).toBe(false)
  })

  test('EXIST EMAIL validation method', () => {
    LocalStorage.setItem(stateKeyName, [
      {
        name: 'Matheus Azambuja',
        email: 'matheus@matheus.com',
        phone: '12345678910',
        cpf: '12345678910',
      },
    ])
    expect(validationRules.existemail('matheus@pamonha.com')).toBe(true)
    expect(validationRules.existemail('matheus@matheus.com')).toBe(false)
  })
})
