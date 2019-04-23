import { getWeatherForecast } from '../../../src/utils/services'

const mockWeather = () => {
  let calls = 0
  calls++
  return {
    data: {
      called: calls,
      latitude: 51.613358399999996,
      longitude: 5.5310954,
      currently: {
        time: 1555403544,
        summary: 'Licht bewolkt',
        icon: 'partly-cloudy-day',
        temperature: 10.01
      },
      daily: {
        summary:
          'De hele week geen neerslag met temperaturen stijgend tot 26°C volgende dinsdag.',
        icon: 'clear-day',
        data: [
          {
            summary: 'Dag 1',
            time: 1555365600000,
            temperatureHigh: 20.41,
            temperatureLow: 8.57,
            icon: 'icon-day-one'
          },
          {
            summary: 'Dag 2',
            time: 1555452000000,
            temperatureHigh: 10.17,
            temperatureLow: -1.24,
            icon: 'icon-day-two'
          }
        ]
      }
    }
  }
}

jest.mock('axios', () => {
  return {
    get: () => Promise.resolve(mockWeather())
  }
})

const mockLocation = { latitude: 1, longitude: 2 }

describe('getWeatherForecast', () => {
  it('should return an object when calling the service', async () => {
    expect(await getWeatherForecast(mockLocation)).toEqual(mockWeather().data)
  })
})
