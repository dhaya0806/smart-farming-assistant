import { convertToModelMessages, streamText } from 'ai'
import { gateway } from 'ai'

export async function POST(request: Request) {
  const { messages, language = 'ta' } = await request.json()

  const result = streamText({
    model: gateway('openai/gpt-5.5'),
    system: `You are Vivasaya Nanban, a practical smart farming assistant for farmers in Tamil Nadu. Give concise, actionable advice about crops, soil, irrigation, pests, weather, markets, and government schemes. Never invent live prices, weather alerts, or scheme deadlines; clearly label general guidance. Prefer Tamil when language is ta, otherwise respond in English. Use simple language and bullet points when helpful. Do not provide unsafe pesticide dosage instructions; recommend following the product label and consulting an agricultural officer.`,
    messages: await convertToModelMessages(messages),
    providerOptions: { gateway: { tags: ['vivasaya-nanban', language] } },
  })

  return result.toUIMessageStreamResponse()
}
