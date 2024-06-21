import { useEffect } from 'react'

export const useDraggable = (windowRef, moverRef) => {
  useEffect(() => {
    const target = windowRef.current
    const moverTaget = moverRef.current

    if (!target) {
      return
    }

    let offsetX = 0
    let offsetY = 0
    let currentX
    let currentY
    let initialX
    let initialY

    function onMousedown(e) {
      if (e.type === 'touchstart') {
        initialX = e.touches[0].clientX - offsetX
        initialY = e.touches[0].clientY - offsetY
        window.addEventListener('touchmove', onMouseMove)
        window.addEventListener('touchend', onMouseUp)
      } else {
        initialX = e.clientX - offsetX
        initialY = e.clientY - offsetY
        window.addEventListener('mousemove', onMouseMove)
        window.addEventListener('mouseup', onMouseUp)
      }
    }

    function onMouseMove(e) {
      if (e.type === 'touchmove') {
        currentX = e.touches[0].clientX - initialX
        currentY = e.touches[0].clientY - initialY
      } else {
        currentX = e.clientX - initialX
        currentY = e.clientY - initialY
      }

      offsetX = currentX
      offsetY = currentY
      target.style.transform = `translate(${currentX}px, ${currentY}px)`
    }

    function onMouseUp(e) {
      initialX = currentX
      initialY = currentY
      if (e.type === 'touchend') {
        window.removeEventListener('touchmove', onMouseMove)
        window.removeEventListener('touchend', onMouseUp)
      } else {
        window.removeEventListener('mousemove', onMouseMove)
        window.removeEventListener('mouseup', onMouseUp)
      }
    }

    moverTaget.addEventListener('mousedown', onMousedown)
    moverTaget.addEventListener('touchstart', onMousedown)

    return () => {
      moverTaget.removeEventListener('mousedown', onMousedown)
      moverTaget.removeEventListener('touchstart', onMousedown)
      window.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('touchend', onMouseUp)
      window.removeEventListener('touchmove', onMouseMove)
    }
  }, [windowRef])
}
