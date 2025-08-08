import html2canvas from 'html2canvas'
import { useCallback } from 'react'

const useScreenshotBehindModal = (modalRef: React.RefObject<HTMLDivElement | null>) => {
  const captureScreenshot = useCallback(async () => {
    if (!modalRef.current) return null

    // Esconde o modal temporariamente
    modalRef.current.style.visibility = 'hidden'

    // Captura o screenshot da tela
    const canvas = await html2canvas(document.body)

    // Restaura a visibilidade do modal
    modalRef.current.style.visibility = 'visible'

    // Retorna a imagem em base64
    return canvas.toDataURL('image/png')
  }, [modalRef])

  return captureScreenshot
}

export default useScreenshotBehindModal
