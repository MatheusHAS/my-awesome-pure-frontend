import { Validator } from '@/javascript/modules'

const ClassMap = {
  loading: 'o-loading',
  fieldRow: '[data-field-row]',
  jsFloatField: '.js-float-field',
  dirty: 'is-dirty',
}

interface IForm {
  callback?: () => VoidFunction
  formSelector?: string
  options?: any
}

export class Form {
  validator = null
  isLoading = false

  constructor({ callback, formSelector = '[data-form]', options = {} }: IForm = {}) {
    this.validator = new Validator(formSelector, options)
    if (callback) {
      this.addSubmitEvent(callback)
    }
  }

  addSubmitEvent(callback) {
    this.validator.submitButton.addEventListener('click', (event: Event) => {
      event.preventDefault()
      if (!this.isLoading && this.validator.validate()) {
        this.setLoading(true)
        callback(event, this.validator.form)
      }
    })
  }

  getFormDataByElements(elementsArray: Array<NodeListOf<any>>) {
    const formData = {}
    elementsArray.forEach((input: any) => {
      const { value, name } = input
      formData[name] = value
    })
    return formData
  }

  disableFields(disabled: boolean, inputs: HTMLInputElement[]) {
    inputs.forEach((input) => {
      if (disabled) {
        input.setAttribute('disabled', 'true')
      } else {
        input.removeAttribute('disabled')
      }
    })
  }

  setLoading(show: boolean) {
    const loading = this.validator.submitButton.querySelector(`.${ClassMap.loading}`)
    if (!show && loading) {
      this.isLoading = false
      loading.remove()
    } else if (show && !loading) {
      this.isLoading = true
      const newLoading: HTMLSpanElement = document.createElement('span')
      newLoading.classList.add(ClassMap.loading)
      this.validator.submitButton.insertAdjacentElement('afterbegin', newLoading)
    }
  }

  setFieldValue(fieldName: string, value: any) {
    const input: HTMLInputElement = document.querySelector(`input[name="${fieldName}"]`)

    /* istanbul ignore else */
    if (input) {
      input.value = value
      const inputRow = input.closest(ClassMap.jsFloatField)
      inputRow.classList.add(ClassMap.dirty)
    }
  }

  clean() {
    this.validator.form.reset()
    this.validator.inputs.forEach((inputRow) => {
      const fatherElement = inputRow.input.closest(ClassMap.fieldRow)
      fatherElement.classList.remove(ClassMap.dirty)
    })
  }
}
