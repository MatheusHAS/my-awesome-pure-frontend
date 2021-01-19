import validationRules from './validation-rules'

const ALLOWED_ATTRIBUTES = ['minlength', 'maxlength']
const ValidationDataPrefix = 'data-validate-'
const ValidationMessageSufix = '-message'

let ClassMap = {
  errorMessageSelector: '[data-error-message]',
  rowSelector: '[data-field-row]',
  inputSelector: '[data-field-input]',
  errorClass: 'has-error',
  successClass: 'has-success',
  validateEvent: 'keyup',
  disabledClass: 'c-button--disabled',
}

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
  readonly submitButton: Element | HTMLElement | null = null
  formIsValid: boolean = false
  private readonly clearOnEmpty: boolean = true
  inputs: IValidatorInput[] = []

  constructor(formSelector: string, options: IValidatorOptions) {
    this.form = document.querySelector(formSelector || '[data-form]')
    this.form.setAttribute('novalidate', 'true')
    this.submitButton = this.form.querySelector('[type="submit"]')
    if (options.clearOnEmpty) {
      this.clearOnEmpty = options.clearOnEmpty
    }
    /* istanbul ignore else */
    if (options) delete options.clearOnEmpty
    ClassMap = Object.assign(ClassMap, options)
    this._mapInputs()
    this._addValidationEvents()
    this.formIsValid = this.validateSilent()
    this.checkButton()
  }

  checkButton() {
    this.submitButton.classList.toggle(ClassMap.disabledClass, !this.formIsValid)
    // this.submitButton.toggleAttribute('disabled', !this.formIsValid)
  }

  private _addValidateEventOnInput(inputField: HTMLElement, event: any) {
    inputField.addEventListener(ClassMap.validateEvent, event)
  }

  private _addValidationEvents() {
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

  private validateField(inputRow: IValidatorInput, silent = false) {
    const { value, name } = inputRow.input
    const { rules } = inputRow
    return rules.every((rule) => {
      const { validateFunction, parameter, errorMessage } = rule
      const isValid = parameter ? validateFunction(value, parameter) : validateFunction(value)
      if (!silent && inputRow.row.classList.contains(ClassMap.errorClass)) {
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

  private _mapInputs() {
    const inputs: NodeListOf<Element> = document.querySelectorAll(ClassMap.rowSelector)
    inputs.forEach((inputRow) => {
      const inputField: HTMLInputElement = inputRow.querySelector(ClassMap.inputSelector)
      if (inputField.hasAttribute('disabled') || inputField.type === 'hidden') {
        return
      }
      const inputFieldName = inputField.getAttribute('name')
      const errorField: HTMLElement = inputRow.querySelector(ClassMap.errorMessageSelector)
      this.inputs.push({
        name: inputFieldName,
        input: inputField,
        error: errorField,
        row: inputRow,
        rules: [],
      })
    })
  }

  private _setErrorMessage(fieldName: string, message: string) {
    const inputField = this.inputs.filter((input) => input.name === fieldName).shift()
    inputField.row.classList.add(ClassMap.errorClass)
    inputField.error.innerText = message
  }

  private _clearMessageError(fieldName: string) {
    const inputField = this.inputs.filter((input) => input.name === fieldName).shift()
    inputField.row.classList.remove(ClassMap.errorClass)
    inputField.error.innerText = ''
  }

  clearErrors() {
    this.inputs.forEach((input) => {
      input.error.innerText = ''
    })
  }
}
