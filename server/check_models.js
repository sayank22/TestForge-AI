// server/check_models.js
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

console.log("🔍 Checking available models for your API Key...");

async function checkModels() {
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      console.error("❌ API Error:", data.error.message);
      return;
    }

    if (!data.models) {
      console.log("⚠️ No models found. Check your API key permissions.");
      return;
    }

    console.log("\n✅ AVAILABLE MODELS:");
    const flashModels = data.models.filter(m => m.name.includes('flash'));
    
    if (flashModels.length > 0) {
        console.log("--- FLASH MODELS (Best for you) ---");
        flashModels.forEach(m => console.log(`• ${m.name.replace('models/', '')}`));
    }
    
    console.log("\n--- ALL OTHERS ---");
    data.models.forEach(m => {
        if(!m.name.includes('flash')) console.log(`• ${m.name.replace('models/', '')}`);
    });

  } catch (error) {
    console.error("❌ Network Error:", error.message);
  }
}

checkModels();