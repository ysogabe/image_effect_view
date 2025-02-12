export interface BaseStyle {
  id: string;
  name: string;
  description?: string;
  image?: string;
  category: string;
}

export interface StyleChild extends BaseStyle {}

export interface Style extends BaseStyle {
  children?: (Style | StyleChild)[];
}

export type StyleCategory = Style;

export interface MovieStyle extends Style {}
