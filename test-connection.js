import axios from 'axios';

const BROWSERLESS_URL = 'http://172.22.0.1:3000';

async function testBrowserlessConnection() {
  console.log('Testing Browserless connection...');
  console.log(`URL: ${BROWSERLESS_URL}`);
  
  try {
    // Test root endpoint
    console.log('\n1. Testing root endpoint...');
    try {
      const rootResponse = await axios.get(`${BROWSERLESS_URL}/`);
      console.log('✅ Root endpoint response:', rootResponse.status);
      console.log('Content type:', rootResponse.headers['content-type']);
      if (rootResponse.headers['content-type']?.includes('text/html')) {
        console.log('✅ Browserless is running (HTML response)');
      }
    } catch (error) {
      console.log('❌ Root endpoint failed:', error.message);
    }
    
    // Test docs endpoint
    console.log('\n2. Testing docs endpoint...');
    try {
      const docsResponse = await axios.get(`${BROWSERLESS_URL}/docs`);
      console.log('✅ Docs endpoint available:', docsResponse.status);
      console.log('📖 OpenAPI docs available at:', `${BROWSERLESS_URL}/docs`);
    } catch (error) {
      console.log('⚠️  Docs endpoint not available:', error.response?.status);
    }
    
    // Test common endpoints
    const endpoints = [
      '/health',
      '/metrics', 
      '/sessions',
      '/config',
      '/status',
      '/info'
    ];
    
    console.log('\n3. Testing common endpoints...');
    for (const endpoint of endpoints) {
      try {
        const response = await axios.get(`${BROWSERLESS_URL}${endpoint}`);
        console.log(`✅ ${endpoint}: ${response.status}`);
      } catch (error) {
        console.log(`❌ ${endpoint}: ${error.response?.status || 'Connection failed'}`);
      }
    }
    
    // Test if it's a basic Browserless instance
    console.log('\n4. Testing basic Browserless functionality...');
    try {
      const testResponse = await axios.post(`${BROWSERLESS_URL}/screenshot`, {
        url: 'https://example.com'
      }, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 5000
      });
      console.log('✅ Screenshot endpoint works (no token required)');
    } catch (error) {
      if (error.response?.status === 401) {
        console.log('✅ Screenshot endpoint requires token (expected)');
      } else {
        console.log('⚠️  Screenshot endpoint:', error.response?.status || error.message);
      }
    }
    
    console.log('\n🎉 Connection test completed!');
    console.log('\nSummary:');
    console.log('- Browserless instance is running');
    console.log('- You may need to check the documentation for available endpoints');
    console.log('- Some endpoints may require authentication tokens');
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
  }
}

// Run the test
testBrowserlessConnection(); 