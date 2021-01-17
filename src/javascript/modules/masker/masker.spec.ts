import { Masker } from './masker'

jest.useFakeTimers()

describe('Testing [Masker] module', () => {
  test('Should instance masker and AutoMask fields', () => {
    document.body.innerHTML = `
      <input
        type="text"
        name="cpf"
        class="c-textfield__input"
        autocomplete="off"
        data-masker-cpf
      />
      <input
        type="text"
        name="phone"
        class="c-textfield__input"
        autocomplete="off"
        data-masker-phone
      />
    `
    const masker = new Masker()
    expect(masker).toBeInstanceOf(Masker)
  })
})
