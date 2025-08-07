import axios from 'axios';
import { WebSocket } from 'ws';
export class BrowserlessClient {
    config;
    httpClient;
    baseUrl;
    constructor(config) {
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
            }
            else {
                config.params = { token: this.config.token };
            }
            return config;
        });
    }
    /**
     * Generate PDF from URL or HTML content
     */
    async generatePdf(request) {
        try {
            const response = await this.httpClient.post('/pdf', request, {
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
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    /**
     * Take screenshot of a webpage
     */
    async takeScreenshot(request) {
        try {
            const response = await this.httpClient.post('/screenshot', request, {
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
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    /**
     * Extract rendered HTML content from a webpage
     */
    async getContent(request) {
        try {
            const response = await this.httpClient.post('/content', request);
            return {
                success: true,
                data: response.data,
            };
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    /**
     * Execute custom JavaScript function in browser context
     */
    async executeFunction(request) {
        try {
            const response = await this.httpClient.post('/function', request, {
                headers: {
                    'Content-Type': 'application/javascript',
                },
            });
            return {
                success: true,
                data: response.data,
            };
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    /**
     * Handle file downloads
     */
    async downloadFiles(request) {
        try {
            const response = await this.httpClient.post('/download', request, {
                headers: {
                    'Content-Type': 'application/javascript',
                },
            });
            return {
                success: true,
                data: response.data,
            };
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    /**
     * Export webpage with resources
     */
    async exportPage(request) {
        try {
            const response = await this.httpClient.post('/export', request);
            return {
                success: true,
                data: response.data,
            };
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    /**
     * Run Lighthouse performance audit
     */
    async runPerformanceAudit(request) {
        try {
            const response = await this.httpClient.post('/performance', request);
            return {
                success: true,
                data: response.data,
            };
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    /**
     * Bypass bot detection and anti-scraping measures
     */
    async unblock(request) {
        try {
            const response = await this.httpClient.post('/unblock', request);
            return {
                success: true,
                data: response.data,
            };
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    /**
     * Execute BrowserQL GraphQL queries
     */
    async executeBrowserQL(request) {
        try {
            const response = await this.httpClient.post('/chromium/bql', request);
            return {
                success: true,
                data: response.data,
            };
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    /**
     * Create WebSocket connection for Puppeteer/Playwright
     */
    async createWebSocketConnection(options = { browser: 'chromium', library: 'puppeteer' }) {
        try {
            const { browser, library } = options;
            let endpoint;
            if (library === 'puppeteer') {
                endpoint = `ws://${this.config.host}:${this.config.port}?token=${this.config.token}`;
            }
            else {
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
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    /**
     * Get health status of Browserless instance
     */
    async getHealth() {
        try {
            const response = await this.httpClient.get('/health');
            return {
                success: true,
                data: response.data,
            };
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    /**
     * Get active sessions
     */
    async getSessions() {
        try {
            const response = await this.httpClient.get('/sessions');
            return {
                success: true,
                data: response.data,
            };
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    /**
     * Get configuration
     */
    async getConfig() {
        try {
            const response = await this.httpClient.get('/config');
            return {
                success: true,
                data: response.data,
            };
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    /**
     * Get metrics
     */
    async getMetrics() {
        try {
            const response = await this.httpClient.get('/metrics');
            return {
                success: true,
                data: response.data,
            };
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    /**
     * Handle errors from API calls
     */
    handleError(error) {
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
    getBaseUrl() {
        return this.baseUrl;
    }
    /**
     * Get the current configuration
     */
    getCurrentConfig() {
        return { ...this.config };
    }
}
//# sourceMappingURL=client.js.map