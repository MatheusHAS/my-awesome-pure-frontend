import { Validator } from './validator'
import userEvent from '@testing-library/user-event'

const ValidatorOptions = {
  errorMessageSelector: '[data-error-message]',
  rowSelector: '[data-field-row]',
  errorClass: 'has-error',
  successClass: 'has-success',
  validateEvent: 'keyup',
  disabledClass: 'c-button--disabled',
  clearOnEmpty: true,
}

describe('Testing [Validator] module', () => {
  test('Should instance Validator and apply rules', () => {
    document.body.innerHTML = `
      <form data-form="create" action="#" method="POST" novalidate="true">
        <div class="c-textfield js-float-field" data-field-row>
          <input
            type="text"
            name="name"
            placeholder=""
            class="c-textfield__input"
            autocomplete="off"
            data-field-input
            data-validate-name
            data-validate-maxlength="80"
            data-validate-maxlength-message="O campo pode ter no máximo 80 caracteres"
          />
          <label for="name" class="c-textfield__label js-float-input">Nome completo (sem abreviações)</label>
          <span class="c-textfield__helper" data-error-message></span>
        </div>
        <div class="c-textfield js-float-field" data-field-row>
          <input
            type="text"
            name="cpf"
            placeholder=""
            class="c-textfield__input"
            autocomplete="off"
            data-testid="input-cpf"
            data-field-input
            data-validate-cpf
            data-validate-cpf-message="Digite um CPF válido"
          />
          <label for="name" class="c-textfield__label js-float-input">CPF</label>
          <span class="c-textfield__helper" data-testid="input-cpf-error" data-error-message></span>
        </div>
        <div class="c-textfield js-float-field" data-field-row>
          <input
            type="text"
            name="nametwo"
            placeholder=""
            class="c-textfield__input"
            autocomplete="off"
            data-field-input
            data-validate-maxlength="80"
            data-validate-maxlength-message="O campo pode ter no máximo 80 caracteres"
          />
          <label for="name" class="c-textfield__label js-float-input">Nome completo (sem abreviações)</label>
          <span class="c-textfield__helper" data-error-message></span>
        </div>
        <div class="c-textfield js-float-field" data-field-row>
          <input
            type="email"
            name="email"
            class="c-textfield__input"
            placeholder=""
            autocomplete="off"
            disabled="disabled"
            data-field-input
          />
          <label for="name" class="c-textfield__label js-float-input">E-mail</label>
          <span class="c-textfield__helper" data-error-message></span>
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    `
    const validator = new Validator(null, ValidatorOptions)
    expect(validator).toBeInstanceOf(Validator)
  })

  test('Should input field error validation with default message', () => {
    const validator = new Validator(null, ValidatorOptions)

    userEvent.type(validator.inputs[0].input, 'ab')
    expect(validator.inputs[0].input.value).toBe('ab')
    expect(validator.inputs[0].error.innerText).toBe('Campo inválido')
  })

  test('Should input field error validation with custom message', () => {
    const validator = new Validator(null, ValidatorOptions)
    userEvent.type(validator.inputs[1].input, 'ab')
    expect(validator.inputs[1].error.innerText).toBe('Digite um CPF válido')
  })

  test('Should input clear fields', () => {
    const validator = new Validator(null, ValidatorOptions)
    userEvent.clear(validator.inputs[0].input)
    expect(validator.inputs[0].input.value).toBe('')

    validator.clearErrors()
  })

  test('Should silent validation (not show errors)', () => {
    const validator = new Validator(null, ValidatorOptions)
    userEvent.type(validator.inputs[0].input, 'ab')
    validator.clearErrors()
    validator.validateSilent()
    expect(validator.inputs[0].error.innerText).toBe('')
  })

  test('Should validation execute', () => {
    const validator = new Validator(null, ValidatorOptions)
    userEvent.type(validator.inputs[0].input, 'ab')
    const isValid = validator.validate()
    expect(isValid).toBe(false)
  })
})
