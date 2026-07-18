import React, { useContext, useEffect, useRef, useState } from 'react'
import ai from "../assets/ai.png"
import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import open from "../assets/open.mp3"
function Ai() {
  let { showSearch, setShowSearch } = useContext(shopDataContext)
  let navigate = useNavigate()
  let [activeAi, setActiveAi] = useState(false)
  let recognizerRef = useRef(null)
  let activeAiRef = useRef(false)
  let openingSound = new Audio(open)

  function speak(message) {
    window.speechSynthesis.cancel()
    let utterence = new SpeechSynthesisUtterance(message)
    window.speechSynthesis.speak(utterence)
  }


  useEffect(() => {
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognitionAPI) {
      toast.error("Voice assistant is not supported in this browser")
      return
    }

    const recognition = new SpeechRecognitionAPI()
    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = "en-US"

    const handleTranscript = (transcript) => {
      const lowerTranscript = transcript.toLowerCase().trim()

      if (lowerTranscript.includes("search") && lowerTranscript.includes("open") && !showSearch) {
        speak("opening search")
        setShowSearch(true)
        navigate("/collection")
        return
      }

      if (lowerTranscript.includes("search") && lowerTranscript.includes("close") && showSearch) {
        speak("closing search")
        setShowSearch(false)
        return
      }

      if (lowerTranscript.includes("collection") || lowerTranscript.includes("collections") || lowerTranscript.includes("product") || lowerTranscript.includes("products")) {
        speak("opening collection page")
        navigate("/collection")
        return
      }

      if (lowerTranscript.includes("about") || lowerTranscript.includes("aboutpage")) {
        speak("opening about page")
        navigate("/about")
        setShowSearch(false)
        return
      }

      if (lowerTranscript.includes("home") || lowerTranscript.includes("homepage")) {
        speak("opening home page")
        navigate("/")
        setShowSearch(false)
        return
      }

      if (lowerTranscript.includes("cart") || lowerTranscript.includes("kaat") || lowerTranscript.includes("caat")) {
        speak("opening your cart")
        navigate("/cart")
        setShowSearch(false)
        return
      }

      if (lowerTranscript.includes("contact")) {
        speak("opening contact page")
        navigate("/contact")
        setShowSearch(false)
        return
      }

      if (lowerTranscript.includes("order") || lowerTranscript.includes("myorders") || lowerTranscript.includes("orders") || lowerTranscript.includes("my order")) {
        speak("opening your orders page")
        navigate("/order")
        setShowSearch(false)
        return
      }

      speak("I did not catch that. Please repeat.")
    }

    recognition.onresult = (e) => {
      const transcript = e.results[e.results.length - 1][0].transcript
      handleTranscript(transcript)
    }

    recognition.onerror = (event) => {
      if (event.error === "no-speech" || event.error === "aborted") {
        return
      }

      if (activeAiRef.current) {
        setTimeout(() => {
          try {
            recognition.start()
          } catch (error) {
            console.log(error)
          }
        }, 250)
        return
      }

      toast.error("Voice assistant temporarily unavailable")
    }

    recognition.onend = () => {
      if (activeAiRef.current) {
        setTimeout(() => {
          try {
            recognition.start()
          } catch (error) {
            console.log(error)
          }
        }, 250)
        return
      }

      setActiveAi(false)
    }

    recognizerRef.current = recognition

    return () => {
      activeAiRef.current = false
      try {
        recognition.abort()
      } catch (error) {
        console.log(error)
      }
    }
  }, [navigate, setShowSearch, showSearch])
  return (
    <div className='fixed lg:bottom-[20px] md:bottom-[40px] bottom-[80px] left-[2%] ' onClick={() => {
      const recognition = recognizerRef.current
      if (!recognition || activeAiRef.current) {
        return
      }

      activeAiRef.current = true
      setActiveAi(true)

      try {
        recognition.start()
      } catch (error) {
        activeAiRef.current = false
        setActiveAi(false)
        toast.error("Voice assistant temporarily unavailable")
        return
      }

      openingSound.play().catch(() => { })
    }}>
      <img src={ai} alt="" className={`w-[100px] cursor-pointer ${activeAi ? 'translate-x-[10%] translate-y-[-10%] scale-125 ' : 'translate-x-[0] translate-y-[0] scale-100'} transition-transform`} style={{
        filter: ` ${activeAi ? "drop-shadow(0px 0px 30px #00d2fc)" : "drop-shadow(0px 0px 20px black)"}`
      }} />
    </div>
  )
}

export default Ai
