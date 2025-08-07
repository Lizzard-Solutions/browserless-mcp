import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { WebSocket } from 'ws';
import {
  BrowserlessConfig,
  BrowserlessResponse,
  PdfRequest,
  PdfResponse,
  ScreenshotRequest,
  ScreenshotResponse,
  ContentRequest,
  ContentResponse,
  FunctionRequest,
  FunctionResponse,
  DownloadRequest,
  DownloadResponse,
  ExportRequest,
  ExportResponse,
  PerformanceRequest,
  PerformanceResponse,
  UnblockRequest,
  UnblockResponse,
  BrowserQLRequest,
  BrowserQLResponse,
  WebSocketOptions,
  WebSocketResponse,
  HealthResponse,
  Session,
} from './types.js';

export class BrowserlessClient {
  private config: BrowserlessConfig;
  private httpClient: AxiosInstance;
  private baseUrl: string;

  constructor(config: BrowserlessConfig) {
    this.config = config;
    this.baseUrl = `${this.config.protocol}://${this.config.host}:${this.config.port}`;
    
    this.httpClient = axios.create({
      baseURL: this.baseUrl,
      timeout: this.config.timeout,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor to include token
    this.httpClient.interceptors.request.use((config) => {
      if (config.params) {
        config.params.token = this.config.token;
      } else {
        config.params = { token: this.config.token };
      }
      return config;
    });
  }

  /**
   * Generate PDF from URL or HTML content
   */
  async generatePdf(request: PdfRequest): Promise<BrowserlessResponse<PdfResponse>> {
    try {
      const response: AxiosResponse<Buffer> = await this.httpClient.post('/pdf', request, {
        responseType: 'arraybuffer',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return {
        success: true,
        data: {
          pdf: Buffer.from(response.data),
          filename: `document-${Date.now()}.pdf`,
        },
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Take screenshot of a webpage
   */
  async takeScreenshot(request: ScreenshotRequest): Promise<BrowserlessResponse<ScreenshotResponse>> {
    try {
      const response: AxiosResponse<Buffer> = await this.httpClient.post('/screenshot', request, {
        responseType: 'arraybuffer',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const format = request.options?.type || 'png';
      const filename = `screenshot-${Date.now()}.${format}`;

      return {
        success: true,
        data: {
          image: Buffer.from(response.data),
          filename,
          format,
        },
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Extract rendered HTML content from a webpage
   */
  async getContent(request: ContentRequest): Promise<BrowserlessResponse<ContentResponse>> {
    try {
      const response: AxiosResponse<ContentResponse> = await this.httpClient.post('/content', request);

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Execute custom JavaScript function in browser context
   */
  async executeFunction(request: FunctionRequest): Promise<BrowserlessResponse<FunctionResponse>> {
    try {
      const response: AxiosResponse<FunctionResponse> = await this.httpClient.post('/function', request, {
        headers: {
          'Content-Type': 'application/javascript',
        },
      });

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Handle file downloads
   */
  async downloadFiles(request: DownloadRequest): Promise<BrowserlessResponse<DownloadResponse>> {
    try {
      const response: AxiosResponse<DownloadResponse> = await this.httpClient.post('/download', request, {
        headers: {
          'Content-Type': 'application/javascript',
        },
      });

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Export webpage with resources
   */
  async exportPage(request: ExportRequest): Promise<BrowserlessResponse<ExportResponse>> {
    try {
      const response: AxiosResponse<ExportResponse> = await this.httpClient.post('/export', request);

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Run Lighthouse performance audit
   */
  async runPerformanceAudit(request: PerformanceRequest): Promise<BrowserlessResponse<PerformanceResponse>> {
    try {
      const response: AxiosResponse<PerformanceResponse> = await this.httpClient.post('/performance', request);

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Bypass bot detection and anti-scraping measures
   */
  async unblock(request: UnblockRequest): Promise<BrowserlessResponse<UnblockResponse>> {
    try {
      const response: AxiosResponse<UnblockResponse> = await this.httpClient.post('/unblock', request);

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Execute BrowserQL GraphQL queries
   */
  async executeBrowserQL(request: BrowserQLRequest): Promise<BrowserlessResponse<BrowserQLResponse>> {
    try {
      const response: AxiosResponse<BrowserQLResponse> = await this.httpClient.post('/chromium/bql', request);

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Create WebSocket connection for Puppeteer/Playwright
   */
  async createWebSocketConnection(options: WebSocketOptions = { browser: 'chromium', library: 'puppeteer' }): Promise<BrowserlessResponse<WebSocketResponse>> {
    try {
      const { browser, library } = options;
      
      let endpoint: string;
      if (library === 'puppeteer') {
        endpoint = `ws://${this.config.host}:${this.config.port}?token=${this.config.token}`;
      } else {
        // Playwright
        endpoint = `ws://${this.config.host}:${this.config.port}/${browser}/playwright?token=${this.config.token}`;
      }

      // Test the connection
      const ws = new WebSocket(endpoint);
      
      return new Promise((resolve) => {
        ws.on('open', () => {
          ws.close();
          resolve({
            success: true,
            data: {
              browserWSEndpoint: endpoint,
              sessionId: `session-${Date.now()}`,
            },
          });
        });

        ws.on('error', (error) => {
          resolve({
            success: false,
            error: `WebSocket connection failed: ${error.message}`,
          });
        });
      });
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Get health status of Browserless instance
   */
  async getHealth(): Promise<BrowserlessResponse<HealthResponse>> {
    try {
      const response: AxiosResponse<HealthResponse> = await this.httpClient.get('/health');

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Get active sessions
   */
  async getSessions(): Promise<BrowserlessResponse<Session[]>> {
    try {
      const response: AxiosResponse<Session[]> = await this.httpClient.get('/sessions');

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Get configuration
   */
  async getConfig(): Promise<BrowserlessResponse<any>> {
    try {
      const response: AxiosResponse<any> = await this.httpClient.get('/config');

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Get metrics
   */
  async getMetrics(): Promise<BrowserlessResponse<any>> {
    try {
      const response: AxiosResponse<any> = await this.httpClient.get('/metrics');

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Handle errors from API calls
   */
  private handleError(error: unknown): BrowserlessResponse {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        error: error.response?.data?.message || error.message,
        statusCode: error.response?.status,
      };
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }

  /**
   * Get the base URL for this client
   */
  getBaseUrl(): string {
    return this.baseUrl;
  }

  /**
   * Get the current configuration
   */
  getCurrentConfig(): BrowserlessConfig {
    return { ...this.config };
  }
} 