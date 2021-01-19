import Formatter from './formatter'

describe('Testing [Formatter] module', () => {
  test('Should format cpf with mask ', () => {
    const cpfFormatted = Formatter.cpf('12345678910')
    expect(cpfFormatted).toBe('123.456.789-10')
  })

  test('Should format phone with mask ', () => {
    const phoneFormatted = Formatter.phone('18932650000')
    expect(phoneFormatted).toBe('(18) 93265-0000')
  })
})
