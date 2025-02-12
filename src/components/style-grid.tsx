'use client';

import Image from 'next/image';
import { useEffect, useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { StyleCategory, movieStyles, getStyleById } from '@/lib/styles';

// 全スタイルを平坦化する関数
const flattenStyles = (styles: StyleCategory[]): StyleCategory[] => {
  let result: StyleCategory[] = [];
  for (const style of styles) {
    result.push(style);
    if (style.children) {
      result = result.concat(flattenStyles(style.children.filter((child): child is StyleCategory => 'children' in child)));
    }
  }
  return result;
};

export default function StyleGrid() {
  const [selectedStyle, setSelectedStyle] = useState<StyleCategory | null>(null);
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [allStyles] = useState(() => flattenStyles(movieStyles));
  const [searchQuery, setSearchQuery] = useState('');

  // 検索関数
  const searchStyles = useCallback((styles: StyleCategory[], query: string): StyleCategory[] => {
    if (!query.trim()) return styles;
    
    const searchTerms = query.toLowerCase().split(/\s+/);
    return styles.filter(style => {
      const content = `${style.name} ${style.description || ''} ${style.category}`.toLowerCase();
      return searchTerms.every(term => content.includes(term));
    });
  }, []);

  const handleCardClick = useCallback((style: StyleCategory) => {
    if (style.children?.some(child => 'children' in child)) {
      setCurrentPath(prev => [...prev, style.id]);
    } else {
      setSelectedStyle(style);
    }
  }, []);

  const handleModalClose = useCallback(() => {
    setSelectedStyle(null);
  }, []);

  const handleNavigateBack = useCallback(() => {
    setCurrentPath(prev => prev.slice(0, -1));
  }, []);

  const handlePrevious = useCallback(() => {
    if (!selectedStyle) return;
    const currentIndex = allStyles.findIndex(style => style.id === selectedStyle.id);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : allStyles.length - 1;
    setSelectedStyle(allStyles[prevIndex]);
  }, [selectedStyle, allStyles]);

  const handleNext = useCallback(() => {
    if (!selectedStyle) return;
    const currentIndex = allStyles.findIndex(style => style.id === selectedStyle.id);
    const nextIndex = currentIndex < allStyles.length - 1 ? currentIndex + 1 : 0;
    setSelectedStyle(allStyles[nextIndex]);
  }, [selectedStyle, allStyles]);

  const getCurrentStyles = useCallback((path: string[]): StyleCategory[] => {
    if (path.length === 0) return movieStyles;

    let current = movieStyles;
    for (const id of path) {
      const found = current.find(style => style.id === id);
      if (found?.children?.some(child => 'children' in child)) {
        current = found.children.filter((child): child is StyleCategory => 'children' in child);
      } else {
        return [];
      }
    }
    return current;
  }, []);

  const getCurrentPath = useCallback((path: string[]): { id: string; name: string; }[] => {
    const result: { id: string; name: string; }[] = [];
    let current = movieStyles;

    for (const id of path) {
      const found = current.find(style => style.id === id);
      if (found) {
        result.push({ id: found.id, name: found.name });
        if (found.children?.some(child => 'children' in child)) {
          current = found.children.filter((child): child is StyleCategory => 'children' in child);
        }
      }
    }

    return result;
  }, []);

  // キーボードショートカットの処理
  useEffect(() => {
    if (!selectedStyle) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleModalClose();
      } else if (e.key === 'ArrowLeft' || e.key === 'h') {
        handlePrevious();
      } else if (e.key === 'ArrowRight' || e.key === 'l') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedStyle, handleModalClose, handlePrevious, handleNext]);

  const currentStyles = getCurrentStyles(currentPath);
  const pathItems = getCurrentPath(currentPath);

  return (
    <div className="relative">
      <div className="py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="スタイルを検索..."
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg
                         text-white placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-futuristic-neon
                         transition-all duration-300"
              aria-label="スタイルを検索"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2
                           text-gray-400 hover:text-white
                           transition-colors duration-300"
                aria-label="検索をクリア"
              >
                ×
              </button>
            )}
          </div>
          {searchQuery && (
            <p className="mt-2 text-center text-sm text-gray-400">
              検索結果: {searchStyles(getCurrentStyles(currentPath), searchQuery).length} 件
            </p>
          )}
        </div>
        {/* Breadcrumb Navigation */}
        <div className="mb-6 flex items-center space-x-2 text-sm text-gray-400">
          <button
            onClick={() => setCurrentPath([])}
            className="hover:text-futuristic-neon transition-colors"
          >
            ホーム
          </button>
          {pathItems.map((item, index) => (
            <div key={item.id} className="flex items-center space-x-2">
              <span>/</span>
              <button
                onClick={() => setCurrentPath(currentPath.slice(0, index + 1))}
                className="hover:text-futuristic-neon transition-colors"
              >
                {item.name}
              </button>
            </div>
          ))}
        </div>

        {/* Back Button */}
        {currentPath.length > 0 && (
          <button
            onClick={handleNavigateBack}
            className="mb-6 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors text-sm flex items-center space-x-2"
          >
            <span>←</span>
            <span>戻る</span>
          </button>
        )}

        {/* Style Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchStyles(currentStyles, searchQuery).map((style) => (
            <div
              key={style.id}
              className="cursor-pointer animate-fadeIn"
              onClick={() => handleCardClick(style)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCardClick(style);
                }
              }}
            >
              <Card className="futuristic-card group hover:shadow-accent transition-all duration-500 h-full overflow-hidden transform hover:scale-[1.02] hover:-translate-y-1">
                <CardHeader>
                  <CardTitle className="futuristic-title group-hover:text-futuristic-neon transition-colors duration-500">
                    {style.name}
                    {style.children?.some(child => 'children' in child) && (
                      <span className="ml-2 text-sm text-gray-400">(サブカテゴリ)</span>
                    )}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-400 transition-opacity duration-500 group-hover:opacity-80">
                    {style.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="relative aspect-video overflow-hidden">
                    {style.image && (
                      <Image
                        src={style.image}
                        alt={style.name}
                        fill
                        className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {selectedStyle && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
          onClick={handleModalClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/50 text-white text-2xl font-bold hover:bg-futuristic-accent/50 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              handlePrevious();
            }}
            aria-label="前の画像 (← or h)"
          >
            ←
          </button>
          <div 
            className="relative w-full max-w-5xl bg-black rounded-lg overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8 space-y-6">
              {/* Title */}
              <div className="text-center space-y-4">
                <h3 id="modal-title" className="text-2xl font-bold text-futuristic-accent">
                  {selectedStyle.name}
                </h3>
              </div>

              {/* Image */}
              <div className="relative aspect-[16/9] rounded-lg overflow-hidden">
                <Image
                  src={selectedStyle.image || ''}
                  alt={selectedStyle.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  priority
                  quality={95}
                />
              </div>

              {/* Description */}
              <div className="text-center">
                <p className="text-xl text-gray-200 leading-relaxed">{selectedStyle.description}</p>
              </div>

              {/* Navigation Help */}
              <div className="text-center text-sm text-gray-400">
                <p>← または h キー: 前の画像</p>
                <p>→ または l キー: 次の画像</p>
                <p>ESC キー: 閉じる</p>
              </div>
            </div>
            <button
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-white text-xl font-bold hover:bg-futuristic-accent/50 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                handleModalClose();
              }}
              aria-label="閉じる (ESC)"
            >
              ×
            </button>
          </div>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/50 text-white text-2xl font-bold hover:bg-futuristic-accent/50 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            aria-label="次の画像 (→ or l)"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}
