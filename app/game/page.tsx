'use client'

import { useEffect, useRef, useState } from 'react';
import { Configuration, OpenAIApi } from 'openai-edge'
import { OpenAIStream, StreamingTextResponse } from 'ai'

const config = new Configuration({
    apiKey: "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"
})
console.log(process.env.OPENAI_API_KEY)
const openai = new OpenAIApi(config)

export default function GamePage() {
    const [loading, setLoading] = useState<boolean>(false)
    const [input, setInput] = useState<string>('')
    const [messages, setMessages] = useState<any[]>([
        {
            content: `Bu bir text tabanlı oyundur. Orta dünyada geçmektedir. Frodo Baggins adında bir karakteri yönetiyorsunuz. Frodo bir hobbittir. Samwise ve Frodo bir görev için yola çıkarlar.  Oyunu bitirmek için Frodo'yu Mordor'a götürmelisiniz. Bunun için Frodo'yu yönlendirin. Frodo'ya her seferinde 3 alternatif sunulacak.`,
            role: 'user'
        }
    ])
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let lastChild = contentRef.current?.lastElementChild
        lastChild?.scrollIntoView({
            block: 'end',
            inline: 'end',
            behavior: 'smooth'
        })
    }, [messages])

    const handleInputChange = (event: any) => {
        setInput(event.target.value)
    }

    const handleSubmit = async () => {
        if (input === '') {
            return
        }

        setLoading(true)
        messages.push({
            content: input,
            role: 'user'
        } as any)

        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            stream: true,
            messages: messages.map((message: any) => ({
                content: message.content,
                role: message.role
            }))
        })

        const stream = OpenAIStream(response)
        let data = new StreamingTextResponse(stream)

        const text = await data.text()

        messages.push({
            content: text,
            role: 'system'
        } as any)

        setInput('')
        setMessages([...messages])
        setLoading(false)
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-800">
                <main ref={contentRef} className="flex flex-col items-left justify-center w-full flex-1 px-5 text-justify max-w-4xl">
                    <h1 className="text-6xl font-bold text-white">
                        Yüzüklerin Efendisi
                    </h1>

                    <p className="mt-1 text-white">
                        Maceraya hazırsan "oyuna başla" yazıp başlayabilirsin.
                    </p>

                    <audio controls className="flex flex-col items-left justify-center w-full flex-1 px-5 text-justify max-w-4xl">
                        <source src="/lotr.wav" type="audio/wav" />
                        Your browser does not support the audio element.
                    </audio>

                    <ul className="flex flex-col items-left justify-center w-full flex-1 px-5 text-justify max-w-4xl">
                        {messages.length > 0
                            ? messages.map(m => (
                                <li key={m.id} className="whitespace-pre-wrap my-2">
                                    {m.role === 'user' ?
                                        <strong className="text-green-500">Frodo Baggins :</strong> :
                                        <strong className="text-blue-500">Anlatıcı :</strong>
                                    }
                                    <text className="text-white"> {m.content}</text>
                                </li>
                            ))
                            : null}
                    </ul>

                    <div className="flex flex-col items-left justify-center w-full flex-1 px-5 text-justify max-w-4xl">
                        <input
                            className="p-2 mt-6 text-2xl text-black bg-gray-100 rounded-lg sm:w-full"
                            type="text"
                            name="input"
                            value={input}
                            onChange={handleInputChange}
                        />
                        <button className="p-2 mt-6 text-2xl text-black bg-gray-100 rounded-lg sm:w-full" type="submit" onClick={handleSubmit} disabled={loading}>
                            Gönder
                        </button>
                    </div>
                </main>
                <footer className="flex items-center justify-center w-full h-24 border-t mt-10">
                    <span className="text-sm text-white">
                        Powered by Muhtalip Dede
                    </span>
                </footer>
                {loading ? <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50">
                    <div className="flex flex-col items-center justify-center w-full h-full space-y-4">
                        <div className="w-16 h-16 border-4 border-t-4 border-gray-200 rounded-full animate-spin"></div>
                        <h2 className="text-lg font-semibold text-white">Yükleniyor...</h2>
                        <p className="text-sm text-white">Lütfen bekleyin.</p>
                    </div>
                </div> : null}
            </div>
        </>
    )
}
