import { shallowMount, mount } from '@vue/test-utils'
import LocationPicker from '../../../src/components/LocationPicker'

describe('LocationPicker.vue', () => {
  it('renders without crashing', () => {
    const wrapper = shallowMount(LocationPicker)
    expect(wrapper).toMatchSnapshot()
  })

  it('renders props.location when passed', () => {
    const wrapper = shallowMount(LocationPicker, {
      propsData: {
        location: {
          latitude: 1,
          longitude: 2
        }
      }
    })
    expect(wrapper.props().location.latitude).toBe(1)
    expect(wrapper.props().location.longitude).toBe(2)

    expect(wrapper).toMatchSnapshot()
  })

  it('should emit the locationChange event on update', () => {
    const wrapper = mount(LocationPicker, {
      propsData: {
        location: {
          latitude: 1,
          longitude: 2
        }
      }
    })

    wrapper.vm.updateAction()

    expect(wrapper.emitted()['location-change'][0]).toEqual([
      { latitude: 1, longitude: 2 }
    ])
  })
})
