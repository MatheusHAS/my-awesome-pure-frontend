import { LocalStorage } from '@/javascript/modules'
import { removeMemberByEmail } from '@/javascript/modules/memberCrud'
import { stateKeyName } from '@/javascript/config'

const elements = {
  list: document.querySelector('.c-card-list'),
}

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

const loadMembersList = () => {
  const memberList = LocalStorage.getItem(stateKeyName)
  console.log(memberList)
  if (elements.list) {
    elements.list.innerHTML = ''
    const contentFragment = document.createDocumentFragment()

    memberList.forEach((member) => {
      const newCard = createCardItem(member)
      contentFragment.append(newCard)
    })

    if (contentFragment && contentFragment.childElementCount > 0) {
      elements.list.appendChild(contentFragment)
    }
  }
}

const onRemoveMember = (email) => {
  if (confirm('Você gostaria de apagar o membro selecionado?')) {
    removeMemberByEmail(email)
    loadMembersList()
  }
}

const createCardItem = (member) => {
  const { name, email, cpf, phone } = member

  const mainElement = document.createElement('div')
  mainElement.classList.add(options.cardList.item)

  const header = document.createElement('div')
  header.classList.add(options.cardList.header)

  const headerRemoveLink = document.createElement('a')
  headerRemoveLink.innerText = 'Remover'
  headerRemoveLink.addEventListener('click', (event) => {
    event.preventDefault()
    onRemoveMember(email)
  })

  header.appendChild(headerRemoveLink)
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
  liEmailIcon.innerText = 'ICON'

  const liEmailText = document.createElement('span')
  liEmailText.innerText = email

  liEmail.appendChild(liEmailIcon)
  liEmail.appendChild(liEmailText)

  // LI > cpf
  const liCpf = document.createElement('li')
  liCpf.classList.add(options.cardList.details)

  const liCpfIcon = document.createElement('span')
  liCpfIcon.innerText = 'ICON'

  const liCpfText = document.createElement('span')
  liCpfText.innerText = cpf

  liCpf.appendChild(liCpfIcon)
  liCpf.appendChild(liCpfText)

  // LI > phone
  const liPhone = document.createElement('li')
  liPhone.classList.add(options.cardList.details)

  const liPhoneIcon = document.createElement('span')
  liPhoneIcon.innerText = 'ICON'

  const liPhoneText = document.createElement('span')
  liPhoneText.innerText = phone

  liPhone.appendChild(liPhoneIcon)
  liPhone.appendChild(liPhoneText)

  detailList.appendChild(liEmail)
  detailList.appendChild(liCpf)
  detailList.appendChild(liPhone)

  content.appendChild(detailList)

  mainElement.appendChild(content)

  return mainElement
}

const homepage = () => {
  loadMembersList()
}

export default homepage
