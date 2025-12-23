/**
 * Console Error Capture Script
 * Captures runtime errors from deployed sites using Puppeteer
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const URLS = [
  'https://esim.com.mm',
  'https://www.esim.com.mm',
  'https://esim-myanmar.pages.dev',
  'https://esimmyanmar-09289140-4db73.web.app'
];

const PAGES_TO_CHECK = [
  '/',
  '/plans',
  '/features',
  '/coverage',
  '/support',
  '/about',
  '/faq',
  '/contact',
  '/how-it-works',
  '/supported-devices',
  '/privacy-policy',
  '/terms',
  '/sitemap'
];

async function captureErrors() {
  const results = {
    timestamp: new Date().toISOString(),
    domains: {}
  };

  const browser = await puppeteer.launch({ 
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  for (const baseUrl of URLS) {
    const domain = new URL(baseUrl).hostname;
    results.domains[domain] = {
      errors: [],
      warnings: [],
      networkErrors: []
    };

    for (const pagePath of PAGES_TO_CHECK) {
      const url = `${baseUrl}${pagePath}`;
      const page = await browser.newPage();
      
      page.on('console', msg => {
        if (msg.type() === 'error') {
          results.domains[domain].errors.push({
            page: pagePath,
            message: msg.text(),
            location: msg.location()
          });
        } else if (msg.type() === 'warning') {
          results.domains[domain].warnings.push({
            page: pagePath,
            message: msg.text()
          });
        }
      });

      page.on('pageerror', error => {
        results.domains[domain].errors.push({
          page: pagePath,
          message: error.message,
          stack: error.stack
        });
      });

      page.on('requestfailed', request => {
        results.domains[domain].networkErrors.push({
          page: pagePath,
          url: request.url(),
          failure: request.failure()?.errorText
        });
      });

      try {
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
        await page.waitForTimeout(2000);
      } catch (error) {
        results.domains[domain].errors.push({
          page: pagePath,
          message: `Navigation error: ${error.message}`
        });
      }

      await page.close();
    }
  }

  await browser.close();

  // Write results
  const outputPath = path.join(__dirname, '..', 'logs', 'console-errors.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  
  console.log('Console error capture complete');
  console.log(`Results saved to: ${outputPath}`);
  
  // Summary
  for (const [domain, data] of Object.entries(results.domains)) {
    console.log(`\n${domain}:`);
    console.log(`  Errors: ${data.errors.length}`);
    console.log(`  Warnings: ${data.warnings.length}`);
    console.log(`  Network Errors: ${data.networkErrors.length}`);
  }

  return results;
}

captureErrors().catch(console.error);
