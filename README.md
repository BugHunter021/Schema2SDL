# GraphQL Schema Fetcher

A small Node.js tool to fetch a GraphQL schema from a server using an **introspection query** and convert it to SDL (Schema Definition Language).  
Supports sending custom headers such as `Cookie` for authenticated endpoints.

---

## Features

- Fetch GraphQL schema via introspection query.
- Support for custom headers (e.g., `Cookie` or `Authorization`).
- Output schema in SDL format (`.graphql`).
- Optional CLI arguments for endpoint, cookie, and output file.

---

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/graphql-schema-fetcher.git
cd graphql-schema-fetcher
```

## Install dependencies:

npm install

## Usage:

node fetch-schema.js <GRAPHQL_ENDPOINT_ADDRESS> <COOKIE OR Header> <OUTPUT_FILE>

<GRAPHQL_ENDPOINT>: The URL of the GraphQL server.

<COOKIE>: Optional cookie string for authentication.

<OUTPUT_FILE>: Output filename for the SDL schema (default: schema.graphql).

Example: 
node fetch-schema.js "https://sample.com//graphql" "SESSION=abcd1234; other_cookie=xyz" "schema.graphql"


This will save the schema in SDL format to schema.graphql.
