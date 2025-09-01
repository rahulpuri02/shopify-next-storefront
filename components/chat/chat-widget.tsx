"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FOOTER } from "@/constants/shared";
import { cn } from "@/lib/utils";
import { useChat } from "@ai-sdk/react";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import BotIcon from "../icons/bot-icon";
import ChatIcon from "../icons/chat-icon";
import { ScrollArea } from "../ui/scroll-area";
import { Message } from "./chat-message";
import { ChatMessages } from "./chat-messages";
import {
  PromptInput,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
} from "./prompt-input";

let isMounted = false;

function ChatWidget() {
  const [showWidget, setShowWidget] = useState(false);
  const [open, setOpen] = useState(false);

  const [input, setInput] = React.useState("");
  const { messages, sendMessage, status } = useChat();
  const endRef = React.useRef<HTMLDivElement | null>(null);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setShowWidget(true);
    }, 500);
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "auto", block: "nearest" });
    if (!isMounted) {
      isMounted = true;
      inputRef.current?.focus();
    }
  }, [messages, open, status]);

  function handleSend(e: React.FormEvent<HTMLFormElement>) {
    if (!input.trim().length) return;
    e.preventDefault();
    sendMessage({ text: input });
    setInput("");
  }

  return (
    <div
      className={cn(
        "fixed right-8 bottom-8 z-50 transition-opacity delay-300 ease-in-out",
        showWidget ? "opacity-100" : "opacity-0",
        !open && "md:right-8 md:bottom-8"
      )}
    >
      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="assistant-title"
          className="fixed inset-0 lg:inset-auto lg:right-4 lg:bottom-8 lg:z-50"
        >
          <Card
            className={cn(
              "flex h-screen w-full flex-col overflow-hidden rounded-none shadow-lg transition-[box-shadow,transform,opacity] duration-200 ease-out",
              "border-0 pt-0 lg:h-[82vh] lg:w-96 lg:rounded-xl 2xl:h-[70vh] 2xl:w-md"
            )}
          >
            <div className="relative">
              <CardHeader className="bg-custom-blue mb-6 flex flex-row items-center justify-between border-b px-4 py-4 pt-6 lg:rounded-t-xl">
                <div className="flex items-center gap-3">
                  <BotIcon />
                  <CardTitle id="assistant-title" className="ml-8 text-base font-medium text-white">
                    AI Assistant
                  </CardTitle>
                </div>
                <X
                  onClick={() => setOpen(false)}
                  aria-label="Close assistant"
                  type="button"
                  className="h-auto w-6 cursor-pointer stroke-white stroke-1"
                />
              </CardHeader>

              <CardContent className="flex-1 p-0 pt-4">
                {!messages?.length && (
                  <>
                    <div className="mt-10 flex h-full flex-col items-center justify-center space-y-1">
                      <div className="text-2xl font-semibold">Hello there!</div>
                      <div className="text-2xl text-zinc-500">How can I help you today?</div>
                    </div>
                  </>
                )}
                <ScrollArea className="invisible-scrollbar flex h-[calc(100vh-290px)] flex-col overflow-y-scroll px-4 lg:h-[calc(82vh-235px)] 2xl:h-[calc(70vh-235px)]">
                  <ChatMessages messages={messages as Message[]} />
                  <div ref={endRef} />
                </ScrollArea>
              </CardContent>

              <CardFooter className="fixed bottom-4 z-10 mx-auto flex w-full flex-col gap-1 px-0 lg:bottom-10 lg:w-96 2xl:w-md">
                <PromptInput onSubmit={handleSend} className="mx-auto mt-4 flex w-[92%] gap-2">
                  <PromptInputTextarea onChange={(e) => setInput(e.target.value)} value={input} />
                  <PromptInputToolbar>
                    <PromptInputSubmit
                      type="submit"
                      disabled={!input?.trim().length}
                      status={status}
                    />
                  </PromptInputToolbar>
                </PromptInput>
                <p className="text-muted-foreground mt-2 text-center text-xs">
                  Powered by{" "}
                  <a target="_blank" href={FOOTER.authorContact} className="font-medium">
                    Rahul Puri
                  </a>
                </p>
              </CardFooter>
            </div>
          </Card>
        </div>
      ) : (
        <button
          aria-label={open ? "Close assistant" : "Open assistant"}
          onClick={() => setOpen(true)}
          className="bg-custom-blue cursor-pointer rounded-full p-4"
        >
          <ChatIcon />
          <span className="sr-only">Assistant</span>
        </button>
      )}
    </div>
  );
}

export default ChatWidget;
