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
// Viewport options
export const ViewportSchema = z.object({
    width: z.number(),
    height: z.number(),
    deviceScaleFactor: z.number().optional(),
    isMobile: z.boolean().optional(),
    hasTouch: z.boolean().optional(),
});
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
// Script tag schema
export const ScriptTagSchema = z.object({
    url: z.string().optional(),
    content: z.string().optional(),
});
// Style tag schema
export const StyleTagSchema = z.object({
    url: z.string().optional(),
    content: z.string().optional(),
});
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
// Function request schema
export const FunctionRequestSchema = z.object({
    code: z.string(),
    context: z.record(z.any()).optional(),
});
// Download request schema
export const DownloadRequestSchema = z.object({
    code: z.string(),
    context: z.record(z.any()).optional(),
});
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
// Performance request schema
export const PerformanceRequestSchema = z.object({
    url: z.string(),
    config: z.object({
        extends: z.string().optional(),
        settings: z.record(z.any()).optional(),
    }).optional(),
});
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
// BrowserQL query schema
export const BrowserQLRequestSchema = z.object({
    query: z.string(),
    variables: z.record(z.any()).optional(),
});
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
//# sourceMappingURL=types.js.map