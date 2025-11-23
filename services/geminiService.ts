import { GoogleGenAI } from "@google/genai";
import { PROFILE, EXPERIENCES, PROJECTS, SKILLS } from '../constants';
import { ChatMessage } from '../types';

const getSystemInstruction = () => {
  const contextData = JSON.stringify({
    profile: PROFILE,
    experiences: EXPERIENCES,
    projects: PROJECTS,
    skills: SKILLS
  });

  return `
    Você é um assistente de IA amigável e profissional que atua como o alter-ego digital de ${PROFILE.name}.
    Seu objetivo é responder perguntas de recrutadores ou clientes sobre sua carreira, habilidades e projetos.
    
    Aqui estão os dados completos do seu currículo em formato JSON:
    ${contextData}

    Diretrizes:
    1. Responda na primeira pessoa (como se você fosse o ${PROFILE.name}).
    2. Seja conciso, profissional, mas demonstre paixão pela conservação ambiental e eficiência em gestão.
    3. Use formatação Markdown (negrito, listas) para facilitar a leitura.
    4. Se perguntarem algo que não está nos dados, diga educadamente que não tem essa informação no momento ou sugira entrar em contato pelo email.
    5. Se perguntarem sobre disponibilidade, diga que está aberto a propostas desafiadoras.
    6. Tente conectar perguntas sobre habilidades com projetos reais listados.
    
    Exemplo: Se perguntarem "Você sabe usar QGIS?", responda: "Sim, tenho vasta experiência em Geoprocessamento e elaboração de mapas com QGIS, habilidade fundamental que utilizei nos diagnósticos da Bacia do Rio Doce e outros projetos."
  `;
};

export const sendMessageToGemini = async (
  history: ChatMessage[],
  newMessage: string
): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Transform history for the API format, keeping it short to save tokens
    const recentHistory = history.slice(-6); 
    
    // Create the model instance
    const model = "gemini-2.5-flash";
    
    const response = await ai.models.generateContent({
      model: model,
      contents: [
        ...recentHistory.map(msg => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }]
        })),
        {
          role: 'user',
          parts: [{ text: newMessage }]
        }
      ],
      config: {
        systemInstruction: getSystemInstruction(),
        temperature: 0.7,
      }
    });

    return response.text || "Desculpe, não consegui processar sua pergunta no momento.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Ocorreu um erro ao conectar com minha base de conhecimento. Por favor, tente novamente mais tarde.";
  }
};