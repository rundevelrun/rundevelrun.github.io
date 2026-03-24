import React, { useEffect } from 'react'
import { adsense } from "../../../blog-config"

const DisplayAds = () => {
  useEffect(() => {
    const pushAd = () => {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({})
      } catch (e) {
        console.error(e)
      }
    }

    // AdSense script transforms adsbygoogle from Array to special object after loading.
    // Wait until it's no longer a plain Array (i.e., fully initialized).
    let interval = setInterval(() => {
      if (window.adsbygoogle && !Array.isArray(window.adsbygoogle)) {
        pushAd()
        clearInterval(interval)
      }
    }, 300)

    return () => {
      clearInterval(interval)
    }
  }, [])
  return (
    <ins className="adsbygoogle"
         style={{display: 'block'}}
         data-ad-client={adsense.client}
         data-ad-slot={adsense.slot}
         data-ad-format="auto"
         data-full-width-responsive="true"></ins>
  )
}

export default DisplayAds
