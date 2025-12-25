# Cyan Design System MCP Server Specification

**Version:** 1.0.0  
**Status:** Draft  
**Author:** Cyan Design System Team  
**Date:** 2025-12-25

## 1. Overview

### 1.1 Purpose

The Cyan Design System MCP (Model Context Protocol) Server provides AI agents with programmatic access to the complete Cyan Design System documentation, component library, and design tokens. This enables agents to assist developers in building applications using Cyan components with accurate, up-to-date information.

### 1.2 Goals

- **Single Source of Truth:** Leverage existing Astro MDX content collections in `apps/cyan-docs/src/books/`
- **Zero Duplication:** Same content serves human documentation site and AI agents
- **Real-Time Access:** Documentation updates automatically available via MCP
- **Rich Discovery:** Enable semantic search and exploration of components and patterns
- **Type Safety:** Return structured, typed data based on content frontmatter schemas

### 1.3 Architecture

```
┌─────────────────────────────────────────────────┐
│  AI Agent (Claude, GPT, etc.)                   │
└─────────────────┬───────────────────────────────┘
                  │ MCP Protocol
                  ▼
┌─────────────────────────────────────────────────┐
│  Netlify Edge Function                          │
│  (/.netlify/functions/mcp)                      │
│                                                  │
│  - Parse MCP requests                           │
│  - Query content index                          │
│  - Return structured responses                  │
└─────────────────┬───────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────┐
│  Content Index (JSON)                           │
│  Generated at build time from:                  │
│  - apps/cyan-docs/src/books/**/*.mdx            │
│  - packages/cyan-css/src/**/*.css               │
│  - packages/cyan-lit/src/**/*.ts                │
└─────────────────────────────────────────────────┘
```

**Flow:**
1. Astro build generates searchable content index from MDX frontmatter
2. Netlify edge function serves MCP protocol endpoint
3. Agents query via MCP tools
4. Responses return structured data from content index

## 2. Content Organization

### 2.1 Documentation Categories

Documentation is organized in `/apps/cyan-docs/src/books/` with the following structure:

```yaml
books/
  custom-elements/    # Web Component documentation
  styles/            # CSS utilities and patterns
  application/       # Application-level patterns
  principles/        # Design principles and guidelines
```

### 2.2 Content Schema

Each MDX file includes frontmatter with this schema:

```typescript
interface DocumentFrontmatter {
  title: string;          // Display title (e.g., "<cn-card>")
  noun?: string;          // Icon identifier or category
  topic?: string;         // Topic category (e.g., "Core")
  description?: string;   // Brief description (future enhancement)
  tags?: string[];        // Searchable tags (future enhancement)
}
```

**Current State:** Most docs have `title` and `noun`. Enhanced metadata (description, tags) should be added incrementally.

### 2.3 Component Types

| Type | Location | Description |
|------|----------|-------------|
| **Web Components** | `custom-elements/` | Lit-based custom elements (e.g., `cn-card`, `cn-button`) |
| **CSS Utilities** | `styles/` | Utility classes and styling patterns |
| **App Patterns** | `application/` | High-level application layout patterns |
| **Design Principles** | `principles/` | Typography, theming, iconography guidelines |

## 3. MCP Tools

### 3.1 Tool: `search_components`

Search for components by name, description, or category.

**Input Schema:**
```json
{
  "name": "search_components",
  "description": "Search Cyan Design System components by name, keyword, or category",
  "inputSchema": {
    "type": "object",
    "properties": {
      "query": {
        "type": "string",
        "description": "Search query (component name, keyword, or description)"
      },
      "category": {
        "type": "string",
        "enum": ["custom-elements", "styles", "application", "principles"],
        "description": "Filter by documentation category"
      },
      "limit": {
        "type": "number",
        "default": 10,
        "description": "Maximum number of results"
      }
    },
    "required": ["query"]
  }
}
```

**Response Schema:**
```typescript
interface SearchResult {
  name: string;           // Component name (e.g., "cn-card")
  title: string;          // Display title (e.g., "<cn-card>")
  category: string;       // Documentation category
  path: string;           // URL path to documentation
  excerpt?: string;       // First paragraph or description
  relevance: number;      // Match score (0-1)
}

interface SearchResponse {
  results: SearchResult[];
  total: number;
}
```

**Example Usage:**
```json
{
  "tool": "search_components",
  "arguments": {
    "query": "card",
    "category": "custom-elements",
    "limit": 5
  }
}
```

**Example Response:**
```json
{
  "results": [
    {
      "name": "cn-card",
      "title": "<cn-card>",
      "category": "custom-elements",
      "path": "/custom-elements/cn-card",
      "excerpt": "A fixed container for a piece of content with elevation and cover image support.",
      "relevance": 0.95
    }
  ],
  "total": 1
}
```

---

### 3.2 Tool: `get_component`

Retrieve complete documentation for a specific component.

**Input Schema:**
```json
{
  "name": "get_component",
  "description": "Get full documentation for a specific Cyan component",
  "inputSchema": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "description": "Component name (e.g., 'cn-card', 'buttons')"
      },
      "category": {
        "type": "string",
        "enum": ["custom-elements", "styles", "application", "principles"],
        "description": "Documentation category (optional, improves lookup speed)"
      }
    },
    "required": ["name"]
  }
}
```

**Response Schema:**
```typescript
interface ComponentProperty {
  name: string;
  type: string;
  default?: string;
  description: string;
}

interface ComponentSlot {
  name: string;
  description: string;
}

interface CSSToken {
  property: string;
  default?: string;
  description: string;
}

interface CodeExample {
  title?: string;
  language: string;
  code: string;
}

interface ComponentDocs {
  name: string;
  title: string;
  category: string;
  description: string;        // Extracted from content
  properties?: ComponentProperty[];
  slots?: ComponentSlot[];
  cssTokens?: CSSToken[];
  examples: CodeExample[];
  usage: string;              // Basic usage example
  url: string;                // Full documentation URL
  markdown: string;           // Complete markdown content
}
```

**Example Usage:**
```json
{
  "tool": "get_component",
  "arguments": {
    "name": "cn-card",
    "category": "custom-elements"
  }
}
```

**Example Response:**
```json
{
  "name": "cn-card",
  "title": "<cn-card>",
  "category": "custom-elements",
  "description": "A fixed container for a piece of content. It can be used to display a small amount of information, or to highlight a piece of content.",
  "properties": [
    {
      "name": "elevation",
      "type": "number",
      "default": "1",
      "description": "Card elevation level (0-4)"
    },
    {
      "name": "title",
      "type": "string",
      "default": "''",
      "description": "Card title"
    }
  ],
  "slots": [
    {
      "name": "default",
      "description": "Any content in the default slot will be rendered in the card body"
    },
    {
      "name": "actions",
      "description": "The actions to display at the bottom of the card"
    }
  ],
  "cssTokens": [
    {
      "property": "--cn-card-background",
      "default": "light-dark(var(--chroma-primary-99), var(--chroma-primary-10))",
      "description": "Card background color"
    }
  ],
  "examples": [
    {
      "title": "Basic Card",
      "language": "html",
      "code": "<cn-card title=\"Basic Card\">\n  This is the content of the card.\n</cn-card>"
    }
  ],
  "usage": "<cn-card title=\"Card Title\">\n  Card content goes here.\n</cn-card>",
  "url": "https://cyan-docs.netlify.app/custom-elements/cn-card",
  "markdown": "[Full MDX content here]"
}
```

---

### 3.3 Tool: `list_components`

List all available components by category.

**Input Schema:**
```json
{
  "name": "list_components",
  "description": "List all components in the Cyan Design System, optionally filtered by category",
  "inputSchema": {
    "type": "object",
    "properties": {
      "category": {
        "type": "string",
        "enum": ["custom-elements", "styles", "application", "principles", "all"],
        "default": "all",
        "description": "Filter by documentation category"
      }
    }
  }
}
```

**Response Schema:**
```typescript
interface ComponentListItem {
  name: string;
  title: string;
  category: string;
  path: string;
  noun?: string;
}

interface ComponentList {
  categories: {
    [category: string]: ComponentListItem[];
  };
  total: number;
}
```

**Example Response:**
```json
{
  "categories": {
    "custom-elements": [
      {
        "name": "cn-card",
        "title": "<cn-card>",
        "category": "custom-elements",
        "path": "/custom-elements/cn-card",
        "noun": "card"
      },
      {
        "name": "cn-button",
        "title": "<cn-button>",
        "category": "custom-elements",
        "path": "/custom-elements/cn-button",
        "noun": "components"
      }
    ],
    "styles": [
      {
        "name": "buttons",
        "title": "Buttons",
        "category": "styles",
        "path": "/styles/buttons",
        "noun": "components"
      }
    ]
  },
  "total": 62
}
```

---

### 3.4 Tool: `get_design_tokens`

Retrieve design tokens (CSS custom properties).

**Input Schema:**
```json
{
  "name": "get_design_tokens",
  "description": "Get CSS design tokens by category",
  "inputSchema": {
    "type": "object",
    "properties": {
      "category": {
        "type": "string",
        "enum": ["colors", "typography", "spacing", "elevation", "borders", "all"],
        "default": "all",
        "description": "Token category"
      }
    }
  }
}
```

**Response Schema:**
```typescript
interface DesignToken {
  name: string;              // CSS variable name
  value?: string;            // Default value if defined
  category: string;          // Token category
  description?: string;      // Usage description
  namespace: "cn" | "theme"; // --cn-* or --color-*, --background-*
}

interface TokensResponse {
  tokens: {
    [category: string]: DesignToken[];
  };
  total: number;
  documentation: string;     // URL to token documentation
}
```

**Token Naming Conventions:**
```css
/* Core tokens (--cn- prefix) */
--cn-[selector]-[token]           /* e.g., --cn-card-background */
--cn-[selector]-[token]-[state]   /* e.g., --cn-button-background-hover */

/* Theme tokens (no --cn- prefix) */
--color-[token]                   /* e.g., --color-primary */
--background-[token]              /* e.g., --background-surface */
```

**Example Response:**
```json
{
  "tokens": {
    "colors": [
      {
        "name": "--chroma-primary-10",
        "category": "colors",
        "namespace": "theme",
        "description": "Primary color palette - dark shade"
      }
    ],
    "card": [
      {
        "name": "--cn-card-background",
        "value": "light-dark(var(--chroma-primary-99), var(--chroma-primary-10))",
        "category": "card",
        "namespace": "cn",
        "description": "Card background color"
      }
    ]
  },
  "total": 156,
  "documentation": "https://cyan-docs.netlify.app/principles/theming"
}
```

---

### 3.5 Tool: `get_usage_pattern`

Get recommended usage patterns for common scenarios.

**Input Schema:**
```json
{
  "name": "get_usage_pattern",
  "description": "Get code examples and patterns for common use cases",
  "inputSchema": {
    "type": "object",
    "properties": {
      "pattern": {
        "type": "string",
        "enum": [
          "importing-components",
          "theming",
          "responsive-images",
          "form-validation",
          "app-layout",
          "card-grid",
          "navigation"
        ],
        "description": "Usage pattern name"
      }
    },
    "required": ["pattern"]
  }
}
```

**Response Schema:**
```typescript
interface UsagePattern {
  name: string;
  title: string;
  description: string;
  steps?: string[];
  examples: CodeExample[];
  relatedComponents: string[];
  documentation: string;
}
```

**Example Response:**
```json
{
  "name": "importing-components",
  "title": "Importing Cyan Components",
  "description": "How to import and use Cyan web components in your application",
  "steps": [
    "Import components using the Vite alias 'cyan-lit'",
    "Register components in your module",
    "Use components in your HTML/templates"
  ],
  "examples": [
    {
      "title": "Import in TypeScript/JavaScript",
      "language": "typescript",
      "code": "import 'cyan-lit';\n// Components auto-register\n\n// Or import specific components\nimport 'cyan-lit/cn-card';\nimport 'cyan-lit/cn-button';"
    },
    {
      "title": "Use in HTML",
      "language": "html",
      "code": "<cn-card title=\"Example\">\n  <p>Content here</p>\n</cn-card>"
    }
  ],
  "relatedComponents": ["cn-card", "cn-button", "cn-avatar"],
  "documentation": "https://cyan-docs.netlify.app/"
}
```

---

### 3.6 Tool: `get_css_categories`

Get information about CSS organization and available utility classes.

**Input Schema:**
```json
{
  "name": "get_css_categories",
  "description": "Get CSS categories and available utility classes",
  "inputSchema": {
    "type": "object",
    "properties": {
      "category": {
        "type": "string",
        "enum": ["core", "utilities", "atomics", "components", "typography", "all"],
        "default": "all",
        "description": "CSS category"
      }
    }
  }
}
```

**Response Schema:**
```typescript
interface CSSCategory {
  name: string;
  description: string;
  examples: string[];
  documentation: string;
}

interface CSSCategoriesResponse {
  categories: {
    [category: string]: CSSCategory;
  };
}
```

**Example Response:**
```json
{
  "categories": {
    "utilities": {
      "name": "Utilities",
      "description": "Utility classes for layout, spacing, typography",
      "examples": [".flex", ".grid", ".column-l", ".surface"],
      "documentation": "https://cyan-docs.netlify.app/styles/"
    },
    "atomics": {
      "name": "Atomics",
      "description": "Low-level utility classes (single property)",
      "examples": [".p-1", ".m-2", ".text-center"],
      "documentation": "https://cyan-docs.netlify.app/styles/"
    }
  }
}
```

## 4. Implementation Details

### 4.1 Content Index Generation

**Build-time process (Astro):**

```typescript
// scripts/generate-mcp-index.ts
import { getCollection } from 'astro:content';
import fs from 'node:fs/promises';

interface ContentIndex {
  version: string;
  buildDate: string;
  components: ComponentIndexEntry[];
  tokens: TokenIndexEntry[];
}

async function generateIndex() {
  // Parse all MDX files from books/
  const allDocs = await getCollection('books');
  
  const index: ContentIndex = {
    version: '4.0.0-beta.x',
    buildDate: new Date().toISOString(),
    components: allDocs.map(parseComponentEntry),
    tokens: await parseTokens()
  };
  
  await fs.writeFile(
    'public/mcp-index.json',
    JSON.stringify(index, null, 2)
  );
}
```

**Parsing strategy:**
1. Extract frontmatter (title, noun, topic)
2. Parse markdown tables for properties, slots, CSS tokens
3. Extract code blocks as examples
4. Generate search index with keywords
5. Cache parsed content as JSON

### 4.2 Edge Function Implementation

**Netlify Edge Function:**

```typescript
// netlify/edge-functions/mcp.ts
import type { Context } from "@netlify/edge-functions";
import { MCPServer } from "./lib/mcp-server";

const server = new MCPServer({
  indexUrl: "https://cyan-docs.netlify.app/mcp-index.json"
});

export default async (request: Request, context: Context) => {
  // Handle MCP protocol
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const mcpRequest = await request.json();
    const response = await server.handleRequest(mcpRequest);
    
    return new Response(JSON.stringify(response), {
      headers: { 
        "content-type": "application/json",
        "access-control-allow-origin": "*"
      }
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }), 
      { status: 500 }
    );
  }
}

export const config = { path: "/.netlify/functions/mcp" };
```

### 4.3 MCP Server Logic

```typescript
// netlify/edge-functions/lib/mcp-server.ts
export class MCPServer {
  private index: ContentIndex | null = null;

  async handleRequest(request: MCPRequest): Promise<MCPResponse> {
    if (!this.index) {
      this.index = await this.loadIndex();
    }

    switch (request.method) {
      case "tools/list":
        return this.listTools();
      case "tools/call":
        return this.callTool(request.params);
      default:
        throw new Error(`Unknown method: ${request.method}`);
    }
  }

  private async callTool(params: any) {
    const { name, arguments: args } = params;

    switch (name) {
      case "search_components":
        return this.searchComponents(args);
      case "get_component":
        return this.getComponent(args);
      case "list_components":
        return this.listComponents(args);
      case "get_design_tokens":
        return this.getDesignTokens(args);
      case "get_usage_pattern":
        return this.getUsagePattern(args);
      case "get_css_categories":
        return this.getCssCategories(args);
      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  }

  private searchComponents(args: { query: string; category?: string; limit?: number }) {
    // Implement fuzzy search over index
    // Return ranked results
  }

  // ... implement other tool handlers
}
```

### 4.4 Deployment Configuration

**netlify.toml:**
```toml
[build]
  command = "pnpm build"
  publish = "apps/cyan-docs/dist"

[[edge_functions]]
  function = "mcp"
  path = "/.netlify/functions/mcp"

[functions]
  directory = "netlify/edge-functions"
```

## 5. Content Enhancement Plan

### 5.1 Phase 1: Basic MCP (Current State)

**Capabilities:**
- Search by component name
- Retrieve full documentation markdown
- List all components

**Data sources:**
- MDX frontmatter (title, noun, topic)
- Rendered markdown content

### 5.2 Phase 2: Structured Data (Recommended)

**Add to MDX frontmatter:**
```yaml
---
title: "<cn-card>"
noun: "card"
description: "A fixed container for content with elevation and cover images"
category: "custom-elements"
tags: ["container", "surface", "layout"]
props:
  - name: "elevation"
    type: "number"
    default: 1
    description: "Card elevation level (0-4)"
imports:
  - "import 'cyan-lit/cn-card';"
---
```

**Benefits:**
- Faster queries (no markdown parsing)
- Type-safe responses
- Better search relevance

### 5.3 Phase 3: Advanced Features

- **Semantic search:** Vector embeddings for natural language queries
- **Component relationships:** "What components work well with cn-card?"
- **Version history:** Track component API changes
- **Live examples:** Return CodePen/StackBlitz links
- **Accessibility info:** ARIA patterns and keyboard navigation

## 6. Testing Strategy

### 6.1 Unit Tests

```typescript
// netlify/edge-functions/lib/mcp-server.test.ts
describe("MCPServer", () => {
  it("should search components by name", async () => {
    const server = new MCPServer({ indexUrl: "mock-index.json" });
    const result = await server.searchComponents({ query: "card" });
    
    expect(result.results).toContainEqual(
      expect.objectContaining({ name: "cn-card" })
    );
  });

  it("should retrieve component documentation", async () => {
    const server = new MCPServer({ indexUrl: "mock-index.json" });
    const result = await server.getComponent({ name: "cn-card" });
    
    expect(result.properties).toBeArrayOfSize(8);
    expect(result.slots).toContainEqual(
      expect.objectContaining({ name: "actions" })
    );
  });
});
```

### 6.2 Integration Tests

```typescript
// Test actual edge function
describe("MCP Edge Function", () => {
  it("should handle search_components tool call", async () => {
    const response = await fetch("http://localhost:8888/.netlify/functions/mcp", {
      method: "POST",
      body: JSON.stringify({
        method: "tools/call",
        params: {
          name: "search_components",
          arguments: { query: "button" }
        }
      })
    });

    const data = await response.json();
    expect(data.results.length).toBeGreaterThan(0);
  });
});
```

### 6.3 End-to-End Tests

Test with actual MCP clients (Claude Desktop, etc.)

## 7. Performance Considerations

### 7.1 Caching Strategy

- **Content index:** Cache at CDN edge (1 hour TTL)
- **Component docs:** Cache individual responses (1 day TTL)
- **Search results:** No caching (personalized queries)

### 7.2 Optimization

- **Index size:** Target < 500KB for fast edge function loads
- **Compression:** Gzip/Brotli for JSON responses
- **Lazy loading:** Load full markdown only when requested
- **Search index:** Use inverted index for O(1) keyword lookups

## 8. Monitoring & Analytics

### 8.1 Metrics

- Tool call frequency by type
- Query latency (p50, p95, p99)
- Error rates
- Most searched components
- Edge function cold start times

### 8.2 Logging

```typescript
// Log structure
interface MCPLog {
  timestamp: string;
  tool: string;
  arguments: any;
  latency: number;
  success: boolean;
  error?: string;
}
```

## 9. Security & Rate Limiting

### 9.1 Authentication

**Phase 1:** Public, no authentication  
**Phase 2:** Optional API key for analytics  
**Phase 3:** OAuth for private design systems

### 9.2 Rate Limiting

- 100 requests/minute per IP (Netlify default)
- 1000 requests/hour per IP
- Upgrade limits for known MCP clients

### 9.3 Input Validation

- Sanitize all search queries
- Validate tool arguments against schemas
- Prevent path traversal in component names

## 10. Migration & Rollout

### 10.1 Rollout Plan

**Week 1-2:** Build content index generation  
**Week 3:** Implement edge function with basic tools  
**Week 4:** Testing and refinement  
**Week 5:** Deploy to production  
**Week 6+:** Monitor usage, gather feedback, iterate

### 10.2 Backwards Compatibility

- MCP server is additive (doesn't affect existing docs)
- Can version API endpoint: `/v1/mcp`, `/v2/mcp`
- Content index format versioned

## 11. Success Metrics

- **Adoption:** Number of MCP clients using the server
- **Coverage:** % of components with complete structured data
- **Accuracy:** User feedback on response quality
- **Performance:** Average query latency < 100ms
- **Reliability:** 99.9% uptime

## 12. Future Enhancements

- **Multi-language support:** i18n for documentation
- **Component playground:** Generate live demos on-demand
- **AI-generated examples:** Custom examples based on user context
- **Design system comparison:** Compare with other design systems
- **Figma integration:** Link to Figma components (if available)

## 13. References

- [Model Context Protocol Specification](https://modelcontextprotocol.io/)
- [Netlify Edge Functions](https://docs.netlify.com/edge-functions/overview/)
- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [Cyan Design System Documentation](https://cyan-docs.netlify.app/)

---

**Next Steps:**
1. Review and approve this specification
2. Create GitHub issues for implementation phases
3. Set up development environment for edge function testing
4. Begin Phase 1 implementation
