'use client';

import React, { useState } from 'react';
import {
  Eye, X, Volume2, VolumeX, Subtitles,
  Radio, MessageCircle, Send,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Event } from '@/types';

interface LiveStreamPlayerProps {
  event: Event;
  onClose: () => void;
}

const INITIAL_MESSAGES = [
  { id: 1, user: 'Sarah K.',      message: 'This is such a great discussion!',          time: '2:03 PM' },
  { id: 2, user: 'DevMarcus',     message: 'Can you talk more about token naming?',      time: '2:05 PM' },
  { id: 3, user: 'DesignNerd42',  message: 'Love the Figma integration part',            time: '2:07 PM' },
  { id: 4, user: 'Priya D.',      message: 'How do you handle breaking changes?',         time: '2:09 PM' },
  { id: 5, user: 'Alex T.',       message: 'We use a similar approach at our company',   time: '2:11 PM' },
  { id: 6, user: 'MikaelS',       message: 'This is exactly what we needed to hear',     time: '2:13 PM' },
  { id: 7, user: 'JenW',          message: 'Are slides available after?',                time: '2:14 PM' },
  { id: 8, user: 'CarlosR',       message: 'Great examples from the Shopify team!',      time: '2:15 PM' },
];

export default function LiveStreamPlayer({ event, onClose }: LiveStreamPlayerProps) {
  const [muted, setMuted]               = useState(false);
  const [captionsOn, setCaptionsOn]     = useState(false);
  const [chatInput, setChatInput]       = useState('');
  const [messages, setMessages]         = useState(INITIAL_MESSAGES);

  function sendMessage() {
    if (!chatInput.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id:      prev.length + 1,
        user:    'You',
        message: chatInput.trim(),
        time:    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setChatInput('');
  }

  return (
    <div className="fixed inset-0 z-[200] flex flex-row bg-[#0d1117]">

      {/* ── Left: Video player ── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
          <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#E94560] animate-ping opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#E94560]" />
          </span>
          <h3 className="text-white text-sm font-medium truncate flex-1">
            {event.title}
          </h3>
          <span className="flex items-center gap-1 text-white/40 text-xs flex-shrink-0">
            <Eye className="size-3" />
            {event.attendees} watching
          </span>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors flex-shrink-0"
            aria-label="Close live stream"
          >
            <X className="size-4 text-white" />
          </button>
        </div>

        {/* Video area */}
        <div className="flex-1 relative flex items-center justify-center overflow-hidden bg-black">
          {/* Background image */}
          {event.image && (
            <div
              className="absolute inset-0 opacity-30 bg-cover bg-center"
              style={{ backgroundImage: `url(${event.image})` }}
            />
          )}
          <div className="absolute inset-0 bg-black/50" />

          {/* Center content */}
          <div className="relative z-10 flex flex-col items-center gap-4 text-center">
            <div className="w-20 h-20 rounded-full flex items-center justify-center bg-[#E94560]/20 border-2 border-[#E94560]/40">
              <Radio className="size-8 text-[#E94560]" />
            </div>
            <div>
              <p className="text-white text-base font-semibold">Live Stream in Progress</p>
              <p className="text-white/50 text-sm mt-1">Hosted by {event.hostName}</p>
            </div>
          </div>

          {/* Captions overlay */}
          {captionsOn && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-lg bg-black/80 max-w-xl">
              <p className="text-white text-sm text-center leading-relaxed">
                "...and that's why we believe design tokens should be the single source of truth across all platforms."
              </p>
            </div>
          )}
        </div>

        {/* Controls bar */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-white/10">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMuted(!muted)}
              className="w-9 h-9 rounded-lg flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors"
              aria-label={muted ? 'Unmute' : 'Mute'}
            >
              {muted
                ? <VolumeX className="size-4 text-white/60" />
                : <Volume2 className="size-4 text-white/60" />
              }
            </button>
            <button
              onClick={() => setCaptionsOn(!captionsOn)}
              className={cn(
                'w-9 h-9 rounded-lg flex items-center justify-center transition-colors',
                captionsOn
                  ? 'bg-[#E94560]/20 border border-[#E94560]/30'
                  : 'bg-white/10 hover:bg-white/20'
              )}
              aria-label={captionsOn ? 'Turn off captions' : 'Turn on captions'}
            >
              <Subtitles className={cn('size-4', captionsOn ? 'text-[#E94560]' : 'text-white/60')} />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full flex items-center gap-1.5 bg-[#E94560]/15 text-[#E94560] text-xs">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#E94560] animate-ping opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#E94560]" />
              </span>
              LIVE
            </span>
          </div>
        </div>
      </div>

      {/* ── Right: Live chat ── */}
      <div className="w-[340px] flex-shrink-0 flex flex-col border-l border-white/10 bg-[#16213E]">

        {/* Chat header */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
          <MessageCircle className="size-4 text-[#E94560]" />
          <span className="text-sm font-semibold text-white">Live Chat</span>
          <span className="ml-auto px-2 py-0.5 rounded-full text-[10px] bg-white/10 text-white/50">
            {messages.length}
          </span>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
          {messages.map((msg) => (
            <div key={msg.id}>
              <div className="flex items-baseline gap-2 mb-0.5">
                <span className={cn(
                  'text-xs font-semibold',
                  msg.user === 'You' ? 'text-[#E94560]' : 'text-white'
                )}>
                  {msg.user}
                </span>
                <span className="text-[9px] text-white/30">{msg.time}</span>
              </div>
              <p className="text-xs text-white/50 leading-relaxed">{msg.message}</p>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="px-4 py-3 border-t border-white/10">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Say something…"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              className="flex-1 px-3 py-2 rounded-lg bg-[#1A1A2E] border border-white/10 text-white/85 text-sm outline-none placeholder:text-white/25 focus:border-[#E94560]/50"
            />
            <button
              onClick={sendMessage}
              className="w-9 h-9 rounded-lg flex items-center justify-center bg-[#E94560] hover:bg-[#E94560]/90 transition-colors flex-shrink-0"
              aria-label="Send message"
            >
              <Send className="size-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}