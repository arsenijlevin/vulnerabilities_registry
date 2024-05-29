import { useEffect, useState } from 'react';

type ChatbotModel =
  | 'gemini-1.5-pro-latest'
  | 'llama-3-70b-instruct'
  | 'mixtral-8x22b-instruct'
  | 'gpt-3.5-turbo'
  | 'claude-3-opus';

interface ChatbotFormData {
  model: ChatbotModel;
  message: string;
}

export const useChatbotFormSubmit = (formData: ChatbotFormData) => {
  const [response, setResponse] = useState('');

  useEffect(() => {
    const response = fetch('https://api.naga.ac/v1/chat/completions', {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
      body: JSON.stringify({
        model: formData.model,
        messages: [
          {
            content: formData.message,
            name: 'user',
            role: 'user',
          },
        ],
      }),
    });

    setResponse(response);
  }, []);

  return {
    response,
  };
};
