import fs from "fs";
import fetch from "node-fetch";
import { getIntrospectionQuery, buildClientSchema, printSchema } from "graphql";

// Default values
let ENDPOINT = null;
let COOKIE = null;
const HEADERS = {};
let OUTPUT = "schema.graphql";

// Simple CLI argument parsing
const args = process.argv.slice(2);
for (let i = 0; i < args.length; i++) {
  switch (args[i]) {
    case "-B":
      COOKIE = args[i + 1];
      i++;
      break;
    case "-H":
      // Expect format: Key=Value
      const headerArg = args[i + 1];
      const sepIndex = headerArg.indexOf("=");
      if (sepIndex > -1) {
        const key = headerArg.slice(0, sepIndex).trim();
        const value = headerArg.slice(sepIndex + 1).trim();
        HEADERS[key] = value;
      }
      i++;
      break;
    case "-O":
      OUTPUT = args[i + 1];
      i++;
      break;
    default:
      if (!ENDPOINT) ENDPOINT = args[i];
      break;
  }
}

// Check endpoint
if (!ENDPOINT) {
  console.error("❌ GraphQL endpoint not specified.");
  console.error("Usage: node fetch-schema.js <ENDPOINT> [-B <cookie>] [-H <header>] [-O <output>]");
  process.exit(1);
}

// Prepare headers
const finalHeaders = {
  "Content-Type": "application/json",
  ...HEADERS,
};
if (COOKIE) finalHeaders["Cookie"] = COOKIE;

(async () => {
  try {
    console.log(`🚀 Fetching GraphQL schema from: ${ENDPOINT}`);

    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: finalHeaders,
      body: JSON.stringify({ query: getIntrospectionQuery() }),
    });

    if (!response.ok) {
      throw new Error(`❌ Request failed: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();

    if (result.errors) {
      console.error("⚠️ GraphQL returned errors:", JSON.stringify(result.errors, null, 2));
      process.exit(1);
    }

    const schema = buildClientSchema(result.data);
    const sdl = printSchema(schema);

    fs.writeFileSync(OUTPUT, sdl);

    // Calculate file size in kilobytes
    const stats = fs.statSync(OUTPUT);
    const fileSizeKB = (stats.size / 1024).toFixed(2);

    console.log(`✅ Schema saved successfully to: ${OUTPUT}`);
    console.log(`📦 File size: ${fileSizeKB} KB`);
  } catch (err) {
    console.error("💥 Error:", err.message);
  }
})();
