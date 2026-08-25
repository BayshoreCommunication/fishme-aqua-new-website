"use server";

import { auth } from "@/auth";

const BACKEND_URL = (
  process.env.API_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:5001"
).replace(/\/$/, "");
const API = `${BACKEND_URL}/api/v1`;

export interface ChatSenderUser {
  _id: string;
  firstName: string;
  lastName: string;
  role: string;
  avatar?: string;
}

export interface ChatMessageRecord {
  _id: string;
  conversation: string;
  sender: "customer" | "visitor" | "staff";
  senderUser?: ChatSenderUser;
  text: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChatConversationData {
  conversation: {
    _id: string;
    status: "open" | "closed";
    unreadForCustomer: number;
    createdAt: string;
  };
  messages: ChatMessageRecord[];
  realtimeTicket: string;
}

type ChatActionResult<T> = { ok: boolean; data?: T; error?: string };

const getToken = async () => {
  const session = await auth();
  return (session?.user as { accessToken?: string } | undefined)?.accessToken;
};

const requestHeaders = async () => {
  const token = await getToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const errorMessage = async (response: Response, fallback: string) => {
  try {
    const body = await response.json();
    return typeof body?.message === "string" ? body.message : fallback;
  } catch {
    return fallback;
  }
};

export async function getChatConversationAction(
  visitorId: string,
): Promise<ChatActionResult<ChatConversationData>> {
  try {
    const query = new URLSearchParams({ visitorId });
    const response = await fetch(`${API}/messages/conversation?${query}`, {
      headers: await requestHeaders(),
      cache: "no-store",
    });
    if (!response.ok) {
      return { ok: false, error: await errorMessage(response, "Could not load chat.") };
    }
    const body = await response.json();
    return { ok: true, data: body.data };
  } catch {
    return { ok: false, error: "Could not connect to support. Please try again." };
  }
}

export async function sendChatMessageAction(
  visitorId: string,
  text: string,
): Promise<ChatActionResult<{ conversationId: string; message: ChatMessageRecord }>> {
  try {
    const response = await fetch(`${API}/messages/conversation/messages`, {
      method: "POST",
      headers: await requestHeaders(),
      body: JSON.stringify({ visitorId, text }),
      cache: "no-store",
    });
    if (!response.ok) {
      return { ok: false, error: await errorMessage(response, "Could not send message.") };
    }
    const body = await response.json();
    return { ok: true, data: body.data };
  } catch {
    return { ok: false, error: "Could not send your message. Please try again." };
  }
}
