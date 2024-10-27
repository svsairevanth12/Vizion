import axios from 'axios';

const API_KEY = 'AIzaSyBzDsbR0CsrgN41Wubg480eqPSBxWlS_fI';
const API_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent';

export async function analyzeImage(image: File, prompt: string): Promise<string> {
  try {
    // Convert image to base64
    const base64Image = await fileToBase64(image);
    
    const payload = {
      contents: [{
        parts: [
          {
            text: prompt
          },
          {
            inline_data: {
              mime_type: image.type,
              data: base64Image.split(',')[1]
            }
          }
        ]
      }],
      safety_settings: {
        category: "HARM_CATEGORY_HARASSMENT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE"
      }
    };

    const response = await axios.post(`${API_URL}?key=${API_KEY}`, payload);
    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error analyzing image:', error);
    throw new Error('Failed to analyze image. Please try again.');
  }
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}