import { shallowMount, mount } from '@vue/test-utils'
// import mockNow from 'jest-mock-now'
import flushPromises from 'flush-promises'
import Weather from '../../../src/components/Weather'

const mockGeolocation = {
  getCurrentPosition: success =>
    success({
      coords: { latitude: 1, longitude: 2 }
    })
}

const mockComponents = {
  stubs: {
    Loading: "<div class='stub'>Loading</div>",
    WeatherDaily: "<div class='stub'>WeatherDaily</div>",
    'router-link': "<span class='stub'>RouterLink</span>"
  }
}

const mockWeather = {
  currently: {
    icon: 'partly-cloudy-day',
    summary: 'Licht bewolkt',
    temperature: 12.91,
    time: 1555403544
  },
  daily: [
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
  ],
  latitude: 51.613358399999996,
  longitude: 5.5310954
}

jest.mock('../../../src/utils/services', () => ({
  getWeatherForecast: () => Promise.resolve(mockWeather)
}))

// console.log(mockNow(new Date('2019-01-31')))
describe('Weather.vue', () => {
  it('renders without crashing', () => {
    const wrapper = shallowMount(Weather, mockComponents)
    expect(wrapper).toMatchSnapshot()
  })

  it('should display availability status based on presence of geolocation', () => {
    // Remove geolocation
    delete global.navigator.geolocation

    const wrapperWithoutGeoLocation = mount(Weather, {
      ...mockComponents,
      mocks: {
        $route: {
          params: { forecastType: '' }
        }
      }
    })
    expect(wrapperWithoutGeoLocation.vm.notAvailable).toEqual(true)

    // Restore geolocation
    global.navigator.geolocation = mockGeolocation

    const wrapperWithGeoLocation = mount(Weather, {
      ...mockComponents,
      mocks: {
        $route: {
          params: { forecastType: '' }
        }
      }
    })
    expect(wrapperWithGeoLocation.vm.notAvailable).toEqual(null)
  })

  it('should update the loading state when a request is made', async () => {
    const wrapper = mount(Weather, {
      ...mockComponents,
      mocks: {
        $route: {
          params: { forecastType: '' }
        }
      }
    })

    wrapper.vm.handleUpdateLocation({ latitude: 1, longitude: 2 })
    expect(wrapper.vm.loading).toEqual(true)
    await flushPromises()

    expect(wrapper.vm.loading).toEqual(false)
    expect(wrapper.vm.location).toEqual({ latitude: 1, longitude: 2 })

    expect(wrapper.vm.weather).toEqual(mockWeather)
  })

  it('should trigger a new weather request when the route changes', async () => {
    const wrapper = mount(Weather, {
      ...mockComponents,
      mocks: {
        $route: {
          params: { forecastType: '' }
        }
      }
    })
    wrapper.vm.$route.params.forecastType = 'daily'
  })
})
