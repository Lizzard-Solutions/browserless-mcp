import axios from 'axios';
import fs from 'fs';

const BROWSERLESS_URL = 'http://172.22.0.1:3000';

async function testScreenshot() {
  console.log('Testing screenshot functionality...');
  
  try {
    const response = await axios.post(`${BROWSERLESS_URL}/screenshot`, {
      url: 'https://example.com',
      options: {
        type: 'png',
        fullPage: false
      }
    }, {
      responseType: 'arraybuffer',
      timeout: 30000
    });
    
    console.log('✅ Screenshot taken successfully!');
    console.log('Response size:', response.data.length, 'bytes');
    console.log('Content type:', response.headers['content-type']);
    
    // Save the screenshot
    const filename = 'test-screenshot.png';
    fs.writeFileSync(filename, response.data);
    console.log(`📸 Screenshot saved as: ${filename}`);
    
  } catch (error) {
    console.error('❌ Screenshot failed:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Headers:', error.response.headers);
      if (error.response.data) {
        try {
          const errorText = error.response.data.toString();
          console.error('Error details:', errorText);
        } catch (e) {
          console.error('Error data (binary)');
        }
      }
    }
  }
}

testScreenshot(); 