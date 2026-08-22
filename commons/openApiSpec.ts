/**
 * OpenAPI 3.1 description of Luc Rousseau public machine-readable endpoints.
 * Published at /openapi.json for agent discovery.
 */

export function buildOpenApiSpec(base: string) {
  const errorSchema = {
    type: "object",
    required: ["error"],
    properties: {
      error: {
        type: "object",
        required: ["code", "message", "status", "hint"],
        properties: {
          code: {
            type: "string",
            description: "Stable machine-readable error code",
            examples: ["method_not_allowed", "not_found"],
          },
          message: { type: "string", description: "Human-readable error summary" },
          status: { type: "integer", description: "HTTP status code" },
          hint: {
            type: "string",
            description: "How to recover (next URL or allowed methods)",
          },
        },
      },
    },
  } as const;

  const jsonErrorResponse = {
    description: "Structured JSON error",
    content: {
      "application/json": {
        schema: { $ref: "#/components/schemas/ApiError" },
      },
    },
  };

  return {
    openapi: "3.1.0",
    info: {
      title: "Luc Rousseau public site API",
      summary: "Machine-readable discovery endpoints for lucrousseau.com",
      description:
        "Public, unauthenticated discovery API for Luc Rousseau (Product Builder / external consultant). " +
        "Use these endpoints plus Accept: text/markdown on HTML pages. There is no OAuth, webhook, or private product API on this site.",
      version: "1.0.0",
      contact: {
        name: "Luc Rousseau",
        email: "hello@lucrousseau.com",
        url: base,
      },
      license: {
        name: "Site content",
        url: `${base}/developers`,
      },
    },
    servers: [{ url: base, description: "Production" }],
    tags: [
      { name: "Discovery", description: "Agent and crawler discovery files" },
      { name: "Docs", description: "Human and agent developer documentation" },
    ],
    paths: {
      "/openapi.json": {
        get: {
          operationId: "getOpenApi",
          tags: ["Discovery"],
          summary: "OpenAPI specification",
          description: "This document (Luc Rousseau public API surface).",
          responses: {
            "200": {
              description: "OpenAPI document",
              content: {
                "application/json": {
                  schema: { type: "object", additionalProperties: true },
                },
              },
            },
            "405": jsonErrorResponse,
          },
        },
      },
      "/llms.txt": {
        get: {
          operationId: "getLlmsTxt",
          tags: ["Discovery"],
          summary: "llms.txt site index",
          description: "Luc Rousseau site summary for LLM systems (llmstxt.org).",
          responses: {
            "200": {
              description: "Plain-text llms.txt",
              content: { "text/plain": { schema: { type: "string" } } },
            },
            "405": jsonErrorResponse,
          },
        },
      },
      "/llms-full.txt": {
        get: {
          operationId: "getLlmsFullTxt",
          tags: ["Discovery"],
          summary: "Extended llms profile",
          responses: {
            "200": {
              description: "Plain-text extended profile",
              content: { "text/plain": { schema: { type: "string" } } },
            },
            "405": jsonErrorResponse,
          },
        },
      },
      "/humans.txt": {
        get: {
          operationId: "getHumansTxt",
          tags: ["Discovery"],
          summary: "humans.txt attribution",
          responses: {
            "200": {
              description: "Plain-text humans.txt",
              content: { "text/plain": { schema: { type: "string" } } },
            },
            "405": jsonErrorResponse,
          },
        },
      },
      "/sitemap.xml": {
        get: {
          operationId: "getSitemap",
          tags: ["Discovery"],
          summary: "XML sitemap",
          responses: {
            "200": {
              description: "XML sitemap",
              content: { "application/xml": { schema: { type: "string" } } },
            },
            "405": jsonErrorResponse,
          },
        },
      },
      "/robots.txt": {
        get: {
          operationId: "getRobotsTxt",
          tags: ["Discovery"],
          summary: "robots.txt",
          responses: {
            "200": {
              description: "robots.txt",
              content: { "text/plain": { schema: { type: "string" } } },
            },
            "405": jsonErrorResponse,
          },
        },
      },
      "/developers": {
        get: {
          operationId: "getDevelopersDocs",
          tags: ["Docs"],
          summary: "Luc Rousseau developer resources",
          description:
            "HTML docs by default. Send Accept: text/markdown for a Markdown body. " +
            "Lists OpenAPI, llms.txt, sitemap, and content-negotiation notes.",
          parameters: [
            {
              name: "Accept",
              in: "header",
              required: false,
              schema: {
                type: "string",
                examples: ["text/html", "text/markdown"],
              },
            },
          ],
          responses: {
            "200": {
              description: "Developer documentation",
              headers: {
                Vary: {
                  schema: { type: "string", examples: ["Accept, Accept-Encoding"] },
                },
              },
              content: {
                "text/html": { schema: { type: "string" } },
                "text/markdown": { schema: { type: "string" } },
              },
            },
          },
        },
      },
      "/": {
        get: {
          operationId: "getHome",
          tags: ["Docs"],
          summary: "Home page (HTML or Markdown)",
          description:
            "Canonical home URL. Prefer Accept: text/markdown for agents. " +
            "Responses include Vary: Accept, Accept-Encoding.",
          parameters: [
            {
              name: "Accept",
              in: "header",
              required: false,
              schema: { type: "string" },
            },
          ],
          responses: {
            "200": {
              description: "Home page representation",
              headers: {
                Vary: {
                  schema: { type: "string", examples: ["Accept, Accept-Encoding"] },
                },
              },
              content: {
                "text/html": { schema: { type: "string" } },
                "text/markdown": { schema: { type: "string" } },
              },
            },
            "404": {
              description:
                "Unknown paths return HTTP 404. With Accept: text/markdown, the body is a short Markdown recovery guide.",
              content: {
                "text/html": { schema: { type: "string" } },
                "text/markdown": { schema: { type: "string" } },
              },
            },
          },
        },
      },
    },
    components: {
      schemas: {
        ApiError: errorSchema,
      },
    },
    externalDocs: {
      description: "Luc Rousseau developer resources",
      url: `${base}/developers`,
    },
  };
}
