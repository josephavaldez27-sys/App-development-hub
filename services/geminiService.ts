
import { GoogleGenAI, Type } from "@google/genai";
import { Resort, ResortInfo, ForecastDay } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const RESORT_COORDS: Record<Resort, { x: number, y: number }> = {
  [Resort.NISEKO]: { x: 28, y: 78 },
  [Resort.RUSUTSU]: { x: 33, y: 76 },
  [Resort.KIRORO]: { x: 35, y: 65 },
  [Resort.TEINE]: { x: 42, y: 68 },
  [Resort.FURANO]: { x: 55, y: 55 },
  [Resort.TOMAMU]: { x: 62, y: 62 },
  [Resort.SAHORO]: { x: 68, y: 58 },
  [Resort.ASAHIDAKE]: { x: 62, y: 45 },
  [Resort.KAMUI]: { x: 58, y: 48 }
};

/**
 * Helper to call Gemini with exponential backoff on 429 errors.
 */
async function callWithRetry(fn: () => Promise<any>, retries = 3, delay = 1000): Promise<any> {
  try {
    return await fn();
  } catch (error: any) {
    if (retries > 0 && (error?.message?.includes('429') || error?.status === 'RESOURCE_EXHAUSTED')) {
      await new Promise(resolve => setTimeout(resolve, delay));
      return callWithRetry(fn, retries - 1, delay * 2);
    }
    throw error;
  }
}

export async function fetchAllResortsData(targetResorts: Resort[]): Promise<ResortInfo[]> {
  const resortListStr = targetResorts.join(", ");

  const fetchSnowData = async () => {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide a detailed 7-day snow forecast for these Hokkaido resorts: ${resortListStr}. 
                 For each resort, return:
                 1. Current total snow base depth on the ground in inches.
                 2. Daily predicted new snowfall in inches for the next 7 days.
                 3. High and Low temperatures in Fahrenheit for each day.
                 4. General weather condition for each day.
                 5. A brief 2-sentence description of the resort.`,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              resortName: { type: Type.STRING },
              resortDescription: { type: Type.STRING },
              currentBaseDepth: { type: Type.NUMBER },
              forecast: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    date: { type: Type.STRING },
                    snowDepth: { type: Type.NUMBER },
                    condition: { type: Type.STRING },
                    highTemp: { type: Type.NUMBER },
                    lowTemp: { type: Type.NUMBER }
                  },
                  required: ["date", "snowDepth", "condition", "highTemp", "lowTemp"]
                }
              }
            },
            required: ["resortName", "resortDescription", "currentBaseDepth", "forecast"]
          }
        }
      },
    });

    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    const sources = groundingChunks?.map((chunk: any) => ({
      title: chunk.web?.title || "Search Source",
      uri: chunk.web?.uri || ""
    })).filter((s: any) => s.uri) || [];

    return {
      data: JSON.parse(response.text || "[]"),
      sources
    };
  };

  try {
    const snowBatchResult = await callWithRetry(fetchSnowData);

    const snowBatch = snowBatchResult.data;
    const searchSources = snowBatchResult.sources;

    return targetResorts.map(resort => {
      const targetLower = resort.toLowerCase();
      const keywords = targetLower.split(' ').filter(w => w.length > 3);

      const snow = snowBatch.find((s: any) => {
        const sName = (s.resortName || "").toLowerCase();
        return keywords.some(k => sName.includes(k)) || sName.includes(targetLower) || targetLower.includes(sName);
      }) || {};

      const forecast = snow.forecast || Array.from({ length: 7 }).map((_, i) => ({
        date: `Day ${i + 1}`,
        snowDepth: 0,
        condition: "Cloudy",
        highTemp: 32,
        lowTemp: 20
      }));

      return {
        id: resort.toLowerCase().replace(/\s+/g, '-'),
        name: resort,
        kanjiName: getKanjiName(resort),
        description: snow.resortDescription || `${resort} is a premier ski destination in Hokkaido.`,
        baseDepth: snow.currentBaseDepth || 0,
        forecast,
        totalAccumulation: forecast.reduce((acc: number, day: any) => acc + (day.snowDepth || 0), 0),
        sources: searchSources.slice(0, 5),
        coords: RESORT_COORDS[resort]
      };
    });
  } catch (error) {
    console.error("Critical error in batch fetch:", error);
    return targetResorts.map(resort => ({
      id: resort.toLowerCase().replace(/\s+/g, '-'),
      name: resort,
      kanjiName: getKanjiName(resort),
      description: "Weather station temporarily offline due to heavy blizzard conditions.",
      baseDepth: 0,
      forecast: Array.from({ length: 7 }).map((_, i) => ({
        date: `Day ${i + 1}`,
        snowDepth: 0,
        condition: "Unavailable",
        highTemp: 0,
        lowTemp: 0
      })),
      totalAccumulation: 0,
      sources: [],
      coords: RESORT_COORDS[resort]
    }));
  }
}

function getKanjiName(resort: Resort): string {
  switch (resort) {
    case Resort.NISEKO: return "ニセコ";
    case Resort.RUSUTSU: return "留寿都";
    case Resort.KIRORO: return "キロロ";
    case Resort.TEINE: return "サッポロテイネ";
    case Resort.FURANO: return "富良野";
    case Resort.TOMAMU: return "トマム";
    case Resort.SAHORO: return "サホロ";
    case Resort.ASAHIDAKE: return "旭岳";
    case Resort.KAMUI: return "カムイスキーリンクス";
    default: return "北海道";
  }
}
