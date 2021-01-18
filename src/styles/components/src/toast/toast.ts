export type ToastType = 'error' | 'success' | 'warning'

const ClassMap = {
  toastList: 'c-toast__list',
  component: 'c-toast',
  icon: 'c-toast__icon',
  closeButton: 'c-toast__close',
  onRemoving: 'on-removing',
}

interface IToastMaker {
  title?: string
  message?: string
  type?: ToastType
  iconHTML?: string
}

const eventOnCloseClick = (event) => {
  event.preventDefault()
  const targetElement = event.target as HTMLDivElement
  targetElement.closest(`.${ClassMap.component}`).classList.add(ClassMap.onRemoving)
  setTimeout(() => {
    targetElement.closest(`.${ClassMap.component}`).remove()
  }, 500)
}

const MakeToastElement = ({ title, message, type, iconHTML }: IToastMaker) => {
  const component = document.createElement('div')
  component.classList.add(...[ClassMap.component, `is-${type}`])

  const container = document.createElement('div')
  container.classList.add(...['u-flex', 'u-flex-row', 'u-w-100', 'u-relative'])

  if (iconHTML) {
    const icon = document.createElement('div')
    icon.classList.add(...[ClassMap.icon, 'u-mr-12'])
    icon.innerHTML = iconHTML
    container.appendChild(icon)
  }

  const content = document.createElement('div')
  content.classList.add(...['u-flex', 'u-flex-column'])

  if (title) {
    const spanTitle = document.createElement('span')
    spanTitle.classList.add('u-fs-18')
    spanTitle.innerText = title
    content.appendChild(spanTitle)
  }

  if (message) {
    const spanMessage = document.createElement('span')
    spanMessage.classList.add('u-fs-15')
    spanMessage.innerText = message
    content.appendChild(spanMessage)
  }

  const closeButton = document.createElement('button')
  closeButton.classList.add(...['o-button', ClassMap.closeButton])
  closeButton.innerText = 'x'
  closeButton.addEventListener('click', eventOnCloseClick)

  container.appendChild(content)
  container.appendChild(closeButton)

  component.appendChild(container)

  return component
}

const MakeToastListBox = () => {
  const toastListBox = document.createElement('div')
  toastListBox.classList.add(ClassMap.toastList)
  return toastListBox
}

const Toast = {
  notify(options: IToastMaker) {
    const elementToast = MakeToastElement(options)

    let elementToastList = document.querySelector(`.${ClassMap.toastList}`)
    if (elementToastList) {
      elementToastList.appendChild(elementToast)
    } else {
      elementToastList = MakeToastListBox()
      elementToastList.appendChild(elementToast)
      document.body.appendChild(elementToastList)
    }
  },
}

export { Toast }
export default Toast
