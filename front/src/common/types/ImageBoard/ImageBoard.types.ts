type ImageBoard = {
  author: string;
  download_url: string;
  height: number;
  id: string;
  url: string;
  width: number;
};

type table = {
  id: number;
  item: string;
};

export type commonBoard = {
  ImageBoard: ImageBoard;
  table: table;
};
