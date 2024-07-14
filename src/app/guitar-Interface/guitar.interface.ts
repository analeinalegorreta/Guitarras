export interface  SearchResponse {
  status: string;
  body:   Guitar[];
}

export interface Guitar {
  name:        string;
  description: string;
  image:       string;
  price:       number;
  id:          number;
  cantidad:     number;
  total:number;
}
