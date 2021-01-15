const regex = {
  routeParam: /\/(?<param>:[^\/]+)/g,
}

export class Router {
  routes = []
  currentPath = '/'

  constructor() {
    const { pathname } = window.location
    this.currentPath = pathname
  }

  _mapRoutesToAdd(routes) {
    return routes.map((route) => {
      let newRoute = route
      const matchAllResult = newRoute.matchAll(regex.routeParam)
      for (const result of matchAllResult) {
        if (result && result.groups) {
          const { param } = result.groups
          newRoute = newRoute.replace(new RegExp(param, 'g'), '([^/]+)')
        }
      }
      return newRoute === '/' ? '^/$' : newRoute
    })
  }

  add(routesPath, callback) {
    let newRoute = this._mapRoutesToAdd(typeof routesPath === 'object' ? routesPath : [routesPath])
    this.routes.push({
      uris: newRoute,
      callback,
    })
  }

  matchRoutes() {
    return this.routes.filter((route) => route.uris.filter((uri) => this.currentPath.match(new RegExp(uri))).length > 0)
  }

  execute() {
    const matchedRoutes = this.matchRoutes()
    matchedRoutes.forEach((route) => setTimeout(route.callback, 0))
  }
}
