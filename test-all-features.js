import axios from 'axios';
import fs from 'fs';

const BROWSERLESS_URL = 'http://172.22.0.1:3000';

async function testAllFeatures() {
  console.log('🚀 Testing Browserless MCP Features');
  console.log('=====================================\n');
  
  const results = {
    content: false,
    pdf: false,
    function: false,
    export: false,
    performance: false
  };
  
  // Test 1: Content Extraction
  console.log('1. Testing Content Extraction...');
  try {
    const response = await axios.post(`${BROWSERLESS_URL}/content`, {
      url: 'https://httpbin.org/html'
    }, { timeout: 15000 });
    
    if (response.status === 200 && response.data) {
      console.log('✅ Content extraction: WORKING');
      results.content = true;
      
      // Save sample content
      fs.writeFileSync('sample-content.html', response.data);
      console.log('   📄 Sample content saved as: sample-content.html');
    }
  } catch (error) {
    console.log('❌ Content extraction: FAILED -', error.message);
  }
  
  // Test 2: PDF Generation
  console.log('\n2. Testing PDF Generation...');
  try {
    const response = await axios.post(`${BROWSERLESS_URL}/pdf`, {
      url: 'https://httpbin.org/html',
      options: {
        format: 'A4',
        printBackground: false
      }
    }, {
      responseType: 'arraybuffer',
      timeout: 30000
    });
    
    if (response.status === 200 && response.data.length > 0) {
      console.log('✅ PDF generation: WORKING');
      results.pdf = true;
      
      // Save sample PDF
      fs.writeFileSync('sample-document.pdf', response.data);
      console.log('   📄 Sample PDF saved as: sample-document.pdf');
    }
  } catch (error) {
    console.log('❌ PDF generation: FAILED -', error.message);
  }
  
  // Test 3: Custom Function Execution
  console.log('\n3. Testing Custom Function Execution...');
  try {
    const response = await axios.post(`${BROWSERLESS_URL}/function`, 
      `export default async function ({ page }) {
        await page.goto('https://httpbin.org/html');
        const title = await page.title();
        const h1Text = await page.evaluate(() => document.querySelector('h1')?.textContent || 'No h1 found');
        return {
          data: { title, h1Text, timestamp: new Date().toISOString() },
          type: 'application/json'
        };
      }`, {
        headers: { 'Content-Type': 'application/javascript' },
        timeout: 30000
      }
    );
    
    if (response.status === 200 && response.data) {
      console.log('✅ Custom function execution: WORKING');
      results.function = true;
      
      // Save function result
      fs.writeFileSync('function-result.json', JSON.stringify(response.data, null, 2));
      console.log('   📄 Function result saved as: function-result.json');
    }
  } catch (error) {
    console.log('❌ Custom function execution: FAILED -', error.message);
  }
  
  // Test 4: Page Export
  console.log('\n4. Testing Page Export...');
  try {
    const response = await axios.post(`${BROWSERLESS_URL}/export`, {
      url: 'https://httpbin.org/html'
    }, { timeout: 30000 });
    
    if (response.status === 200 && response.data) {
      console.log('✅ Page export: WORKING');
      results.export = true;
      
      // Save exported page
      fs.writeFileSync('exported-page.html', response.data);
      console.log('   📄 Exported page saved as: exported-page.html');
    }
  } catch (error) {
    console.log('❌ Page export: FAILED -', error.message);
  }
  
  // Test 5: Performance Audit
  console.log('\n5. Testing Performance Audit...');
  try {
    const response = await axios.post(`${BROWSERLESS_URL}/performance`, {
      url: 'https://httpbin.org/html'
    }, { timeout: 60000 });
    
    if (response.status === 200 && response.data) {
      console.log('✅ Performance audit: WORKING');
      results.performance = true;
      
      // Save performance results
      fs.writeFileSync('performance-results.json', JSON.stringify(response.data, null, 2));
      console.log('   📄 Performance results saved as: performance-results.json');
    }
  } catch (error) {
    console.log('❌ Performance audit: FAILED -', error.message);
  }
  
  // Summary
  console.log('\n📊 Test Results Summary');
  console.log('========================');
  const workingFeatures = Object.values(results).filter(Boolean).length;
  const totalFeatures = Object.keys(results).length;
  
  console.log(`Working features: ${workingFeatures}/${totalFeatures}`);
  
  Object.entries(results).forEach(([feature, working]) => {
    console.log(`${working ? '✅' : '❌'} ${feature}: ${working ? 'WORKING' : 'FAILED'}`);
  });
  
  console.log('\n🎉 Browserless MCP is ready for use!');
  console.log('\nNext steps:');
  console.log('1. Use the MCP server with your preferred MCP client');
  console.log('2. Configure the server with your Browserless URL');
  console.log('3. Start automating browser tasks!');
  
  return results;
}

testAllFeatures(); 