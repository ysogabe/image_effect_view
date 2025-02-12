export interface BaseStyle {
  name: string;
  description?: string;
  image?: string;
}

export interface StyleChild extends BaseStyle {}

export interface Style extends BaseStyle {
  category: string;
  children?: StyleChild[];
}

export type StyleCategory = Style;

export interface MovieStyle extends BaseStyle {
  id: string;
  category: string;
  children?: MovieStyle[];
}
