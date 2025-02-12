import StyleGrid from '@/components/style-grid';
import { stylesData } from '@/lib/styles';

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-futuristic-accent via-white to-futuristic-neon animate-pulse">
        映画表現スタイル
      </h1>
      <StyleGrid styles={stylesData} />
    </main>
  );
}