import { Validator } from '@/javascript/modules'

const options = {
  loadingSelector: 'o-loading',
  fieldRowSelector: '[data-field-row]',
  dirtyClass: 'is-dirty',
}

export class Form {
  validator = null
  isLoading = false

  constructor({ callback, formSelector = '[data-form]', options = {} } = {}) {
    this.validator = new Validator(formSelector, options)
    if (callback) {
      this.addSubmitEvent(callback)
    }
  }

  addSubmitEvent(callback) {
    this.validator.submitButton.addEventListener('click', (event) => {
      event.preventDefault()
      if (this.isLoading === false && this.validator.validate()) {
        this.setLoading(true)
        callback(event, this.validator.form)
      }
    })
  }

  getFormDataByElements(elementsArray = []) {
    const formData = {}
    elementsArray.forEach((input) => {
      const { value, name } = input
      formData[name] = value
    })
    return formData
  }

  disableFields(disabled = true, inputs = []) {
    inputs.forEach((input) => {
      if (disabled) {
        input.setAttribute('disabled', 'true')
      } else {
        input.removeAttribute('disabled')
      }
    })
  }

  setLoading(show = true) {
    const loading = this.validator.submitButton.querySelector(`.${options.loadingSelector}`)
    if (show === false && loading) {
      this.isLoading = false
      loading.remove()
    } else if (show && !loading) {
      this.isLoading = true
      const newLoading = document.createElement('span')
      newLoading.classList.add(options.loadingSelector)
      this.validator.submitButton.insertAdjacentElement('afterbegin', newLoading)
    }
  }

  setFieldValue(fieldName, value) {
    const input = document.querySelector(`input[name="${fieldName}"]`)
    if (input) {
      input.value = value
      const inputRow = input.closest(options.fieldRowSelector)
      inputRow.classList.add(options.dirtyClass)
    }
  }

  clean() {
    this.validator.form.reset()
    this.validator.inputs.forEach((inputRow) => {
      const fatherElement = inputRow.input.closest(options.fieldRowSelector)
      fatherElement.classList.remove(options.dirtyClass)
    })
  }
}
