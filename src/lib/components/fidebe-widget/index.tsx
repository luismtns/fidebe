import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/utils'
import { createConsoleRecorder, LogEntry } from '@/utils/console-recorder'
import { collectEnv, CollectEnvResult } from '@/utils/env'
import { MessageCircleIcon } from 'lucide-react'
import React, { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'

const recorder = createConsoleRecorder(400)

type FidebeFormData = {
  feedback: {
    description: string
    images: FileList | undefined
  }
  environment: CollectEnvResult
  logs: {
    count: number
    entries: LogEntry[]
  }
  context?: Record<string, any>
}
export interface FidebeWidgetProps {
  label?: string | React.ReactNode
  className?: string
  style?: React.CSSProperties

  dialogClassName?: string
  dialogStyle?: React.CSSProperties

  dialogTitle?: string | React.ReactNode
  dialogTitleClassName?: string
  dialogTitleStyle?: React.CSSProperties

  dialogDescription?: string | React.ReactNode
  dialogDescriptionClassName?: string
  dialogDescriptionStyle?: React.CSSProperties

  dialogDescriptionFieldLabel?: string | React.ReactNode
  dialogDescriptionFieldLabelClassName?: string
  dialogDescriptionFieldLabelStyle?: React.CSSProperties
  dialogDescriptionFieldPlaceholder?: string
  dialogDescriptionFieldError?: string
  dialogDescriptionFieldClassName?: string
  dialogDescriptionFieldStyle?: React.CSSProperties

  dialogImageFieldLabel?: string | React.ReactNode
  dialogImageFieldLabelClassName?: string
  dialogImageFieldLabelStyle?: React.CSSProperties
  dialogImageFieldPlaceholder?: string
  dialogImageFieldClassName?: string
  dialogImageFieldStyle?: React.CSSProperties

  dialogSend?: string | React.ReactNode
  dialogSendClassName?: string
  dialogSendStyle?: React.CSSProperties

  dialogCancel?: string | React.ReactNode
  dialogCancelClassName?: string
  dialogCancelStyle?: React.CSSProperties

  onSubmit?: (data: FidebeFormData) => void
  onImageUpload?: (formData: FormData) => void
  extraContext?: Record<string, any>
}

/**
 * Floating feedback widget for React applications.
 *
 * Provides a customizable button and modal for collecting user feedback, screenshots, images, and context data.
 *
 * Main props:
 * - onSubmit: Callback for feedback submission
 * - onImageUpload: Callback for image uploads
 * - extraContext: Additional context to include
 *
 * Styled with TailwindCSS and ShadCN UI.
 */
export function FidebeWidget({
  label = (
    <>
      <MessageCircleIcon />
      <span>Feedback</span>
    </>
  ),
  className,
  style,
  dialogTitle = 'Tell us whats is happening',
  dialogTitleClassName,
  dialogTitleStyle,
  dialogDescription = 'Please describe your feedback and attach any relevant screenshots.',
  dialogDescriptionClassName,
  dialogDescriptionStyle,
  dialogDescriptionFieldLabel = 'Description',
  dialogDescriptionFieldLabelClassName,
  dialogDescriptionFieldLabelStyle,
  dialogDescriptionFieldPlaceholder = 'Describe your feedback',
  dialogDescriptionFieldError = 'Description is required',
  dialogDescriptionFieldClassName,
  dialogDescriptionFieldStyle,
  dialogImageFieldLabel = 'Screenshot',
  dialogImageFieldLabelClassName,
  dialogImageFieldLabelStyle,
  dialogImageFieldPlaceholder = 'Upload your screenshot',
  dialogImageFieldClassName,
  dialogImageFieldStyle,
  dialogSend = 'Send Feedback',
  dialogSendClassName,
  dialogSendStyle,
  dialogCancel = 'Cancel',
  dialogCancelClassName,
  dialogCancelStyle,
  onSubmit,
  onImageUpload,
  extraContext,
}: FidebeWidgetProps) {
  const [open, setOpen] = React.useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  const form = useForm({
    defaultValues: {
      description: '',
      images: undefined,
    },
    mode: 'onSubmit',
  })

  async function handleOpen() {
    setOpen(true)
  }

  async function onFormSubmit(values: { description: string; images?: FileList }) {
    const envInfo = await collectEnv()
    const { logs } = recorder.getSnapshot()
    const feedback = { description: values.description, images: values.images }
    // Envia apenas os dados principais
    if (typeof onSubmit === 'function') {
      onSubmit({
        feedback,
        environment: envInfo,
        logs: { count: logs.length, entries: logs },
        context: extraContext,
      })
    }
    // Se houver imagens, dispara callback separado
    if (values.images && values.images.length > 0 && typeof onImageUpload === 'function') {
      const imageData = new FormData()
      Array.from(values.images).forEach((file) => imageData.append('images', file))
      onImageUpload(imageData)
    }
    setOpen(false)
    form.reset()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type='button'
          onClick={handleOpen}
          className={cn('fixed bottom-4 right-4 rounded-full shadow-lg', className)}
          style={style}>
          {label}
        </Button>
      </DialogTrigger>
      <DialogContent ref={modalRef}>
        <DialogHeader>
          <DialogTitle className={dialogTitleClassName} style={dialogTitleStyle}>
            {dialogTitle}
          </DialogTitle>
          <DialogDescription className={dialogDescriptionClassName} style={dialogDescriptionStyle}>
            {dialogDescription}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form className='flex flex-col gap-4' onSubmit={form.handleSubmit(onFormSubmit)}>
            <FormField
              control={form.control}
              name='description'
              rules={{ required: dialogDescriptionFieldError }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={dialogDescriptionFieldLabelClassName} style={dialogDescriptionFieldLabelStyle}>
                    {dialogDescriptionFieldLabel}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={dialogDescriptionFieldPlaceholder}
                      className={dialogDescriptionFieldClassName}
                      style={dialogDescriptionFieldStyle}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='images'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={dialogImageFieldLabelClassName} style={dialogImageFieldLabelStyle}>
                    {dialogImageFieldLabel}
                  </FormLabel>
                  <FormControl>
                    <Input
                      className={dialogImageFieldClassName}
                      style={dialogImageFieldStyle}
                      placeholder={dialogImageFieldPlaceholder}
                      type='file'
                      accept='image/*'
                      multiple
                      onChange={(e) => field.onChange(e.target.files)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex justify-end gap-2'>
              <Button
                variant={'ghost'}
                type='button'
                onClick={() => setOpen(false)}
                className={dialogCancelClassName}
                style={dialogCancelStyle}>
                {dialogCancel}
              </Button>
              <Button type='submit' className={dialogSendClassName} style={dialogSendStyle}>
                {dialogSend}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
