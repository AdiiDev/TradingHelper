import React, { useState, useEffect } from 'react'

const useAudio = (url, time = 1500) => {
  const [audio] = useState(new Audio(url))
  const [playing, setPlaying] = useState(false)

  const toggle = () => setPlaying(!playing)

  useEffect(() => {
    console.log('In use effect audio', time)
    if (playing) {
      audio.play()
      test()
    } else {
      audio.pause()
      audio.currentTime = 0
    }
  }, [playing])

  // ! I'm not sure how it works right now but it works
  const test = () => {
    setTimeout(() => {
      console.log('In audio timeout')
      setPlaying(false)
    }, time)
  }

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false))
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false))
    }
  }, [])

  return [playing, toggle]
}

export default useAudio
