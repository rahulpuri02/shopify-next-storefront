"use client";

import React, { useEffect, useState } from "react";
import ChatIcon from "../icons/chat-icon";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BotIcon from "../icons/bot-icon";
import { Send, X } from "lucide-react";

function ChatWidget() {
  const [showWidget, setShowWidget] = useState(false);
  const [isRotate, setIsRotate] = useState(false);
  const [open, setOpen] = useState(false);

  const [input, setInput] = React.useState("");
  const [messages, setMessages] = React.useState([
    { id: "m-0", role: "assistant", content: "Hi! How can I help you today?" },
  ]);

  const endRef = React.useRef<HTMLDivElement | null>(null);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setShowWidget(true);
    }, 2000);
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    if (open) {
      inputRef.current?.focus();
    }
  }, [messages, open]);

  function handleSend(e?: React.FormEvent<HTMLFormElement>) {
    if (e) e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { id: `m-${prev.length}`, role: "user", content: text }]);
    setInput("");
  }

  return (
    <div
      onMouseEnter={() => setIsRotate(true)}
      onMouseLeave={() => setIsRotate(false)}
      className={cn(
        "fixed right-8 bottom-8 transition-opacity delay-300 ease-in-out",
        showWidget ? "opacity-100" : "opacity-0",
        !open && "md:right-8 md:bottom-8"
      )}
    >
      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="assistant-title"
          className="fixed inset-0 z-[9999] lg:inset-auto lg:right-4 lg:bottom-8 lg:z-50"
        >
          <Card
            className={cn(
              "flex h-screen w-screen flex-col rounded-none shadow-lg transition-[box-shadow,transform,opacity] duration-200 ease-out",
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
              <div className="flex h-full flex-col overflow-hidden">
                {/* Messages */}
                <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-3">
                  {messages.map((m) => {
                    const isUser = m.role === "user";
                    return (
                      <div
                        key={m.id}
                        className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={cn(
                            "w-fit max-w-xs rounded-2xl px-3 py-2 md:max-w-sm",
                            isUser
                              ? "bg-custom-blue text-white"
                              : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
                          )}
                        >
                          {m.content}
                        </div>
                      </div>
                    );
                  })}
                  <div ref={endRef} />
                </div>
              </div>
            </CardContent>

            <CardFooter className="border-t p-3">
              <form onSubmit={handleSend} className="flex w-full items-center gap-2">
                <Input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  aria-label="Message input"
                  className="flex-1"
                />
                <Button
                  type="submit"
                  aria-label="Send message"
                  disabled={!input.trim()}
                  className="transition-colors"
                >
                  <Send className="h-4 w-4" aria-hidden />
                </Button>
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
