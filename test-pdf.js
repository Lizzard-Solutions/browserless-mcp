import axios from 'axios';
import fs from 'fs';

const BROWSERLESS_URL = 'http://172.22.0.1:3000';

async function testPDF() {
  console.log('Testing PDF generation...');
  
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
    
    console.log('✅ PDF generated successfully!');
    console.log('Response size:', response.data.length, 'bytes');
    console.log('Content type:', response.headers['content-type']);
    
    // Save the PDF
    const filename = 'test-document.pdf';
    fs.writeFileSync(filename, response.data);
    console.log(`📄 PDF saved as: ${filename}`);
    
  } catch (error) {
    console.error('❌ PDF generation failed:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
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

testPDF(); 