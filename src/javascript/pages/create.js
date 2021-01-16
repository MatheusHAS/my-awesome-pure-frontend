import { Form } from '@/javascript/modules'
import Textfield from '@/styles/components/src/textfield/textfield'

const formInstance = new Form()

const actions = {
  create: (event, form) => {
    const { elements } = form
    const { name, email, cpf, phone } = elements
    const arrayFields = [name, email, cpf, phone]
    formInstance.disableFields(true, arrayFields)
    const formData = formInstance.getFormDataByElements(arrayFields)
    console.log(formData)
    setTimeout(() => {
      formInstance.disableFields(false, arrayFields)
      formInstance.setLoading(false)
    }, 2000)
  },
}

const createPage = () => {
  Textfield.mount()
  const formAction = formInstance.validator.form.getAttribute('data-form')
  if (!actions.hasOwnProperty(formAction)) {
    throw new Error('"data-form" not is valid action')
  }
  formInstance.addSubmitEvent(actions[formAction])
}

export default createPage
