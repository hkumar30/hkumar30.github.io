#!/usr/bin/env node
/**
 * Screenshot Automation Script
 * 
 * Usage:
 *   npm run screenshot                    # Default: capture hero at desktop + mobile
 *   npm run screenshot -- --route=/projects --viewport=mobile
 *   npm run screenshot -- --routes=/,/projects --viewports=desktop,mobile
 *   npm run screenshot -- --fullpage      # Capture full page scroll
 *   npm run screenshot -- --selector=#teaching-section  # Capture specific element
 * 
 * Viewports:
 *   desktop  - 1440x900
 *   mobile   - 390x844 (iPhone 12 Pro)
 *   tablet   - 768x1024
 * 
 * Output:
 *   screenshots/YYYY-MM-DD_HHMMSS-<route>-<viewport>.png
 */

import { chromium } from 'playwright';
import { spawn, execSync } from 'child_process';
import { mkdir, access } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(__dirname, '..');

// Viewport definitions
const VIEWPORTS = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 844, deviceScaleFactor: 2 },
  tablet: { width: 768, height: 1024 },
};

// Parse CLI arguments (supports both --key=value and --key value syntax)
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    routes: ['/'],
    viewports: ['desktop'],
    fullPage: false,
    selector: null,
    outputDir: join(PROJECT_ROOT, 'screenshots'),
    baseUrl: 'http://localhost:3000',
    waitForSelector: null,
    theme: null, // 'light', 'dark', or null for current
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    // Handle --key=value syntax
    const equalIndex = arg.indexOf('=');
    const key = equalIndex > 0 ? arg.slice(0, equalIndex) : arg;
    const value = equalIndex > 0 ? arg.slice(equalIndex + 1) : args[i + 1];
    
    const next = args[i + 1];

    switch (key) {
      case '--route':
        options.routes = [value];
        if (equalIndex < 0) i++;
        break;
      case '--routes':
        options.routes = value.split(',');
        if (equalIndex < 0) i++;
        break;
      case '--viewport':
        options.viewports = [value];
        if (equalIndex < 0) i++;
        break;
      case '--viewports':
        options.viewports = value.split(',');
        if (equalIndex < 0) i++;
        break;
      case '--fullpage':
        options.fullPage = true;
        break;
      case '--selector':
        options.selector = value;
        if (equalIndex < 0) i++;
        break;
      case '--wait-for':
        options.waitForSelector = value;
        if (equalIndex < 0) i++;
        break;
      case '--output':
        options.outputDir = value;
        if (equalIndex < 0) i++;
        break;
      case '--base-url':
        options.baseUrl = value;
        if (equalIndex < 0) i++;
        break;
      case '--theme':
        options.theme = value;
        if (equalIndex < 0) i++;
        break;
      case '--help':
      case '-h':
        printHelp();
        process.exit(0);
        break;
    }
  }

  return options;
}

function printHelp() {
  console.log(`
Screenshot Automation Script

Usage:
  npm run screenshot [options]

Options:
  --route <path>        Single route to capture (default: /)
  --routes <paths>      Comma-separated routes (e.g., /,/projects,/work)
  --viewport <name>     Single viewport (desktop|mobile|tablet)
  --viewports <names>   Comma-separated viewports (default: desktop)
  --fullpage            Capture full page scroll
  --selector <sel>      Capture specific element only
  --wait-for <sel>      Wait for selector before capture
  --theme <light|dark>  Force theme mode
  --output <dir>        Output directory (default: ./screenshots)
  --base-url <url>      Server URL (default: http://localhost:3000)
  --help, -h            Show this help

Examples:
  npm run screenshot                    # Hero desktop + mobile
  npm run screenshot:hero               # Same as above
  npm run screenshot -- --route=/lab --viewport=mobile
  npm run screenshot -- --routes=/,/projects --viewports=desktop,mobile,tablet
  npm run screenshot -- --fullpage --wait-for=\"#teaching-section\"
  npm run screenshot:all                # All routes at all viewports
`);
}

// Check if server is running
async function isServerRunning(url) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);
    
    const response = await fetch(url, { 
      method: 'HEAD',
      signal: controller.signal 
    });
    
    clearTimeout(timeout);
    return response.status === 200;
  } catch {
    return false;
  }
}

// Start static server
async function startStaticServer(port = 3000) {
  console.log(`Starting static server on port ${port}...`);
  
  const outDir = join(PROJECT_ROOT, 'out');
  
  // Check if out directory exists
  try {
    await access(outDir);
  } catch {
    console.error('Error: out/ directory not found. Run `npm run build` first.');
    process.exit(1);
  }
  
  const server = spawn('python3', ['-m', 'http.server', String(port), '--directory', outDir], {
    stdio: 'pipe',
    detached: false,
  });
  
  // Wait for server to start
  await new Promise((resolve, reject) => {
    let attempts = 0;
    const maxAttempts = 50;
    
    const checkServer = setInterval(async () => {
      attempts++;
      
      if (await isServerRunning(`http://localhost:${port}`)) {
        clearInterval(checkServer);
        resolve();
      }
      
      if (attempts >= maxAttempts) {
        clearInterval(checkServer);
        server.kill();
        reject(new Error('Server failed to start'));
      }
    }, 100);
  });
  
  console.log(`Server ready at http://localhost:${port}`);
  return server;
}

// Generate timestamped filename
function generateFilename(route, viewport, outputDir) {
  const now = new Date();
  const timestamp = now.toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const routeSlug = route === '/' ? 'home' : route.replace(/\//g, '-').replace(/^-/, '');
  return join(outputDir, `${timestamp}_${routeSlug}_${viewport}.png`);
}

// Capture screenshot
async function captureScreenshot(browser, options, route, viewportName) {
  const viewport = VIEWPORTS[viewportName];
  if (!viewport) {
    console.warn(`Unknown viewport: ${viewportName}, skipping`);
    return null;
  }
  
  const context = await browser.newContext({ viewport });
  const page = await context.newPage();
  
  try {
    const url = `${options.baseUrl}${route}`;
    console.log(`  Capturing ${route} at ${viewportName} (${viewport.width}x${viewport.height})...`);
    
    // Navigate and wait for load
    await page.goto(url, { waitUntil: 'networkidle' });
    
    // Wait for specific selector if requested
    if (options.waitForSelector) {
      await page.waitForSelector(options.waitForSelector, { timeout: 10000 });
      
      // Scroll to element
      await page.evaluate((sel) => {
        const el = document.querySelector(sel);
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
      }, options.waitForSelector);
      
      // Small delay for scroll/animations
      await page.waitForTimeout(300);
    }
    
    // Toggle theme if requested
    if (options.theme) {
      const currentTheme = await page.evaluate(() => {
        return document.documentElement.getAttribute('data-home-theme');
      });
      
      if (currentTheme !== options.theme) {
        // Click theme toggle
        const toggle = await page.$('[data-theme-toggle], .home-theme-toggle');
        if (toggle) await toggle.click();
        await page.waitForTimeout(200);
      }
    }
    
    // Determine screenshot options
    const screenshotOptions = {
      path: generateFilename(route, viewportName, options.outputDir),
      fullPage: options.fullPage,
    };
    
    // Capture specific element or full page
    if (options.selector) {
      const element = await page.$(options.selector);
      if (element) {
        await element.screenshot({ path: screenshotOptions.path });
      } else {
        console.warn(`  Selector not found: ${options.selector}`);
      }
    } else {
      await page.screenshot(screenshotOptions);
    }
    
    console.log(`  Saved: ${screenshotOptions.path}`);
    return screenshotOptions.path;
    
  } catch (error) {
    console.error(`  Error capturing ${route} at ${viewportName}:`, error.message);
    return null;
  } finally {
    await context.close();
  }
}

// Main execution
async function main() {
  const options = parseArgs();
  
  console.log('Screenshot Automation\n');
  
  // Ensure output directory exists
  await mkdir(options.outputDir, { recursive: true });
  
  // Check/start server
  let server = null;
  const serverRunning = await isServerRunning(options.baseUrl);
  
  if (!serverRunning) {
    console.log('No server detected, starting static server...');
    server = await startStaticServer(3000);
  } else {
    console.log('Using existing server at', options.baseUrl);
  }
  
  // Launch browser
  console.log('Launching Chromium...');
  const browser = await chromium.launch({ headless: true });
  
  const results = [];
  
  try {
    // Capture all routes at all viewports
    for (const route of options.routes) {
      for (const viewport of options.viewports) {
        const result = await captureScreenshot(browser, options, route, viewport);
        if (result) results.push(result);
      }
    }
  } finally {
    await browser.close();
    
    if (server) {
      console.log('\nStopping server...');
      server.kill();
    }
  }
  
  // Summary
  console.log('\n' + '='.repeat(50));
  console.log(`Captured ${results.length} screenshot(s)`);
  console.log('='.repeat(50));
  results.forEach(r => console.log('  -', r.replace(PROJECT_ROOT + '/', '')));
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
