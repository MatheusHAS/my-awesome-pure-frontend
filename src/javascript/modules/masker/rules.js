export default {
  cpf: {
    mask: '000.000.000-00',
    event: (event) => {
      let currentValue = event.target.value
      if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(event.key)) {
        if (![46, 8].includes(event.keyCode)) {
          if ([3, 7].includes(currentValue.length)) {
            event.target.value = `${currentValue}.`
          } else if ([11].includes(currentValue.length)) {
            event.target.value = `${currentValue}-`
          }
        }
      } else if (
        !['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Backspace', 'Delete', 'Tab'].includes(event.key)
      ) {
        event.preventDefault()
      }
    },
  },
  phone: {
    mask: '(00) 99999-9999',
    event: (event) => {
      const { selectionStart, value } = event.target
      if (selectionStart === 0) {
        event.target.value = `(${value}`
      } else if (selectionStart === 3) {
        event.target.value = `${value}) `
      } else if (selectionStart === 10) {
        event.target.value = `${value}-`
      }
    },
  },
}
