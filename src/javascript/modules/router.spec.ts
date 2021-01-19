import { Router } from './router'

jest.useFakeTimers()

describe('Testing [Router] module', () => {
  test('Should create instance of Router', () => {
    const router = new Router()
    expect(router).toBeInstanceOf(Router)
  })

  test('Should add route', () => {
    const router = new Router()
    router.add(['/'], jest.fn)
    expect(router.routes.length).toBe(1)
    expect(router.routes[0].uris[0]).toBe('^/$')
  })
  test('Should execute router', () => {
    const router = new Router()
    const callback = jest.fn()
    router.add(['/:any', '/'], callback)
    router.add('/teste', () => {})
    router.execute()
    jest.runOnlyPendingTimers()
    expect(callback).toHaveBeenCalled()
  })
})
