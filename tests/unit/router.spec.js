import router from '../../src/router'

describe('router', () => {
  const routes = router.options.routes
  it('exposes the routes', () => {
    expect(routes.length).toBeGreaterThan(0)
  })

  it('should have a route available for the Weather view', () => {
    const weatherRoute = routes.filter(route => route.name === 'Weather')

    expect(
      weatherRoute.filter(route => route.name === 'Weather').length
    ).toEqual(1)

    expect(weatherRoute[0].path).toEqual('/:forecastType?')
    expect(weatherRoute[0].component.name).toEqual('Weather')
  })
})
