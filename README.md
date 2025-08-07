# Browserless MCP Server

A Model Context Protocol (MCP) server for Browserless.io browser automation. This server provides a comprehensive interface to Browserless's powerful browser automation capabilities through MCP tools.

## Features

- **PDF Generation**: Convert web pages or HTML content to PDF with custom styling
- **Screenshots**: Capture full-page or element-specific screenshots
- **Content Extraction**: Get rendered HTML content after JavaScript execution
- **Custom Functions**: Execute JavaScript code in browser context
- **File Downloads**: Handle file downloads and programmatic file creation
- **Page Export**: Export web pages with all resources
- **Performance Audits**: Run Lighthouse performance audits
- **Anti-Detection**: Bypass bot detection and anti-scraping measures
- **BrowserQL**: Execute GraphQL queries for advanced automation
- **WebSocket Connections**: Create connections for Puppeteer/Playwright
- **Health Monitoring**: Check instance health and get metrics
- **Session Management**: Monitor active browser sessions

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Lizzard-Solutions/browserless-mcp.git
cd browserless-mcp
```

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

4. Copy the example environment file:
```bash
cp env.example .env
```

5. Edit `.env` with your Browserless configuration:
```bash
BROWSERLESS_HOST=localhost
BROWSERLESS_PORT=3000
BROWSERLESS_TOKEN=your-secure-token-here
BROWSERLESS_PROTOCOL=http
BROWSERLESS_TIMEOUT=30000
BROWSERLESS_CONCURRENT=5
```

## Usage

### Starting the MCP Server

```bash
npm start
```

Or for development:
```bash
npm run dev
```

### Using with MCP Clients

The server provides the following tools:

#### 1. Initialize Browserless Connection
```json
{
  "name": "initialize_browserless",
  "arguments": {
    "host": "localhost",
    "port": 3000,
    "token": "your-token",
    "protocol": "http",
    "timeout": 30000,
    "concurrent": 5
  }
}
```

#### 2. Generate PDF
```json
{
  "name": "generate_pdf",
  "arguments": {
    "url": "https://example.com",
    "options": {
      "format": "A4",
      "printBackground": true,
      "displayHeaderFooter": true,
      "margin": {
        "top": "20mm",
        "bottom": "10mm",
        "left": "10mm",
        "right": "10mm"
      }
    }
  }
}
```

#### 3. Take Screenshot
```json
{
  "name": "take_screenshot",
  "arguments": {
    "url": "https://example.com",
    "options": {
      "type": "png",
      "fullPage": true,
      "quality": 90
    }
  }
}
```

#### 4. Extract Content
```json
{
  "name": "get_content",
  "arguments": {
    "url": "https://example.com",
    "waitForSelector": {
      "selector": "#content-loaded",
      "timeout": 5000
    }
  }
}
```

#### 5. Execute Custom Function
```json
{
  "name": "execute_function",
  "arguments": {
    "code": "export default async function ({ page }) { await page.goto('https://example.com'); const title = await page.title(); return { data: { title }, type: 'application/json' }; }",
    "context": {
      "customData": "value"
    }
  }
}
```

#### 6. Run Performance Audit
```json
{
  "name": "run_performance_audit",
  "arguments": {
    "url": "https://example.com",
    "config": {
      "extends": "lighthouse:default",
      "settings": {
        "onlyCategories": ["performance", "accessibility"]
      }
    }
  }
}
```

#### 7. Bypass Bot Detection
```json
{
  "name": "unblock",
  "arguments": {
    "url": "https://protected-site.com",
    "content": true,
    "screenshot": true,
    "stealth": true,
    "blockAds": true
  }
}
```

#### 8. Execute BrowserQL Query
```json
{
  "name": "execute_browserql",
  "arguments": {
    "query": "mutation { goto(url: \"https://example.com\") { status } click(selector: \"#button\") { success } screenshot { base64 } }",
    "variables": {}
  }
}
```

#### 9. Create WebSocket Connection
```json
{
  "name": "create_websocket_connection",
  "arguments": {
    "browser": "chromium",
    "library": "puppeteer",
    "stealth": true,
    "viewport": {
      "width": 1920,
      "height": 1080
    }
  }
}
```

#### 10. Health and Monitoring
```json
{
  "name": "get_health",
  "arguments": {}
}
```

```json
{
  "name": "get_sessions",
  "arguments": {}
}
```

```json
{
  "name": "get_metrics",
  "arguments": {}
}
```

## Browserless Setup

### Docker Setup

```bash
# Basic setup
docker run -p 3000:3000 ghcr.io/browserless/chromium

# With configuration
docker run \
  --rm \
  -p 3000:3000 \
  -e "CONCURRENT=10" \
  -e "TOKEN=your-secure-token" \
  ghcr.io/browserless/chromium
```

### Docker Compose

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
      - TOKEN=your-secure-token-here
      - CONCURRENT=10
      - TIMEOUT=120000
      - HEALTH=true
      - CORS=true
    volumes:
      - ./data:/app/data
      - ./downloads:/app/downloads
```

## Advanced Examples

### Complex Web Scraping
```json
{
  "name": "execute_function",
  "arguments": {
    "code": "export default async function ({ page }) { await page.goto('https://example.com'); await page.waitForSelector('.item'); const items = await page.evaluate(() => Array.from(document.querySelectorAll('.item')).map(el => ({ text: el.textContent, href: el.href }))); return { data: { items }, type: 'application/json' }; }"
  }
}
```

### Multi-step Form Automation
```json
{
  "name": "execute_function",
  "arguments": {
    "code": "export default async function ({ page }) { await page.goto('https://example.com/form'); await page.type('#username', 'user@example.com'); await page.type('#password', 'password123'); await page.click('#submit'); await page.waitForNavigation(); const result = await page.evaluate(() => document.querySelector('.success-message').textContent); return { data: { result }, type: 'application/json' }; }"
  }
}
```

### PDF Report Generation
```json
{
  "name": "generate_pdf",
  "arguments": {
    "html": "<!DOCTYPE html><html><head><style>body{font-family:Arial;margin:20px;} .header{background:#333;color:white;padding:20px;} .content{margin:20px 0;}</style></head><body><div class='header'><h1>Monthly Report</h1></div><div class='content'><h2>Summary</h2><p>This is a generated report with custom styling.</p></div></body></html>",
    "options": {
      "format": "A4",
      "printBackground": true,
      "displayHeaderFooter": true,
      "headerTemplate": "<div style='font-size:12px;'>Confidential Report</div>",
      "footerTemplate": "<div style='font-size:10px;'>Page <span class='pageNumber'></span></div>"
    }
  }
}
```

## Configuration Options

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `BROWSERLESS_HOST` | `localhost` | Browserless host |
| `BROWSERLESS_PORT` | `3000` | Browserless port |
| `BROWSERLESS_TOKEN` | Required | Authentication token |
| `BROWSERLESS_PROTOCOL` | `http` | Protocol (http/https/ws/wss) |
| `BROWSERLESS_TIMEOUT` | `30000` | Request timeout in ms |
| `BROWSERLESS_CONCURRENT` | `5` | Max concurrent sessions |

### Browserless Configuration

For complete Browserless configuration options, see the [Browserless API Reference](ref/browserless_api_reference.md).

## Error Handling

The MCP server provides detailed error messages for common issues:

- **Connection Errors**: Check host, port, and token configuration
- **Timeout Errors**: Increase timeout values for slow-loading pages
- **Authentication Errors**: Verify token is correct and has proper permissions
- **Resource Errors**: Check concurrent session limits and memory usage

## Development

### Building

```bash
npm run build
```

### Testing

```bash
npm test
```

### Linting

```bash
npm run lint
```

### Formatting

```bash
npm run format
```

## Troubleshooting

### Common Issues

1. **Connection Refused**
   - Ensure Browserless is running
   - Check host and port configuration
   - Verify firewall settings

2. **Authentication Failed**
   - Verify token is correct
   - Check token permissions
   - Ensure token is not expired

3. **Timeout Errors**
   - Increase timeout values
   - Check network connectivity
   - Monitor Browserless resource usage

4. **Memory Issues**
   - Reduce concurrent session limit
   - Monitor system memory usage
   - Restart Browserless instance

### Debug Mode

Enable debug logging:

```bash
DEBUG=browserless:* npm start
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For issues and questions:

1. Check the [Browserless API Reference](ref/browserless_api_reference.md)
2. Review the [Browserless Documentation](https://docs.browserless.io/)
3. Open an issue on GitHub

## Related Projects

- [Browserless.io](https://browserless.io/) - Browser automation platform
- [Puppeteer](https://pptr.dev/) - Node.js library for browser automation
- [Playwright](https://playwright.dev/) - Cross-browser automation library
- [Model Context Protocol](https://modelcontextprotocol.io/) - Protocol for AI model interactions

## Repository

- **GitHub**: https://github.com/Lizzard-Solutions/browserless-mcp
- **Issues**: https://github.com/Lizzard-Solutions/browserless-mcp/issues
- **Discussions**: https://github.com/Lizzard-Solutions/browserless-mcp/discussions 