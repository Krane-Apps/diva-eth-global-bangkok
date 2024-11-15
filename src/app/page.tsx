"use client";

import React, { useState } from "react";
import { Bot } from "lucide-react";
import { MessageList } from "react-chat-elements";
import "react-chat-elements/dist/main.css";

import { useAccount } from "wagmi";
import LoginButton from "../components/LoginButton";
import SignupButton from "../components/SignupButton";
import { QuickCommands } from "src/components/diva/QuickCommands";
import { SidePanel } from "src/components/diva/SidePanel";
import { ChatInput } from "src/components/diva/ChatInput";
import { getChatResponse } from "src/lib/openai";
import { OPENAI_API_KEY } from "src/config";

interface Message {
  position: "left" | "right";
  type: "text";
  title: string;
  text: string;
  date: Date;
  avatar: string;
}

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export default function Page() {
  const { address } = useAccount();
  const [messages, setMessages] = useState<Message[]>([
    {
      position: "left",
      type: "text",
      title: "DIVA",
      text: "Hi, I'm DIVA! What can I help you with today? You can try commands like 'swap ETH to BTC', 'bridge USDT to Polygon', or 'stake ETH'.",
      date: new Date(),
      avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=diva",
    },
  ]);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      position: "right",
      type: "text",
      title: "You",
      text: text,
      date: new Date(),
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    const newChatHistory = [...chatHistory, { role: "user", content: text }];
    const response = await getChatResponse(
      OPENAI_API_KEY ?? "",
      newChatHistory
    );

    const botResponse: Message = {
      position: "left",
      type: "text",
      title: "DIVA",
      text: response ?? "",
      date: new Date(),
      avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=diva",
    };

    setMessages((prev) => [...prev, botResponse]);
    setChatHistory([
      ...newChatHistory,
      {
        role: "assistant" as "user" | "assistant" | "system",
        content: response ?? "",
      },
    ]);
    setIsTyping(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto h-screen flex justify-between">
        <div className="flex-1 flex flex-col">
          <header className="p-4 bg-white border-b border-gray-100 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
                <Bot className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text">
                  DIVA Assistant
                </h1>
                <p className="text-xs text-gray-500">
                  Your AI Trading Companion
                </p>
              </div>
              <div className="flex items-center gap-3">
                <SignupButton />
                {!address && <LoginButton />}
              </div>
            </div>
          </header>

          <QuickCommands onCommandClick={handleSend} />

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <MessageList
              className="message-list"
              lockable={true}
              toBottomHeight={"100%"}
              dataSource={messages}
            />
            {isTyping && (
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <div className="w-8 h-8 rounded-xl gradient-bg flex items-center justify-center">
                  <Bot size={20} className="text-white" />
                </div>
                <span>DIVA is typing...</span>
              </div>
            )}
          </div>

          <ChatInput onSend={handleSend} />
        </div>

        <SidePanel />
      </div>

      {/* <Footer /> */}
    </div>
  );
}
