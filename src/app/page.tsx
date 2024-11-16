"use client";

import React, { useState } from "react";
import { Bot } from "lucide-react";
import { MessageList, MessageType } from "react-chat-elements";
import "react-chat-elements/dist/main.css";
import dotenv from "dotenv";

dotenv.config();
import { useAccount } from "wagmi";
import LoginButton from "../components/LoginButton";
import SignupButton from "../components/SignupButton";
import { QuickCommands } from "src/components/diva/QuickCommands";
import { SidePanel } from "src/components/diva/SidePanel";
import { ChatInput } from "src/components/diva/ChatInput";
import { getChatResponse } from "src/lib/openai";
import { TransactionSteps } from "src/components/diva/TransactionSteps";
import { TransactionStep } from "src/lib/types";

interface Message {
  position: "left" | "right";
  type: "text";
  title: string;
  text: string;
  date: Date;
  avatar: string;
  id: number;
  focus?: boolean;
  status?: "waiting" | "sent" | "received" | "read";
  forwarded?: boolean;
  replyButton?: boolean;
  removeButton?: boolean;
  titleColor?: string;
  notch: boolean;
  retracted: boolean;
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
      id: 1,
      notch: true,
      retracted: false,
    },
  ]);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [transactionSteps, setTransactionSteps] = useState<TransactionStep[]>(
    []
  );

  const tryParseJSON = (text: string): TransactionStep[] | null => {
    try {
      const parsed = JSON.parse(text);
      if (
        Array.isArray(parsed) &&
        parsed.every(
          (step) =>
            step.action &&
            step.amount &&
            step.from_token &&
            step.from_chain &&
            step.to_token &&
            step.to_chain
        )
      ) {
        return parsed;
      }
    } catch (e) {}
    return null;
  };

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      position: "right",
      type: "text",
      title: "You",
      text: text,
      date: new Date(),
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user",
      id: 0,
      notch: false,
      retracted: false,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);
    setCurrentStep(0);
    setTransactionSteps([]);

    const newChatHistory = [...chatHistory, { role: "user", content: text }];
    const response = await getChatResponse(
      process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ?? "",
      newChatHistory as ChatMessage[]
    );

    const steps = tryParseJSON(response ?? "");
    console.log("steps", steps);
    if (steps) {
      setTransactionSteps(steps);
      const progressSteps = () => {
        setCurrentStep((prev) => {
          if (prev < steps.length) {
            setTimeout(progressSteps, 3000);
            return prev + 1;
          }
          return prev;
        });
      };
      setTimeout(progressSteps, 3000);
    } else {
      const botMessage: Message = {
        position: "left",
        type: "text",
        title: "DIVA",
        text: response ?? "",
        date: new Date(),
        avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=diva",
        id: 0,
        notch: false,
        retracted: false,
      };
      setMessages((prev) => [...prev, botMessage]);
    }

    setChatHistory([
      ...(newChatHistory as ChatMessage[]),
      {
        role: "assistant" as "user" | "assistant" | "system",
        content: response ?? "",
      },
    ]);
    setIsTyping(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto h-screen flex">
        <div className="flex-1 flex flex-col">
          <header className="p-4 bg-white border-b border-gray-100 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3 justify-between w-full">
              <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
                <Bot className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text">
                  Good INTENTtions
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
              dataSource={messages as MessageType[]}
              referance={messages}
            />
            {transactionSteps.length > 0 && (
              <div className="my-4">
                <TransactionSteps
                  steps={transactionSteps}
                  currentStep={currentStep}
                />
              </div>
            )}
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
    </div>
  );
}
