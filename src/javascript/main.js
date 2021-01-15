import { ready } from '@/javascript/modules/ready'
import { Router } from '@/javascript/modules/router'

ready(() => {
  console.log('--- PAGE READY ---')
  const router = new Router()
  router.add(['/'], () => {
    import(/* webpackChunkName: "homepage" */ './pages/homepage').then((module) => {
      const fn = module.default
      fn()
    })
  })
  router.add(['/create.html', '/create'], () => {
    import(/* webpackChunkName: "create" */ './pages/create').then((module) => {
      const fn = module.default
      fn()
    })
  })
  router.execute()
})
