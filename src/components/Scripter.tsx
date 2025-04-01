"use client";
import { useEffect } from "react";

const Scripter = () => {
  useEffect(() => {
    // Ensure the callback isn't redefined if component re-renders
    if (!window.googleTranslateElementInit) {
      window.googleTranslateElementInit = () => {
        if (window.google && window.google.translate) {
          if (document.getElementById("google_translate_element")) {
            new window.google.translate.TranslateElement(
              {
                pageLanguage: "en",
                includedLanguages:
                  "af,sq,am,ar,hy,az,eu,be,bn,bs,bg,ca,ceb,ny,zh-CN,zh-TW,co,hr,cs,da,nl,en,eo,et,tl,fi,fr,fy,gl,ka,de,el,gu,ht,ha,haw,iw,hi,hmn,hu,is,ig,id,ga,it,ja,jw,kn,kk,km,ko,ku,ky,lo,la,lv,lt,lb,mk,mg,ms,ml,mt,mi,mr,mn,ne,no,or,ps,fa,pl,pt,pa,ro,ru,sm,gd,sr,st,sn,sd,si,sk,sl,so,es,su,sw,sv,tg,ta,te,th,tr,uk,ur,ug,uz,vi,cy,xh,yi,yo,zu",
                // You can choose layout options here if needed, e.g.
                // layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
              },
              "google_translate_element"
            );
          } else {
            console.warn("Google Translate target element 'google_translate_element' not found.");
          }
        } else {
            console.warn("Google Translate library not loaded yet.");
        }
      };
    }

    // Check if script exists
    const existingScript = document.getElementById('google-translate-script');

    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = `//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    } else {
       // If script exists, try initializing again if widget isn't there
       if (window.google && window.google.translate && !document.querySelector('.goog-te-gadget')) {
           window.googleTranslateElementInit();
       }
    }

    // Optional Cleanup (use with caution)
    // return () => { ... };

  }, []); // Runs only once on mount

  return <div  id="google_translate_element"></div>;
};

export default Scripter;