import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import FuturisticPortfolio from './components/sections/Hero'
import BufferLoader from './components/BufferLoader'

const publicAssets = [
  '/avatar.webp',
  '/backdrop1.webp',
  '/info_avatar.webp',
  '/info_backdrop.webp',
  '/logo.webp',
  '/project_avatar.webp',
  '/favicon.svg',
]

const bundledAssets = Object.values(
  import.meta.glob('./assets/*.{png,jpg,jpeg,webp,avif,svg}', {
    eager: true,
    query: '?url',
    import: 'default',
  }),
)

const preloadImage = (src) => new Promise((resolve) => {
  if (!src || src.startsWith('data:')) {
    resolve()
    return
  }

  const image = new Image()
  const finish = () => resolve()
  const timeoutId = window.setTimeout(finish, 7000)

  image.decoding = 'async'
  image.onload = () => {
    window.clearTimeout(timeoutId)
    if (image.decode) {
      image.decode().catch(() => undefined).finally(finish)
    } else {
      finish()
    }
  }
  image.onerror = () => {
    window.clearTimeout(timeoutId)
    finish()
  }
  image.src = src
})

function App() {
  const [isBuffering, setIsBuffering] = useState(true)
  const [progress, setProgress] = useState(6)

  useEffect(() => {
    let cancelled = false
    let visualProgress = 6
    let targetProgress = 14
    const startedAt = performance.now()
    const minimumShowTime = 2200
    const maximumBufferTime = 10000

    const updateTarget = (value) => {
      targetProgress = Math.max(targetProgress, Math.min(value, 96))
    }

    const progressTimer = window.setInterval(() => {
      if (cancelled) return
      visualProgress += Math.max((targetProgress - visualProgress) * 0.13, 0.45)
      setProgress(Math.min(99, Math.round(visualProgress)))
    }, 45)

    const waitForWindowLoad = () => {
      if (document.readyState === 'complete') return Promise.resolve()

      return new Promise((resolve) => {
        window.addEventListener('load', resolve, { once: true })
      })
    }

    const waitForFonts = () => {
      if (!document.fonts?.ready) return Promise.resolve()
      return document.fonts.ready.catch(() => undefined)
    }

    const waitForDomToSettle = () => new Promise((resolve) => {
      let settleTimer = 0

      const finish = () => {
        window.clearTimeout(settleTimer)
        observer.disconnect()
        resolve()
      }

      const observer = new MutationObserver(() => {
        window.clearTimeout(settleTimer)
        settleTimer = window.setTimeout(finish, 350)
      })

      observer.observe(document.body, { childList: true, subtree: true })
      settleTimer = window.setTimeout(finish, 350)
      window.setTimeout(finish, 2400)
    })

    const waitForImages = async () => {
      await waitForDomToSettle()

      const sources = new Set([...publicAssets, ...bundledAssets])
      Array.from(document.images).forEach((image) => {
        const src = image.currentSrc || image.src
        if (src) sources.add(src)
      })

      const urls = Array.from(sources)
      let completed = 0

      await Promise.all(urls.map((src) => (
        preloadImage(src).finally(() => {
          completed += 1
          updateTarget(22 + (completed / urls.length) * 68)
        })
      )))
    }

    const finishBuffer = async () => {
      await Promise.race([
        Promise.all([
          waitForWindowLoad().then(() => updateTarget(36)),
          waitForFonts().then(() => updateTarget(48)),
          waitForImages(),
        ]),
        new Promise((resolve) => window.setTimeout(resolve, maximumBufferTime)),
      ])

      if (cancelled) return

      const elapsed = performance.now() - startedAt
      const remaining = Math.max(0, minimumShowTime - elapsed)
      updateTarget(100)

      window.setTimeout(() => {
        if (cancelled) return
        window.clearInterval(progressTimer)
        setProgress(100)
        window.setTimeout(() => {
          if (!cancelled) setIsBuffering(false)
        }, 650)
      }, remaining)
    }

    finishBuffer()

    return () => {
      cancelled = true
      window.clearInterval(progressTimer)
    }
  }, [])

  return (
    <>
      <AnimatePresence>
        {isBuffering && <BufferLoader progress={progress} />}
      </AnimatePresence>
      <FuturisticPortfolio />
    </>
  )
}

export default App
