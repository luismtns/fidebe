import { Meta, StoryObj } from '@storybook/react-vite'
import { FidebeWidget } from './index'

import { action } from 'storybook/actions'

const meta = {
  title: 'Components/FidebeWidget',
  component: FidebeWidget,
} satisfies Meta<typeof FidebeWidget>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Feedback',
    onSubmit: (data) => {
      action('onSubmit')(data)
    },
    onImageUpload: (formData) => {
      const images: string[] = []
      formData.forEach((value, key) => {
        if (key === 'images' && value instanceof File) {
          images.push(value.name)
        }
      })
      action('onImageUpload')(images)
    },
    extraContext: {
      userId: '123',
      sessionId: 'abc',
    },
  },
  parameters: {
    actions: {
      argTypesRegex: '^on.*',
    },
  },
  render: (args) => <FidebeWidget {...args} />,
}
