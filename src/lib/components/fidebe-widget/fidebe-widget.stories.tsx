import { FidebeWidget } from './index'

export default {
  title: 'Components/FidebeWidget',
  component: FidebeWidget,
  args: {
    endpoint: '/api/feedback',
  },
}

export const Default = (args) => <FidebeWidget {...args} />
