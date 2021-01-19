import { ready } from './ready'

jest.useFakeTimers()

describe('Testing [Ready] module', () => {
  test('Should use ready module', () => {
    const readyCallback = jest.fn()
    ready(readyCallback)
    jest.runOnlyPendingTimers()
    expect(readyCallback).toBeCalled()
  })

  test('Should use ready module without callback', () => {
    expect(ready(null)).toBeUndefined()
  })
})
