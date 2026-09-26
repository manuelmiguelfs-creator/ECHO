"use client";

import { Fragment, useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { ConversationProvider, useConversation } from "@elevenlabs/react";
import { Loader2, Mic, MicOff, Send } from "lucide-react";

type ChatMessage = { role: "user" | "agent"; text: string };
type Mode = "voice" | "text";

const agentId = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID;
const sitePath = /(\/(?:solutions|learn|help-now|meet|journal|community|quiz)(?:\/[\w-]+)?)/g;

export function TalkChat() {
  if (!agentId) {
    return (
      <div className="rounded-[2rem] bg-paper p-8 text-sm leading-6 text-ink/70">
        Echo isn’t connected yet. Add <code>NEXT_PUBLIC_ELEVENLABS_AGENT_ID</code> to <code>.env.local</code> and
        restart the dev server.
      </div>
    );
  }
  return (
    <ConversationProvider agentId={agentId}>
      <Chat agentId={agentId} />
    </ConversationProvider>
  );
}

function Chat({ agentId }: { agentId: string }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [mode, setMode] = useState<Mode | null>(null);
  const [draft, setDraft] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [levels, setLevels] = useState({ input: 0, output: 0 });
  const pendingText = useRef<string | null>(null);
  const lastTyped = useRef<string | null>(null);
  const switchToVoice = useRef(false);
  const modeRef = useRef<Mode | null>(null);
  const logEnd = useRef<HTMLDivElement>(null);

  const conversation = useConversation({
    onIncomingEvent: (event) => {
      if (modeRef.current === "voice" && event?.type === "tentative_user_transcript") {
        setDraft(event.tentative_user_transcription_event.user_transcript);
      }
    },
    onConnect: () => {
      if (pendingText.current) {
        conversation.sendUserMessage(pendingText.current);
        pendingText.current = null;
      }
    },
    onDisconnect: () => {
      if (switchToVoice.current) {
        switchToVoice.current = false;
        start("voice");
      } else {
        modeRef.current = null;
        setMode(null);
      }
    },
    onMessage: ({ role, message }) => {
      if (role === "user" && message === lastTyped.current) {
        lastTyped.current = null;
        return;
      }
      if (role === "user" && modeRef.current === "voice") setDraft("");
      setMessages((current) => [...current, { role, text: message }]);
    },
    onError: (message) => setError(String(message)),
  });

  const { status, isSpeaking, getInputVolume, getOutputVolume } = conversation;
  const active = status === "connected" || status === "connecting";
  const inVoiceCall = active && mode === "voice";
  const listening = inVoiceCall && status === "connected";

  useEffect(() => {
    logEnd.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages]);

  useEffect(() => {
    if (!listening) {
      setLevels({ input: 0, output: 0 });
      return;
    }
    const timer = setInterval(() => setLevels({ input: getInputVolume(), output: getOutputVolume() }), 100);
    return () => clearInterval(timer);
  }, [listening, getInputVolume, getOutputVolume]);

  function start(next: Mode) {
    setError(null);
    modeRef.current = next;
    setMode(next);
    if (next === "voice") setDraft("");
    conversation.startSession({ agentId, connectionType: "websocket", textOnly: next === "text" });
  }

  function toggleMic() {
    if (inVoiceCall) {
      conversation.endSession();
    } else if (active) {
      switchToVoice.current = true;
      conversation.endSession();
    } else {
      start("voice");
    }
  }

  function sendText(event: FormEvent) {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setDraft("");
    lastTyped.current = text;
    setMessages((current) => [...current, { role: "user", text }]);
    if (status === "connected") {
      conversation.sendUserMessage(text);
    } else {
      pendingText.current = text;
      if (status !== "connecting") start("text");
    }
  }

  const micLabel = inVoiceCall
    ? status === "connecting"
      ? "Connecting…"
      : isSpeaking
        ? "Echo is speaking…"
        : "Listening… tap to stop"
    : "Tap to talk";

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <div className="flex flex-col items-center justify-center gap-5 rounded-[2rem] bg-ink p-8 text-white">
        <button
          type="button"
          onClick={toggleMic}
          aria-pressed={inVoiceCall}
          aria-label={inVoiceCall ? "Stop talking to Echo" : "Start talking to Echo"}
          className={`relative grid size-36 cursor-pointer place-items-center rounded-full shadow-xl transition-all hover:scale-105 focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-white ${
            inVoiceCall ? "bg-white text-terracotta" : "bg-terracotta text-white hover:bg-white hover:text-terracotta"
          }`}
        >
          {inVoiceCall && status === "connected" && (
            <span className="absolute inset-0 animate-ping rounded-full bg-white/30" aria-hidden />
          )}
          {inVoiceCall && status === "connecting" ? (
            <Loader2 className="size-14 animate-spin" />
          ) : inVoiceCall ? (
            <MicOff className="size-14" />
          ) : (
            <Mic className="size-14" />
          )}
        </button>
        <p className="text-center font-display text-xl font-semibold" aria-live="polite">
          {micLabel}
        </p>
        {listening ? (
          <div className="grid w-full gap-3">
            <LevelMeter label="Your microphone" level={levels.input} />
            <LevelMeter label="Echo’s voice" level={levels.output} />
          </div>
        ) : (
          <p className="text-center text-xs text-white/55">Your browser will ask for microphone access the first time.</p>
        )}
      </div>

      <div className="flex min-h-[28rem] flex-col rounded-[2rem] bg-paper">
        <div className="flex-1 space-y-3 overflow-y-auto p-6 sm:p-8" aria-live="polite">
          {messages.length === 0 && (
            <p className="text-ink/55">
              Tell Echo what’s been on your mind, by voice or by typing below. Echo will listen and suggest something
              from the site that could help.
            </p>
          )}
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <p
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                  message.role === "user" ? "bg-terracotta text-white" : "bg-cream text-ink"
                }`}
              >
                <MessageText text={message.text} />
              </p>
            </div>
          ))}
          {mode === "text" && status === "connecting" && (
            <p className="text-sm text-ink/50">Echo is joining…</p>
          )}
          {error && <p className="text-sm text-terracotta">Something went wrong: {error}</p>}
          <div ref={logEnd} />
        </div>

        <form onSubmit={sendText} className="flex gap-2 border-t border-ink/10 p-4">
          <label htmlFor="talk-input" className="sr-only">
            Message Echo
          </label>
          <input
            id="talk-input"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            readOnly={inVoiceCall}
            placeholder={inVoiceCall ? "Start speaking. Your words will appear here…" : "Type how you’re feeling…"}
            autoComplete="off"
            className={`h-12 flex-1 rounded-full border px-5 text-sm outline-none focus-visible:border-terracotta focus-visible:ring-3 focus-visible:ring-terracotta/20 ${
              inVoiceCall ? "border-terracotta/40 bg-cream italic" : "border-ink/15 bg-white"
            }`}
          />
          <button
            type="submit"
            disabled={inVoiceCall || !draft.trim()}
            aria-label="Send message"
            className="grid size-12 shrink-0 place-items-center rounded-full bg-ink text-white transition-colors hover:bg-terracotta disabled:opacity-40"
          >
            <Send className="size-5" />
          </button>
        </form>
      </div>
    </div>
  );
}

function LevelMeter({ label, level }: { label: string; level: number }) {
  return (
    <div>
      <p className="mb-1 text-xs text-white/60">{label}</p>
      <div className="h-2 overflow-hidden rounded-full bg-white/15">
        <div
          className="h-full rounded-full bg-terracotta transition-[width] duration-100"
          style={{ width: `${Math.min(100, level * 250)}%` }}
        />
      </div>
    </div>
  );
}

function MessageText({ text }: { text: string }) {
  return text.split(sitePath).map((part, index) =>
    index % 2 === 1 ? (
      <Link key={index} href={part} className="font-bold underline underline-offset-2">
        {part}
      </Link>
    ) : (
      <Fragment key={index}>{part}</Fragment>
    ),
  );
}
