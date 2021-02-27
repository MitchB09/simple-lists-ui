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

export interface RandomTimedItem extends ListItem {
  randomId: string;
  miss: boolean;
  complete: boolean;
}

export interface TodoItem extends ListItem {
  complete: boolean;
}

export interface ListProps {
  list: List;
  updateList: (list: List) => void;
}

export interface RandomPageProps {
  list: List;
}
