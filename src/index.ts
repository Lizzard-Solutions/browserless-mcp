import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from '@modelcontextprotocol/sdk/types.js';
import { BrowserlessClient } from './client.js';
import { BrowserlessConfigSchema } from './types.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

class BrowserlessMCPServer {
  private server: Server;
  private client: BrowserlessClient | null = null;

  constructor() {
    this.server = new Server(
      {
        name: 'browserless-mcp',
        version: '1.0.0',
      }
    );

    this.setupToolHandlers();
  }

  private setupToolHandlers() {
    // Initialize Browserless client
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: 'initialize_browserless',
            description: 'Initialize connection to Browserless instance',
            inputSchema: {
              type: 'object',
              properties: {
                host: { type: 'string', default: 'localhost' },
                port: { type: 'number', default: 3000 },
                token: { type: 'string' },
                protocol: { type: 'string', enum: ['http', 'https', 'ws', 'wss'], default: 'http' },
                timeout: { type: 'number', default: 30000 },
                concurrent: { type: 'number', default: 5 },
              },
              required: ['token'],
            },
          },
          {
            name: 'generate_pdf',
            description: 'Generate PDF from URL or HTML content',
            inputSchema: {
              type: 'object',
              properties: {
                url: { type: 'string' },
                html: { type: 'string' },
                options: {
                  type: 'object',
                  properties: {
                    displayHeaderFooter: { type: 'boolean' },
                    printBackground: { type: 'boolean' },
                    format: { type: 'string' },
                    landscape: { type: 'boolean' },
                    margin: {
                      type: 'object',
                      properties: {
                        top: { type: 'string' },
                        bottom: { type: 'string' },
                        left: { type: 'string' },
                        right: { type: 'string' },
                      },
                    },
                  },
                },
              },
              required: ['url'],
            },
          },
          {
            name: 'take_screenshot',
            description: 'Take screenshot of a webpage',
            inputSchema: {
              type: 'object',
              properties: {
                url: { type: 'string' },
                options: {
                  type: 'object',
                  properties: {
                    type: { type: 'string', enum: ['png', 'jpeg', 'webp'] },
                    quality: { type: 'number' },
                    fullPage: { type: 'boolean' },
                    omitBackground: { type: 'boolean' },
                    clip: {
                      type: 'object',
                      properties: {
                        x: { type: 'number' },
                        y: { type: 'number' },
                        width: { type: 'number' },
                        height: { type: 'number' },
                      },
                    },
                  },
                },
              },
              required: ['url'],
            },
          },
          {
            name: 'get_content',
            description: 'Extract rendered HTML content from a webpage',
            inputSchema: {
              type: 'object',
              properties: {
                url: { type: 'string' },
                waitForSelector: {
                  type: 'object',
                  properties: {
                    selector: { type: 'string' },
                    timeout: { type: 'number' },
                  },
                },
                waitForFunction: {
                  type: 'object',
                  properties: {
                    fn: { type: 'string' },
                    timeout: { type: 'number' },
                  },
                },
              },
              required: ['url'],
            },
          },
          {
            name: 'execute_function',
            description: 'Execute custom JavaScript function in browser context',
            inputSchema: {
              type: 'object',
              properties: {
                code: { type: 'string' },
                context: { type: 'object' },
              },
              required: ['code'],
            },
          },
          {
            name: 'download_files',
            description: 'Handle file downloads',
            inputSchema: {
              type: 'object',
              properties: {
                code: { type: 'string' },
                context: { type: 'object' },
              },
              required: ['code'],
            },
          },
          {
            name: 'export_page',
            description: 'Export webpage with resources',
            inputSchema: {
              type: 'object',
              properties: {
                url: { type: 'string' },
                headers: { type: 'object' },
                bestAttempt: { type: 'boolean' },
              },
              required: ['url'],
            },
          },
          {
            name: 'run_performance_audit',
            description: 'Run Lighthouse performance audit',
            inputSchema: {
              type: 'object',
              properties: {
                url: { type: 'string' },
                config: {
                  type: 'object',
                  properties: {
                    extends: { type: 'string' },
                    settings: { type: 'object' },
                  },
                },
              },
              required: ['url'],
            },
          },
          {
            name: 'unblock',
            description: 'Bypass bot detection and anti-scraping measures',
            inputSchema: {
              type: 'object',
              properties: {
                url: { type: 'string' },
                content: { type: 'boolean' },
                screenshot: { type: 'boolean' },
                stealth: { type: 'boolean' },
                blockAds: { type: 'boolean' },
                headers: { type: 'object' },
              },
              required: ['url'],
            },
          },
          {
            name: 'execute_browserql',
            description: 'Execute BrowserQL GraphQL queries',
            inputSchema: {
              type: 'object',
              properties: {
                query: { type: 'string' },
                variables: { type: 'object' },
              },
              required: ['query'],
            },
          },
          {
            name: 'create_websocket_connection',
            description: 'Create WebSocket connection for Puppeteer/Playwright',
            inputSchema: {
              type: 'object',
              properties: {
                browser: { type: 'string', enum: ['chromium', 'firefox', 'webkit'] },
                library: { type: 'string', enum: ['puppeteer', 'playwright'] },
                stealth: { type: 'boolean' },
                blockAds: { type: 'boolean' },
                viewport: {
                  type: 'object',
                  properties: {
                    width: { type: 'number' },
                    height: { type: 'number' },
                    deviceScaleFactor: { type: 'number' },
                    isMobile: { type: 'boolean' },
                    hasTouch: { type: 'boolean' },
                  },
                },
                userAgent: { type: 'string' },
                extraHTTPHeaders: { type: 'object' },
              },
            },
          },
          {
            name: 'get_health',
            description: 'Get health status of Browserless instance',
            inputSchema: {
              type: 'object',
              properties: {},
            },
          },
          {
            name: 'get_sessions',
            description: 'Get active sessions',
            inputSchema: {
              type: 'object',
              properties: {},
            },
          },
          {
            name: 'get_config',
            description: 'Get configuration',
            inputSchema: {
              type: 'object',
              properties: {},
            },
          },
          {
            name: 'get_metrics',
            description: 'Get metrics',
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

      if (!this.client && name !== 'initialize_browserless') {
        throw new Error('Browserless client not initialized. Call initialize_browserless first.');
      }

      try {
        switch (name) {
          case 'initialize_browserless': {
            const config = BrowserlessConfigSchema.parse(args);
            this.client = new BrowserlessClient(config);
            const health = await this.client.getHealth();
            return {
              content: [
                {
                  type: 'text',
                  text: `Browserless client initialized successfully. Health status: ${health.data?.status || 'unknown'}`,
                },
              ],
            };
          }

          case 'generate_pdf': {
            const result = await this.client!.generatePdf(args as any);
            if (result.success && result.data) {
              return {
                content: [
                  {
                    type: 'text',
                    text: `PDF generated successfully. Filename: ${result.data.filename}`,
                  },
                  {
                    type: 'binary',
                    mimeType: 'application/pdf',
                    data: result.data.pdf.toString('base64'),
                  },
                ],
              };
            } else {
              throw new Error(result.error || 'Failed to generate PDF');
            }
          }

          case 'take_screenshot': {
            const result = await this.client!.takeScreenshot(args);
            if (result.success && result.data) {
              return {
                content: [
                  {
                    type: 'text',
                    text: `Screenshot taken successfully. Filename: ${result.data.filename}`,
                  },
                  {
                    type: 'binary',
                    mimeType: `image/${result.data.format}`,
                    data: result.data.image.toString('base64'),
                  },
                ],
              };
            } else {
              throw new Error(result.error || 'Failed to take screenshot');
            }
          }

          case 'get_content': {
            const result = await this.client!.getContent(args);
            if (result.success && result.data) {
              return {
                content: [
                  {
                    type: 'text',
                    text: `Content extracted successfully from ${result.data.url}`,
                  },
                  {
                    type: 'text',
                    text: `Title: ${result.data.title}`,
                  },
                  {
                    type: 'text',
                    text: result.data.html,
                  },
                ],
              };
            } else {
              throw new Error(result.error || 'Failed to get content');
            }
          }

          case 'execute_function': {
            const result = await this.client!.executeFunction(args);
            if (result.success && result.data) {
              return {
                content: [
                  {
                    type: 'text',
                    text: `Function executed successfully. Result type: ${result.data.type}`,
                  },
                  {
                    type: 'text',
                    text: JSON.stringify(result.data.result, null, 2),
                  },
                ],
              };
            } else {
              throw new Error(result.error || 'Failed to execute function');
            }
          }

          case 'download_files': {
            const result = await this.client!.downloadFiles(args);
            if (result.success && result.data) {
              const content = [
                {
                  type: 'text',
                  text: `Downloaded ${result.data.files.length} files successfully.`,
                },
              ];

              for (const file of result.data.files) {
                content.push({
                  type: 'binary',
                  mimeType: file.type,
                  data: file.data.toString('base64'),
                });
              }

              return { content };
            } else {
              throw new Error(result.error || 'Failed to download files');
            }
          }

          case 'export_page': {
            const result = await this.client!.exportPage(args);
            if (result.success && result.data) {
              return {
                content: [
                  {
                    type: 'text',
                    text: `Page exported successfully with ${result.data.resources.length} resources.`,
                  },
                  {
                    type: 'text',
                    text: result.data.html,
                  },
                ],
              };
            } else {
              throw new Error(result.error || 'Failed to export page');
            }
          }

          case 'run_performance_audit': {
            const result = await this.client!.runPerformanceAudit(args);
            if (result.success && result.data) {
              return {
                content: [
                  {
                    type: 'text',
                    text: 'Performance audit completed successfully.',
                  },
                  {
                    type: 'text',
                    text: JSON.stringify(result.data, null, 2),
                  },
                ],
              };
            } else {
              throw new Error(result.error || 'Failed to run performance audit');
            }
          }

          case 'unblock': {
            const result = await this.client!.unblock(args);
            if (result.success && result.data) {
              const content = [
                {
                  type: 'text',
                  text: 'Unblock operation completed successfully.',
                },
              ];

              if (result.data.content) {
                content.push({
                  type: 'text',
                  text: result.data.content,
                });
              }

              if (result.data.screenshot) {
                content.push({
                  type: 'binary',
                  mimeType: 'image/png',
                  data: result.data.screenshot.toString('base64'),
                });
              }

              return { content };
            } else {
              throw new Error(result.error || 'Failed to unblock');
            }
          }

          case 'execute_browserql': {
            const result = await this.client!.executeBrowserQL(args);
            if (result.success && result.data) {
              return {
                content: [
                  {
                    type: 'text',
                    text: 'BrowserQL query executed successfully.',
                  },
                  {
                    type: 'text',
                    text: JSON.stringify(result.data, null, 2),
                  },
                ],
              };
            } else {
              throw new Error(result.error || 'Failed to execute BrowserQL query');
            }
          }

          case 'create_websocket_connection': {
            const result = await this.client!.createWebSocketConnection(args);
            if (result.success && result.data) {
              return {
                content: [
                  {
                    type: 'text',
                    text: `WebSocket connection created successfully. Session ID: ${result.data.sessionId}`,
                  },
                  {
                    type: 'text',
                    text: `Browser WebSocket endpoint: ${result.data.browserWSEndpoint}`,
                  },
                ],
              };
            } else {
              throw new Error(result.error || 'Failed to create WebSocket connection');
            }
          }

          case 'get_health': {
            const result = await this.client!.getHealth();
            if (result.success && result.data) {
              return {
                content: [
                  {
                    type: 'text',
                    text: `Health status: ${result.data.status}`,
                  },
                  {
                    type: 'text',
                    text: JSON.stringify(result.data, null, 2),
                  },
                ],
              };
            } else {
              throw new Error(result.error || 'Failed to get health status');
            }
          }

          case 'get_sessions': {
            const result = await this.client!.getSessions();
            if (result.success && result.data) {
              return {
                content: [
                  {
                    type: 'text',
                    text: `Found ${result.data.length} active sessions.`,
                  },
                  {
                    type: 'text',
                    text: JSON.stringify(result.data, null, 2),
                  },
                ],
              };
            } else {
              throw new Error(result.error || 'Failed to get sessions');
            }
          }

          case 'get_config': {
            const result = await this.client!.getConfig();
            if (result.success && result.data) {
              return {
                content: [
                  {
                    type: 'text',
                    text: 'Current configuration:',
                  },
                  {
                    type: 'text',
                    text: JSON.stringify(result.data, null, 2),
                  },
                ],
              };
            } else {
              throw new Error(result.error || 'Failed to get configuration');
            }
          }

          case 'get_metrics': {
            const result = await this.client!.getMetrics();
            if (result.success && result.data) {
              return {
                content: [
                  {
                    type: 'text',
                    text: 'Current metrics:',
                  },
                  {
                    type: 'text',
                    text: JSON.stringify(result.data, null, 2),
                  },
                ],
              };
            } else {
              throw new Error(result.error || 'Failed to get metrics');
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
    console.error('Browserless MCP server started');
  }
}

// Start the server
const server = new BrowserlessMCPServer();
server.run().catch(console.error); 