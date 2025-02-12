"use client";

import { StyleList } from '@/components/StyleList';

export default function Home() {
  const handleStyleSelect = (image: string) => {
    // TODO: 画像処理の実装
    console.log('Selected style:', image);
  };

  return (
    <main className="min-h-screen bg-black">
      <div className="relative py-12 mb-8">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-pink-500/20 via-purple-500/10 to-transparent" />
        </div>
        <h1 className="relative text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-400 to-pink-500 animate-gradient">
          映画表現スタイル
        </h1>
      </div>
      <StyleList onSelect={handleStyleSelect} />
    </main>
  );
}