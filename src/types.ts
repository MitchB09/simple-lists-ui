export interface List {
  id: number;
  name: string;
  description: string;
  type: string;
  items?: ListItem[];
}

export interface ListItem {
  id: string;
  value: string;
}
