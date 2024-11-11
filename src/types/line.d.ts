declare module 'messaging-api-line' {
  interface PostbackAction {
    type: 'postback';
    label?: string;
    data: string;
    text?: string;
    displayText?: string;
    inputOption?: 'openKeyboard';
  }
}

export interface LineApiRequest extends NextApiRequest {
  body: {
    destination: string;
    events: WebhookEvent[];
  };
}

export type WebhookEvent =
  | {
      type: 'follow';
      webhookEventId: string;
      deliveryContext: { isRedelivery: boolean };
      timestamp: number;
      source: { type: string; userId: string };
      replyToken: string;
      mode: 'active';
    }
  | {
      type: 'unfollow';
      webhookEventId: string;
      deliveryContext: { isRedelivery: boolean };
      timestamp: number;
      source: { type: string; userId: string };
      mode: 'active';
    }
  | {
      type: 'message';
      webhookEventId: string;
      deliveryContext: { isRedelivery: false };
      timestamp: number;
      source: { type: 'group'; userId: string };
      replyToken: string;
      mode: 'active';
      message: Message;
    }
  | {
      type: 'postback';
      webhookEventId: string;
      deliveryContext: { isRedelivery: boolean };
      timestamp: number;
      source: { userId: string; type: string };
      replyToken: string;
      mode: 'active';
      postback: {
        data: string;
        params: {
          date: string;
        };
      };
    };

type Message = {
  id: string;
  type: 'text';
  text: string;
  emojis: { index: number; length: number; productId: string; emojiId: string }[];
  mention?: {
    mentionees: (
      | { index: number; length: number; type: 'all' }
      | { index: number; length: number; userId: string; type: 'user' }
    )[];
  };
};
