export interface StyleChild {
  name: string;
  description: string;
  image: string;
}

export interface Style {
  category: string;
  name: string;
  description?: string;
  image?: string;
  children?: StyleChild[];
}
