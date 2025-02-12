"use client";

import { useEffect, useCallback } from 'react';
import Image from 'next/image';
import type { Style, StyleChild } from '@/types/style';

interface StyleModalProps {
  style: Style | StyleChild | null;
  onClose: () => void;
  onSelect: (image: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const StyleModal = ({ style, onClose, onSelect, onNext, onPrev }: StyleModalProps) => {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    switch (e.key) {
      case 'Escape':
        onClose();
        break;
      case 'ArrowRight':
        onNext();
        break;
      case 'ArrowLeft':
        onPrev();
        break;
      case 'Enter':
        if (style?.image) {
          onSelect(style.image);
          onClose();
        }
        break;
    }
  }, [onClose, onNext, onPrev, onSelect, style]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!style || !style.image) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
         onClick={onClose}>
      <div 
        className="relative w-full max-w-5xl aspect-video rounded-lg overflow-hidden cursor-pointer group"
        onClick={(e) => {
          e.stopPropagation();
          onSelect(style.image!);
          onClose();
        }}
      >
        <Image
          src={style.image}
          alt={style.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
          <h2 className="text-2xl font-bold text-pink-500 mb-2">{style.name}</h2>
          {style.description && (
            <p className="text-gray-300">{style.description}</p>
          )}
        </div>

        {/* Navigation Controls */}
        <div className="absolute inset-y-0 left-0 w-1/4 flex items-center justify-start p-4 opacity-0 group-hover:opacity-100 transition-opacity"
             onClick={(e) => {
               e.stopPropagation();
               onPrev();
             }}>
          <button className="w-12 h-12 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors flex items-center justify-center">
            <span className="transform scale-150">‹</span>
          </button>
        </div>
        <div className="absolute inset-y-0 right-0 w-1/4 flex items-center justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity"
             onClick={(e) => {
               e.stopPropagation();
               onNext();
             }}>
          <button className="w-12 h-12 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors flex items-center justify-center">
            <span className="transform scale-150">›</span>
          </button>
        </div>

        {/* Close Button */}
        <button
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          ✕
        </button>

        {/* Keyboard Shortcuts Help */}
        <div className="absolute top-4 left-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="px-2 py-1 rounded bg-black/50 text-white text-sm">← 前</span>
          <span className="px-2 py-1 rounded bg-black/50 text-white text-sm">→ 次</span>
          <span className="px-2 py-1 rounded bg-black/50 text-white text-sm">Enter 選択</span>
          <span className="px-2 py-1 rounded bg-black/50 text-white text-sm">ESC 閉じる</span>
        </div>
      </div>
    </div>
  );
};
