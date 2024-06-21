import { useContext } from 'react'
import { viewportContext } from 'contexts/viewport/viewportContext'

export const useViewport = () => useContext(viewportContext)
