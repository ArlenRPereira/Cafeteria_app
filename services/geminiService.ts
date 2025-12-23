import { GoogleGenAI } from "@google/genai";
import { MENU_ITEMS } from '../constants';

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const getBaristaRecommendation = async (userQuery: string, currentOrderSummary: string): Promise<string> => {
  if (!apiKey) {
    return "Desculpe, o sistema de IA está offline no momento (Chave API ausente).";
  }

  try {
    const menuContext = MENU_ITEMS.map(item => `${item.name} (${item.category}) - R$ ${item.price.toFixed(2)}: ${item.description}`).join('\n');

    const prompt = `
      Você é um Barista expert e simpático de uma cafeteria sofisticada.
      
      Aqui está o nosso cardápio atual:
      ${menuContext}

      O cliente tem o seguinte no carrinho/contexto: ${currentOrderSummary}

      A pergunta ou comentário do cliente é: "${userQuery}"

      Por favor, responda de forma breve, útil e convidativa (máximo 3 frases). Sugira harmonizações se fizer sentido. Não invente itens que não estão no cardápio.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "Desculpe, não consegui pensar em uma recomendação agora.";
  } catch (error) {
    console.error("Erro no Barista IA:", error);
    return "Estou com dificuldade para acessar minhas anotações de café agora. Pode perguntar ao garçom?";
  }
};