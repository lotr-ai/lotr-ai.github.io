'use client'

import { useChat } from 'ai/react'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import imagePath from '../public/assets/sam-wise.png'

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat()
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let lastChild = contentRef.current?.lastElementChild
    lastChild?.scrollIntoView({
      block: 'end',
      inline: 'end',
      behavior: 'smooth'
    })
  }, [messages])

  return (
    <div ref={contentRef} className="flex flex-col max-w-md mx-auto">
      <h1 className="mb-8 text-4xl font-bold text-center">Orta Dünyaya Hoşgeldin</h1>

      <div className="mb-8 text-center border border-gray-300 rounded shadow-xl border-radius-2xl">
        <Image src={imagePath} alt={'Sam Wise'} />
      </div>

      <p>
        <strong>Merhaba Sam</strong> Orta Dünya'ya hoşgeldin. Burada seni bekleyen çok şey var. Lütfen "oyuna başla" yazarak oyunu başlat.
      </p>

      <ul className='pb-24 pt-4'>
        {messages.length > 0
          ? messages.map(m => (
            <li key={m.id} className="whitespace-pre-wrap my-2">
              {m.role === 'user' ? <strong>Sam Wise:</strong> : <strong>AI:</strong>}
              {m.content}
            </li>
          ))
          : null}
      </ul>

      <form onSubmit={handleSubmit}>
        <input
          className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl outline-4 focus:outline-offset-4 focus:outline-blue-500"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  )
}
