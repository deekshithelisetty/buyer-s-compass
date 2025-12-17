import { useState } from "react";

interface FloatingChatButtonProps {
  onClick?: () => void;
}

export function FloatingChatButton({ onClick }: FloatingChatButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 group transition-transform hover:scale-110 animate-[bounce_1s_ease-in-out]"
    >
      {/* Soft glow effect */}
      <div className="absolute inset-0 rounded-full blur-xl opacity-60 animate-[pulse_2s_ease-in-out_infinite]" style={{
        background: 'linear-gradient(135deg, #FFB6C1, #DDA0DD, #87CEEB)'
      }} />
      
      {/* Cute Kawaii Chatbot Icon */}
      <svg className="w-[72px] h-[72px] relative z-10" viewBox="0 0 72 72" fill="none" style={{ filter: 'drop-shadow(0 4px 8px rgba(255,182,193,0.4))' }}>
        <defs>
          {/* Soft pastel gradient */}
          <linearGradient id="kawaiiBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFB6C1" />
            <stop offset="50%" stopColor="#DDA0DD" />
            <stop offset="100%" stopColor="#87CEEB" />
          </linearGradient>
          {/* Blush gradient */}
          <radialGradient id="blush" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF9999" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#FF9999" stopOpacity="0" />
          </radialGradient>
          {/* Shine highlight */}
          <linearGradient id="shine" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Main bubble body */}
        <path d="M10 28 C10 14 22 6 36 6 C50 6 62 14 62 28 L62 40 C62 54 50 62 36 62 L28 62 L20 70 L20 62 C14 60 10 52 10 40 Z" fill="url(#kawaiiBody)" />
        
        {/* Shine highlight */}
        <ellipse cx="26" cy="18" rx="12" ry="6" fill="url(#shine)" />
        
        {/* Cute ears/antenna */}
        <circle cx="20" cy="10" r="6" fill="#DDA0DD" />
        <circle cx="52" cy="10" r="6" fill="#87CEEB" />
        <circle cx="20" cy="10" r="3" fill="#ffffff" opacity="0.5" />
        <circle cx="52" cy="10" r="3" fill="#ffffff" opacity="0.5" />
        
        {/* Eyes - big and cute */}
        <ellipse cx="26" cy="32" rx="6" ry="7" fill="#2D2D2D" />
        <ellipse cx="46" cy="32" rx="6" ry="7" fill="#2D2D2D" />
        
        {/* Eye sparkles */}
        <circle cx="28" cy="29" r="2.5" fill="#ffffff" />
        <circle cx="48" cy="29" r="2.5" fill="#ffffff" />
        <circle cx="24" cy="33" r="1.5" fill="#ffffff" opacity="0.7" />
        <circle cx="44" cy="33" r="1.5" fill="#ffffff" opacity="0.7" />
        
        {/* Blush cheeks */}
        <ellipse cx="16" cy="40" rx="5" ry="3" fill="url(#blush)" />
        <ellipse cx="56" cy="40" rx="5" ry="3" fill="url(#blush)" />
        
        {/* Cute smile */}
        <path d="M30 46 Q36 52 42 46" stroke="#2D2D2D" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        
        {/* Small sparkles around */}
        <g fill="#FFD700" opacity="0.8">
          <path d="M8 24 L10 26 L8 28 L6 26 Z" />
          <path d="M64 24 L66 26 L64 28 L62 26 Z" />
          <path d="M36 2 L37 4 L36 6 L35 4 Z" />
        </g>
        
        {/* Heart accent */}
        <path d="M58 52 C58 50 60 48 62 50 C64 48 66 50 66 52 C66 56 62 58 62 58 C62 58 58 56 58 52" fill="#FF6B8A" opacity="0.8" />
      </svg>
    </button>
  );
}
