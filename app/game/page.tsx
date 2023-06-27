'use client'

import { useChat } from 'ai/react'
import { useEffect, useRef } from 'react';

export default function GamePage() {
    const { handleSubmit, handleInputChange, messages, input } = useChat();
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

                    <form className="flex flex-col items-left justify-center w-full flex-1 px-5 text-justify max-w-4xl" onSubmit={handleSubmit}>
                        <input
                            className="p-2 mt-6 text-2xl text-black bg-gray-100 rounded-lg sm:w-full"
                            type="text"
                            name="input"
                            value={input}
                            onChange={handleInputChange}
                        />
                    </form>
                </main>
            </div>
        </>
    )
}
