import { LocalStorage, Formatter } from '@/javascript/modules'
import { removeMemberByEmail } from '@/javascript/modules/memberCrud'
import { IMember } from '@/javascript/interfaces/IMember'
import { stateKeyName } from '@/javascript/config'
import Toast from '@/javascript/modules/toast'

const options = {
  cardList: {
    item: 'c-card-list__item',
    name: 'c-card-list__name',
    header: 'c-card-list__header',
    content: 'c-card-list__content',
    details: 'c-card-list__details',
  },
  objects: {
    list: 'o-list',
  },
}

const loadMembersList = (elementList: any) => {
  const memberList = LocalStorage.getItem(stateKeyName)
  if (elementList) {
    const contentFragment = document.createDocumentFragment()

    memberList.forEach((member: IMember) => {
      const newCard = createCardItem(member, () => {
        onRemoveMember(member.email, () => {
          Toast.notify({
            message: 'Membro excluido!',
            type: 'success',
            iconHTML: '<span class="fi flaticon-check"></span>',
          })
          loadMembersList(elementList)
        })
      })
      contentFragment.append(newCard)
    })

    elementList.innerHTML = ''
    if (contentFragment && contentFragment.childElementCount > 0) {
      elementList.appendChild(contentFragment)
    }
  }
}

const onRemoveMember = (email: string, callback: VoidFunction) => {
  if (confirm('Você gostaria de apagar o membro selecionado?')) {
    removeMemberByEmail(email)
    callback()
  }
}

const createCardItem = (member: IMember, removeCallback: VoidFunction) => {
  const { name, email, cpf, phone } = member

  const mainElement = document.createElement('div')
  mainElement.classList.add(options.cardList.item)

  const header = document.createElement('div')
  header.classList.add(options.cardList.header)

  const headerEditLink = document.createElement('a')
  headerEditLink.innerHTML = '<span class="fi flaticon-pencil"></span>'
  headerEditLink.classList.add('c-card-list__edit')
  headerEditLink.href = `/update.html?email=${email}`
  headerEditLink.setAttribute('data-testid', 'link-edit')

  const headerRemoveLink = document.createElement('a')
  headerRemoveLink.classList.add('c-card-list__remove')
  headerRemoveLink.innerHTML = '<span class="fi flaticon-x-mark"></span>'
  headerRemoveLink.addEventListener('click', (event) => {
    event.preventDefault()
    removeCallback()
  })
  headerRemoveLink.setAttribute('data-testid', 'link-remove')

  header.appendChild(headerRemoveLink)
  header.appendChild(headerEditLink)
  mainElement.appendChild(header)

  const content = document.createElement('div')
  content.classList.add(options.cardList.content)

  const nameElement = document.createElement('h2')
  nameElement.classList.add(options.cardList.name)
  nameElement.innerText = name

  content.appendChild(nameElement)

  const detailList = document.createElement('ul')
  detailList.classList.add(options.objects.list)

  // LI > email
  const liEmail = document.createElement('li')
  liEmail.classList.add(options.cardList.details)

  const liEmailIcon = document.createElement('span')
  liEmailIcon.innerHTML = '<span class="fi flaticon-email"></span>'

  const liEmailText = document.createElement('span')
  liEmailText.innerText = email

  liEmail.appendChild(liEmailIcon)
  liEmail.appendChild(liEmailText)

  // LI > cpf
  const liCpf = document.createElement('li')
  liCpf.classList.add(options.cardList.details)

  const liCpfIcon = document.createElement('span')
  liCpfIcon.innerHTML = '<span class="fi flaticon-identity-card"></span>'

  const liCpfText = document.createElement('span')
  liCpfText.innerText = Formatter.cpf(cpf)

  liCpf.appendChild(liCpfIcon)
  liCpf.appendChild(liCpfText)

  // LI > phone
  const liPhone = document.createElement('li')
  liPhone.classList.add(options.cardList.details)

  const liPhoneIcon = document.createElement('span')
  liPhoneIcon.innerHTML = '<span class="fi flaticon-smartphone"></span>'

  const liPhoneText = document.createElement('span')
  liPhoneText.innerText = Formatter.phone(phone)

  liPhone.appendChild(liPhoneIcon)
  liPhone.appendChild(liPhoneText)

  detailList.appendChild(liEmail)
  detailList.appendChild(liCpf)
  detailList.appendChild(liPhone)

  content.appendChild(detailList)

  mainElement.appendChild(content)

  return mainElement
}

const getMemberEmailFromParam = () => {
  const { search } = window.location
  const urlSearch = new URLSearchParams(search)
  const memberEmail = urlSearch.get('email')
  return memberEmail
}

export { loadMembersList, getMemberEmailFromParam }
