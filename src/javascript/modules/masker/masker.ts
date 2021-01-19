import Rules from './rules'

const ClassMap = {
  maskPrefix: 'data-masker-',
}

export class Masker {
  constructor() {
    this._findFieldsToMask()
  }

  private _findFieldsToMask() {
    Object.keys(Rules).forEach((rule) => {
      const elements = document.querySelectorAll(`[${ClassMap.maskPrefix}${rule}]`)
      elements.forEach((element) => this._applyRules(element, Rules[rule]))
    })
  }

  private _applyRules(element, rule) {
    element.placeholder = rule.mask
    element.setAttribute('maxlength', rule.mask.length)
    element.addEventListener('keydown', rule.event)
  }
}
