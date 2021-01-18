import { loadMembersList } from '@/javascript/utils'

const elements = {
  list: document.querySelector('.c-card-list'),
}

const homepage = () => {
  loadMembersList(elements.list)
}

export default homepage
