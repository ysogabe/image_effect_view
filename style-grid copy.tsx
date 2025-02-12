'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

interface Style {
  name: string;
  image: string;
  description: string;
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

  return (
    <div className="relative">
      <div className="py-8">
        {Object.entries(styles).map(([category, stylesInCategory]) => (
          <div key={category} className="mb-12">
            <h2 className="text-4xl font-bold mb-6 text-futuristic-accent">{category}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(stylesInCategory).map(([styleName, style]) => (
                <Card 
                  key={styleName} 
                  className="futuristic-card group hover:shadow-accent transition-all duration-300 cursor-pointer overflow-hidden"
                  onClick={() => setSelectedStyle(style)}
                >
                  <CardHeader>
                    <CardTitle className="futuristic-title group-hover:text-futuristic-neon transition-colors">{style.name}</CardTitle>
                    <CardDescription className="text-sm text-gray-400">{style.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={style.image}
                        alt={style.name}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {selectedStyle && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedStyle(null)}
        >
          <div 
            className="relative w-full max-w-5xl rounded-lg overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative aspect-[16/9]">
              <Image
                src={selectedStyle.image}
                alt={selectedStyle.name}
                fill
                className="object-contain"
                sizes="(max-width: 1280px) 100vw, 1280px"
                priority
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm p-4">
              <h3 className="text-xl font-bold text-futuristic-accent">{selectedStyle.name}</h3>
              <p className="text-gray-200">{selectedStyle.description}</p>
            </div>
          </div>
          <button
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-white text-xl font-bold hover:bg-futuristic-accent/50 transition-colors"
            onClick={() => setSelectedStyle(null)}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}
                  <p className="text-sm mt-2">{style.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}