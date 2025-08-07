import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from '@modelcontextprotocol/sdk/types.js';
import axios from 'axios';

class SimpleBrowserlessMCPServer {
  private server: Server;
  private browserlessUrl: string;

  constructor() {
    this.server = new Server({
      name: 'browserless-mcp-simple',
      version: '1.0.0',
    });

    this.browserlessUrl = 'http://172.22.0.1:3000';
    this.setupToolHandlers();
  }

  private setupToolHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: 'get_content',
            description: 'Extract rendered HTML content from a webpage',
            inputSchema: {
              type: 'object',
              properties: {
                url: { type: 'string', description: 'URL to extract content from' },
                waitForSelector: {
                  type: 'object',
                  properties: {
                    selector: { type: 'string', description: 'CSS selector to wait for' },
                    timeout: { type: 'number', description: 'Timeout in milliseconds' },
                  },
                },
              },
              required: ['url'],
            },
          },
          {
            name: 'generate_pdf',
            description: 'Generate PDF from URL with custom styling',
            inputSchema: {
              type: 'object',
              properties: {
                url: { type: 'string', description: 'URL to convert to PDF' },
                options: {
                  type: 'object',
                  properties: {
                    format: { type: 'string', description: 'Paper format (A4, Letter, etc.)' },
                    printBackground: { type: 'boolean', description: 'Print background graphics' },
                    landscape: { type: 'boolean', description: 'Landscape orientation' },
                    margin: {
                      type: 'object',
                      properties: {
                        top: { type: 'string', description: 'Top margin (e.g., "20mm")' },
                        bottom: { type: 'string', description: 'Bottom margin' },
                        left: { type: 'string', description: 'Left margin' },
                        right: { type: 'string', description: 'Right margin' },
                      },
                    },
                  },
                },
              },
              required: ['url'],
            },
          },
          {
            name: 'test_connection',
            description: 'Test connection to Browserless instance',
            inputSchema: {
              type: 'object',
              properties: {},
            },
          },
        ] as Tool[],
      };
    });

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case 'get_content': {
            const response = await axios.post(`${this.browserlessUrl}/content`, {
              url: args?.url,
              ...(args?.waitForSelector && { waitForSelector: args.waitForSelector }),
            }, { timeout: 15000 });

            return {
              content: [
                {
                  type: 'text',
                  text: `Content extracted successfully from ${args.url}`,
                },
                {
                  type: 'text',
                  text: response.data,
                },
              ],
            };
          }

          case 'generate_pdf': {
            const response = await axios.post(`${this.browserlessUrl}/pdf`, {
              url: args.url,
              options: args.options || {},
            }, {
              responseType: 'arraybuffer',
              timeout: 30000,
            });

            return {
              content: [
                {
                  type: 'text',
                  text: `PDF generated successfully from ${args.url}`,
                },
                {
                  type: 'binary',
                  mimeType: 'application/pdf',
                  data: Buffer.from(response.data).toString('base64'),
                },
              ],
            };
          }

          case 'test_connection': {
            try {
              const response = await axios.get(`${this.browserlessUrl}/config`, { timeout: 5000 });
              return {
                content: [
                  {
                    type: 'text',
                    text: '✅ Browserless connection successful!',
                  },
                  {
                    type: 'text',
                    text: `Configuration: ${JSON.stringify(response.data, null, 2)}`,
                  },
                ],
              };
            } catch (error) {
              return {
                content: [
                  {
                    type: 'text',
                    text: `❌ Connection failed: ${error.message}`,
                  },
                ],
              };
            }
          }

          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        throw new Error(`Tool execution failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Simple Browserless MCP server started');
  }
}

// Start the server
const server = new SimpleBrowserlessMCPServer();
server.run().catch(console.error); 