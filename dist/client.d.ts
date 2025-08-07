import { BrowserlessConfig, BrowserlessResponse, PdfRequest, PdfResponse, ScreenshotRequest, ScreenshotResponse, ContentRequest, ContentResponse, FunctionRequest, FunctionResponse, DownloadRequest, DownloadResponse, ExportRequest, ExportResponse, PerformanceRequest, PerformanceResponse, UnblockRequest, UnblockResponse, BrowserQLRequest, BrowserQLResponse, WebSocketOptions, WebSocketResponse, HealthResponse, Session } from './types.js';
export declare class BrowserlessClient {
    private config;
    private httpClient;
    private baseUrl;
    constructor(config: BrowserlessConfig);
    /**
     * Generate PDF from URL or HTML content
     */
    generatePdf(request: PdfRequest): Promise<BrowserlessResponse<PdfResponse>>;
    /**
     * Take screenshot of a webpage
     */
    takeScreenshot(request: ScreenshotRequest): Promise<BrowserlessResponse<ScreenshotResponse>>;
    /**
     * Extract rendered HTML content from a webpage
     */
    getContent(request: ContentRequest): Promise<BrowserlessResponse<ContentResponse>>;
    /**
     * Execute custom JavaScript function in browser context
     */
    executeFunction(request: FunctionRequest): Promise<BrowserlessResponse<FunctionResponse>>;
    /**
     * Handle file downloads
     */
    downloadFiles(request: DownloadRequest): Promise<BrowserlessResponse<DownloadResponse>>;
    /**
     * Export webpage with resources
     */
    exportPage(request: ExportRequest): Promise<BrowserlessResponse<ExportResponse>>;
    /**
     * Run Lighthouse performance audit
     */
    runPerformanceAudit(request: PerformanceRequest): Promise<BrowserlessResponse<PerformanceResponse>>;
    /**
     * Bypass bot detection and anti-scraping measures
     */
    unblock(request: UnblockRequest): Promise<BrowserlessResponse<UnblockResponse>>;
    /**
     * Execute BrowserQL GraphQL queries
     */
    executeBrowserQL(request: BrowserQLRequest): Promise<BrowserlessResponse<BrowserQLResponse>>;
    /**
     * Create WebSocket connection for Puppeteer/Playwright
     */
    createWebSocketConnection(options?: WebSocketOptions): Promise<BrowserlessResponse<WebSocketResponse>>;
    /**
     * Get health status of Browserless instance
     */
    getHealth(): Promise<BrowserlessResponse<HealthResponse>>;
    /**
     * Get active sessions
     */
    getSessions(): Promise<BrowserlessResponse<Session[]>>;
    /**
     * Get configuration
     */
    getConfig(): Promise<BrowserlessResponse<any>>;
    /**
     * Get metrics
     */
    getMetrics(): Promise<BrowserlessResponse<any>>;
    /**
     * Handle errors from API calls
     */
    private handleError;
    /**
     * Get the base URL for this client
     */
    getBaseUrl(): string;
    /**
     * Get the current configuration
     */
    getCurrentConfig(): BrowserlessConfig;
}
//# sourceMappingURL=client.d.ts.map