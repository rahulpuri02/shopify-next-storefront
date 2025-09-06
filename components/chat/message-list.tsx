import { ChatMessage, type ChatMessageProps, type Message } from "@/components/chat/chat-message";
import { Loader } from "../ui/loader";

type AdditionalMessageOptions = Omit<ChatMessageProps, keyof Message>;

type ComponentProps = {
  messages: Message[];
  showTimeStamps?: boolean;
  isTyping?: boolean;
  error?: Error | null;
  closeWidget: () => void;
  messageOptions?: AdditionalMessageOptions | ((message: Message) => AdditionalMessageOptions);
};

export function MessageList({
  messages,
  isTyping = false,
  messageOptions,
  error,
  closeWidget,
}: ComponentProps) {
  return (
    <div className="space-y-4 overflow-visible">
      {messages.map((message, index) => {
        const additionalOptions =
          typeof messageOptions === "function" ? messageOptions(message) : messageOptions;

        return (
          <ChatMessage key={index} {...message} {...additionalOptions} closeWidget={closeWidget} />
        );
      })}
      {error?.message && (
        <ChatMessage
          id={crypto.randomUUID()}
          closeWidget={closeWidget}
          key="error"
          role="assistant"
          content="Apologies! I’m currently handling too many requests. Try again shortly—I’ll be ready to assist you!"
          animation="fade"
        />
      )}
      {isTyping && <Loader />}
    </div>
  );
}
