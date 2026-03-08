export interface CreateBinResponse {
  bin_route: string;
  send_url: string;
  view_url: string;
  token: string;
}

export interface BinRequest {
  method: string;
  created_at: string;
  headers: Record<string, string>;
  params: Record<string, string>;
  body: {
    raw: string;
    json: object | null
    content_type: string;
  }
}

export interface GetBinResponse {
  bin_route: string;
  send_url: string;
  requests: BinRequest[];
}
