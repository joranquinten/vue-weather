import { weatherFormatter } from '../../../src/utils/formatters'

const mockWeather = {
  currently: {
    icon: 'partly-cloudy-day',
    summary: 'Licht bewolkt',
    temperature: 12.91,
    time: 1555403544
  },
  daily: {
    data: [
      {
        icon: 'icon-day-one',
        summary: 'Dag 1',
        temperatureHigh: 20.41,
        temperatureLow: 8.57,
        time: 1555365600000
      },
      {
        icon: 'icon-day-two',
        summary: 'Dag 2',
        temperatureHigh: 10.17,
        temperatureLow: -1.24,
        time: 1555452000000
      }
    ]
  },
  latitude: 51.613358399999996,
  longitude: 5.5310954
}

describe('weatherFormatter', () => {
  it('should return undefined when nothing provided', () => {
    expect(weatherFormatter()).not.toBeDefined()
  })

  it("should return the daily format when no type or 'current' is provided", () => {
    expect(weatherFormatter(mockWeather)).toMatchSnapshot()
    expect(weatherFormatter(mockWeather, 'current')).toMatchSnapshot()
  })

  it("should return the daily format when 'daily' is provided", () => {
    expect(weatherFormatter(mockWeather, 'daily')).toMatchSnapshot()
  })

  it('should return something when a nonexistent type is provided', () => {
    expect(weatherFormatter(mockWeather, 'DOES_NOT_EXIST')).not.toBeDefined()
  })
})
