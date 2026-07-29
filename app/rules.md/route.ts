import { RULES_MARKDOWN } from "@/lib/rules-markdown";

export const dynamic = "force-static";

export function GET() {
  return new Response(RULES_MARKDOWN, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
}
