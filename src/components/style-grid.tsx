'use client';

import Image from 'next/image';
import { useEffect, useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface Style {
  name: string;
  image: string;
  description: string;
  category?: string; // 区分情報を追加
}

interface StyleCategory {
  [category: string]: {
    [styleName: string]: Style;
  };
}

interface StyleGridProps {
  styles: StyleCategory;
}

export default function StyleGrid({ styles }: StyleGridProps) {
  const [selectedStyle, setSelectedStyle] = useState<Style | null>(null);
  const [allStyles, setAllStyles] = useState<Style[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    // すべてのスタイルを1次元配列に変換し、区分情報を追加
    const styles2DArray = Object.entries(styles).map(([category, categoryStyles]) => 
      Object.values(categoryStyles).map(style => ({
        ...style,
        category // 区分情報を追加
      }))
    );
    const flattenedStyles = styles2DArray.flat();
    setAllStyles(flattenedStyles);
  }, [styles]);

  const handleCardClick = useCallback((style: Style) => {
    const index = allStyles.findIndex(s => s.name === style.name);
    setCurrentIndex(index);
    setSelectedStyle(style);
  }, [allStyles]);

  const handleModalClose = useCallback(() => {
    setSelectedStyle(null);
  }, []);

  const handlePrevious = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    const newIndex = (currentIndex - 1 + allStyles.length) % allStyles.length;
    setCurrentIndex(newIndex);
    setSelectedStyle(allStyles[newIndex]);
  }, [allStyles, currentIndex]);

  const handleNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    const newIndex = (currentIndex + 1) % allStyles.length;
    setCurrentIndex(newIndex);
    setSelectedStyle(allStyles[newIndex]);
  }, [allStyles, currentIndex]);

  // キーボードショートカットの処理
  useEffect(() => {
    if (!selectedStyle) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          handlePrevious();
          break;
        case 'ArrowRight':
          handleNext();
          break;
        case 'Escape':
          handleModalClose();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedStyle, handlePrevious, handleNext, handleModalClose]);

  return (
    <div className="relative">
      <div className="py-8">
        <Tabs defaultValue={Object.keys(styles)[0]} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            {Object.keys(styles).map((category) => (
              <TabsTrigger 
                key={category} 
                value={category}
                className="text-xl font-semibold data-[state=active]:text-futuristic-neon data-[state=active]:shadow-neon transition-all duration-300"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(styles).map(([category, stylesInCategory]) => (
            <TabsContent 
              key={category} 
              value={category}
              className="animate-fadeIn"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(stylesInCategory).map(([styleName, style]) => (
                  <div 
                    key={styleName} 
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
                        <CardTitle className="futuristic-title group-hover:text-futuristic-neon transition-colors duration-500">{style.name}</CardTitle>
                        <CardDescription className="text-sm text-gray-400 transition-opacity duration-500 group-hover:opacity-80">{style.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="p-0">
                        <div className="relative aspect-video overflow-hidden">
                          <Image
                            src={style.image}
                            alt={style.name}
                            fill
                            className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
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
            onClick={handlePrevious}
            aria-label="Previous image (Left arrow key)"
          >
            ←
          </button>
          <div 
            className="relative w-full max-w-5xl bg-black rounded-lg overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8 space-y-6">
              {/* 上部の区分とタイトル */}
              <div className="text-center space-y-4">
                <h2 className="text-4xl font-bold text-futuristic-neon tracking-wider transform hover:scale-105 transition-transform duration-300">
                  {selectedStyle.category}
                </h2>
                <h3 id="modal-title" className="text-2xl font-bold text-futuristic-accent">
                  {selectedStyle.name}
                </h3>
              </div>

              {/* 画像 */}
              <div className="relative aspect-[16/9] rounded-lg overflow-hidden">
                <Image
                  src={selectedStyle.image}
                  alt={selectedStyle.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  priority
                  quality={95}
                />
              </div>

              {/* 下部の説明文 */}
              <div className="text-center">
                <p className="text-xl text-gray-200 leading-relaxed">{selectedStyle.description}</p>
              </div>
            </div>
            <button
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-white text-xl font-bold hover:bg-futuristic-accent/50 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                handleModalClose();
              }}
              aria-label="Close modal (Escape key)"
            >
              ×
            </button>
          </div>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/50 text-white text-2xl font-bold hover:bg-futuristic-accent/50 transition-colors"
            onClick={handleNext}
            aria-label="Next image (Right arrow key)"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}
