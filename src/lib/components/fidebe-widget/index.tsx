import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import useScreenshotBehindModal from '@/hooks/useScreenshotBehindModal'
import { MessageCircleIcon } from 'lucide-react'
import type React from 'react'
import { useRef, useState } from 'react'
import { Button } from '../ui/button'

/**
 * Projeto: Fidebe Widget
 *
 * Biblioteca de componente React reutilizável que oferece um widget flutuante
 * para coleta de feedback com captura de tela. O objetivo é fornecer uma
 * experiência mínima e plugável para embutir em qualquer aplicação web.
 *
 * - Estilização com TailwindCSS + ShadCN UI.
 * - Captura de tela utilizando html2canvas.
 * - Modal com campo de descrição e upload de múltiplas imagens.
 * - Envio contendo texto, screenshots e informações de contexto para o endpoint
 *   informado via props.
 */
export interface FidebeWidgetProps {
  endpoint: string
  label?: string | React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export function FidebeWidget({
  endpoint,
  label = (
    <>
      <MessageCircleIcon />
      <span>Feedback</span>
    </>
  ),
  className,
  style,
}: FidebeWidgetProps) {
  const [open, setOpen] = useState(false)
  const [description, setDescription] = useState('')
  const [images, setImages] = useState<File[]>([])

  const modalRef = useRef<HTMLDivElement>(null)
  const captureScreenshot = useScreenshotBehindModal(modalRef)

  async function handleOpen() {
    setOpen(true)
  }

  function handleFiles(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files !== null) {
      setImages((prev) => [...prev, ...Array.from(event.target.files as FileList)])
    }
  }

  async function handleSubmit() {
    const data = new FormData()
    data.append('text', description)
    images.forEach((file) => data.append('images', file))
    data.append('url', window.location.href)
    data.append('userAgent', navigator.userAgent)
    data.append('platform', navigator.platform)

    await fetch(endpoint, { method: 'POST', body: data })

    setOpen(false)
    setDescription('')
    setImages([])
  }

  // if (!open) {
  //   return (
  //     <Button
  //       type='button'
  //       onClick={() => handleOpen()}
  //       className={['fixed bottom-4 right-4 rounded-full shadow-lg', className].join(' ')}
  //       style={style}>
  //       {label}
  //     </Button>
  //   )
  // }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button
          type='button'
          onClick={() => handleOpen()}
          className={['fixed bottom-4 right-4 rounded-full shadow-lg', className].join(' ')}
          style={style}>
          {label}
        </Button>
      </DialogTrigger>
      <DialogContent ref={modalRef}>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            <div className='w-96 rounded-md bg-white p-4 shadow-md space-y-2'>
              <textarea
                className='h-24 w-full resize-none rounded border p-2'
                placeholder='Describe your feedback...'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <input type='file' multiple onChange={(e) => handleFiles(e)} />
              <div className='flex justify-end gap-2'>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button type='button' onClick={() => handleSubmit()}>
                  Send
                </Button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
