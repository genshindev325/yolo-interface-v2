import { useEffect } from 'react'

const checkRefMissingTarget = (target, ref, extraRefs) => {
  if (ref.current && ref.current.contains(target)) {
    return false
  }

  const refsLength = extraRefs && extraRefs.length

  if (refsLength) {
    for (let i = 0; i < refsLength; i++) {
      const ref = extraRefs[i]
      if (ref.current && ref.current.contains(target)) {
        return false
      }
    }
  }

  return true
}

export const useClickOutside = (ref, callback, extraRefs) => {
  const handleClick = (e) => {
    let eRs
    if (typeof extraRefs === 'function') {
      eRs = extraRefs()
    } else {
      eRs = extraRefs
    }
    if (checkRefMissingTarget(e.target, ref, eRs)) {
      callback(e)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
    }
  })
}
