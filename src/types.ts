export interface List {
  listName: string;
  listDescription: string;
  type: string;
  items?: ListItem[];
}

export interface ListItem {
  id: string;
  value: string;
}
