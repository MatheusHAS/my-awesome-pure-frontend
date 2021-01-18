import validationRules from './validation-rules'

const ALLOWED_ATTRIBUTES = ['minlength', 'maxlength']
const ValidationDataPrefix = 'data-validate-'
const ValidationMessageSufix = '-message'

interface IValidatorOptions {
  errorMessageSelector?: string
  disabledClass?: string
  rowSelector?: string
  errorClass?: string
  successClass?: string
  clearOnEmpty?: boolean
  validateEvent?: string
}

interface IValidatorInput {
  name: string
  input: HTMLInputElement
  error: HTMLElement
  row: Element
  rules: any[]
}

export class Validator {
  form: Element | HTMLFormElement | null = null
  submitButton: Element | HTMLElement | null = null
  formIsValid: boolean = false
  errorMessageSelector: string = '[data-error-message]'
  rowSelector: string = '[data-field-row]'
  inputSelector: string = '[data-field-input]'
  errorClass: string = 'has-error'
  successClass: string = 'has-success'
  validateEvent: string = 'keyup'
  disabledClass: string = 'c-button--disabled'
  clearOnEmpty: boolean = true
  inputs: IValidatorInput[] = []

  constructor(formSelector: string, options: IValidatorOptions) {
    this.form = document.querySelector(formSelector || '[data-form]')
    this.form.setAttribute('novalidate', 'true')
    this.submitButton = this.form.querySelector('[type="submit"]')
    const {
      errorMessageSelector,
      disabledClass,
      rowSelector,
      errorClass,
      successClass,
      clearOnEmpty,
      validateEvent,
    } = options
    if (errorMessageSelector) {
      this.errorMessageSelector = errorMessageSelector
    }
    if (rowSelector) {
      this.rowSelector = rowSelector
    }
    if (errorClass) {
      this.errorClass = errorClass
    }
    if (successClass) {
      this.successClass = successClass
    }
    if (clearOnEmpty) {
      this.clearOnEmpty = clearOnEmpty
    }
    if (validateEvent) {
      this.validateEvent = validateEvent
    }
    if (disabledClass) {
      this.disabledClass = disabledClass
    }
    this._mapInputs()
    this._addValidationEvents()
    this.formIsValid = this.validateSilent()
    this.checkButton()
  }

  checkButton() {
    this.submitButton.classList.toggle(this.disabledClass, !this.formIsValid)
    this.submitButton.toggleAttribute('disabled', !this.formIsValid)
  }

  _addValidateEventOnInput(inputField: HTMLElement, event: any) {
    inputField.addEventListener(this.validateEvent, event)
  }

  _addValidationEvents() {
    this.inputs.forEach((inputRow) => {
      let alreadAddedEvent = false
      Object.keys(validationRules).forEach((rule) => {
        const ruleAttribute = `${ValidationDataPrefix}${rule}`
        const hasAttribute = inputRow.input.hasAttribute(ruleAttribute)
        const attributeValue = inputRow.input.getAttribute(ruleAttribute)
        const errorMessage = inputRow.input.getAttribute(`${ruleAttribute}${ValidationMessageSufix}`)
        if (hasAttribute) {
          inputRow.rules.push({
            validateFunction: validationRules[rule],
            parameter: ALLOWED_ATTRIBUTES.includes(rule) ? attributeValue : null,
            errorMessage: errorMessage || 'Campo inválido',
          })
          if (!alreadAddedEvent) {
            this._addValidateEventOnInput(inputRow.input, (event) => {
              const { value } = event.target as HTMLInputElement
              if (this.clearOnEmpty && value.length === 0) {
                this._clearMessageError(inputRow.name)
              } else {
                this.validateField(inputRow)
              }
              this.formIsValid = this.validateSilent()
              this.checkButton()
            })
            alreadAddedEvent = true
          }
        }
      })
    })
  }

  validateField(inputRow: IValidatorInput, silent = false) {
    const { value, name } = inputRow.input
    const { rules } = inputRow
    return rules.every((rule) => {
      const { validateFunction, parameter, errorMessage } = rule
      const isValid = parameter ? validateFunction(value, parameter) : validateFunction(value)
      if (!silent && inputRow.row.classList.contains(this.errorClass)) {
        this._clearMessageError(name)
      }
      if (!silent && !isValid) {
        this._setErrorMessage(name, errorMessage)
      }
      return isValid
    })
  }

  validate() {
    const validations = this.inputs.map((inputRow) => this.validateField(inputRow, false))
    const isValid = validations.filter((isValid) => !isValid)
    this.formIsValid = isValid.length === 0
    /* istanbul ignore else */
    if (!this.formIsValid) {
      let focusOnFirstField = false
      validations.forEach((isValid, index: number) => {
        if (!isValid && !focusOnFirstField) {
          this.inputs[index].input.focus()
          focusOnFirstField = true
        }
        return
      })
    }
    return this.formIsValid
  }

  validateSilent() {
    const validations = this.inputs.map((inputRow) => this.validateField(inputRow, true))
    const isValid = validations.filter((isValid) => !isValid)
    this.formIsValid = isValid.length === 0
    return this.formIsValid
  }

  _mapInputs() {
    const inputs: NodeListOf<Element> = document.querySelectorAll(this.rowSelector)
    inputs.forEach((inputRow) => {
      const inputField: HTMLInputElement = inputRow.querySelector(this.inputSelector)
      if (inputField.hasAttribute('disabled') || inputField.type === 'hidden') {
        return
      }
      const inputFieldName = inputField.getAttribute('name')
      const errorField: HTMLElement = inputRow.querySelector(this.errorMessageSelector)
      this.inputs.push({
        name: inputFieldName,
        input: inputField,
        error: errorField,
        row: inputRow,
        rules: [],
      })
    })
  }

  _setErrorMessage(fieldName: string, message: string) {
    const inputField = this.inputs.filter((input) => input.name === fieldName).shift()
    inputField.row.classList.add(this.errorClass)
    inputField.error.innerText = message
  }

  _clearMessageError(fieldName: string) {
    const inputField = this.inputs.filter((input) => input.name === fieldName).shift()
    inputField.row.classList.remove(this.errorClass)
    inputField.error.innerText = ''
  }

  _clearErrors() {
    this.inputs.forEach((input) => {
      input.error.innerText = ''
    })
  }
}
