import { shallowMount } from '@vue/test-utils'
import WeatherDaily from '../../../src/components/WeatherDaily'

const dailyMock = [
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

describe('WeatherDaily.vue', () => {
  it('renders without crashing', () => {
    const wrapper = shallowMount(WeatherDaily)
    expect(wrapper).toMatchSnapshot()
  })

  it('renders props.daily when passed', () => {
    const wrapper = shallowMount(WeatherDaily, {
      propsData: {
        daily: [dailyMock]
      }
    })

    expect(wrapper).toMatchSnapshot()
  })
})
