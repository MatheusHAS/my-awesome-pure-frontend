import userEvent from '@testing-library/user-event'
import { Form } from './form'

jest.useFakeTimers()

describe('Testing [Form] module', () => {
  test('Should create instance of Form', () => {
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
          />
          <label for="name" class="c-textfield__label js-float-input">Nome completo (sem abreviações)</label>
          <span class="c-textfield__helper" data-error-message></span>
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    `
    const formInstance = new Form()
    expect(formInstance).toBeInstanceOf(Form)
  })

  test('Should add submit event and dispatch', () => {
    const callback = jest.fn()
    const formInstance = new Form({ callback })
    formInstance.addSubmitEvent(callback)

    formInstance.setFieldValue('name', 'matheus azambuja')

    userEvent.click(formInstance.validator.submitButton)
    expect(callback).toBeCalled()
  })

  test('Should disable and enable fields', () => {
    const formInstance = new Form()
    const inputsArray = [formInstance.validator.inputs[0].input]
    formInstance.disableFields(true, inputsArray)
    expect(formInstance.validator.inputs[0].input.getAttribute('disabled')).toBe('true')

    formInstance.disableFields(false, inputsArray)
    expect(formInstance.validator.inputs[0].input.getAttribute('disabled')).toBeNull()
  })

  test('Should clear all fields', () => {
    const formInstance = new Form()
    formInstance.setFieldValue('name', 'matheus azambuja')
    expect(formInstance.validator.inputs[0].input.value).toBe('matheus azambuja')
    formInstance.clean()
    expect(formInstance.validator.inputs[0].input.value).toBe('')
  })

  test('Should get form data elements', () => {
    const formInstance = new Form()
    const inputsArray = [formInstance.validator.inputs[0].input]
    formInstance.setFieldValue('name', 'matheus azambuja')
    const formData: any = formInstance.getFormDataByElements(inputsArray)
    expect(formData.name).toBe('matheus azambuja')
  })

  test('Should test set and remove loading', () => {
    const formInstance = new Form()
    formInstance.setLoading(true)
    let loadingElement = formInstance.validator.submitButton.querySelector('.o-loading')
    expect(loadingElement).not.toBeNull()

    formInstance.setLoading(false)
    loadingElement = formInstance.validator.submitButton.querySelector('.o-loading')
    expect(loadingElement).toBeNull()
    // formInstance.setLoading(false)
    expect(formInstance.isLoading).toBe(false)
  })
})
