import fs from "fs";
import fetch from "node-fetch";
import { getIntrospectionQuery, buildClientSchema, printSchema } from "graphql";

// مقدارهای پیش‌فرض (می‌تونی از خط فرمان هم بگیری)
const ENDPOINT = process.argv[2] || "https://share.octopus.energy/api/graphql";
const COOKIE = process.argv[3] || "SESSION=abcd1234; other_cookie=xyz";
const OUTPUT = process.argv[4] || "schema.graphql";

(async () => {
  try {
    console.log(`🚀 Fetching GraphQL schema from: ${ENDPOINT}`);

    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cookie": COOKIE,
      },
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
    console.log(`✅ Schema saved successfully to: ${OUTPUT}`);
  } catch (err) {
    console.error("💥 Error:", err.message);
  }
})();
