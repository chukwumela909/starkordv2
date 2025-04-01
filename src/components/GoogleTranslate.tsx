"use client"

import { useEffect, useRef } from "react"

// Add TypeScript declaration for the Google Translate API
declare global {
  interface Window {
    googleTranslateElementInit?: () => void
    google?: {
      translate?: {
        TranslateElement: new (
          options: {
            pageLanguage: string
            includedLanguages: string
            layout?: any
            autoDisplay?: boolean
          },
          elementId: string,
        ) => void
      }
    }
  }
}

const GoogleTranslate = () => {
  const scriptLoaded = useRef(false)

  useEffect(() => {
    // Only load the script once
    if (scriptLoaded.current) return

    // Define the googleTranslateElementInit function
    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en", // Set the default page language
            includedLanguages:
              "af,sq,am,ar,hy,az,eu,be,bn,bs,bg,ca,ceb,ny,zh-CN,zh-TW,co,hr,cs,da,nl,en,eo,et,tl,fi,fr,fy,gl,ka,de,el,gu,ht,ha,haw,iw,hi,hmn,hu,is,ig,id,ga,it,ja,jw,kn,kk,km,ko,ku,ky,lo,la,lv,lt,lb,mk,mg,ms,ml,mt,mi,mr,mn,ne,no,or,ps,fa,pl,pt,pa,ro,ru,sm,gd,sr,st,sn,sd,si,sk,sl,so,es,su,sw,sv,tg,ta,te,th,tr,uk,ur,ug,uz,vi,cy,xh,yi,yo,zu",
          },
          "google_translate_element",
        )
      }
    }

    // Create and load the Google Translate script
    const script = document.createElement("script")
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    script.async = true

    script.onload = () => {
      scriptLoaded.current = true
    }

    document.body.appendChild(script)

    // Clean up
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
      delete window.googleTranslateElementInit
    }
  }, [])

  // Add some basic styling to make the translator look better
  useEffect(() => {
    const style = document.createElement("style")
    style.textContent = `
      .goog-te-gadget {
        font-family: inherit !important;
        color: inherit !important;
      }
      
      .goog-te-gadget-simple {
        background-color: #1e293b !important;
        border: 1px solid #475569 !important;
        padding: 4px 8px !important;
        border-radius: 0.375rem !important;
        font-size: 0.875rem !important;
        line-height: 1.25rem !important;
        display: flex !important;
        align-items: center !important;
      }
      
      .goog-te-gadget-icon {
        display: none !important;
      }
      
      .goog-te-menu-value {
        color: white !important;
        text-decoration: none !important;
        display: flex !important;
        align-items: center !important;
      }
      
      .goog-te-menu-value span {
        color: white !important;
        text-decoration: none !important;
      }
      
      .goog-te-banner-frame {
        display: none !important;
      }
      
      body {
        top: 0 !important;
      }
    `
    document.head.appendChild(style)

    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style)
      }
    }
  }, [])

  return <div id="google_translate_element" className="google-translate-element"></div>
}

export default GoogleTranslate

