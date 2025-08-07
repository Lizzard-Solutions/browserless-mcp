import { z } from 'zod';
export declare const BrowserlessConfigSchema: z.ZodObject<{
    host: z.ZodDefault<z.ZodString>;
    port: z.ZodDefault<z.ZodNumber>;
    token: z.ZodString;
    protocol: z.ZodDefault<z.ZodEnum<["http", "https", "ws", "wss"]>>;
    timeout: z.ZodDefault<z.ZodNumber>;
    concurrent: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    host: string;
    port: number;
    token: string;
    protocol: "http" | "https" | "ws" | "wss";
    timeout: number;
    concurrent: number;
}, {
    token: string;
    host?: string | undefined;
    port?: number | undefined;
    protocol?: "http" | "https" | "ws" | "wss" | undefined;
    timeout?: number | undefined;
    concurrent?: number | undefined;
}>;
export type BrowserlessConfig = z.infer<typeof BrowserlessConfigSchema>;
export declare const PdfOptionsSchema: z.ZodObject<{
    displayHeaderFooter: z.ZodOptional<z.ZodBoolean>;
    printBackground: z.ZodOptional<z.ZodBoolean>;
    format: z.ZodOptional<z.ZodString>;
    width: z.ZodOptional<z.ZodString>;
    height: z.ZodOptional<z.ZodString>;
    margin: z.ZodOptional<z.ZodObject<{
        top: z.ZodOptional<z.ZodString>;
        bottom: z.ZodOptional<z.ZodString>;
        left: z.ZodOptional<z.ZodString>;
        right: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        top?: string | undefined;
        bottom?: string | undefined;
        left?: string | undefined;
        right?: string | undefined;
    }, {
        top?: string | undefined;
        bottom?: string | undefined;
        left?: string | undefined;
        right?: string | undefined;
    }>>;
    landscape: z.ZodOptional<z.ZodBoolean>;
    pageRanges: z.ZodOptional<z.ZodString>;
    preferCSSPageSize: z.ZodOptional<z.ZodBoolean>;
    scale: z.ZodOptional<z.ZodNumber>;
    headerTemplate: z.ZodOptional<z.ZodString>;
    footerTemplate: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    displayHeaderFooter?: boolean | undefined;
    printBackground?: boolean | undefined;
    format?: string | undefined;
    width?: string | undefined;
    height?: string | undefined;
    margin?: {
        top?: string | undefined;
        bottom?: string | undefined;
        left?: string | undefined;
        right?: string | undefined;
    } | undefined;
    landscape?: boolean | undefined;
    pageRanges?: string | undefined;
    preferCSSPageSize?: boolean | undefined;
    scale?: number | undefined;
    headerTemplate?: string | undefined;
    footerTemplate?: string | undefined;
}, {
    displayHeaderFooter?: boolean | undefined;
    printBackground?: boolean | undefined;
    format?: string | undefined;
    width?: string | undefined;
    height?: string | undefined;
    margin?: {
        top?: string | undefined;
        bottom?: string | undefined;
        left?: string | undefined;
        right?: string | undefined;
    } | undefined;
    landscape?: boolean | undefined;
    pageRanges?: string | undefined;
    preferCSSPageSize?: boolean | undefined;
    scale?: number | undefined;
    headerTemplate?: string | undefined;
    footerTemplate?: string | undefined;
}>;
export type PdfOptions = z.infer<typeof PdfOptionsSchema>;
export declare const ScreenshotOptionsSchema: z.ZodObject<{
    type: z.ZodOptional<z.ZodEnum<["png", "jpeg", "webp"]>>;
    quality: z.ZodOptional<z.ZodNumber>;
    fullPage: z.ZodOptional<z.ZodBoolean>;
    omitBackground: z.ZodOptional<z.ZodBoolean>;
    clip: z.ZodOptional<z.ZodObject<{
        x: z.ZodNumber;
        y: z.ZodNumber;
        width: z.ZodNumber;
        height: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        width: number;
        height: number;
        x: number;
        y: number;
    }, {
        width: number;
        height: number;
        x: number;
        y: number;
    }>>;
    path: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    path?: string | undefined;
    type?: "png" | "jpeg" | "webp" | undefined;
    quality?: number | undefined;
    fullPage?: boolean | undefined;
    omitBackground?: boolean | undefined;
    clip?: {
        width: number;
        height: number;
        x: number;
        y: number;
    } | undefined;
}, {
    path?: string | undefined;
    type?: "png" | "jpeg" | "webp" | undefined;
    quality?: number | undefined;
    fullPage?: boolean | undefined;
    omitBackground?: boolean | undefined;
    clip?: {
        width: number;
        height: number;
        x: number;
        y: number;
    } | undefined;
}>;
export type ScreenshotOptions = z.infer<typeof ScreenshotOptionsSchema>;
export declare const ViewportSchema: z.ZodObject<{
    width: z.ZodNumber;
    height: z.ZodNumber;
    deviceScaleFactor: z.ZodOptional<z.ZodNumber>;
    isMobile: z.ZodOptional<z.ZodBoolean>;
    hasTouch: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    width: number;
    height: number;
    deviceScaleFactor?: number | undefined;
    isMobile?: boolean | undefined;
    hasTouch?: boolean | undefined;
}, {
    width: number;
    height: number;
    deviceScaleFactor?: number | undefined;
    isMobile?: boolean | undefined;
    hasTouch?: boolean | undefined;
}>;
export type Viewport = z.infer<typeof ViewportSchema>;
export declare const CookieSchema: z.ZodObject<{
    name: z.ZodString;
    value: z.ZodString;
    domain: z.ZodOptional<z.ZodString>;
    path: z.ZodOptional<z.ZodString>;
    expires: z.ZodOptional<z.ZodNumber>;
    httpOnly: z.ZodOptional<z.ZodBoolean>;
    secure: z.ZodOptional<z.ZodBoolean>;
    sameSite: z.ZodOptional<z.ZodEnum<["Strict", "Lax", "None"]>>;
}, "strip", z.ZodTypeAny, {
    value: string;
    name: string;
    path?: string | undefined;
    domain?: string | undefined;
    expires?: number | undefined;
    httpOnly?: boolean | undefined;
    secure?: boolean | undefined;
    sameSite?: "Strict" | "Lax" | "None" | undefined;
}, {
    value: string;
    name: string;
    path?: string | undefined;
    domain?: string | undefined;
    expires?: number | undefined;
    httpOnly?: boolean | undefined;
    secure?: boolean | undefined;
    sameSite?: "Strict" | "Lax" | "None" | undefined;
}>;
export type Cookie = z.infer<typeof CookieSchema>;
export declare const ScriptTagSchema: z.ZodObject<{
    url: z.ZodOptional<z.ZodString>;
    content: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    url?: string | undefined;
    content?: string | undefined;
}, {
    url?: string | undefined;
    content?: string | undefined;
}>;
export type ScriptTag = z.infer<typeof ScriptTagSchema>;
export declare const StyleTagSchema: z.ZodObject<{
    url: z.ZodOptional<z.ZodString>;
    content: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    url?: string | undefined;
    content?: string | undefined;
}, {
    url?: string | undefined;
    content?: string | undefined;
}>;
export type StyleTag = z.infer<typeof StyleTagSchema>;
export declare const WaitForSelectorSchema: z.ZodObject<{
    selector: z.ZodString;
    timeout: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    selector: string;
    timeout?: number | undefined;
}, {
    selector: string;
    timeout?: number | undefined;
}>;
export declare const WaitForFunctionSchema: z.ZodObject<{
    fn: z.ZodString;
    timeout: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    fn: string;
    timeout?: number | undefined;
}, {
    fn: string;
    timeout?: number | undefined;
}>;
export declare const WaitForEventSchema: z.ZodObject<{
    event: z.ZodString;
    timeout: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    event: string;
    timeout?: number | undefined;
}, {
    event: string;
    timeout?: number | undefined;
}>;
export declare const PdfRequestSchema: z.ZodObject<{
    url: z.ZodOptional<z.ZodString>;
    html: z.ZodOptional<z.ZodString>;
    options: z.ZodOptional<z.ZodObject<{
        displayHeaderFooter: z.ZodOptional<z.ZodBoolean>;
        printBackground: z.ZodOptional<z.ZodBoolean>;
        format: z.ZodOptional<z.ZodString>;
        width: z.ZodOptional<z.ZodString>;
        height: z.ZodOptional<z.ZodString>;
        margin: z.ZodOptional<z.ZodObject<{
            top: z.ZodOptional<z.ZodString>;
            bottom: z.ZodOptional<z.ZodString>;
            left: z.ZodOptional<z.ZodString>;
            right: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            top?: string | undefined;
            bottom?: string | undefined;
            left?: string | undefined;
            right?: string | undefined;
        }, {
            top?: string | undefined;
            bottom?: string | undefined;
            left?: string | undefined;
            right?: string | undefined;
        }>>;
        landscape: z.ZodOptional<z.ZodBoolean>;
        pageRanges: z.ZodOptional<z.ZodString>;
        preferCSSPageSize: z.ZodOptional<z.ZodBoolean>;
        scale: z.ZodOptional<z.ZodNumber>;
        headerTemplate: z.ZodOptional<z.ZodString>;
        footerTemplate: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        displayHeaderFooter?: boolean | undefined;
        printBackground?: boolean | undefined;
        format?: string | undefined;
        width?: string | undefined;
        height?: string | undefined;
        margin?: {
            top?: string | undefined;
            bottom?: string | undefined;
            left?: string | undefined;
            right?: string | undefined;
        } | undefined;
        landscape?: boolean | undefined;
        pageRanges?: string | undefined;
        preferCSSPageSize?: boolean | undefined;
        scale?: number | undefined;
        headerTemplate?: string | undefined;
        footerTemplate?: string | undefined;
    }, {
        displayHeaderFooter?: boolean | undefined;
        printBackground?: boolean | undefined;
        format?: string | undefined;
        width?: string | undefined;
        height?: string | undefined;
        margin?: {
            top?: string | undefined;
            bottom?: string | undefined;
            left?: string | undefined;
            right?: string | undefined;
        } | undefined;
        landscape?: boolean | undefined;
        pageRanges?: string | undefined;
        preferCSSPageSize?: boolean | undefined;
        scale?: number | undefined;
        headerTemplate?: string | undefined;
        footerTemplate?: string | undefined;
    }>>;
    addScriptTag: z.ZodOptional<z.ZodArray<z.ZodObject<{
        url: z.ZodOptional<z.ZodString>;
        content: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        url?: string | undefined;
        content?: string | undefined;
    }, {
        url?: string | undefined;
        content?: string | undefined;
    }>, "many">>;
    addStyleTag: z.ZodOptional<z.ZodArray<z.ZodObject<{
        url: z.ZodOptional<z.ZodString>;
        content: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        url?: string | undefined;
        content?: string | undefined;
    }, {
        url?: string | undefined;
        content?: string | undefined;
    }>, "many">>;
    cookies: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        value: z.ZodString;
        domain: z.ZodOptional<z.ZodString>;
        path: z.ZodOptional<z.ZodString>;
        expires: z.ZodOptional<z.ZodNumber>;
        httpOnly: z.ZodOptional<z.ZodBoolean>;
        secure: z.ZodOptional<z.ZodBoolean>;
        sameSite: z.ZodOptional<z.ZodEnum<["Strict", "Lax", "None"]>>;
    }, "strip", z.ZodTypeAny, {
        value: string;
        name: string;
        path?: string | undefined;
        domain?: string | undefined;
        expires?: number | undefined;
        httpOnly?: boolean | undefined;
        secure?: boolean | undefined;
        sameSite?: "Strict" | "Lax" | "None" | undefined;
    }, {
        value: string;
        name: string;
        path?: string | undefined;
        domain?: string | undefined;
        expires?: number | undefined;
        httpOnly?: boolean | undefined;
        secure?: boolean | undefined;
        sameSite?: "Strict" | "Lax" | "None" | undefined;
    }>, "many">>;
    headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    viewport: z.ZodOptional<z.ZodObject<{
        width: z.ZodNumber;
        height: z.ZodNumber;
        deviceScaleFactor: z.ZodOptional<z.ZodNumber>;
        isMobile: z.ZodOptional<z.ZodBoolean>;
        hasTouch: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        width: number;
        height: number;
        deviceScaleFactor?: number | undefined;
        isMobile?: boolean | undefined;
        hasTouch?: boolean | undefined;
    }, {
        width: number;
        height: number;
        deviceScaleFactor?: number | undefined;
        isMobile?: boolean | undefined;
        hasTouch?: boolean | undefined;
    }>>;
    waitForEvent: z.ZodOptional<z.ZodObject<{
        event: z.ZodString;
        timeout: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        event: string;
        timeout?: number | undefined;
    }, {
        event: string;
        timeout?: number | undefined;
    }>>;
    waitForFunction: z.ZodOptional<z.ZodObject<{
        fn: z.ZodString;
        timeout: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        fn: string;
        timeout?: number | undefined;
    }, {
        fn: string;
        timeout?: number | undefined;
    }>>;
    waitForSelector: z.ZodOptional<z.ZodObject<{
        selector: z.ZodString;
        timeout: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        selector: string;
        timeout?: number | undefined;
    }, {
        selector: string;
        timeout?: number | undefined;
    }>>;
    waitForTimeout: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    options?: {
        displayHeaderFooter?: boolean | undefined;
        printBackground?: boolean | undefined;
        format?: string | undefined;
        width?: string | undefined;
        height?: string | undefined;
        margin?: {
            top?: string | undefined;
            bottom?: string | undefined;
            left?: string | undefined;
            right?: string | undefined;
        } | undefined;
        landscape?: boolean | undefined;
        pageRanges?: string | undefined;
        preferCSSPageSize?: boolean | undefined;
        scale?: number | undefined;
        headerTemplate?: string | undefined;
        footerTemplate?: string | undefined;
    } | undefined;
    url?: string | undefined;
    html?: string | undefined;
    addScriptTag?: {
        url?: string | undefined;
        content?: string | undefined;
    }[] | undefined;
    addStyleTag?: {
        url?: string | undefined;
        content?: string | undefined;
    }[] | undefined;
    cookies?: {
        value: string;
        name: string;
        path?: string | undefined;
        domain?: string | undefined;
        expires?: number | undefined;
        httpOnly?: boolean | undefined;
        secure?: boolean | undefined;
        sameSite?: "Strict" | "Lax" | "None" | undefined;
    }[] | undefined;
    headers?: Record<string, string> | undefined;
    viewport?: {
        width: number;
        height: number;
        deviceScaleFactor?: number | undefined;
        isMobile?: boolean | undefined;
        hasTouch?: boolean | undefined;
    } | undefined;
    waitForEvent?: {
        event: string;
        timeout?: number | undefined;
    } | undefined;
    waitForFunction?: {
        fn: string;
        timeout?: number | undefined;
    } | undefined;
    waitForSelector?: {
        selector: string;
        timeout?: number | undefined;
    } | undefined;
    waitForTimeout?: number | undefined;
}, {
    options?: {
        displayHeaderFooter?: boolean | undefined;
        printBackground?: boolean | undefined;
        format?: string | undefined;
        width?: string | undefined;
        height?: string | undefined;
        margin?: {
            top?: string | undefined;
            bottom?: string | undefined;
            left?: string | undefined;
            right?: string | undefined;
        } | undefined;
        landscape?: boolean | undefined;
        pageRanges?: string | undefined;
        preferCSSPageSize?: boolean | undefined;
        scale?: number | undefined;
        headerTemplate?: string | undefined;
        footerTemplate?: string | undefined;
    } | undefined;
    url?: string | undefined;
    html?: string | undefined;
    addScriptTag?: {
        url?: string | undefined;
        content?: string | undefined;
    }[] | undefined;
    addStyleTag?: {
        url?: string | undefined;
        content?: string | undefined;
    }[] | undefined;
    cookies?: {
        value: string;
        name: string;
        path?: string | undefined;
        domain?: string | undefined;
        expires?: number | undefined;
        httpOnly?: boolean | undefined;
        secure?: boolean | undefined;
        sameSite?: "Strict" | "Lax" | "None" | undefined;
    }[] | undefined;
    headers?: Record<string, string> | undefined;
    viewport?: {
        width: number;
        height: number;
        deviceScaleFactor?: number | undefined;
        isMobile?: boolean | undefined;
        hasTouch?: boolean | undefined;
    } | undefined;
    waitForEvent?: {
        event: string;
        timeout?: number | undefined;
    } | undefined;
    waitForFunction?: {
        fn: string;
        timeout?: number | undefined;
    } | undefined;
    waitForSelector?: {
        selector: string;
        timeout?: number | undefined;
    } | undefined;
    waitForTimeout?: number | undefined;
}>;
export type PdfRequest = z.infer<typeof PdfRequestSchema>;
export declare const ScreenshotRequestSchema: z.ZodObject<{
    url: z.ZodString;
    options: z.ZodOptional<z.ZodObject<{
        type: z.ZodOptional<z.ZodEnum<["png", "jpeg", "webp"]>>;
        quality: z.ZodOptional<z.ZodNumber>;
        fullPage: z.ZodOptional<z.ZodBoolean>;
        omitBackground: z.ZodOptional<z.ZodBoolean>;
        clip: z.ZodOptional<z.ZodObject<{
            x: z.ZodNumber;
            y: z.ZodNumber;
            width: z.ZodNumber;
            height: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            width: number;
            height: number;
            x: number;
            y: number;
        }, {
            width: number;
            height: number;
            x: number;
            y: number;
        }>>;
        path: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        path?: string | undefined;
        type?: "png" | "jpeg" | "webp" | undefined;
        quality?: number | undefined;
        fullPage?: boolean | undefined;
        omitBackground?: boolean | undefined;
        clip?: {
            width: number;
            height: number;
            x: number;
            y: number;
        } | undefined;
    }, {
        path?: string | undefined;
        type?: "png" | "jpeg" | "webp" | undefined;
        quality?: number | undefined;
        fullPage?: boolean | undefined;
        omitBackground?: boolean | undefined;
        clip?: {
            width: number;
            height: number;
            x: number;
            y: number;
        } | undefined;
    }>>;
    addScriptTag: z.ZodOptional<z.ZodArray<z.ZodObject<{
        url: z.ZodOptional<z.ZodString>;
        content: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        url?: string | undefined;
        content?: string | undefined;
    }, {
        url?: string | undefined;
        content?: string | undefined;
    }>, "many">>;
    addStyleTag: z.ZodOptional<z.ZodArray<z.ZodObject<{
        url: z.ZodOptional<z.ZodString>;
        content: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        url?: string | undefined;
        content?: string | undefined;
    }, {
        url?: string | undefined;
        content?: string | undefined;
    }>, "many">>;
    cookies: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        value: z.ZodString;
        domain: z.ZodOptional<z.ZodString>;
        path: z.ZodOptional<z.ZodString>;
        expires: z.ZodOptional<z.ZodNumber>;
        httpOnly: z.ZodOptional<z.ZodBoolean>;
        secure: z.ZodOptional<z.ZodBoolean>;
        sameSite: z.ZodOptional<z.ZodEnum<["Strict", "Lax", "None"]>>;
    }, "strip", z.ZodTypeAny, {
        value: string;
        name: string;
        path?: string | undefined;
        domain?: string | undefined;
        expires?: number | undefined;
        httpOnly?: boolean | undefined;
        secure?: boolean | undefined;
        sameSite?: "Strict" | "Lax" | "None" | undefined;
    }, {
        value: string;
        name: string;
        path?: string | undefined;
        domain?: string | undefined;
        expires?: number | undefined;
        httpOnly?: boolean | undefined;
        secure?: boolean | undefined;
        sameSite?: "Strict" | "Lax" | "None" | undefined;
    }>, "many">>;
    headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    viewport: z.ZodOptional<z.ZodObject<{
        width: z.ZodNumber;
        height: z.ZodNumber;
        deviceScaleFactor: z.ZodOptional<z.ZodNumber>;
        isMobile: z.ZodOptional<z.ZodBoolean>;
        hasTouch: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        width: number;
        height: number;
        deviceScaleFactor?: number | undefined;
        isMobile?: boolean | undefined;
        hasTouch?: boolean | undefined;
    }, {
        width: number;
        height: number;
        deviceScaleFactor?: number | undefined;
        isMobile?: boolean | undefined;
        hasTouch?: boolean | undefined;
    }>>;
    gotoOptions: z.ZodOptional<z.ZodObject<{
        waitUntil: z.ZodOptional<z.ZodString>;
        timeout: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        timeout?: number | undefined;
        waitUntil?: string | undefined;
    }, {
        timeout?: number | undefined;
        waitUntil?: string | undefined;
    }>>;
    waitForSelector: z.ZodOptional<z.ZodObject<{
        selector: z.ZodString;
        timeout: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        selector: string;
        timeout?: number | undefined;
    }, {
        selector: string;
        timeout?: number | undefined;
    }>>;
    waitForFunction: z.ZodOptional<z.ZodObject<{
        fn: z.ZodString;
        timeout: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        fn: string;
        timeout?: number | undefined;
    }, {
        fn: string;
        timeout?: number | undefined;
    }>>;
    waitForTimeout: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    url: string;
    options?: {
        path?: string | undefined;
        type?: "png" | "jpeg" | "webp" | undefined;
        quality?: number | undefined;
        fullPage?: boolean | undefined;
        omitBackground?: boolean | undefined;
        clip?: {
            width: number;
            height: number;
            x: number;
            y: number;
        } | undefined;
    } | undefined;
    addScriptTag?: {
        url?: string | undefined;
        content?: string | undefined;
    }[] | undefined;
    addStyleTag?: {
        url?: string | undefined;
        content?: string | undefined;
    }[] | undefined;
    cookies?: {
        value: string;
        name: string;
        path?: string | undefined;
        domain?: string | undefined;
        expires?: number | undefined;
        httpOnly?: boolean | undefined;
        secure?: boolean | undefined;
        sameSite?: "Strict" | "Lax" | "None" | undefined;
    }[] | undefined;
    headers?: Record<string, string> | undefined;
    viewport?: {
        width: number;
        height: number;
        deviceScaleFactor?: number | undefined;
        isMobile?: boolean | undefined;
        hasTouch?: boolean | undefined;
    } | undefined;
    waitForFunction?: {
        fn: string;
        timeout?: number | undefined;
    } | undefined;
    waitForSelector?: {
        selector: string;
        timeout?: number | undefined;
    } | undefined;
    waitForTimeout?: number | undefined;
    gotoOptions?: {
        timeout?: number | undefined;
        waitUntil?: string | undefined;
    } | undefined;
}, {
    url: string;
    options?: {
        path?: string | undefined;
        type?: "png" | "jpeg" | "webp" | undefined;
        quality?: number | undefined;
        fullPage?: boolean | undefined;
        omitBackground?: boolean | undefined;
        clip?: {
            width: number;
            height: number;
            x: number;
            y: number;
        } | undefined;
    } | undefined;
    addScriptTag?: {
        url?: string | undefined;
        content?: string | undefined;
    }[] | undefined;
    addStyleTag?: {
        url?: string | undefined;
        content?: string | undefined;
    }[] | undefined;
    cookies?: {
        value: string;
        name: string;
        path?: string | undefined;
        domain?: string | undefined;
        expires?: number | undefined;
        httpOnly?: boolean | undefined;
        secure?: boolean | undefined;
        sameSite?: "Strict" | "Lax" | "None" | undefined;
    }[] | undefined;
    headers?: Record<string, string> | undefined;
    viewport?: {
        width: number;
        height: number;
        deviceScaleFactor?: number | undefined;
        isMobile?: boolean | undefined;
        hasTouch?: boolean | undefined;
    } | undefined;
    waitForFunction?: {
        fn: string;
        timeout?: number | undefined;
    } | undefined;
    waitForSelector?: {
        selector: string;
        timeout?: number | undefined;
    } | undefined;
    waitForTimeout?: number | undefined;
    gotoOptions?: {
        timeout?: number | undefined;
        waitUntil?: string | undefined;
    } | undefined;
}>;
export type ScreenshotRequest = z.infer<typeof ScreenshotRequestSchema>;
export declare const ContentRequestSchema: z.ZodObject<{
    url: z.ZodString;
    gotoOptions: z.ZodOptional<z.ZodObject<{
        waitUntil: z.ZodOptional<z.ZodString>;
        timeout: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        timeout?: number | undefined;
        waitUntil?: string | undefined;
    }, {
        timeout?: number | undefined;
        waitUntil?: string | undefined;
    }>>;
    waitForSelector: z.ZodOptional<z.ZodObject<{
        selector: z.ZodString;
        timeout: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        selector: string;
        timeout?: number | undefined;
    }, {
        selector: string;
        timeout?: number | undefined;
    }>>;
    waitForFunction: z.ZodOptional<z.ZodObject<{
        fn: z.ZodString;
        timeout: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        fn: string;
        timeout?: number | undefined;
    }, {
        fn: string;
        timeout?: number | undefined;
    }>>;
    waitForTimeout: z.ZodOptional<z.ZodNumber>;
    addScriptTag: z.ZodOptional<z.ZodArray<z.ZodObject<{
        url: z.ZodOptional<z.ZodString>;
        content: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        url?: string | undefined;
        content?: string | undefined;
    }, {
        url?: string | undefined;
        content?: string | undefined;
    }>, "many">>;
    headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    cookies: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        value: z.ZodString;
        domain: z.ZodOptional<z.ZodString>;
        path: z.ZodOptional<z.ZodString>;
        expires: z.ZodOptional<z.ZodNumber>;
        httpOnly: z.ZodOptional<z.ZodBoolean>;
        secure: z.ZodOptional<z.ZodBoolean>;
        sameSite: z.ZodOptional<z.ZodEnum<["Strict", "Lax", "None"]>>;
    }, "strip", z.ZodTypeAny, {
        value: string;
        name: string;
        path?: string | undefined;
        domain?: string | undefined;
        expires?: number | undefined;
        httpOnly?: boolean | undefined;
        secure?: boolean | undefined;
        sameSite?: "Strict" | "Lax" | "None" | undefined;
    }, {
        value: string;
        name: string;
        path?: string | undefined;
        domain?: string | undefined;
        expires?: number | undefined;
        httpOnly?: boolean | undefined;
        secure?: boolean | undefined;
        sameSite?: "Strict" | "Lax" | "None" | undefined;
    }>, "many">>;
    viewport: z.ZodOptional<z.ZodObject<{
        width: z.ZodNumber;
        height: z.ZodNumber;
        deviceScaleFactor: z.ZodOptional<z.ZodNumber>;
        isMobile: z.ZodOptional<z.ZodBoolean>;
        hasTouch: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        width: number;
        height: number;
        deviceScaleFactor?: number | undefined;
        isMobile?: boolean | undefined;
        hasTouch?: boolean | undefined;
    }, {
        width: number;
        height: number;
        deviceScaleFactor?: number | undefined;
        isMobile?: boolean | undefined;
        hasTouch?: boolean | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    url: string;
    addScriptTag?: {
        url?: string | undefined;
        content?: string | undefined;
    }[] | undefined;
    cookies?: {
        value: string;
        name: string;
        path?: string | undefined;
        domain?: string | undefined;
        expires?: number | undefined;
        httpOnly?: boolean | undefined;
        secure?: boolean | undefined;
        sameSite?: "Strict" | "Lax" | "None" | undefined;
    }[] | undefined;
    headers?: Record<string, string> | undefined;
    viewport?: {
        width: number;
        height: number;
        deviceScaleFactor?: number | undefined;
        isMobile?: boolean | undefined;
        hasTouch?: boolean | undefined;
    } | undefined;
    waitForFunction?: {
        fn: string;
        timeout?: number | undefined;
    } | undefined;
    waitForSelector?: {
        selector: string;
        timeout?: number | undefined;
    } | undefined;
    waitForTimeout?: number | undefined;
    gotoOptions?: {
        timeout?: number | undefined;
        waitUntil?: string | undefined;
    } | undefined;
}, {
    url: string;
    addScriptTag?: {
        url?: string | undefined;
        content?: string | undefined;
    }[] | undefined;
    cookies?: {
        value: string;
        name: string;
        path?: string | undefined;
        domain?: string | undefined;
        expires?: number | undefined;
        httpOnly?: boolean | undefined;
        secure?: boolean | undefined;
        sameSite?: "Strict" | "Lax" | "None" | undefined;
    }[] | undefined;
    headers?: Record<string, string> | undefined;
    viewport?: {
        width: number;
        height: number;
        deviceScaleFactor?: number | undefined;
        isMobile?: boolean | undefined;
        hasTouch?: boolean | undefined;
    } | undefined;
    waitForFunction?: {
        fn: string;
        timeout?: number | undefined;
    } | undefined;
    waitForSelector?: {
        selector: string;
        timeout?: number | undefined;
    } | undefined;
    waitForTimeout?: number | undefined;
    gotoOptions?: {
        timeout?: number | undefined;
        waitUntil?: string | undefined;
    } | undefined;
}>;
export type ContentRequest = z.infer<typeof ContentRequestSchema>;
export declare const FunctionRequestSchema: z.ZodObject<{
    code: z.ZodString;
    context: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, "strip", z.ZodTypeAny, {
    code: string;
    context?: Record<string, any> | undefined;
}, {
    code: string;
    context?: Record<string, any> | undefined;
}>;
export type FunctionRequest = z.infer<typeof FunctionRequestSchema>;
export declare const DownloadRequestSchema: z.ZodObject<{
    code: z.ZodString;
    context: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, "strip", z.ZodTypeAny, {
    code: string;
    context?: Record<string, any> | undefined;
}, {
    code: string;
    context?: Record<string, any> | undefined;
}>;
export type DownloadRequest = z.infer<typeof DownloadRequestSchema>;
export declare const ExportRequestSchema: z.ZodObject<{
    url: z.ZodString;
    headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    gotoOptions: z.ZodOptional<z.ZodObject<{
        waitUntil: z.ZodOptional<z.ZodString>;
        timeout: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        timeout?: number | undefined;
        waitUntil?: string | undefined;
    }, {
        timeout?: number | undefined;
        waitUntil?: string | undefined;
    }>>;
    waitForSelector: z.ZodOptional<z.ZodObject<{
        selector: z.ZodString;
        timeout: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        selector: string;
        timeout?: number | undefined;
    }, {
        selector: string;
        timeout?: number | undefined;
    }>>;
    waitForTimeout: z.ZodOptional<z.ZodNumber>;
    bestAttempt: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    url: string;
    headers?: Record<string, string> | undefined;
    waitForSelector?: {
        selector: string;
        timeout?: number | undefined;
    } | undefined;
    waitForTimeout?: number | undefined;
    gotoOptions?: {
        timeout?: number | undefined;
        waitUntil?: string | undefined;
    } | undefined;
    bestAttempt?: boolean | undefined;
}, {
    url: string;
    headers?: Record<string, string> | undefined;
    waitForSelector?: {
        selector: string;
        timeout?: number | undefined;
    } | undefined;
    waitForTimeout?: number | undefined;
    gotoOptions?: {
        timeout?: number | undefined;
        waitUntil?: string | undefined;
    } | undefined;
    bestAttempt?: boolean | undefined;
}>;
export type ExportRequest = z.infer<typeof ExportRequestSchema>;
export declare const PerformanceRequestSchema: z.ZodObject<{
    url: z.ZodString;
    config: z.ZodOptional<z.ZodObject<{
        extends: z.ZodOptional<z.ZodString>;
        settings: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    }, "strip", z.ZodTypeAny, {
        extends?: string | undefined;
        settings?: Record<string, any> | undefined;
    }, {
        extends?: string | undefined;
        settings?: Record<string, any> | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    url: string;
    config?: {
        extends?: string | undefined;
        settings?: Record<string, any> | undefined;
    } | undefined;
}, {
    url: string;
    config?: {
        extends?: string | undefined;
        settings?: Record<string, any> | undefined;
    } | undefined;
}>;
export type PerformanceRequest = z.infer<typeof PerformanceRequestSchema>;
export declare const UnblockRequestSchema: z.ZodObject<{
    url: z.ZodString;
    browserWSEndpoint: z.ZodOptional<z.ZodBoolean>;
    cookies: z.ZodOptional<z.ZodBoolean>;
    content: z.ZodOptional<z.ZodBoolean>;
    screenshot: z.ZodOptional<z.ZodBoolean>;
    ttl: z.ZodOptional<z.ZodNumber>;
    stealth: z.ZodOptional<z.ZodBoolean>;
    blockAds: z.ZodOptional<z.ZodBoolean>;
    headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    url: string;
    content?: boolean | undefined;
    cookies?: boolean | undefined;
    headers?: Record<string, string> | undefined;
    browserWSEndpoint?: boolean | undefined;
    screenshot?: boolean | undefined;
    ttl?: number | undefined;
    stealth?: boolean | undefined;
    blockAds?: boolean | undefined;
}, {
    url: string;
    content?: boolean | undefined;
    cookies?: boolean | undefined;
    headers?: Record<string, string> | undefined;
    browserWSEndpoint?: boolean | undefined;
    screenshot?: boolean | undefined;
    ttl?: number | undefined;
    stealth?: boolean | undefined;
    blockAds?: boolean | undefined;
}>;
export type UnblockRequest = z.infer<typeof UnblockRequestSchema>;
export declare const BrowserQLRequestSchema: z.ZodObject<{
    query: z.ZodString;
    variables: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, "strip", z.ZodTypeAny, {
    query: string;
    variables?: Record<string, any> | undefined;
}, {
    query: string;
    variables?: Record<string, any> | undefined;
}>;
export type BrowserQLRequest = z.infer<typeof BrowserQLRequestSchema>;
export declare const WebSocketOptionsSchema: z.ZodObject<{
    browser: z.ZodDefault<z.ZodEnum<["chromium", "firefox", "webkit"]>>;
    library: z.ZodDefault<z.ZodEnum<["puppeteer", "playwright"]>>;
    stealth: z.ZodOptional<z.ZodBoolean>;
    blockAds: z.ZodOptional<z.ZodBoolean>;
    viewport: z.ZodOptional<z.ZodObject<{
        width: z.ZodNumber;
        height: z.ZodNumber;
        deviceScaleFactor: z.ZodOptional<z.ZodNumber>;
        isMobile: z.ZodOptional<z.ZodBoolean>;
        hasTouch: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        width: number;
        height: number;
        deviceScaleFactor?: number | undefined;
        isMobile?: boolean | undefined;
        hasTouch?: boolean | undefined;
    }, {
        width: number;
        height: number;
        deviceScaleFactor?: number | undefined;
        isMobile?: boolean | undefined;
        hasTouch?: boolean | undefined;
    }>>;
    userAgent: z.ZodOptional<z.ZodString>;
    extraHTTPHeaders: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    browser: "chromium" | "firefox" | "webkit";
    library: "puppeteer" | "playwright";
    viewport?: {
        width: number;
        height: number;
        deviceScaleFactor?: number | undefined;
        isMobile?: boolean | undefined;
        hasTouch?: boolean | undefined;
    } | undefined;
    stealth?: boolean | undefined;
    blockAds?: boolean | undefined;
    userAgent?: string | undefined;
    extraHTTPHeaders?: Record<string, string> | undefined;
}, {
    viewport?: {
        width: number;
        height: number;
        deviceScaleFactor?: number | undefined;
        isMobile?: boolean | undefined;
        hasTouch?: boolean | undefined;
    } | undefined;
    stealth?: boolean | undefined;
    blockAds?: boolean | undefined;
    browser?: "chromium" | "firefox" | "webkit" | undefined;
    library?: "puppeteer" | "playwright" | undefined;
    userAgent?: string | undefined;
    extraHTTPHeaders?: Record<string, string> | undefined;
}>;
export type WebSocketOptions = z.infer<typeof WebSocketOptionsSchema>;
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
export interface Session {
    id: string;
    browserWSEndpoint: string;
    createdAt: Date;
    lastActivity: Date;
    status: 'active' | 'idle' | 'closed';
}
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
//# sourceMappingURL=types.d.ts.map