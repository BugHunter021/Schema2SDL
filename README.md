# GraphQL Schema Fetcher

A Node.js tool to fetch a GraphQL schema from a server using an **introspection query** and convert it to SDL (Schema Definition Language).  
Supports sending custom headers and cookies for authenticated endpoints.

---

## Features

- Fetch GraphQL schema via introspection query.
- Support for custom headers (e.g., `Authorization`, `X-Custom-Header`).
- Support for cookie authentication using `-B`.
- Output schema in SDL format (`.graphql`).
- CLI arguments for endpoint, headers, cookies, and output file.

---

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/graphql-schema-fetcher.git
cd graphql-schema-fetcher
```

2. Install dependencies:
```
npm install
```

## Usage

```bash
node Schema2SDL.js <GRAPHQL_ENDPOINT> [-B "<COOKIE>"] [-H "Key=Value"] [-O <OUTPUT_FILE>]
```

- <GRAPHQL_ENDPOINT>: The URL of the GraphQL server.

- -B "<COOKIE>": Optional cookie string for authentication.

- -H "Key=Value": Optional custom header. Can be used multiple times.

- -O <OUTPUT_FILE>: Output filename for the SDL schema (default: schema.graphql).

## Example:

```bash
node Schema2SDL.js "https://sample.com/api/graphql" -B "SESSION=abcd1234; other_cookie=xyz" -H "Authorization=Bearer eyJ..." -H "X-Custom-Header=foo" -O schema.graphql
```

This will save the schema in SDL format to schema.graphql.

## Notes

- Ensure the GraphQL endpoint allows introspection queries.

- The -B cookie argument is optional and only needed for endpoints that require session authentication.

- Multiple -H headers can be passed to include any custom headers.

- This tool only fetches the schema; it does not execute queries or mutations
