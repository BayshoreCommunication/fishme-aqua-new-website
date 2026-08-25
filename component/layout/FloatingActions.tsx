"use client";

import Link from "next/link";
import CartDrawer from "@/component/shop/CartDrawer";
import { useShopStore } from "@/component/shop/shopStore";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import {
  getChatConversationAction,
  sendChatMessageAction,
  type ChatMessageRecord,
} from "@/app/actions/message";
import { io, type Socket } from "socket.io-client";

const SOCKET_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001")
  .replace(/\/api\/v1\/?$/, "")
  .replace(/\/$/, "");
const VISITOR_STORAGE_KEY = "fishme-chat-visitor-id";

const WishlistIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" />
  </svg>
);

const ChatIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
  </svg>
);

const CartIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
    <path d="m6 6 12 12M18 6 6 18" />
  </svg>
);

const SendIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" />
  </svg>
);

const PaperclipIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
  </svg>
);

const actionClassName =
  "pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

const FloatingActions = () => {
  const { cart, wishlist } = useShopStore();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = wishlist.length;
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMounted, setChatMounted] = useState(false);
  const closeTimerRef = useRef<number | null>(null);

  const openChat = () => {
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    setChatMounted(true);
    window.requestAnimationFrame(() => setChatOpen(true));
  };

  const closeChat = useCallback(() => {
    setChatOpen(false);
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = window.setTimeout(() => setChatMounted(false), 280);
  }, []);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && chatMounted) closeChat();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    };
  }, [chatMounted, closeChat]);

  return (
    <>
      {chatMounted && <ChatPanel open={chatOpen} onClose={closeChat} />}
      <aside
        aria-label="Quick actions"
        aria-hidden={chatMounted}
        className={`pointer-events-none fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-[1001] flex origin-bottom flex-col gap-3 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] sm:right-6 sm:bottom-[max(1.5rem,env(safe-area-inset-bottom))] md:right-10 ${chatMounted ? "translate-y-5 scale-90 opacity-0 [&>*]:!pointer-events-none" : "translate-y-0 scale-100 opacity-100"}`}
      >
        <Link
          href="/cart"
          aria-label={`View shopping cart, ${cartCount} ${
            cartCount === 1 ? "item" : "items"
          }`}
          className={`${actionClassName} relative bg-black/80`}
        >
          <CartIcon />
          {cartCount > 0 && (
            <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-white bg-primary px-1 text-[9px] font-bold leading-none text-white shadow-md">
              {cartCount > 99 ? "99+" : cartCount}
            </span>
          )}
        </Link>
        <Link
          href="/wishlist"
          aria-label={`View wishlist, ${wishlistCount} ${
            wishlistCount === 1 ? "item" : "items"
          }`}
          className={`${actionClassName} relative bg-primary`}
        >
          <WishlistIcon />
          {wishlistCount > 0 && (
            <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-white bg-red-500 px-1 text-[9px] font-bold leading-none text-white shadow-md">
              {wishlistCount > 99 ? "99+" : wishlistCount}
            </span>
          )}
        </Link>
        <button
          type="button"
          aria-label="Open chat"
          aria-expanded={false}
          onClick={openChat}
          className={`${actionClassName} bg-primary transition-[transform,background-color] duration-300 ${chatMounted ? "rotate-90 scale-75 bg-black" : "rotate-0 scale-100"}`}
        >
          <ChatIcon />
        </button>
      </aside>
      <CartDrawer />
    </>
  );
};

const ChatPanel = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessageRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const visitorIdRef = useRef("");
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const timeoutId = window.setTimeout(async () => {
      let visitorId = window.localStorage.getItem(VISITOR_STORAGE_KEY);
      if (!visitorId) {
        visitorId = window.crypto.randomUUID();
        window.localStorage.setItem(VISITOR_STORAGE_KEY, visitorId);
      }
      visitorIdRef.current = visitorId;

      const response = await getChatConversationAction(visitorId);
      if (!response.ok || !response.data) {
        setError(response.error || "Could not load chat.");
        setLoading(false);
        return;
      }

      setMessages(response.data.messages);
      setLoading(false);
      const socket = io(SOCKET_URL, {
        auth: { ticket: response.data.realtimeTicket },
        transports: ["websocket", "polling"],
      });
      socket.on(
        "messages:new",
        (event: { conversationId: string; message: ChatMessageRecord }) => {
          if (event.conversationId !== response.data?.conversation._id) return;
          setMessages((current) =>
            current.some((item) => item._id === event.message._id)
              ? current
              : [...current, event.message],
          );
        },
      );
      socketRef.current = socket;
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = message.trim();
    if (!text || sending) return;

    setSending(true);
    setError("");
    setMessage("");
    const response = await sendChatMessageAction(visitorIdRef.current, text);
    setSending(false);
    if (!response.ok || !response.data) {
      setMessage(text);
      setError(response.error || "Could not send message.");
      return;
    }
    const savedMessage = response.data.message;
    setMessages((current) =>
      current.some((item) => item._id === savedMessage._id)
        ? current
        : [...current, savedMessage],
    );
  };

  return (
    <>
      <button
        type="button"
        aria-label="Close chat window"
        onClick={onClose}
        className={`fixed inset-0 z-[998] cursor-default bg-black/25 backdrop-blur-[1px] transition-opacity duration-300 ease-out ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="chat-title"
        className={`fixed inset-x-3 bottom-3 z-[1000] flex max-h-[calc(100dvh-1.5rem)] origin-bottom-right flex-col overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_24px_80px_rgba(0,0,0,0.28)] transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] dark:border-white/10 dark:bg-[#101917] sm:inset-x-auto sm:bottom-6 sm:right-6 sm:h-[560px] sm:w-[390px] md:right-10 ${open ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-8 scale-95 opacity-0"}`}
      >
        <header className="relative overflow-hidden bg-gradient-to-br from-[#008d77] to-primary px-5 pb-5 pt-4 text-white">
          <div className="absolute -right-8 -top-10 h-32 w-32 rounded-full bg-white/10" />
          <div className="relative flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-white text-primary shadow-md">
                <ChatIcon />
                <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-primary bg-emerald-400" />
              </div>
              <div>
                <h2 id="chat-title" className="font-sans text-base font-extrabold">Fish Me Aqua Support</h2>
                <p className="mt-0.5 flex items-center gap-1.5 text-xs text-white/80">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" /> Online · Usually replies instantly
                </p>
              </div>
            </div>
            <button type="button" onClick={onClose} aria-label="Close chat" className="rounded-full p-2 text-white/80 transition hover:bg-white/15 hover:text-white">
              <CloseIcon />
            </button>
          </div>
        </header>

        <div className="flex-1 space-y-4 overflow-y-auto bg-[#f5f8f7] px-4 py-5 dark:bg-[#0b1210]">
          <p className="text-center text-[10px] font-bold uppercase tracking-[0.18em] text-black/35 dark:text-white/35">Today</p>
          {loading ? (
            <div className="flex h-32 items-center justify-center"><span className="h-7 w-7 animate-spin rounded-full border-2 border-primary/20 border-t-primary" /></div>
          ) : (
            <div className="flex justify-start">
              <div className="max-w-[82%] rounded-2xl rounded-bl-md border border-black/[0.06] bg-white px-4 py-3 text-sm leading-5 text-black/75 shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-white/80">
                Hi! Welcome to Fish Me Aqua. How can we help you today?
              </div>
            </div>
          )}
          {messages.map((item) => (
            <div key={item._id} className={`flex ${item.sender !== "staff" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[82%] ${item.sender !== "staff" ? "items-end" : "items-start"} flex flex-col`}>
                <div className={`rounded-2xl px-4 py-3 text-sm leading-5 shadow-sm ${item.sender !== "staff" ? "rounded-br-md bg-primary text-white" : "rounded-bl-md border border-black/[0.06] bg-white text-black/75 dark:border-white/10 dark:bg-white/10 dark:text-white/80"}`}>
                  {item.text}
                </div>
                <span className="mt-1 px-1 text-[10px] text-black/35 dark:text-white/35">{new Date(item.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={sendMessage} className="border-t border-black/[0.07] bg-white p-3 dark:border-white/10 dark:bg-[#101917]">
          <div className="flex items-end gap-2 rounded-2xl border border-black/10 bg-black/[0.025] p-2 focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/10 dark:border-white/10 dark:bg-white/5">
            <button type="button" aria-label="Attach a file" className="mb-0.5 shrink-0 rounded-xl p-2 text-black/40 transition hover:bg-black/5 hover:text-primary dark:text-white/40 dark:hover:bg-white/10">
              <PaperclipIcon />
            </button>
            <textarea
              ref={inputRef}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  event.currentTarget.form?.requestSubmit();
                }
              }}
              rows={1}
              maxLength={500}
              placeholder="Write your message…"
              className="max-h-24 min-h-10 flex-1 resize-none bg-transparent px-1 py-2.5 text-sm text-black outline-none placeholder:text-black/35 dark:text-white dark:placeholder:text-white/35"
            />
            <button type="submit" disabled={!message.trim() || sending || loading} aria-label="Send message" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-white transition hover:bg-[#008d77] disabled:cursor-not-allowed disabled:opacity-40">
              {sending ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" /> : <SendIcon />}
            </button>
          </div>
          <p className={`mt-2 text-center text-[10px] ${error ? "text-red-500" : "text-black/35 dark:text-white/30"}`}>{error || "Your conversation is saved securely"}</p>
        </form>
      </section>
    </>
  );
};

export default FloatingActions;
