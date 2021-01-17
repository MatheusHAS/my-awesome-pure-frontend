const DEFAULT_KEYS_IGNORE = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Backspace', 'Delete', 'Tab']
const DEFAULT_KEYS_ALLOWED_NUMBERS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

export default {
  cpf: {
    mask: '000.000.000-00',
    event: (event) => {
      let currentValue = event.target.value
      if (DEFAULT_KEYS_ALLOWED_NUMBERS.includes(event.key)) {
        if (![46, 8].includes(event.keyCode)) {
          if ([3, 7].includes(currentValue.length)) {
            event.target.value = `${currentValue}.`
          } else if ([11].includes(currentValue.length)) {
            event.target.value = `${currentValue}-`
          }
        }
      } else if (!DEFAULT_KEYS_IGNORE.includes(event.key)) {
        event.preventDefault()
      }
    },
  },
  phone: {
    mask: '(00) 99999-9999',
    event: (event) => {
      if (DEFAULT_KEYS_ALLOWED_NUMBERS.includes(event.key)) {
        const { selectionStart, value } = event.target
        if (selectionStart === 0) {
          event.target.value = `(${value}`
        } else if (selectionStart === 3) {
          event.target.value = `${value}) `
        } else if (selectionStart === 10) {
          event.target.value = `${value}-`
        }
      } else if (!DEFAULT_KEYS_IGNORE.includes(event.key)) {
        event.preventDefault()
      }
    },
  },
}
