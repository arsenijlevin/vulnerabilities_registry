import { Disclosure } from '@hooks/useDisclosure';
import { Modal, Box, TextField, Typography, IconButton, Button } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import Select from 'react-select';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const chatbotModels = [
  'gemini-1.5-pro-latest',
  'llama-3-70b-instruct',
  'mixtral-8x22b-instruct',
  'gpt-3.5-turbo',
  'claude-3-opus',
];

const chatbotModelTitles = ['Gemini 1.5 PRO', 'LLAMA 3 70b', 'Mixtral 8x22b', 'GPT 3.5 Turbo', 'Claude 3 Opus'];

export type ChatbotModel = (typeof chatbotModels)[number];

export interface ChatbotFormProps {
  disclosure: [boolean, Disclosure];
}

export const ChatbotForm = (props: ChatbotFormProps) => {
  const [isOpen, disclosure] = props.disclosure;

  const mutation = useMutation({
    mutationFn: ({ message, model }: { message: string; model: ChatbotModel }) => {
      return fetch('https://api.naga.ac/v1/chat/completions', {
        headers: {
          Authorization: `Bearer ${process.env.NAGA_API_KEY ?? ''}`,
        },
        body: JSON.stringify({
          model: model,
          messages: [
            {
              content: message,
              name: 'user',
              role: 'user',
            },
          ],
        }),
      });
    },
  });

  return (
    <Modal
      open={isOpen}
      onClose={() => {
        disclosure.close();
      }}
    >
      <Box sx={style}>
        <Typography variant="body1">Создание запроса для уязвимости:</Typography>
        <Typography variant="body1" fontStyle={'italic'}>
          Nginx UI. Атака CRLF (202423828)
        </Typography>
        <p className="my-4 flex items-center">
          Скопировать описание
          <IconButton className="block ml-4 cursor-pointer">
            <ContentCopyIcon
              sx={{
                fontSize: '16px',
              }}
            />
          </IconButton>
        </p>
        <label id={'chatbot-select'} className="block mb-3">
          Выбор чат-бота
        </label>
        <Select
          aria-labelledby="chatbot-select"
          options={chatbotModels.map((model, index) => ({
            value: model,
            label: chatbotModelTitles[index],
          }))}
          defaultValue={{
            value: chatbotModels[0],
            label: chatbotModelTitles[0],
          }}
        />
        <label id={'chatbot-text'} className="block mt-5 mb-3">
          {mutation.isSuccess ? 'Ответ' : 'Запрос'}
        </label>
        <TextField
          sx={{
            width: '100%',
          }}
          aria-labelledby="chatbot-text"
          multiline
          defaultValue={mutation.isSuccess ? mutation.data : ''}
        />
        <Button
          variant="contained"
          sx={{
            marginTop: '20px',

            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          Отправить
        </Button>
      </Box>
    </Modal>
  );
};
