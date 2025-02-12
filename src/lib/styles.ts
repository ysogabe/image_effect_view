import type { StyleCategory, MovieStyle } from '@/types/style';

export { StyleCategory, MovieStyle };

export const movieStyles: MovieStyle[] = [];

export function getStyleById(id: string): MovieStyle | undefined {
  const findInStyles = (styles: MovieStyle[]): MovieStyle | undefined => {
    for (const style of styles) {
      if (style.id === id) return style;
      if (style.children) {
        const found = findInStyles(style.children);
        if (found) return found;
      }
    }
    return undefined;
  };
  return findInStyles(movieStyles);
}

export const styles: StyleCategory[] = [
  {
    id: "kodak",
    category: "フィルム風",
    name: "コダック",
    children: [
      {
        id: "kodak-kodachrome",
        category: "フィルム風",
        name: "コダクローム",
        description: "鮮やかで高コントラスト、赤みが強い。",
        image: "/images/tokyo_night_kodak_kodachrome.jpg",
      },
      {
        id: "kodak-ektachrome",
        category: "フィルム風",
        name: "エクタクローム",
        description: "高彩度で青みが強い、スライドフィルム。",
        image: "/images/tokyo_night_kodak_ektachrome.jpg",
      },
      {
        id: "kodak-portra",
        category: "フィルム風",
        name: "ポートラ",
        description: "ポートレート向き、自然な肤色、低コントラスト。",
        image: "/images/tokyo_night_kodak_portra.jpg",
      },
      {
        id: "kodak-tri-x",
        category: "フィルム風",
        name: "トライX",
        description: "白黒、高コントラスト、粒状感。",
        image: "/images/tokyo_night_kodak_tri_x.jpg",
      },
    ],
  },
  {
    id: "agfa",
    category: "フィルム風",
    name: "アグファ",
    children: [
      {
        id: "agfa-agfavista",
        category: "フィルム風",
        name: "アグファビスタ",
        description: "一般消費者向け、鮮やか。",
        image: "/images/tokyo_night_agfa_agfavista.jpg",
      },
      {
        id: "agfa-agfacolor",
        category: "フィルム風",
        name: "アグファカラー",
        description: "歴史的、独特な色再現。",
        image: "/images/tokyo_night_agfa_agfacolor.jpg",
      },
    ],
  },
  {
    id: "fujifilm",
    category: "フィルム風",
    name: "フジフィルム",
    children: [
      {
        id: "fujifilm-velvia",
        category: "フィルム風",
        name: "ベルビア",
        description: "超高彩度、風景写真向き。",
        image: "/images/tokyo_night_fujifilm_velvia.jpg",
      },
      {
        id: "fujifilm-provia",
        category: "フィルム風",
        name: "プロビア",
        description: "自然な色再現、汎用性。",
        image: "/images/tokyo_night_fujifilm_provia.jpg",
      },
      {
        id: "fujifilm-astia",
        category: "フィルム風",
        name: "アスティア",
        description: "ソフト、ポートレート向き。",
        image: "/images/tokyo_night_fujifilm_astia.jpg",
      },
      {
        id: "fujifilm-classic-chrome",
        category: "フィルム風",
        name: "クラシッククローム",
        description: "ドキュメンタリー風、落ち着いた色。",
        image: "/images/tokyo_night_fujifilm_classic_chrome.jpg",
      },
      {
        id: "fujifilm-pro-neg",
        category: "フィルム風",
        name: "プロネガ",
        description: "ポートレート向き、滑らかな階調。",
        image: "/images/tokyo_night_fujifilm_pro_neg.jpg",
      },
    ],
  },
  {
    id: "cinestill",
    category: "フィルム風",
    name: "シネスティル",
    children: [
      {
        id: "cinestill-800t",
        category: "フィルム風",
        name: "CineStill 800T",
        description: "タングステン光下で青みがかる、夜景、ネオン。",
        image: "/images/tokyo_night_cinestill_800t.jpg",
      },
      {
        id: "cinestill-50d",
        category: "フィルム風",
        name: "CineStill 50D",
        description: "デイライト、自然な色、滑らか。",
        image: "/images/tokyo_night_cinestill_50d.jpg",
      },
    ],
  },
  {
    id: "lomography",
    category: "フィルム風",
    name: "ロモグラフィー",
    children: [
      {
        id: "lomography-lomochrome-purple",
        category: "フィルム風",
        name: "ロモクロームパープル",
        description: "紫がかった色調。",
        image: "/images/tokyo_night_lomography_lomochrome_purple.jpg",
      },
      {
        id: "lomography-lomochrome-metropolis",
        category: "フィルム風",
        name: "ロモクロームメトロポリス",
        description: "コントラスト強め。",
        image: "/images/tokyo_night_lomography_lomochrome_metropolis.jpg",
      },
    ],
  },
  {
    id: "cinematic-color-grading",
    category: "シネマティック",
    name: "カラーグレーディング",
    children: [
      {
        id: "cinematic-teal-and-orange",
        category: "シネマティック",
        name: "ティールアンドオレンジ",
        description: "定番の補色関係、肤色を強調。",
        image: "/images/tokyo_night_cinematic_teal_and_orange.jpg",
      },
      {
        id: "cinematic-bleach-bypass",
        category: "シネマティック",
        name: "ブリーチバイパス",
        description: "銀残し、コントラスト強調、彩度低減。",
        image: "/images/tokyo_night_cinematic_bleach_bypass.jpg",
      },
      {
        id: "cinematic-day-for-night",
        category: "シネマティック",
        name: "デイ・フォー・ナイト",
        description: "昼間に夜のシーンを撮影、青いフィルター。",
        image: "/images/tokyo_night_cinematic_day_for_night.jpg",
      },
      {
        id: "cinematic-s-curve-contrast",
        category: "シネマティック",
        name: "Sカーブコントラスト",
        description: "コントラスト強調。",
        image: "/images/tokyo_night_cinematic_s_curve_contrast.jpg",
      },
      {
        id: "cinematic-soft-contrast",
        category: "シネマティック",
        name: "ソフトコントラスト",
        description: "コントラスト低減、柔らかい雰囲気。",
        image: "/images/tokyo_night_cinematic_soft_contrast.jpg",
      },
      {
        id: "cinematic-hard-contrast",
        category: "シネマティック",
        name: "ハードコントラスト",
        description: "コントラスト強調、力強い印象。",
        image: "/images/tokyo_night_cinematic_hard_contrast.jpg",
      },
      {
        id: "cinematic-cool-tones",
        category: "シネマティック",
        name: "クールトーン",
        description: "青みが強い、冷たい雰囲気。",
        image: "/images/tokyo_night_cinematic_cool_tones.jpg",
      },
      {
        id: "cinematic-warm-tones",
        category: "シネマティック",
        name: "ウォームトーン",
        description: "赤みが強い、暖かい雰囲気。",
        image: "/images/tokyo_night_cinematic_warm_tones.jpg",
      },
      {
        id: "cinematic-black-and-white",
        category: "シネマティック",
        name: "ブラックアンドホワイト",
        description: "白黒。",
        image: "/images/tokyo_night_cinematic_black_and_white.jpg",
      },
    ]
  },
  {
    id: "cinematic-other",
    category: "シネマティック",
    name: "その他",
    children: [
      {
        id: "cinematic-blockbuster",
        category: "シネマティック",
        name: "ブロックバスタールック",
        description: "大作映画、派手、アクション。",
        image: "/images/tokyo_night_cinematic_blockbuster.jpg",
      },
      {
        id: "cinematic-indie-film",
        category: "シネマティック",
        name: "インディーフィルムルック",
        description: "個性的、低予算。",
        image: "/images/tokyo_night_cinematic_indie_film.jpg",
      },
    ]
  },
  {
    id: "retro",
    category: "レトロ",
    name: "レトロ",
    children: [
      {
        id: "retro-polaroid",
        category: "レトロ",
        name: "ポラロイド風",
        description: "インスタント写真、独特の色合い、枚。",
        image: "/images/tokyo_night_retro_polaroid.jpg",
      },
      {
        id: "retro-vhs",
        category: "レトロ",
        name: "VHS風",
        description: "ビデオテープ、ノイズ、走査線、色にじみ。",
        image: "/images/tokyo_night_retro_vhs.jpg",
      },
      {
        id: "retro-8mm-film",
        category: "レトロ",
        name: "8mmフィルム風",
        description: "家庭用、粒状感、色あせ、揺れ。",
        image: "/images/tokyo_night_retro_8mm_film.jpg",
      },
      {
        id: "retro-70s",
        category: "レトロ",
        name: "70年代風",
        description: "暖色系、粒状感、フレア。",
        image: "/images/tokyo_night_retro_70s.jpg",
      },
      {
        id: "retro-80s",
        category: "レトロ",
        name: "80年代風",
        description: "ネオンカラー、VHS風。",
        image: "/images/tokyo_night_retro_80s.jpg",
      },
      {
        id: "retro-90s",
        category: "レトロ",
        name: "90年代風",
        description: "落ち着いた色調、グランジ。",
        image: "/images/tokyo_night_retro_90s.jpg",
      },
      {
        id: "retro-vintage",
        category: "レトロ",
        name: "ヴィンテージ",
        description: "古びた感じ、色あせ、傷。",
        image: "/images/tokyo_night_retro_vintage.jpg",
      },
      {
        id: "retro-antique",
        category: "レトロ",
        name: "アンティーク",
        description: "セピア調、非常に古い。",
        image: "/images/tokyo_night_retro_antique.jpg",
      },
    ],
  },
  {
    id: "movie-styles",
    category: "特定の映画風",
    name: "特定の映画風",
    children: [
      {
        id: "movie-matrix",
        category: "特定の映画風",
        name: "マトリックス風",
        description: "緑がかった色調、デジタル感。",
        image: "/images/tokyo_night_movie_matrix.jpg",
      },
      {
        id: "movie-amelie",
        category: "特定の映画風",
        name: "アメリ風",
        description: "赤、緑、黄色、温かみ、ノスタルジア。",
        image: "/images/tokyo_night_movie_amelie.jpg",
      },
      {
        id: "movie-moonrise-kingdom",
        category: "特定の映画風",
        name: "ムーンライズ・キングダム風",
        description: "パステルカラー、左右対称構図。",
        image: "/images/tokyo_night_movie_moonrise_kingdom.jpg",
      },
      {
        id: "movie-mad-max-fury-road",
        category: "特定の映画風",
        name: "マッドマックス 怒りのデス・ロード風",
        description: "オレンジ、青、砂漠、アクション。",
        image: "/images/tokyo_night_movie_mad_max_fury_road.jpg",
      },
      {
        id: "movie-blade-runner-2049",
        category: "特定の映画風",
        name: "ブレードランナー2049風",
        description: "ネオンカラー、サイバーパンク、霊。",
        image: "/images/tokyo_night_movie_blade_runner_2049.jpg",
      },
      {
        id: "movie-sin-city",
        category: "特定の映画風",
        name: "シン・シティ風",
        description: "モノクロ、一部の色を強調(赤)。",
        image: "/images/tokyo_night_movie_sin_city.jpg",
      },
      {
        id: "movie-grand-budapest-hotel",
        category: "特定の映画風",
        name: "グランド・ブダペスト・ホテル風",
        description: "パステル、左右対称、独特。",
        image: "/images/tokyo_night_movie_the_grand_budapest_hotel.jpg",
      },
    ],
  },
  {
    id: "other",
    category: "その他",
    name: "その他",
    children: [
      {
        id: "other-neon-colors",
        category: "その他",
        name: "ネオンカラー",
        description: "蛍光色、サイバーパンク、80年代。",
        image: "/images/tokyo_night_other_neon_colors.jpg",
      },
      {
        id: "other-pastel-colors",
        category: "その他",
        name: "パステルカラー",
        description: "淡い色、柔らかい、夢のような。",
        image: "/images/tokyo_night_other_pastel_colors.jpg",
      },
      {
        id: "other-earth-tones",
        category: "その他",
        name: "アースカラー",
        description: "自然な色、落ち着き、安心感。",
        image: "/images/tokyo_night_other_earth_tones.jpg",
      },
      {
        id: "other-metallic-colors",
        category: "その他",
        name: "メタリックカラー",
        description: "金属的な色、未来感、高級感。",
        image: "/images/tokyo_night_other_metallic_colors.jpg",
      },
      {
        id: "other-monochrome",
        category: "その他",
        name: "モノクロ",
        description: "白黒、または単色。",
        image: "/images/tokyo_night_other_monochrome.jpg",
      },
      {
        id: "other-sepia",
        category: "その他",
        name: "セピア",
        description: "古びた感じ。",
        image: "/images/tokyo_night_other_sepia.jpg",
      },
      {
        id: "other-duotone",
        category: "その他",
        name: "デュオトーン",
        description: "2色。",
        image: "/images/tokyo_night_other_duotone.jpg",
      },
      {
        id: "other-psychedelic",
        category: "その他",
        name: "サイケデリック",
        description: "幻覚的、奇抜な色使い。",
        image: "/images/tokyo_night_other_psychedelic.jpg",
      },
      {
        id: "other-watercolor",
        category: "その他",
        name: "水彩画風",
        description: "にじみ、ぼかし。",
        image: "/images/tokyo_night_other_watercolor.jpg",
      },
      {
        id: "other-oil-painting",
        category: "その他",
        name: "油絵風",
        description: "厚塗り、質感。",
        image: "/images/tokyo_night_other_oil_painting.jpg",
      },

      {
        id: "other-anime-ghibli",
        category: "その他",
        name: "アニメ風：ジブリ風",
        description: "手描き、水彩背景、自然。",
        image: "/images/tokyo_night_other_anime_ghibli.jpg",
      },
      {
        id: "other-anime-cel-shaded",
        category: "その他",
        name: "アニメ風：セル画風",
        description: "輪郭線、影。",
        image: "/images/tokyo_night_other_anime_cel_shaded.jpg",
      },
      {
        id: "other-comic-book",
        category: "その他",
        name: "コミックブック風",
        description: "太い線、原色、ドット。",
        image: "/images/tokyo_night_other_comic_book.jpg",
      },
      {
        id: "other-game-pixel-art",
        category: "その他",
        name: "ゲーム風：ドット絵風",
        description: "低解像度、レトロ。",
        image: "/images/tokyo_night_other_game_pixel_art.jpg",
      },
      {
        id: "other-game-low-poly",
        category: "その他",
        name: "ゲーム風：ローポリ風",
        description: "カクカクした3D。",
        image: "/images/tokyo_night_other_game_low_poly.jpg",
      },
      {
        id: "other-glitch-art",
        category: "その他",
        name: "グリッチアート",
        description: "デジタルノイズ、破損表現。",
        image: "/images/tokyo_night_other_glitch_art.jpg",
      },
      {
        id: "other-surrealism",
        category: "その他",
        name: "シュールレアリスム",
        description: "非現実的、夢のような。",
        image: "/images/tokyo_night_other_surrealism.jpg",
      },
      {
        id: "other-minimalism",
        category: "その他",
        name: "ミニマリズム",
        description: "最小限、シンプル。",
        image: "/images/tokyo_night_other_minimalism.jpg",
      },
      {
        id: "other-hdr",
        category: "その他",
        name: "HDR",
        description: "広い明るさの範囲。",
        image: "/images/tokyo_night_other_hdr.jpg",
      },
    ],
  },
];