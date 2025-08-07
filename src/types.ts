import { z } from 'zod';

// Browserless configuration
export const BrowserlessConfigSchema = z.object({
  host: z.string().default('localhost'),
  port: z.number().default(3000),
  token: z.string(),
  protocol: z.enum(['http', 'https', 'ws', 'wss']).default('http'),
  timeout: z.number().default(30000),
  concurrent: z.number().default(5),
});

export type BrowserlessConfig = z.infer<typeof BrowserlessConfigSchema>;

// PDF generation options
export const PdfOptionsSchema = z.object({
  displayHeaderFooter: z.boolean().optional(),
  printBackground: z.boolean().optional(),
  format: z.string().optional(),
  width: z.string().optional(),
  height: z.string().optional(),
  margin: z.object({
    top: z.string().optional(),
    bottom: z.string().optional(),
    left: z.string().optional(),
    right: z.string().optional(),
  }).optional(),
  landscape: z.boolean().optional(),
  pageRanges: z.string().optional(),
  preferCSSPageSize: z.boolean().optional(),
  scale: z.number().optional(),
  headerTemplate: z.string().optional(),
  footerTemplate: z.string().optional(),
});

export type PdfOptions = z.infer<typeof PdfOptionsSchema>;

// Screenshot options
export const ScreenshotOptionsSchema = z.object({
  type: z.enum(['png', 'jpeg', 'webp']).optional(),
  quality: z.number().optional(),
  fullPage: z.boolean().optional(),
  omitBackground: z.boolean().optional(),
  clip: z.object({
    x: z.number(),
    y: z.number(),
    width: z.number(),
    height: z.number(),
  }).optional(),
  path: z.string().optional(),
});

export type ScreenshotOptions = z.infer<typeof ScreenshotOptionsSchema>;

// Viewport options
export const ViewportSchema = z.object({
  width: z.number(),
  height: z.number(),
  deviceScaleFactor: z.number().optional(),
  isMobile: z.boolean().optional(),
  hasTouch: z.boolean().optional(),
});

export type Viewport = z.infer<typeof ViewportSchema>;

// Cookie schema
export const CookieSchema = z.object({
  name: z.string(),
  value: z.string(),
  domain: z.string().optional(),
  path: z.string().optional(),
  expires: z.number().optional(),
  httpOnly: z.boolean().optional(),
  secure: z.boolean().optional(),
  sameSite: z.enum(['Strict', 'Lax', 'None']).optional(),
});

export type Cookie = z.infer<typeof CookieSchema>;

// Script tag schema
export const ScriptTagSchema = z.object({
  url: z.string().optional(),
  content: z.string().optional(),
});

export type ScriptTag = z.infer<typeof ScriptTagSchema>;

// Style tag schema
export const StyleTagSchema = z.object({
  url: z.string().optional(),
  content: z.string().optional(),
});

export type StyleTag = z.infer<typeof StyleTagSchema>;

// Wait options
export const WaitForSelectorSchema = z.object({
  selector: z.string(),
  timeout: z.number().optional(),
});

export const WaitForFunctionSchema = z.object({
  fn: z.string(),
  timeout: z.number().optional(),
});

export const WaitForEventSchema = z.object({
  event: z.string(),
  timeout: z.number().optional(),
});

// PDF request schema
export const PdfRequestSchema = z.object({
  url: z.string().optional(),
  html: z.string().optional(),
  options: PdfOptionsSchema.optional(),
  addScriptTag: z.array(ScriptTagSchema).optional(),
  addStyleTag: z.array(StyleTagSchema).optional(),
  cookies: z.array(CookieSchema).optional(),
  headers: z.record(z.string()).optional(),
  viewport: ViewportSchema.optional(),
  waitForEvent: WaitForEventSchema.optional(),
  waitForFunction: WaitForFunctionSchema.optional(),
  waitForSelector: WaitForSelectorSchema.optional(),
  waitForTimeout: z.number().optional(),
});

export type PdfRequest = z.infer<typeof PdfRequestSchema>;

// Screenshot request schema
export const ScreenshotRequestSchema = z.object({
  url: z.string(),
  options: ScreenshotOptionsSchema.optional(),
  addScriptTag: z.array(ScriptTagSchema).optional(),
  addStyleTag: z.array(StyleTagSchema).optional(),
  cookies: z.array(CookieSchema).optional(),
  headers: z.record(z.string()).optional(),
  viewport: ViewportSchema.optional(),
  gotoOptions: z.object({
    waitUntil: z.string().optional(),
    timeout: z.number().optional(),
  }).optional(),
  waitForSelector: WaitForSelectorSchema.optional(),
  waitForFunction: WaitForFunctionSchema.optional(),
  waitForTimeout: z.number().optional(),
});

export type ScreenshotRequest = z.infer<typeof ScreenshotRequestSchema>;

// Content request schema
export const ContentRequestSchema = z.object({
  url: z.string(),
  gotoOptions: z.object({
    waitUntil: z.string().optional(),
    timeout: z.number().optional(),
  }).optional(),
  waitForSelector: WaitForSelectorSchema.optional(),
  waitForFunction: WaitForFunctionSchema.optional(),
  waitForTimeout: z.number().optional(),
  addScriptTag: z.array(ScriptTagSchema).optional(),
  headers: z.record(z.string()).optional(),
  cookies: z.array(CookieSchema).optional(),
  viewport: ViewportSchema.optional(),
});

export type ContentRequest = z.infer<typeof ContentRequestSchema>;

// Function request schema
export const FunctionRequestSchema = z.object({
  code: z.string(),
  context: z.record(z.any()).optional(),
});

export type FunctionRequest = z.infer<typeof FunctionRequestSchema>;

// Download request schema
export const DownloadRequestSchema = z.object({
  code: z.string(),
  context: z.record(z.any()).optional(),
});

export type DownloadRequest = z.infer<typeof DownloadRequestSchema>;

// Export request schema
export const ExportRequestSchema = z.object({
  url: z.string(),
  headers: z.record(z.string()).optional(),
  gotoOptions: z.object({
    waitUntil: z.string().optional(),
    timeout: z.number().optional(),
  }).optional(),
  waitForSelector: WaitForSelectorSchema.optional(),
  waitForTimeout: z.number().optional(),
  bestAttempt: z.boolean().optional(),
});

export type ExportRequest = z.infer<typeof ExportRequestSchema>;

// Performance request schema
export const PerformanceRequestSchema = z.object({
  url: z.string(),
  config: z.object({
    extends: z.string().optional(),
    settings: z.record(z.any()).optional(),
  }).optional(),
});

export type PerformanceRequest = z.infer<typeof PerformanceRequestSchema>;

// Unblock request schema
export const UnblockRequestSchema = z.object({
  url: z.string(),
  browserWSEndpoint: z.boolean().optional(),
  cookies: z.boolean().optional(),
  content: z.boolean().optional(),
  screenshot: z.boolean().optional(),
  ttl: z.number().optional(),
  stealth: z.boolean().optional(),
  blockAds: z.boolean().optional(),
  headers: z.record(z.string()).optional(),
});

export type UnblockRequest = z.infer<typeof UnblockRequestSchema>;

// BrowserQL query schema
export const BrowserQLRequestSchema = z.object({
  query: z.string(),
  variables: z.record(z.any()).optional(),
});

export type BrowserQLRequest = z.infer<typeof BrowserQLRequestSchema>;

// WebSocket connection options
export const WebSocketOptionsSchema = z.object({
  browser: z.enum(['chromium', 'firefox', 'webkit']).default('chromium'),
  library: z.enum(['puppeteer', 'playwright']).default('puppeteer'),
  stealth: z.boolean().optional(),
  blockAds: z.boolean().optional(),
  viewport: ViewportSchema.optional(),
  userAgent: z.string().optional(),
  extraHTTPHeaders: z.record(z.string()).optional(),
});

export type WebSocketOptions = z.infer<typeof WebSocketOptionsSchema>;

// Response types
export interface BrowserlessResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  statusCode?: number;
}

export interface PdfResponse {
  pdf: Buffer;
  filename: string;
}

export interface ScreenshotResponse {
  image: Buffer;
  filename: string;
  format: string;
}

export interface ContentResponse {
  html: string;
  url: string;
  title: string;
}

export interface FunctionResponse {
  result: any;
  type: string;
}

export interface DownloadResponse {
  files: Array<{
    name: string;
    data: Buffer;
    type: string;
  }>;
}

export interface ExportResponse {
  html: string;
  resources: Array<{
    url: string;
    data: Buffer;
    type: string;
  }>;
}

export interface PerformanceResponse {
  lighthouse: any;
  metrics: any;
}

export interface UnblockResponse {
  content?: string;
  screenshot?: Buffer;
  cookies?: Cookie[];
  browserWSEndpoint?: string;
}

export interface BrowserQLResponse {
  data: any;
  errors?: any[];
}

export interface WebSocketResponse {
  browserWSEndpoint: string;
  sessionId: string;
}

// Session management
export interface Session {
  id: string;
  browserWSEndpoint: string;
  createdAt: Date;
  lastActivity: Date;
  status: 'active' | 'idle' | 'closed';
}

// Health check response
export interface HealthResponse {
  status: 'healthy' | 'unhealthy';
  uptime: number;
  memory: {
    used: number;
    total: number;
    percentage: number;
  };
  cpu: {
    usage: number;
    percentage: number;
  };
  sessions: {
    active: number;
    total: number;
  };
} 