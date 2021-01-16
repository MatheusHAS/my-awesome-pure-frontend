import validationRules from './validation-rules'

const AllowedAttribute = ['minlength', 'maxlength']
const ValidationDataPrefix = 'data-validate-'
const ValidationMessageSufix = '-message'

export class Validator {
  form = null
  submitButton = null
  formIsValid = false
  errorMessageSelector = '[data-error-message]'
  rowSelector = '[data-field-row]'
  inputSelector = '[data-field-input]'
  errorClass = 'has-error'
  successClass = 'has-success'
  validateEvent = 'keyup'
  disabledClass = 'c-button--disabled'
  clearOnEmpty = true
  inputs = []

  constructor(formSelector, callback, options = {}) {
    this.form = document.querySelector(formSelector || '[data-form]')
    this.form?.setAttribute('novalidate', 'true')
    if (!this.form) {
      console.warn('Check if form exists or remove the validation dependecy.')
      return
    }
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
    this.submitButton.classList.toggle(this.disabledClass, !this.formIsValid)
  }

  _addValidateEventOnInput(inputField, event) {
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
            parameter: AllowedAttribute.includes(rule) ? attributeValue : null,
            errorMessage: errorMessage || 'Campo inválido',
          })
          if (!alreadAddedEvent) {
            this._addValidateEventOnInput(inputRow.input, (event) => {
              const { value } = event.target
              if (this.clearOnEmpty && value.length === 0) {
                this._clearMessageError(inputRow.name)
              } else {
                this.validateField(inputRow)
              }
              this.formIsValid = this.validate(true)
              this.submitButton.classList.toggle(this.disabledClass, !this.formIsValid)
            })
            alreadAddedEvent = true
          }
        }
      })
    })
  }

  validateField(inputRow, silent = false) {
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

  validate(silent = false) {
    const validations = this.inputs.map((inputRow) => this.validateField(inputRow, silent))
    const isValid = validations.filter((isValid) => isValid == false)
    this.formIsValid = isValid.length === 0
    return this.formIsValid
  }

  _mapInputs() {
    if (!this.form) {
      console.warn('The form dont be null or undefined')
      return
    }
    const inputs = document.querySelectorAll(this.rowSelector)
    inputs.forEach((inputRow) => {
      const inputField = inputRow.querySelector(this.inputSelector)
      const inputFieldName = inputField.getAttribute('name')
      const errorField = inputRow.querySelector(this.errorMessageSelector)
      this.inputs.push({
        name: inputFieldName,
        input: inputField,
        error: errorField,
        row: inputRow,
        rules: [],
      })
    })
  }

  _setErrorMessage(fieldName, message) {
    const inputField = this.inputs.filter((input) => input.name === fieldName)?.shift()
    if (!inputField) {
      console.warn(`[setMessageError]: '${fieldName}' field don't exists on mapped inputs.`)
      return
    }
    inputField.row.classList.add(this.errorClass)
    inputField.error.innerText = message
  }

  _clearMessageError(fieldName) {
    const inputField = this.inputs.filter((input) => input.name === fieldName)?.shift()
    if (!inputField) {
      console.warn(`[setMessageError]: '${fieldName}' field don't exists on mapped inputs.`)
      return
    }
    inputField.row.classList.remove(this.errorClass)
    inputField.error.innerText = ''
  }

  _clearErrors() {
    this.inputs.forEach((input) => {
      input.error.innerText = ''
    })
  }
}
