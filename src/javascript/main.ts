import { ready, Router, LocalStorage } from '@/javascript/modules'
import { stateKeyName } from '@/javascript/config'

const setInitState = () => {
  console.log('--- CREATING STATE ---')
  LocalStorage.setItem(stateKeyName, [
    {
      name: 'My name 1',
      cpf: '04080757247',
      phone: '11987654321',
      email: 'myemail1@test.com.br',
    },
    {
      name: 'My name 2',
      cpf: '77797584192',
      phone: '11987654321',
      email: 'myemail2@test.com.br',
    },
    {
      name: 'My name 3',
      cpf: '45486737688',
      phone: '11987654321',
      email: 'myemail3@test.com.br',
    },
  ])
}

const checkExistState = () => {
  const memberList = LocalStorage.getItem(stateKeyName)
  if (!memberList || memberList.length === 0) {
    setInitState()
  }
}

ready(() => {
  console.log('--- PAGE READY ---')
  checkExistState()

  const router = new Router()
  router.add(['/', '/index.html'], () => {
    document.title = `${document.title} - Listagem`
    import(/* webpackChunkName: "homepage" */ './pages/homepage').then((module) => {
      const fn = module.default
      fn()
    })
  })
  router.add(['/create.html', '/create', '/update.html', '/update'], () => {
    document.title = `${document.title} - Atualizando`
    import(/* webpackChunkName: "member" */ './pages/member').then((module) => {
      const fn = module.default
      fn()
    })
  })
  router.execute()
})
