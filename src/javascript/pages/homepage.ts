import { loadMembersList } from '@/javascript/utils'

const elements = {
  list: document.querySelector('.c-card-list'),
}

const homepage = () => {
  // To show Skeleton :)
  setTimeout(() => {
    loadMembersList(elements.list)
  }, 500)
}

export default homepage
