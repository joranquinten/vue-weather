import { shallowMount } from '@vue/test-utils'
import Loading from '../../../src/components/Loading'

describe('Loading.vue', () => {
  it('renders without crashing', () => {
    const wrapper = shallowMount(Loading)
    expect(wrapper).toMatchSnapshot()
  })

  it('renders props.message when passed', () => {
    const wrapper = shallowMount(Loading, {
      propsData: { message: 'test' }
    })
    expect(wrapper.props().message).toBe('test')

    expect(wrapper.find('.message').html()).toBe(
      '<span class="message">test</span>'
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('renders props.fillColor when passed', () => {
    const wrapper = shallowMount(Loading, {
      propsData: { fillColor: '#ff0000' }
    })

    expect(wrapper.props().fillColor).toBe('#ff0000')

    expect(wrapper).toMatchSnapshot()
  })
})
