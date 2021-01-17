import { Form, Masker } from '@/javascript/modules'
import { createMember } from '@/javascript/modules/memberCrud'
import Textfield from '@/styles/components/src/textfield/textfield'

const formInstance = new Form()
const maker = new Masker()

const actions = {
  create: (event, form) => {
    const { elements } = form
    const { name, email, cpf, phone } = elements
    const arrayFields = [name, email, cpf, phone]
    formInstance.disableFields(true, arrayFields)
    const formData = formInstance.getFormDataByElements(arrayFields)
    setTimeout(() => {
      formData.cpf = formData.cpf.replace(/[^\d]+/g, '')
      formData.phone = formData.phone.replace(/[^\d]+/g, '')
      createMember(formData)
      formInstance.clean()
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
