# Browserless.io Self-Hosted API Complete Reference

## Overview

Browserless allows remote clients to connect and execute headless work, all inside of docker. It supports the standard, unforked Puppeteer and Playwright libraries, as well offering REST-based APIs for common actions like data collection, PDF generation and more. This comprehensive reference covers all APIs, configuration options, and capabilities available for self-hosted Browserless instances.

## Quick Start

### Docker Setup

```bash
# Basic setup
docker run -p 3000:3000 ghcr.io/browserless/chromium

# With configuration
docker run \
  --rm \
  -p 3000:3000 \
  -e "CONCURRENT=10" \
  -e "TOKEN=6R0W53R135510" \
  ghcr.io/browserless/chromium
```

Browserless is designed to always require a token. If you don't pass a TOKEN env variable, a randomly generated token will be set.

### Documentation Access

Once running, visit `http://localhost:3000/docs` to access the built-in OpenAPI documentation.

## WebSocket Connections (Puppeteer & Playwright)

### Connection URLs

#### Puppeteer (Chrome/Chromium)
```javascript
import puppeteer from 'puppeteer';

const browser = await puppeteer.connect({
  browserWSEndpoint: 'ws://localhost:3000?token=YOUR_TOKEN'
});
```

#### Playwright Connections
```javascript
// Chromium via CDP
import { chromium } from 'playwright';
const browser = await chromium.connectOverCDP('ws://localhost:3000?token=YOUR_TOKEN');

// Chromium via Playwright server
const browser = await chromium.connect('ws://localhost:3000/chromium/playwright?token=YOUR_TOKEN');

// Firefox
const browser = await firefox.connect('ws://localhost:3000/firefox/playwright?token=YOUR_TOKEN');

// WebKit
const browser = await webkit.connect('ws://localhost:3000/webkit/playwright?token=YOUR_TOKEN');
```

### Full Browser Automation Capabilities

Both Puppeteer and Playwright provide complete browser automation including:

- **Click any element**: buttons, links, form fields, hidden elements
- **Type text**: input fields, textareas, contenteditable elements
- **Navigate**: follow links, handle redirects, form submissions
- **Wait for elements**: smart waiting for dynamic content to load
- **Handle forms**: complex multi-step forms, file uploads
- **Screenshots**: full page or element-specific captures
- **PDF generation**: with custom styling and options
- **Network interception**: mock requests, modify responses
- **Cookie management**: login sessions, persistent state
- **Geolocation**: simulate different locations
- **Device emulation**: mobile, tablet, desktop viewports
- **Performance monitoring**: timing, resource usage
- **File downloads**: handle and retrieve downloaded files

#### Advanced Interaction Examples

```javascript
// Complex form interaction
await page.goto('https://example.com/form');
await page.type('#username', 'user@example.com');
await page.type('#password', 'password123');
await page.click('#login-button');
await page.waitForNavigation();

// Drag and drop
await page.dragAndDrop('#source', '#target');

// Keyboard shortcuts
await page.keyboard.press('Control+A');
await page.keyboard.type('New text');

// Handle dialogs
page.on('dialog', async dialog => {
  await dialog.accept('Yes');
});

// File upload
await page.setInputFiles('#file-input', 'path/to/file.pdf');

// Hover interactions
await page.hover('#menu-item');
await page.click('#submenu-option');

// Handle iframes
const frame = page.frame('frame-name');
await frame.click('#button-in-iframe');

// Shadow DOM interactions
const shadowElement = await page.evaluateHandle(
  () => document.querySelector('#host').shadowRoot.querySelector('#shadow-button')
);
await shadowElement.click();
```

## REST APIs

### Core REST Endpoints

Browserless RESTful APIs are a set of ready-made HTTP endpoints for common browser tasks. These endpoints let you perform automation via simple HTTP(S) requests without writing a full script.

#### Available Endpoints

- `/pdf` - Generate PDF documents
- `/screenshot` - Capture page screenshots  
- `/content` - Extract rendered HTML content
- `/function` - Execute custom JavaScript code
- `/download` - Handle file downloads
- `/export` - Export page resources
- `/performance` - Run Lighthouse performance audits
- `/unblock` - Bypass bot detection
- `/scrape` - Extract structured data (deprecated, use /content)

### 1. PDF Generation API (`/pdf`)

Generate PDF documents from URLs or HTML content with extensive customization options.

#### Basic Usage

```bash
curl -X POST \
  http://localhost:3000/pdf?token=YOUR_TOKEN \
  -H 'Content-Type: application/json' \
  -d '{
    "url": "https://example.com/",
    "options": {
      "displayHeaderFooter": true,
      "printBackground": false,
      "format": "A4"
    }
  }' \
  --output document.pdf
```

#### HTML Content

```bash
curl -X POST \
  http://localhost:3000/pdf?token=YOUR_TOKEN \
  -H 'Content-Type: application/json' \
  -d '{
    "html": "<h1>Hello World!</h1><p>Generated PDF content</p>",
    "options": {
      "format": "A4",
      "margin": {
        "top": "20mm",
        "bottom": "10mm",
        "left": "10mm", 
        "right": "10mm"
      }
    }
  }' \
  --output custom.pdf
```

#### Advanced PDF Options

```json
{
  "url": "https://example.com/",
  "options": {
    "displayHeaderFooter": true,
    "printBackground": true,
    "format": "A4",
    "width": "8.5in",
    "height": "11in",
    "margin": {
      "top": "20mm",
      "bottom": "10mm",
      "left": "10mm",
      "right": "10mm"
    },
    "landscape": false,
    "pageRanges": "1-3",
    "preferCSSPageSize": true,
    "scale": 1.0,
    "headerTemplate": "<div style='font-size:12px;'>Header Content</div>",
    "footerTemplate": "<div style='font-size:12px;'>Page <span class='pageNumber'></span></div>"
  },
  "addScriptTag": [
    {
      "url": "https://code.jquery.com/jquery-3.7.1.min.js"
    },
    {
      "content": "document.querySelector('h1').innerText = 'Modified Title';"
    }
  ],
  "addStyleTag": [
    {
      "content": "body { background: linear-gradient(45deg, #da5a44, #a32784); }"
    },
    {
      "url": "https://example.com/custom-styles.css"
    }
  ],
  "cookies": [
    {
      "name": "session",
      "value": "abc123",
      "domain": "example.com"
    }
  ],
  "headers": {
    "Authorization": "Bearer token123",
    "User-Agent": "Custom User Agent"
  },
  "viewport": {
    "width": 1920,
    "height": 1080
  },
  "waitForEvent": {
    "event": "networkidle",
    "timeout": 10000
  },
  "waitForFunction": {
    "fn": "() => document.readyState === 'complete'",
    "timeout": 5000
  },
  "waitForSelector": {
    "selector": "#content-loaded",
    "timeout": 5000
  },
  "waitForTimeout": 3000
}
```

### 2. Screenshot API (`/screenshot`)

Capture page screenshots with extensive customization options.

#### Basic Usage

```bash
curl -X POST \
  http://localhost:3000/screenshot?token=YOUR_TOKEN \
  -H 'Content-Type: application/json' \
  -d '{
    "url": "https://example.com/",
    "options": {
      "type": "png",
      "fullPage": true
    }
  }' \
  --output screenshot.png
```

#### Advanced Screenshot Options

```json
{
  "url": "https://example.com/",
  "options": {
    "type": "png",
    "quality": 90,
    "fullPage": true,
    "omitBackground": false,
    "clip": {
      "x": 0,
      "y": 0,
      "width": 800,
      "height": 600
    },
    "path": "screenshot.png"
  },
  "viewport": {
    "width": 1920,
    "height": 1080,
    "deviceScaleFactor": 1
  },
  "gotoOptions": {
    "waitUntil": "networkidle0",
    "timeout": 30000
  },
  "addScriptTag": [
    {
      "content": "document.body.style.backgroundColor = 'white';"
    }
  ],
  "addStyleTag": [
    {
      "content": "nav { display: none !important; }"
    }
  ],
  "cookies": [
    {
      "name": "preferences",
      "value": "dark-mode",
      "domain": "example.com"
    }
  ],
  "headers": {
    "Accept-Language": "en-US,en;q=0.9"
  },
  "waitForSelector": {
    "selector": "#main-content",
    "timeout": 5000
  },
  "waitForFunction": {
    "fn": "() => window.dataLoaded === true",
    "timeout": 10000
  }
}
```

### 3. Content API (`/content`)

Extract rendered HTML content after JavaScript execution.

#### Basic Usage

```bash
curl -X POST \
  http://localhost:3000/content?token=YOUR_TOKEN \
  -H 'Content-Type: application/json' \
  -d '{
    "url": "https://example.com/"
  }'
```

#### Advanced Content Extraction

```json
{
  "url": "https://example.com/",
  "gotoOptions": {
    "waitUntil": "networkidle0",
    "timeout": 30000
  },
  "waitForSelector": {
    "selector": "#dynamic-content",
    "timeout": 10000
  },
  "waitForFunction": {
    "fn": "() => document.querySelectorAll('.item').length > 10",
    "timeout": 15000
  },
  "addScriptTag": [
    {
      "content": "window.scrollTo(0, document.body.scrollHeight);"
    }
  ],
  "headers": {
    "User-Agent": "Mozilla/5.0 (compatible; Bot/1.0)"
  },
  "cookies": [
    {
      "name": "consent",
      "value": "accepted",
      "domain": "example.com"
    }
  ],
  "viewport": {
    "width": 1920,
    "height": 1080
  }
}
```

### 4. Function API (`/function`)

Execute custom JavaScript code in the browser context with ES module support.

#### Basic Function

```bash
curl -X POST \
  http://localhost:3000/function?token=YOUR_TOKEN \
  -H 'Content-Type: application/javascript' \
  -d 'export default async function ({ page }) {
    await page.goto("https://example.com/");
    const title = await page.title();
    
    return {
      data: { title },
      type: "application/json"
    };
  }'
```

#### Advanced Function with External Libraries

```javascript
import { faker } from "https://esm.sh/@faker-js/faker";

export default async function ({ page }) {
  // Navigate and interact
  await page.goto("https://example.com/");
  
  // Click elements
  await page.click('#login-button');
  
  // Fill forms with fake data
  await page.type('#username', faker.internet.email());
  await page.type('#password', faker.internet.password());
  
  // Wait for response
  await page.waitForSelector('#dashboard');
  
  // Extract data
  const data = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.data-item')).map(item => ({
      text: item.textContent,
      href: item.href
    }));
  });
  
  return {
    data: { 
      items: data,
      timestamp: new Date().toISOString()
    },
    type: "application/json"
  };
}
```

#### Function with Context

```bash
curl -X POST \
  http://localhost:3000/function?token=YOUR_TOKEN \
  -H 'Content-Type: application/json' \
  -d '{
    "code": "export default async function ({ page, context }) { await page.goto(context.url); const title = await page.title(); return { data: { title, url: context.url }, type: \"application/json\" }; }",
    "context": {
      "url": "https://example.com/",
      "userId": "123"
    }
  }'
```

### 5. Download API (`/download`)

Handle file downloads and return the downloaded files.

#### Basic Download

```bash
curl -X POST \
  http://localhost:3000/download?token=YOUR_TOKEN \
  -H 'Content-Type: application/javascript' \
  -d 'export default async function ({ page }) {
    await page.goto("https://example.com/downloads");
    await page.click("#download-pdf-button");
    
    // Wait for download to complete
    await page.waitForTimeout(5000);
  }'
```

#### Programmatic File Creation

```javascript
export default async function ({ page }) {
  await page.evaluate(() => {
    const data = {
      timestamp: new Date().toISOString(),
      data: Array.from({length: 1000}, () => Math.random())
    };
    
    const jsonContent = `data:application/json,${JSON.stringify(data)}`;
    const encodedUri = encodeURI(jsonContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "data.json");
    document.body.appendChild(link);
    return link.click();
  });
}
```

### 6. Export API (`/export`)

Export page resources as files with optional resource bundling.

#### Basic Export

```bash
curl -X POST \
  http://localhost:3000/export?token=YOUR_TOKEN \
  -H 'Content-Type: application/json' \
  -d '{
    "url": "https://example.com/"
  }' \
  --output exported-page.html
```

#### Advanced Export with Resources

```json
{
  "url": "https://example.com/",
  "headers": {
    "User-Agent": "Export Bot 1.0"
  },
  "gotoOptions": {
    "waitUntil": "networkidle0",
    "timeout": 30000
  },
  "waitForSelector": {
    "selector": "#main-content",
    "timeout": 5000
  },
  "waitForTimeout": 2000,
  "bestAttempt": false
}
```

### 7. Performance API (`/performance`)

Run Google Lighthouse performance audits.

#### Basic Performance Audit

```bash
curl -X POST \
  http://localhost:3000/performance?token=YOUR_TOKEN \
  -H 'Content-Type: application/json' \
  -d '{
    "url": "https://example.com/"
  }'
```

#### Custom Lighthouse Configuration

```json
{
  "url": "https://example.com/",
  "config": {
    "extends": "lighthouse:default",
    "settings": {
      "onlyCategories": ["performance", "accessibility"],
      "emulatedFormFactor": "mobile",
      "throttling": {
        "rttMs": 150,
        "throughputKbps": 1638.4,
        "cpuSlowdownMultiplier": 4
      }
    }
  }
}
```

### 8. Unblock API (`/unblock`)

Bypass bot detection and anti-scraping measures.

#### Basic Unblock

```bash
curl -X POST \
  http://localhost:3000/unblock?token=YOUR_TOKEN \
  -H 'Content-Type: application/json' \
  -d '{
    "url": "https://protected-site.com/",
    "content": true,
    "screenshot": false
  }'
```

#### Advanced Unblock with Proxies

```json
{
  "url": "https://protected-site.com/",
  "browserWSEndpoint": false,
  "cookies": true,
  "content": true,
  "screenshot": true,
  "ttl": 10000,
  "stealth": true,
  "blockAds": true,
  "headers": {
    "Accept-Language": "en-US,en;q=0.9"
  }
}
```

## BrowserQL (GraphQL API)

BrowserQL is Browserless's GraphQL-based stealth-first automation API with human-like behavior and advanced bot detection bypass capabilities.

### Connection

```bash
# BrowserQL endpoint
POST http://localhost:3000/chromium/bql?token=YOUR_TOKEN
```

### Basic BrowserQL Query

```graphql
mutation {
  goto(url: "https://example.com") {
    status
  }
  
  click(selector: "#login-button") {
    success
  }
  
  type(selector: "#username", text: "user@example.com") {
    success
  }
  
  screenshot {
    base64
  }
}
```

### Advanced BrowserQL Features

```graphql
mutation ComplexAutomation($url: String!) {
  # Navigate with options
  goto(url: $url, waitUntil: networkIdle) {
    status
    url
  }
  
  # Wait for elements
  waitForElement(selector: "#dynamic-content", timeout: 10000) {
    success
  }
  
  # Solve CAPTCHAs automatically
  solveCaptcha {
    solved
    error
  }
  
  # Type with human-like behavior
  type(selector: "#search", text: "automation testing", humanLike: true) {
    success
  }
  
  # Click with coordinates
  click(selector: "#submit", x: 10, y: 5) {
    success
  }
  
  # Extract data
  querySelectorAll(selector: ".result-item") {
    elements {
      text
      attributes {
        href
      }
    }
  }
  
  # Get reconnect endpoint for continued automation
  reconnect(timeout: 30000) {
    browserWSEndpoint
  }
}
```

## Hybrid Automation (Human-in-the-Loop)

Stream browser sessions to end users for manual interaction during automation.

### Creating Live URLs

```javascript
import puppeteer from 'puppeteer-core';

const browser = await puppeteer.connect({
  browserWSEndpoint: 'ws://localhost:3000?token=YOUR_TOKEN'
});

const page = await browser.newPage();
await page.goto('https://accounts.google.com/');

const cdp = await page.createCDPSession();
const { liveURL } = await cdp.send('Browserless.liveURL', {
  resizable: true,      // Match user's screen size
  interactable: true,   // Allow user interactions
  quality: 75,          // Stream quality (1-100)
  timeout: 300000       // 5 minute timeout
});

console.log('Share this URL with user:', liveURL);

// Listen for events
cdp.on('Browserless.captchaFound', () => {
  console.log('CAPTCHA detected - user intervention needed');
});

cdp.on('Browserless.liveComplete', () => {
  console.log('User completed their interaction');
  // Continue with automation
});
```

## Advanced Features

### Session Management and Reconnection

#### Using Reconnect API

```javascript
// Start session and get reconnect endpoint
const response = await fetch('http://localhost:3000/chromium/bql?token=YOUR_TOKEN', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query: `
      mutation {
        goto(url: "https://example.com") { status }
        reconnect(timeout: 300000) { browserWSEndpoint }
      }
    `
  })
});

const { data } = await response.json();
const wsEndpoint = data.reconnect.browserWSEndpoint;

// Later, reconnect to the same session
const browser = await puppeteer.connect({
  browserWSEndpoint: wsEndpoint
});
```

#### User Data Directory (Enterprise)

```javascript
// Persist cookies and session data
const browser = await puppeteer.connect({
  browserWSEndpoint: 'ws://localhost:3000/?token=YOUR_TOKEN&--user-data-dir=~/persistent-session'
});
```

### Network Interception

```javascript
// Block requests
await page.setRequestInterception(true);
page.on('request', request => {
  if (request.url().includes('analytics') || request.url().includes('ads')) {
    request.abort();
  } else {
    request.continue();
  }
});

// Modify requests
page.on('request', request => {
  request.continue({
    headers: {
      ...request.headers(),
      'Custom-Header': 'Modified Value'
    }
  });
});
```

### Cookie Management

```javascript
// Set cookies
await page.setCookie({
  name: 'session_id',
  value: 'abc123',
  domain: 'example.com',
  path: '/',
  expires: Date.now() + 86400000 // 24 hours
});

// Get cookies
const cookies = await page.cookies();
console.log('Current cookies:', cookies);
```

### Device Emulation

```javascript
// Emulate mobile device
await page.emulate(puppeteer.devices['iPhone 12']);

// Custom viewport
await page.setViewport({
  width: 1920,
  height: 1080,
  deviceScaleFactor: 2,
  isMobile: false,
  hasTouch: false
});

// Geolocation
await page.setGeolocation({
  latitude: 37.7749,
  longitude: -122.4194
});
```

### File Handling

```javascript
// Upload files
await page.setInputFiles('#file-input', [
  'path/to/file1.pdf',
  'path/to/file2.jpg'
]);

// Download files
const downloadPath = './downloads';
await page._client.send('Page.setDownloadBehavior', {
  behavior: 'allow',
  downloadPath: downloadPath
});
```

## Docker Configuration

### Environment Variables

#### Core Configuration

```bash
# Required
TOKEN=your-secure-token              # Authentication token
CONCURRENT=10                        # Max concurrent sessions (default: 5)
TIMEOUT=60000                        # Session timeout in ms (default: 30000)
QUEUED=10                           # Max queue length (default: 5)

# Network
HOST=0.0.0.0                        # Bind address (default: localhost)
PORT=3000                           # Internal port (default: 3000)

# CORS
CORS=true                           # Enable CORS (default: false)
CORS_ALLOW_METHODS="POST,GET,OPTIONS" # Allowed methods
CORS_ALLOW_ORIGIN="*"               # Allowed origins
CORS_MAX_AGE=3600                   # Cache age in seconds

# Proxy Configuration
PROXY_HOST=browserless.example.com   # External hostname
PROXY_PORT=443                      # External port
PROXY_SSL=true                      # Use HTTPS

# Health Checks
HEALTH=true                         # Enable health checks
MAX_CPU_PERCENT=80                  # CPU threshold
MAX_MEMORY_PERCENT=80               # Memory threshold

# Storage
DATA_DIR=/app/data                  # User data directory
DOWNLOAD_DIR=/app/downloads         # Download directory
METRICS_JSON_PATH=/app/metrics.json # Metrics persistence

# Security
ALLOW_FILE_PROTOCOL=false           # Allow file:// URLs
ALLOW_GET=false                     # Enable GET requests

# Logging
DEBUG="browserless*"                # Debug output (use "-*" to disable)
```

#### Advanced Configuration

```bash
# Function API
FUNCTION_EXTERNALS='["lodash","axios"]'  # Allowed external modules

# Launch Arguments
DEFAULT_LAUNCH_ARGS='["--no-sandbox","--disable-dev-shm-usage"]'

# Stealth Mode
DEFAULT_STEALTH=true                # Enable stealth by default
DEFAULT_BLOCK_ADS=true             # Block ads by default

# Resource Limits
MAX_CONCURRENT_SESSIONS=10          # Hard limit on sessions
CONNECTION_TIMEOUT=30000            # Connection timeout
QUEUE_TIMEOUT=60000                # Queue timeout

# Chrome Specific
CHROME_REFRESH_TIME=3600000        # Chrome restart interval (deprecated in v2)
ENABLE_XVFB=false                  # Virtual display (Linux)
```

### Complete Docker Compose Example

```yaml
version: '3.8'

services:
  browserless:
    image: ghcr.io/browserless/chromium:latest
    container_name: browserless
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      # Core settings
      - TOKEN=your-secure-token-here
      - CONCURRENT=10
      - TIMEOUT=120000
      - QUEUED=20
      
      # Network
      - HOST=0.0.0.0
      - CORS=true
      - CORS_ALLOW_ORIGIN=*
      
      # Health monitoring
      - HEALTH=true
      - MAX_CPU_PERCENT=85
      - MAX_MEMORY_PERCENT=85
      
      # Storage
      - DATA_DIR=/app/data
      - DOWNLOAD_DIR=/app/downloads
      - METRICS_JSON_PATH=/app/metrics.json
      
      # Security
      - ALLOW_FILE_PROTOCOL=false
      - ALLOW_GET=true
      
      # Debug (set to -* for production)
      - DEBUG=browserless:*
      
    volumes:
      - ./data:/app/data
      - ./downloads:/app/downloads
      - ./metrics:/app/metrics
    
    # Resource limits
    deploy:
      resources:
        limits:
          memory: 2G
          cpus: '1.0'
        reservations:
          memory: 1G
          cpus: '0.5'
    
    # Health check
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
```

### Extending the Docker Image

Create custom images with additional dependencies:

```dockerfile
FROM ghcr.io/browserless/chromium:latest

# Install additional packages
RUN apt-get update && apt-get install -y \
    fonts-liberation \
    fonts-noto \
    && rm -rf /var/lib/apt/lists/*

# Install npm modules for Function API
RUN npm install aws-sdk lodash moment

# Set environment to whitelist modules
ENV FUNCTION_EXTERNALS='["aws-sdk","lodash","moment"]'

# Copy custom scripts or configurations
COPY custom-config.json /app/config.json

EXPOSE 3000
```

Build and run:

```bash
docker build -t my-browserless .
docker run -p 3000:3000 -e TOKEN=my-token my-browserless
```

## Browser Support

### Available Browsers

```bash
# Chromium (default)
docker run -p 3000:3000 ghcr.io/browserless/chromium

# Chrome (Google Chrome)
docker run -p 3000:3000 ghcr.io/browserless/chrome

# Firefox
docker run -p 3000:3000 ghcr.io/browserless/firefox

# Multi-browser support
docker run -p 3000:3000 ghcr.io/browserless/multi
```

### Connection Endpoints by Browser

```javascript
// Chromium (Puppeteer)
const browser = await puppeteer.connect({
  browserWSEndpoint: 'ws://localhost:3000/?token=YOUR_TOKEN'
});

// Chromium (Playwright)
const browser = await chromium.connect('ws://localhost:3000/chromium/playwright?token=YOUR_TOKEN');

// Firefox (Playwright)
const browser = await firefox.connect('ws://localhost:3000/firefox/playwright?token=YOUR_TOKEN');

// WebKit (Playwright)
const browser = await webkit.connect('ws://localhost:3000/webkit/playwright?token=YOUR_TOKEN');
```

## Monitoring and Debugging

### Built-in Endpoints

```bash
# Health check
GET http://localhost:3000/health

# Metrics
GET http://localhost:3000/metrics

# Active sessions
GET http://localhost:3000/sessions?token=YOUR_TOKEN

# Configuration
GET http://localhost:3000/config?token=YOUR_TOKEN

# OpenAPI documentation
GET http://localhost:3000/docs
```

### Debug Viewer

Browserless includes an interactive debugger for real-time session monitoring:

```bash
# Install debugger (after npm run build)
npm run install:debugger

# Access at http://localhost:3000/debugger
```

### Logging Configuration

```bash
# Enable all debug output
DEBUG=* docker run -p 3000:3000 ghcr.io/browserless/chromium

# Specific modules
DEBUG=browserless:* docker run -p 3000:3000 ghcr.io/browserless/chromium

# Disable logging
DEBUG=-* docker run -p 3000:3000 ghcr.io/browserless/chromium
```

## Security Considerations

### Authentication
- Always use strong, unique tokens
- Rotate tokens regularly
- Never expose tokens in client-side code
- Use environment variables or secrets management

### Network Security
- Run behind reverse proxy for SSL termination
- Implement IP whitelisting if needed
- Use firewall rules to restrict access
- Monitor for unusual traffic patterns

### Resource Protection
- Set appropriate concurrent session limits
- Configure memory and CPU limits
- Monitor resource usage
- Implement rate limiting at proxy level

### Content Security
- Disable file:// protocol access unless needed
- Validate all input parameters
- Sanitize user-provided HTML content
- Monitor for malicious script injection

## Performance Optimization

### Resource Management
```bash
# Optimize for your hardware
docker run \
  --memory=2g \
  --cpus=1.0 \
  -e CONCURRENT=5 \
  -e TIMEOUT=60000 \
  -p 3000:3000 \
  ghcr.io/browserless/chromium
```

### Load Balancing
Use multiple Browserless instances behind a load balancer:

```yaml
# docker-compose.yml for load balancing
version: '3.8'

services:
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - browserless1
      - browserless2

  browserless1:
    image: ghcr.io/browserless/chromium
    environment:
      - TOKEN=shared-token
      - CONCURRENT=5
    
  browserless2:
    image: ghcr.io/browserless/chromium
    environment:
      - TOKEN=shared-token
      - CONCURRENT=5
```

### Caching Strategies
- Use persistent user data directories for session caching
- Implement request-level caching for repeated operations
- Cache frequently used resources (fonts, stylesheets, scripts)
- Utilize reconnect API to maintain session state

## Migration from V1 to V2

### Major Changes in V2

#### Docker Image Location
```bash
# Old (V1)
docker pull browserless/chrome

# New (V2)
docker pull ghcr.io/browserless/chromium
```

#### Environment Variable Changes
```bash
# Removed in V2
CHROME_REFRESH_TIME         # No longer supported
DEFAULT_BLOCK_ADS          # Use blockAds in API calls
DEFAULT_DUMPIO             # Use dumpio in launch arguments
PRE_REQUEST_HEALTH_CHECK   # Now HEALTH
KEEP_ALIVE                 # Replaced by reconnect API
PREBOOT_CHROME            # No longer supported

# New in V2
HEALTH=true                # Replaces PRE_REQUEST_HEALTH_CHECK
MAX_CPU_PERCENT=80         # CPU threshold for health checks
MAX_MEMORY_PERCENT=80      # Memory threshold for health checks
FUNCTION_EXTERNALS='[]'    # Whitelist external modules
```

#### API Changes
```bash
# Removed APIs
/stats          # Replaced by /performance
/screencast     # Use library-based screencasting

# Modified APIs
/function       # Now uses ES modules instead of CommonJS
/pdf           # Changed launch parameter format
/screenshot    # Modified options structure
```

#### Launch Arguments Format
```javascript
// Old V1 format
{
  "launch": {
    "args": ["--no-sandbox"]
  }
}

// New V2 format
{
  "launch": ["--no-sandbox"]
}
```

## Error Handling and Troubleshooting

### Common Error Codes

#### HTTP Status Codes
- `400` - Bad Request: Invalid parameters or malformed JSON
- `401` - Unauthorized: Missing or invalid token
- `403` - Forbidden: Token lacks required permissions
- `404` - Not Found: Endpoint doesn't exist
- `408` - Request Timeout: Operation exceeded timeout limit
- `429` - Too Many Requests: Rate limit exceeded
- `500` - Internal Server Error: Unexpected server error
- `503` - Service Unavailable: Health check failed or overloaded

#### Common Issues and Solutions

##### Session Timeouts
```bash
# Increase timeout for long-running operations
curl -X POST \
  http://localhost:3000/pdf?token=YOUR_TOKEN&timeout=120000 \
  -H 'Content-Type: application/json' \
  -d '{"url": "https://slow-site.com/"}'
```

##### Memory Issues
```bash
# Monitor memory usage
docker stats browserless

# Increase memory limits
docker run --memory=4g -p 3000:3000 ghcr.io/browserless/chromium
```

##### Connection Refused
```bash
# Check if service is running
curl http://localhost:3000/health

# Check logs
docker logs browserless

# Verify token
curl "http://localhost:3000/config?token=YOUR_TOKEN"
```

### Debugging Techniques

#### Enable Verbose Logging
```bash
docker run \
  -e DEBUG="browserless:*" \
  -p 3000:3000 \
  ghcr.io/browserless/chromium
```

#### Use Debug Viewer
```javascript
// Enable debugger in your automation
const browser = await puppeteer.connect({
  browserWSEndpoint: 'ws://localhost:3000?token=YOUR_TOKEN&debugger=true'
});

// Add breakpoints in your code
await page.evaluate(() => debugger);
```

#### Session Monitoring
```bash
# List active sessions
curl "http://localhost:3000/sessions?token=YOUR_TOKEN"

# Get session details
curl "http://localhost:3000/sessions/SESSION_ID?token=YOUR_TOKEN"
```

## Advanced Use Cases

### Web Scraping with Anti-Detection

```javascript
// Stealth scraping with BrowserQL
const query = `
  mutation StealthScrape($url: String!) {
    goto(url: $url, stealth: true) {
      status
    }
    
    solveCaptcha {
      solved
    }
    
    waitForElement(selector: "#content") {
      success
    }
    
    querySelectorAll(selector: ".item") {
      elements {
        text
        attributes {
          href
          data-id
        }
      }
    }
  }
`;

const response = await fetch('http://localhost:3000/chromium/bql?token=YOUR_TOKEN', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query,
    variables: { url: 'https://protected-site.com' }
  })
});
```

### Automated Testing Pipeline

```javascript
// E2E test with Playwright
import { test, expect } from '@playwright/test';

test.beforeAll(async () => {
  // Connect to Browserless
  global.browser = await chromium.connect(
    'ws://localhost:3000/chromium/playwright?token=YOUR_TOKEN'
  );
});

test('login flow', async () => {
  const page = await global.browser.newPage();
  
  await page.goto('https://app.example.com/login');
  await page.fill('#email', 'test@example.com');
  await page.fill('#password', 'password123');
  await page.click('#login-button');
  
  await expect(page).toHaveURL('https://app.example.com/dashboard');
  await expect(page.locator('#welcome-message')).toBeVisible();
  
  await page.close();
});

test.afterAll(async () => {
  await global.browser.close();
});
```

### PDF Report Generation

```javascript
// Generate complex reports
const generateReport = async (data) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; }
        .header { background: #333; color: white; padding: 20px; }
        .chart { page-break-inside: avoid; }
        @media print {
          .page-break { page-break-before: always; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Monthly Report - ${new Date().toLocaleDateString()}</h1>
      </div>
      
      <div class="content">
        ${data.sections.map(section => `
          <div class="section">
            <h2>${section.title}</h2>
            <p>${section.content}</p>
            ${section.chart ? `<div class="chart">${section.chart}</div>` : ''}
          </div>
          <div class="page-break"></div>
        `).join('')}
      </div>
    </body>
    </html>
  `;
  
  const response = await fetch('http://localhost:3000/pdf?token=YOUR_TOKEN', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      html,
      options: {
        format: 'A4',
        printBackground: true,
        displayHeaderFooter: true,
        headerTemplate: '<div style="font-size:12px;">Confidential Report</div>',
        footerTemplate: '<div style="font-size:10px;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>',
        margin: {
          top: '40px',
          bottom: '40px',
          left: '20px',
          right: '20px'
        }
      }
    })
  });
  
  return await response.buffer();
};
```

### Batch Processing

```javascript
// Process multiple URLs in parallel
const processBatch = async (urls) => {
  const results = await Promise.allSettled(
    urls.map(async (url) => {
      const response = await fetch('http://localhost:3000/screenshot?token=YOUR_TOKEN', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url,
          options: {
            fullPage: true,
            type: 'png'
          }
        })
      });
      
      if (!response.ok) {
        throw new Error(`Failed to process ${url}: ${response.statusText}`);
      }
      
      return {
        url,
        screenshot: await response.buffer(),
        timestamp: new Date().toISOString()
      };
    })
  );
  
  return results.map((result, index) => ({
    url: urls[index],
    success: result.status === 'fulfilled',
    data: result.status === 'fulfilled' ? result.value : null,
    error: result.status === 'rejected' ? result.reason.message : null
  }));
};
```

## Integration Examples

### Express.js Server

```javascript
import express from 'express';
import puppeteer from 'puppeteer';

const app = express();
app.use(express.json());

// Screenshot endpoint
app.post('/api/screenshot', async (req, res) => {
  try {
    const { url, options = {} } = req.body;
    
    const browser = await puppeteer.connect({
      browserWSEndpoint: 'ws://localhost:3000?token=YOUR_TOKEN'
    });
    
    const page = await browser.newPage();
    await page.goto(url);
    
    const screenshot = await page.screenshot({
      fullPage: true,
      type: 'png',
      ...options
    });
    
    await browser.close();
    
    res.set('Content-Type', 'image/png');
    res.send(screenshot);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => {
  console.log('API server running on port 3001');
});
```

### Next.js API Route

```javascript
// pages/api/pdf.js
import puppeteer from 'puppeteer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const { url, options } = req.body;
    
    const browser = await puppeteer.connect({
      browserWSEndpoint: process.env.BROWSERLESS_WS_ENDPOINT
    });
    
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0' });
    
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      ...options
    });
    
    await browser.close();
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="document.pdf"');
    res.send(pdf);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
```

### Python Integration

```python
import asyncio
import aiohttp
import json

class BrowserlessClient:
    def __init__(self, base_url="http://localhost:3000", token="YOUR_TOKEN"):
        self.base_url = base_url
        self.token = token
    
    async def screenshot(self, url, options=None):
        async with aiohttp.ClientSession() as session:
            payload = {
                "url": url,
                "options": options or {"fullPage": True, "type": "png"}
            }
            
            async with session.post(
                f"{self.base_url}/screenshot?token={self.token}",
                json=payload
            ) as response:
                if response.status == 200:
                    return await response.read()
                else:
                    raise Exception(f"Request failed: {response.status}")
    
    async def pdf(self, url, options=None):
        async with aiohttp.ClientSession() as session:
            payload = {
                "url": url,
                "options": options or {"format": "A4", "printBackground": True}
            }
            
            async with session.post(
                f"{self.base_url}/pdf?token={self.token}",
                json=payload
            ) as response:
                if response.status == 200:
                    return await response.read()
                else:
                    raise Exception(f"Request failed: {response.status}")
    
    async def content(self, url):
        async with aiohttp.ClientSession() as session:
            payload = {"url": url}
            
            async with session.post(
                f"{self.base_url}/content?token={self.token}",
                json=payload
            ) as response:
                if response.status == 200:
                    return await response.text()
                else:
                    raise Exception(f"Request failed: {response.status}")

# Usage example
async def main():
    client = BrowserlessClient()
    
    # Take screenshot
    screenshot_data = await client.screenshot("https://example.com")
    with open("screenshot.png", "wb") as f:
        f.write(screenshot_data)
    
    # Generate PDF
    pdf_data = await client.pdf("https://example.com")
    with open("document.pdf", "wb") as f:
        f.write(pdf_data)
    
    # Get content
    html_content = await client.content("https://example.com")
    print(html_content[:200])

if __name__ == "__main__":
    asyncio.run(main())
```

### PHP Integration

```php
<?php

class BrowserlessClient {
    private $baseUrl;
    private $token;
    
    public function __construct($baseUrl = 'http://localhost:3000', $token = 'YOUR_TOKEN') {
        $this->baseUrl = $baseUrl;
        $this->token = $token;
    }
    
    public function screenshot($url, $options = []) {
        $defaultOptions = [
            'fullPage' => true,
            'type' => 'png'
        ];
        
        $payload = [
            'url' => $url,
            'options' => array_merge($defaultOptions, $options)
        ];
        
        return $this->makeRequest('/screenshot', $payload);
    }
    
    public function pdf($url, $options = []) {
        $defaultOptions = [
            'format' => 'A4',
            'printBackground' => true
        ];
        
        $payload = [
            'url' => $url,
            'options' => array_merge($defaultOptions, $options)
        ];
        
        return $this->makeRequest('/pdf', $payload);
    }
    
    public function content($url) {
        $payload = ['url' => $url];
        return $this->makeRequest('/content', $payload);
    }
    
    private function makeRequest($endpoint, $payload) {
        $url = $this->baseUrl . $endpoint . '?token=' . $this->token;
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json'
        ]);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        
        $result = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        if ($httpCode !== 200) {
            throw new Exception("Request failed with HTTP code: $httpCode");
        }
        
        return $result;
    }
}

// Usage example
$client = new BrowserlessClient();

// Take screenshot
$screenshot = $client->screenshot('https://example.com');
file_put_contents('screenshot.png', $screenshot);

// Generate PDF
$pdf = $client->pdf('https://example.com');
file_put_contents('document.pdf', $pdf);

// Get content
$content = $client->content('https://example.com');
echo substr($content, 0, 200);
?>
```

## Best Practices

### Security
1. **Token Management**
   - Use environment variables for tokens
   - Rotate tokens regularly
   - Use different tokens for different environments
   - Never commit tokens to version control

2. **Network Security**
   - Run behind reverse proxy with SSL
   - Implement IP whitelisting
   - Use VPN or private networks for production
   - Monitor access logs

3. **Input Validation**
   - Validate all URL parameters
   - Sanitize HTML content
   - Limit file upload sizes
   - Implement rate limiting

### Performance
1. **Resource Management**
   - Set appropriate concurrent limits
   - Monitor memory and CPU usage
   - Use health checks
   - Implement graceful degradation

2. **Caching**
   - Cache frequently accessed content
   - Use persistent sessions for multi-step operations
   - Implement CDN for static assets
   - Cache API responses when appropriate

3. **Optimization**
   - Use appropriate timeouts
   - Minimize viewport sizes when possible
   - Block unnecessary resources (ads, analytics)
   - Optimize images and fonts

### Reliability
1. **Error Handling**
   - Implement retry logic
   - Use circuit breakers
   - Log all errors
   - Monitor error rates

2. **Monitoring**
   - Set up health checks
   - Monitor resource usage
   - Track performance metrics
   - Implement alerting

3. **Scaling**
   - Use load balancers
   - Implement auto-scaling
   - Monitor queue lengths
   - Plan for peak loads

## Conclusion

Browserless.io provides a comprehensive browser automation platform that eliminates the complexity of managing headless browsers while offering powerful APIs for web scraping, testing, PDF generation, and more. With support for both REST APIs and full WebSocket connections through Puppeteer and Playwright, it offers flexibility for any automation need.

Key benefits:
- **No Infrastructure Management**: Focus on your automation logic, not browser maintenance
- **Full Browser Capabilities**: Complete access to modern browser features
- **Advanced Anti-Detection**: Built-in stealth features and CAPTCHA solving
- **Scalable Architecture**: Handle concurrent sessions with built-in queueing
- **Multiple Integration Options**: REST APIs, WebSocket connections, or GraphQL
- **Production Ready**: Comprehensive monitoring, logging, and security features

Whether you're building a simple screenshot service or complex web automation workflows, Browserless provides the tools and reliability needed for production deployments.