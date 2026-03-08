# RequestBin

## Backend API Endpoints

### POST /bins
- Create bin

**Response**
```json
{
  bin_route: 'abc123',
  send_url: "/in/abc123",
  view_url: "/bins/abc123",
  token: "sk_92fj3k1"
}
```

### POST /in/:binRoute
- Collect webhook request in bin

**Response**
```json
{
  method: "POST",
  created_at: "2026-03-07 19:12:45",
  headers: { content-type: 'application/json' },
  params: { category: 'webhooks' },
  body: {
    raw: "...string...",
    json: { ...json if available... },
    content_type: __
  }
}
```

### GET /bins/:binRoute
- Retrieve list of requests in bin

**Response**
```json
{
  bin_route: 'abc123',
  send_url: "/in/abc123",
  requests: [Request1, Request2, ...]
}
```