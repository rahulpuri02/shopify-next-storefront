import { type Message } from "./chat-message";
import { CopyButton } from "../ui/copy-button";
import { MessageList } from "./message-list";

type ComponentProps = React.PropsWithChildren & {
  messages: Message[];
};

export function ChatMessages({ messages }: ComponentProps) {
  const lastMessage = messages.at(-1);
  const isTyping = lastMessage?.role === "user";

  const messageOptions = (message: Message) => {
    const content = message.parts?.map((p) => (p.type === "text" ? p.text : "")).join("") as string;
    return {
      actions: <CopyButton content={content} copyMessage="Copied response to clipboard!" />,
    };
  };

  return (
    <div className="grid grid-cols-1 overflow-y-auto pb-4">
      <div className="[grid-column:1/1] [grid-row:1/1] max-w-full">
        <MessageList messages={messages} isTyping={isTyping} messageOptions={messageOptions} />
      </div>
    </div>
  );
}
