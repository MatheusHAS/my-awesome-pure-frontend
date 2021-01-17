import { Form, Masker, Formatter } from '@/javascript/modules'
import { createMember, getMemberByEmail, updateMemberByEmail } from '@/javascript/modules/memberCrud'
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
  update: (event, form) => {
    const { elements } = form
    const { name, email, cpf, phone } = elements
    const arrayFields = [name, email, cpf, phone]
    formInstance.disableFields(true, arrayFields)
    const formData = formInstance.getFormDataByElements(arrayFields)
    setTimeout(() => {
      formData.cpf = formData.cpf.replace(/[^\d]+/g, '')
      formData.phone = formData.phone.replace(/[^\d]+/g, '')
      updateMemberByEmail(formData.email, formData)
      formInstance.disableFields(false, arrayFields)
      formInstance.setLoading(false)
    }, 2000)
  },
}

const loadMemberData = () => {
  const { search } = window.location
  const urlSearch = new URLSearchParams(search)
  const memberEmail = urlSearch.get('email')
  if (!memberEmail) {
    window.location.pathname = '/index.html'
    return
  }
  const member = getMemberByEmail(memberEmail)
  formInstance.setFieldValue('name', member.name)
  formInstance.setFieldValue('email', member.email)
  formInstance.setFieldValue('cpf', Formatter.cpf(member.cpf))
  formInstance.setFieldValue('phone', Formatter.phone(member.phone))
  formInstance.validator.validate()
  formInstance.validator.checkButton()
}

const memberCrudPage = () => {
  Textfield.mount()
  const formAction = formInstance.validator.form.getAttribute('data-form')
  if (!actions.hasOwnProperty(formAction)) {
    throw new Error('"data-form" not is valid action')
  }
  if (formAction === 'update') {
    loadMemberData()
  }
  formInstance.addSubmitEvent(actions[formAction])
}

export default memberCrudPage
