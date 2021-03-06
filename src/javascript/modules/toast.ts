export type ToastType = 'error' | 'success' | 'warning'

const ClassMap = {
  toastList: 'c-toast__list',
  component: 'c-toast',
  icon: 'c-toast__icon',
  closeButton: 'c-toast__close',
  onRemoving: 'on-removing',
  progressClass: 'c-toast__progress',
}

const Options = {
  fadeOutTime: 500,
  autoremoveNotifyTime: 8000,
}

interface IToastMaker {
  title?: string
  message?: string
  type: ToastType
  iconHTML?: string
}

const eventOnCloseClick = (event) => {
  event.preventDefault()
  const targetElement = event.target as HTMLDivElement
  targetElement.closest(`.${ClassMap.component}`).classList.add(ClassMap.onRemoving)
  setTimeout(() => {
    targetElement.closest(`.${ClassMap.component}`).remove()
  }, Options.fadeOutTime)
}

const MakeToastElement = ({ title, message, type, iconHTML }: IToastMaker) => {
  const component = document.createElement('div')
  component.classList.add(...[ClassMap.component, `is-${type}`])
  component.setAttribute('data-testid', 'toast')

  const container = document.createElement('div')
  container.classList.add(...['u-flex', 'u-flex-row', 'u-w-100', 'u-relative', 'u-items-center'])

  /* istanbul ignore else */
  if (iconHTML) {
    const icon = document.createElement('div')
    icon.classList.add(...[ClassMap.icon, 'u-mr-12'])
    icon.innerHTML = iconHTML
    container.appendChild(icon)
  }

  const content = document.createElement('div')
  content.classList.add(...['u-flex', 'u-flex-column'])

  /* istanbul ignore else */
  if (title) {
    const spanTitle = document.createElement('span')
    spanTitle.classList.add('u-fs-18')
    spanTitle.innerText = title
    spanTitle.setAttribute('data-testid', 'toast-title')
    content.appendChild(spanTitle)
  }

  /* istanbul ignore else */
  if (message) {
    const spanMessage = document.createElement('span')
    spanMessage.classList.add('u-fs-15')
    spanMessage.innerText = message
    spanMessage.setAttribute('data-testid', 'toast-message')
    content.appendChild(spanMessage)
  }

  const closeButton = document.createElement('button')
  closeButton.classList.add(...['o-button', ClassMap.closeButton])
  closeButton.innerText = 'x'
  closeButton.addEventListener('click', eventOnCloseClick)
  closeButton.setAttribute('data-testid', 'toast-close')

  const progressBar = document.createElement('div')
  progressBar.classList.add(ClassMap.progressClass)

  container.appendChild(content)
  container.appendChild(closeButton)

  component.appendChild(container)
  component.appendChild(progressBar)

  return component
}

const MakeToastListBox = () => {
  const toastListBox = document.createElement('div')
  toastListBox.classList.add(ClassMap.toastList)
  return toastListBox
}

const AutoRemoveNotify = (element: any) => {
  /* istanbul ignore else */
  if (element) {
    element.remove()
  }
}

const Toast = {
  notify(options: IToastMaker) {
    const elementToast = MakeToastElement(options)

    let elementToastList = document.querySelector(`.${ClassMap.toastList}`)
    if (elementToastList) {
      const elementToRemove = elementToastList.appendChild(elementToast)
      setTimeout(() => {
        AutoRemoveNotify(elementToRemove)
      }, Options.autoremoveNotifyTime)
    } else {
      elementToastList = MakeToastListBox()
      elementToastList.appendChild(elementToast)
      const elementToRemove = document.body.appendChild(elementToastList)
      setTimeout(() => {
        AutoRemoveNotify(elementToRemove)
      }, Options.autoremoveNotifyTime)
    }
  },
}

export { Toast }
export default Toast
