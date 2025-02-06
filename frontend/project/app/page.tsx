"use client";

import { useState } from "react";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Message } from "@/types/chat";

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your AI assistant powered by BERT. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response (this will be replaced with actual BERT API call)
    setTimeout(() => {
      const aiMessage: Message = {
        role: "assistant",
        content: "This is a placeholder response. The BERT model integration will be implemented soon.",
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="flex items-center justify-center p-4 border-b bg-white dark:bg-gray-900">
        <Bot className="w-6 h-6 text-blue-500 mr-2" />
        <h1 className="text-xl font-semibold">AI Grievance Redressal ChatBot</h1>
      </div>

      <div className="flex-1 container max-w-4xl mx-auto p-4 flex flex-col">
        <ScrollArea className="flex-1 rounded-lg border bg-white dark:bg-gray-900 p-4 mb-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 ${
                  message.role === "assistant" ? "flex-row" : "flex-row-reverse"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.role === "assistant"
                      ? "bg-blue-100 text-blue-500"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {message.role === "assistant" ? (
                    <Bot className="w-5 h-5" />
                  ) : (
                    <User className="w-5 h-5" />
                  )}
                </div>
                <div
                  className={`rounded-lg p-3 max-w-[80%] ${
                    message.role === "assistant"
                      ? "bg-gray-100 dark:bg-gray-800"
                      : "bg-blue-500 text-white"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center gap-2 text-gray-500">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>AI is thinking...</span>
              </div>
            )}
          </div>
        </ScrollArea>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            <Send className="w-4 h-4 mr-2" />
            Send
          </Button>
        </form>
      </div>
    </main>
  );
}