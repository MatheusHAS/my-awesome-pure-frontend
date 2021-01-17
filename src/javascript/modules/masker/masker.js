import Rules from './rules'

const options = {
  maskPrefix: 'data-masker-',
}

export class Masker {
  constructor() {
    this._findFieldsToMask()
  }

  _findFieldsToMask() {
    Object.keys(Rules).forEach((rule) => {
      const elements = document.querySelectorAll(`[${options.maskPrefix}${rule}]`)
      elements.forEach((element) => this._applyRules(element, Rules[rule]))
    })
  }

  _applyRules(element, rule) {
    element.placeholder = rule.mask
    element.setAttribute('maxlength', rule.mask.length)
    element.addEventListener('keydown', rule.event)
  }
}
