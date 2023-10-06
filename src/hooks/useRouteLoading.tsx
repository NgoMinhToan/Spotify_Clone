// import { useState, useEffect } from 'react'
import { Route } from 'react-router-dom'
import routes from '../constants/route'

const useRouteLoading = () => {
  const toRouteJSX = (routeList: TRoutes[]) => {
      return routeList.map(({ path, component, route }) => {
        return <Route key={path} path={path} element={component}>
          {toRouteJSX(route || [])}
        </Route>
    })
  }

  return toRouteJSX(routes)
}

export default useRouteLoading