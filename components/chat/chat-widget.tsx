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
import { ScrollArea } from "../ui/scroll-area";
import LoadingDots from "../ui/loading-dots";

function ChatWidget() {
  const [showWidget, setShowWidget] = useState(false);
  const [isRotate, setIsRotate] = useState(false);
  const [open, setOpen] = useState(false);

  const [input, setInput] = React.useState("");
  const { messages, sendMessage, status } = useChat();
  const endRef = React.useRef<HTMLDivElement | null>(null);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setShowWidget(true);
    }, 1500);
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    if (open) {
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
      onMouseEnter={() => setIsRotate(true)}
      onMouseLeave={() => setIsRotate(false)}
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
              "flex h-full w-full flex-col rounded-none shadow-lg transition-[box-shadow,transform,opacity] duration-200 ease-out",
              "border-0 pt-0 lg:h-[82vh] lg:w-96 lg:rounded-xl 2xl:h-[70vh] 2xl:w-md"
            )}
          >
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

            <CardContent className="flex-1 p-0">
              <ScrollArea className="invisible-scrollbar flex h-[calc(100vh-200px)] flex-col overflow-y-scroll lg:h-[calc(82vh-200px)] 2xl:h-[calc(70vh-200px)]">
                {/* Messages */}
                <div className="flex flex-1 flex-col gap-3 p-3">
                  {messages.map((m) => {
                    const isUser = m.role === "user";
                    return (
                      <div
                        key={m.id}
                        className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}
                      >
                        {m.parts.map((part, i) => {
                          switch (part.type) {
                            case "text":
                              return (
                                <div
                                  key={`${m.id}-${i}`}
                                  className={cn(
                                    "w-fit max-w-xs rounded-2xl px-3 py-2 md:max-w-sm",
                                    isUser
                                      ? "bg-custom-blue text-white"
                                      : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
                                  )}
                                >
                                  {part.text}
                                </div>
                              );
                          }
                        })}
                      </div>
                    );
                  })}
                  {status === "submitted" && (
                    <div className="w-fit max-w-xs rounded-2xl bg-gray-100 px-3 py-2 md:max-w-sm">
                      <LoadingDots className="h-1.5 w-1.5 bg-gray-400" />
                    </div>
                  )}
                  <div ref={endRef} />
                </div>
              </ScrollArea>
            </CardContent>

            <CardFooter className="border-t px-3 pt-3">
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
                <p className="text-muted-foreground mt-1 text-center text-xs">
                  Powered by{" "}
                  <a target="_blank" href={FOOTER.authorContact} className="font-medium">
                    Rahul Puri
                  </a>
                </p>
              </form>
            </CardFooter>
          </Card>
        </div>
      ) : (
        <button
          aria-label={open ? "Close assistant" : "Open assistant"}
          onClick={() => setOpen((v) => !v)}
          className="bg-custom-blue cursor-pointer rounded-full p-4"
        >
          <ChatIcon isRotate={isRotate} />
          <span className="sr-only">Assistant</span>
        </button>
      )}
    </div>
  );
}

export default ChatWidget;
