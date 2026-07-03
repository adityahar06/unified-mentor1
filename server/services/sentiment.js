const axios = require('axios');

/**
 * Analyzes the sentiment of a given text using Groq AI
 * @param {string} text - The review text
 * @returns {Promise<Object>} { label: 'POSITIVE' | 'NEGATIVE', score: number }
 */
const analyzeSentiment = async (text) => {
  try {
    console.log(`Attempting sentiment analysis with Groq (llama-3.3-70b-versatile)...`);
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama-3.3-70b-versatile',
        messages: [
          { 
            role: 'system', 
            content: 'You are a strict sentiment analysis AI. Analyze the user\'s review. Respond with exactly one word: POSITIVE or NEGATIVE. Do not say anything else.' 
          },
          { 
            role: 'user', 
            content: text 
          }
        ],
        temperature: 0.1
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const reply = response.data.choices[0].message.content.trim().toUpperCase();
    console.log(`Success with Groq: AI says ${reply}`);
    
    const score = 0.99; 
    
    if (reply.includes('NEGATIVE')) {
      return { label: 'NEGATIVE', score };
    } else {
      return { label: 'POSITIVE', score };
    }

  } catch (error) {
    console.error(`Failed with Groq:`, error.response?.data?.error?.message || error.message);
    
    // FALLBACK: If the API key is missing or network fails
    console.log("Groq API failed. Using local fallback simulation...");
    const textLower = text.toLowerCase();
    const negativeWords = ['terrible', 'worst', 'garbage', 'ruined', 'hate', 'awful', 'bad', 'scam', 'horrible', 'broken', 'poor', 'disappointed'];
    const hasNegative = negativeWords.some(word => textLower.includes(word));
    
    return {
      label: hasNegative ? 'NEGATIVE' : 'POSITIVE',
      score: 0.99
    };
  }
};

module.exports = { analyzeSentiment };
