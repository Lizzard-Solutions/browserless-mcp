import axios from 'axios';

const BROWSERLESS_URL = 'http://172.22.0.1:3000';

async function testContent() {
  console.log('Testing content extraction...');
  
  try {
    const response = await axios.post(`${BROWSERLESS_URL}/content`, {
      url: 'https://httpbin.org/html'
    }, {
      timeout: 15000
    });
    
    console.log('✅ Content extracted successfully!');
    console.log('Response status:', response.status);
    console.log('Content length:', response.data?.length || 'N/A');
    console.log('First 200 characters:', response.data?.substring(0, 200));
    
  } catch (error) {
    console.error('❌ Content extraction failed:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      if (error.response.data) {
        console.error('Error details:', error.response.data);
      }
    }
  }
}

testContent(); 