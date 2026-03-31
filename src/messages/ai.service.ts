// src/messages/ai.service.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Groq } from 'groq-sdk';
import { toFile } from 'groq-sdk';
@Injectable()
export class AiService {
  private groq: Groq;

  constructor() {
    this.groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
  }

  async processAudioAndGetFeedback(
    audioBuffer: Buffer,
    mimeType: string,
    chatContext: string,
  ) {
    try {

      const extension = mimeType.split('/')[1]?.split(';')[0] || 'webm';
      const file = await toFile(audioBuffer, `audio.${extension}`);

      const transcription = await this.groq.audio.transcriptions.create({
        file: file,
        model: 'whisper-large-v3',
        response_format: 'json',
      });

      const userText = transcription.text;

      if (!userText || userText.trim() === '') {
        throw new InternalServerErrorException('O áudio estava mudo ou inaudível.');
      }

      const prompt = `
        Você é um entrevistador técnico e professor de inglês. 
        O contexto desta entrevista é: ${chatContext}.
        O usuário respondeu o seguinte à sua última pergunta: "${userText}"
        
        Sua tarefa:
        1. Avalie a resposta dele.
        2. Dê uma nota de 0 a 100.
        3. Retorne a sua resposta ESTRITAMENTE no formato JSON abaixo:
        {
          "aiResponse": "sua resposta ou próxima pergunta como entrevistador",
          "score": 85,
          "feedback": "seus comentários sobre erros e acertos"
        }
      `;

      const chatCompletion = await this.groq.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'llama-3.1-8b-instant',
        response_format: { type: 'json_object' },
      });

      const responseText = chatCompletion.choices[0]?.message?.content;

      if (!responseText) {
        throw new InternalServerErrorException('A IA falhou em gerar o feedback.');
      }

      const parsedResponse = JSON.parse(responseText);

      return {
        transcription: userText, 
        aiResponse: parsedResponse.aiResponse,
        score: parsedResponse.score,
        feedback: parsedResponse.feedback
      };

    } catch (error) {
      console.error('Erro na API da Groq:', error);
      throw new InternalServerErrorException('Falha ao processar a requisição com a IA.');
    }
  }
}