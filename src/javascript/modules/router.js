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
      return newRoute
    })
  }

  add(routesPath, callback, exact = false) {
    let routes = [routesPath]
    if (typeof routesPath === 'object') {
      routes = this._mapRoutesToAdd(routesPath)
    } else {
      routes = this._mapRoutesToAdd(routes)
    }
    this.routes.push({
      uris: routes,
      callback,
    })
  }

  matchRoutes() {
    return this.routes.filter((route) => route.uris.filter((uri) => this.currentPath.match(new RegExp(uri))).length > 0)
  }

  execute() {
    console.log('execute the router')
    console.log(this.routes)
    const matchedRoutes = this.matchRoutes()
    console.log('matchedRoutes', matchedRoutes)
    matchedRoutes.forEach((route) => setTimeout(route.callback, 0))
  }
}
