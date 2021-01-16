import { Validator } from '@/javascript/modules'
import Textfield from '@/styles/components/src/textfield/textfield'

const createPage = () => {
  const validator = new Validator()
  Textfield.mount()
}

export default createPage
