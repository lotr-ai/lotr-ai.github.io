'use client'

import { useChat } from 'ai/react'
import Image from 'next/image'
import imagePath from '../public/assets/sam-wise.png'

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat()

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      <h1 className="mb-8 text-4xl font-bold text-center">Orta Dünyaya Hoşgeldin</h1>

      <div className="mb-8 text-center border border-gray-300 rounded shadow-xl border-radius-2xl">
        <Image src={imagePath} alt={'Sam Wise'} />
      </div>

      <p>
        <strong>Merhaba Sam</strong> Orta Dünya'ya hoşgeldin. Burada seni bekleyen çok şey var. Lütfen "oyuna başla" yazarak oyunu başlat. 
      </p>

      {messages.length > 0
        ? messages.map(m => (
            <div key={m.id} className="whitespace-pre-wrap">
              {m.role === 'user' ? <strong>Sam Wise:</strong> : <strong>AI:</strong>}
              {m.content}
            </div>
          ))
        : null}

      <form onSubmit={handleSubmit}>
        <input
          className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  )
}
