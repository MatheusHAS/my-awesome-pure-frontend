import userEvent from '@testing-library/user-event'
import Toast from './toast'

jest.useFakeTimers()

const ClassMap = {
  toastList: '.c-toast__list',
  closeButton: '.c-toast__close',
  component: '.c-toast',
}

describe('Testing [Toast] module', () => {
  test('Should show notify on screen', () => {
    Toast.notify({
      title: 'test',
      message: 'Testing toast',
      type: 'success',
      iconHTML: 'ICON',
    })
    const toastListBox = document.querySelector(ClassMap.toastList)
    expect(toastListBox).not.toBeNull()

    const toastElement = document.querySelector(ClassMap.component)
    expect(toastElement).not.toBeNull()
  })

  test('Should remove notify when clicked on close', () => {
    let toastElement = document.querySelector(ClassMap.component)
    const closeButton = toastElement.querySelector(ClassMap.closeButton)

    userEvent.click(closeButton)
    jest.runAllTimers()
    toastElement = document.querySelector(ClassMap.component)

    expect(toastElement).toBeNull()
  })

  test('Should create two notifys', () => {
    Toast.notify({
      title: 'test',
      message: 'Testing toast',
      type: 'success',
      iconHTML: 'ICON',
    })
    Toast.notify({
      title: 'test 2',
      message: 'Testing toast 2',
      type: 'success',
      iconHTML: 'ICON 2',
    })
    const toastListBox = document.querySelector(ClassMap.toastList)
    expect(toastListBox).not.toBeNull()
    expect(toastListBox.childNodes.length).toBe(2)
  })
})
