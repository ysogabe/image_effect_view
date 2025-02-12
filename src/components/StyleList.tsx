"use client";

import { useState } from 'react';
import Image from 'next/image';
import { styles } from '@/lib/styles';
import { StyleModal } from './StyleModal';
import type { Style, StyleChild } from '@/types/style';

interface StyleItemProps {
  style: Style | StyleChild;
  onClick: () => void;
}

const StyleItem = ({ style, onClick }: StyleItemProps) => {
  return (
    <div 
      className="group cursor-pointer transition-all duration-300 scale-95 opacity-70 hover:opacity-100 hover:scale-100"
      onClick={onClick}
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-lg">
        {style.image && (
          <Image
            src={style.image}
            alt={style.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-lg font-bold mb-1 text-pink-500">{style.name}</h3>
          {style.description && (
            <p className="text-sm text-gray-300 mb-2">{style.description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

interface StyleCategoryProps {
  category: Style;
  onStyleClick: (style: Style | StyleChild) => void;
}

const StyleCategory = ({ category, onStyleClick }: StyleCategoryProps) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-pink-500">{category.name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {category.children?.map((style, index) => (
          <StyleItem
            key={`${category.name}-${style.name}-${index}`}
            style={style}
            onClick={() => onStyleClick(style)}
          />
        ))}
      </div>
    </div>
  );
};

interface StyleListProps {
  onSelect: (image: string) => void;
}

export const StyleList = ({ onSelect }: StyleListProps) => {
  const [selectedStyle, setSelectedStyle] = useState<Style | StyleChild | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(styles.map(style => style.category)));

  const filteredStyles = selectedCategory
    ? styles.filter(style => style.category === selectedCategory)
    : styles;

  // すべてのスタイルを1次元配列に変換
  const allStyles = filteredStyles.flatMap(style => style.children || []);

  const currentIndex = selectedStyle
    ? allStyles.findIndex(style => style.name === selectedStyle.name)
    : -1;

  const handleNext = () => {
    if (currentIndex < allStyles.length - 1) {
      setSelectedStyle(allStyles[currentIndex + 1]);
    } else {
      setSelectedStyle(allStyles[0]); // 最後まで行ったら最初に戻る
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setSelectedStyle(allStyles[currentIndex - 1]);
    } else {
      setSelectedStyle(allStyles[allStyles.length - 1]); // 最初から最後に移動
    }
  };

  return (
    <div className="min-h-full bg-black text-white">
      <div className="sticky top-0 z-10 backdrop-blur-xl bg-black/50 border-b border-pink-500/20">
        <div className="flex flex-wrap gap-2 p-4 max-w-7xl mx-auto">
          <button
            className={`px-4 py-2 rounded-full transition-colors ${selectedCategory === null 
              ? 'bg-pink-500 text-white' 
              : 'border border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white'}`}
            onClick={() => setSelectedCategory(null)}
          >
            すべて
          </button>
          {categories.map(category => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full transition-colors ${selectedCategory === category 
                ? 'bg-pink-500 text-white' 
                : 'border border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white'}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <div className="p-4 max-w-7xl mx-auto">
        {filteredStyles.map((style, index) => (
          <StyleCategory
            key={`${style.category}-${style.name}-${index}`}
            category={style}
            onStyleClick={setSelectedStyle}
          />
        ))}
      </div>

      <StyleModal
        style={selectedStyle}
        onClose={() => setSelectedStyle(null)}
        onSelect={onSelect}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </div>
  );
};
