// ./app/api/chat/route.ts
import { Configuration, OpenAIApi } from 'openai-edge'
import { OpenAIStream, StreamingTextResponse } from 'ai'

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(config)

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge'

export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { messages } = await req.json()

  // Ask OpenAI for a streaming chat completion given the prompt
  messages.unshift({
    content: `Bu bir text tabanlı oyundur. 
    Orta dünyada geçmektedir. Frodo Baggins adında bir karakteri yönetiyorsunuz. Frodo bir hobbittir. 
    Samwise ve Frodo bir görev için yola çıkarlar.
    ve oyun devam eder.
    Oyunu bitirmek için Frodo'yu Mordor'a götürmelisiniz.
    Bunun için Frodo'yu yönlendirin.
    Frodo'ya her seferinde kısa kısa 3 tane alternatif sun.
    `,
    role: 'user'
  })

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: messages.map((message: any) => ({
      content: message.content,
      role: message.role
    }))
  })

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response)
  // Respond with the stream
  return new StreamingTextResponse(stream)
}
