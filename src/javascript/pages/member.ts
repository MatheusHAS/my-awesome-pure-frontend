import { Form, Masker, Formatter } from '@/javascript/modules'
import { createMember, getMemberByEmail, updateMemberByEmail } from '@/javascript/modules/memberCrud'
import Textfield from '@/styles/components/src/textfield/textfield'
import { getMemberEmailFromParam } from '@/javascript/utils'
import Toast from '@/javascript/modules/toast'

const formInstance = new Form()
const masker = new Masker()

const actions: any = {
  create: (event: VoidFunction, form: HTMLFormElement) => {
    const { elements } = form
    const { name, email, cpf, phone }: any = elements
    const arrayFields: any[] = [name, email, cpf, phone]
    formInstance.disableFields(true, arrayFields)
    const formData: any = formInstance.getFormDataByElements(arrayFields)
    // To show Loading on button :)
    setTimeout(() => {
      formData.cpf = formData.cpf.replace(/[^\d]+/g, '')
      formData.phone = formData.phone.replace(/[^\d]+/g, '')
      createMember(formData)
      formInstance.clean()
      formInstance.disableFields(false, arrayFields)
      formInstance.setLoading(false)
      Toast.notify({
        message: 'Membro criado com sucesso!',
        type: 'success',
        iconHTML: '<span class="fi flaticon-check"></span>',
      })
    }, 2000)
  },
  update: (event: VoidFunction, form: HTMLFormElement) => {
    const { elements } = form
    const { name, cpf, phone }: any = elements
    const arrayFields = [name, cpf, phone]
    formInstance.disableFields(true, arrayFields)
    const formData: any = formInstance.getFormDataByElements(arrayFields)

    // To show Loading on button :)
    setTimeout(() => {
      formData.cpf = formData.cpf.replace(/[^\d]+/g, '')
      formData.phone = formData.phone.replace(/[^\d]+/g, '')
      const memberEmail = getMemberEmailFromParam()
      updateMemberByEmail(memberEmail, formData)
      formInstance.disableFields(false, arrayFields)
      formInstance.setLoading(false)
      Toast.notify({
        message: 'Dados atualizados com sucesso!',
        type: 'success',
        iconHTML: '<span class="fi flaticon-check"></span>',
      })
    }, 2000)
  },
}

const loadMemberData = () => {
  const memberEmail = getMemberEmailFromParam()
  const member = getMemberByEmail(memberEmail)
  if (!memberEmail || !member) {
    window.location.pathname = '/index.html'
    return
  }
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
