const regex = {
  routeParam: /\/(?<param>:[^\\/]+)/,
}

export class Router {
  routes = []
  currentPath = '/'

  constructor() {
    const { pathname } = window.location
    this.currentPath = pathname
  }

  _mapRoutesToAdd(routes: string[]) {
    return routes.map((route: string) => {
      let newRoute: string = route.toString()
      const matchResult = newRoute.match(regex.routeParam)
      if (matchResult?.groups) {
        const { param } = matchResult.groups
        newRoute = newRoute.replace(new RegExp(param, 'g'), '([^/]+)')
      }
      return newRoute === '/' ? '^/$' : newRoute
    })
  }

  add(routesPath: string[] | string, callback: VoidFunction) {
    const newRoute = this._mapRoutesToAdd(typeof routesPath === 'object' ? routesPath : [routesPath])
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
