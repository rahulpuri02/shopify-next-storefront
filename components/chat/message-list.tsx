import { ChatMessage, type ChatMessageProps, type Message } from "@/components/chat/chat-message";
import { Loader } from "../ui/loader";

type AdditionalMessageOptions = Omit<ChatMessageProps, keyof Message>;

type ComponentProps = {
  messages: Message[];
  showTimeStamps?: boolean;
  isTyping?: boolean;
  messageOptions?: AdditionalMessageOptions | ((message: Message) => AdditionalMessageOptions);
};

export function MessageList({ messages, isTyping = false, messageOptions }: ComponentProps) {
  return (
    <div className="space-y-4 overflow-visible">
      {messages.map((message, index) => {
        const additionalOptions =
          typeof messageOptions === "function" ? messageOptions(message) : messageOptions;

        return <ChatMessage key={index} {...message} {...additionalOptions} />;
      })}
      {isTyping && <Loader />}
    </div>
  );
}
