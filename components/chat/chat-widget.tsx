"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FOOTER } from "@/constants/shared";
import { cn } from "@/lib/utils";
import { useChat } from "@ai-sdk/react";
import { ArrowUp, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import BotIcon from "../icons/bot-icon";
import ChatIcon from "../icons/chat-icon";
import { ChatMessages } from "./chat-messages";
import { ScrollArea } from "../ui/scroll-area";
import { Message } from "./chat-message";

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
    }, 1200);
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    if (!isMounted) {
      isMounted = true;
      inputRef.current?.focus();
    }
  }, [messages, open, status]);

  function handleSend(e: React.FormEvent<HTMLFormElement>) {
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
              <CardHeader className="bg-custom-blue flex flex-row items-center justify-between border-b px-4 py-4 pt-6 lg:rounded-t-xl">
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
                <ScrollArea className="invisible-scrollbar flex h-[calc(100vh-215px)] flex-col overflow-y-scroll px-4 pb-6 lg:h-[calc(82vh-200px)] 2xl:h-[calc(70vh-200px)]">
                  <ChatMessages messages={messages as Message[]} />
                  <div ref={endRef} />
                </ScrollArea>
              </CardContent>

              <CardFooter className="fixed bottom-4 w-full border-t px-3 pt-3 lg:bottom-12 lg:w-96 2xl:w-md">
                <form onSubmit={handleSend} className="flex w-full flex-col items-center">
                  <div className="flex w-full gap-2">
                    <Input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Say something..."
                      aria-label="Message input"
                      className="w-full flex-1"
                      disabled={status === "submitted"}
                    />
                    <button
                      type="submit"
                      disabled={!input.trim().length || status === "submitted"}
                      className={cn(
                        "ease-in-outopacity-50 rounded-full bg-slate-200 p-3 transition-shadow duration-200",
                        input.trim().length && status !== "submitted" && "cursor-pointer",
                        status === "submitted" && "cursor-not-allowed opacity-50"
                      )}
                    >
                      <ArrowUp
                        className={cn(
                          "h-4 w-4",
                          (!input.trim().length || status === "submitted") && "text-white"
                        )}
                      />
                    </button>
                  </div>
                  <p className="text-muted-foreground mt-2 text-center text-xs">
                    Powered by{" "}
                    <a target="_blank" href={FOOTER.authorContact} className="font-medium">
                      Rahul Puri
                    </a>
                  </p>
                </form>
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
