import React, { useState } from 'react'

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
}

export function FidebeWidget({ endpoint }: FidebeWidgetProps) {
  const [open, setOpen] = useState(false)
  const [description, setDescription] = useState('')
  const [images, setImages] = useState<File[]>([])

  async function handleOpen() {
    setOpen(true)
    // const canvas = await html2canvas(document.body);
    // const blob = await new Promise<Blob | null>((resolve) =>
    //   canvas.toBlob(resolve),
    // );
    // if (blob) {
    //   const file = new File([blob], 'screenshot.png', { type: 'image/png' });
    //   setImages((prev) => [...prev, file]);
    // }
  }

  function handleFiles(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      setImages((prev) => [...prev, ...Array.from(event.target.files!)])
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

  if (!open) {
    return (
      <button
        type='button'
        onClick={() => handleOpen()}
        className='fixed bottom-4 right-4 rounded-full bg-blue-500 px-4 py-2 text-white shadow-lg'>
        Feedback
      </button>
    )
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
      <div className='w-96 rounded-md bg-white p-4 shadow-md space-y-2'>
        <textarea
          className='h-24 w-full resize-none rounded border p-2'
          placeholder='Describe your feedback...'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input type='file' multiple onChange={(e) => handleFiles(e)} />
        <div className='flex justify-end gap-2'>
          <button type='button' className='rounded border px-3 py-1' onClick={() => setOpen(false)}>
            Cancel
          </button>
          <button type='button' className='rounded bg-blue-600 px-3 py-1 text-white' onClick={() => handleSubmit()}>
            Send
          </button>
        </div>
      </div>
    </div>
  )
}
