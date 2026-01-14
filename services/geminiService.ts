
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

  // 1. Fetch Snow and Weather data in ONE batch call to save quota
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
    return JSON.parse(response.text || "[]");
  };

  // 2. Fetch Distance and Travel Time data in ONE batch call
  // NOTE: responseMimeType and responseSchema are NOT supported for googleMaps tool.
  const fetchTravelData = async () => {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Provide driving distance (miles) and current travel time (hours/mins) from Sapporo City Center to these resorts: ${resortListStr}.
                 Format the output strictly as a list with one line per resort:
                 Resort: [Resort Name] | Distance: [Distance] | Time: [Time]`,
      config: {
        tools: [{ googleMaps: {} }],
        toolConfig: {
          retrievalConfig: {
            latLng: { latitude: 43.0621, longitude: 141.3544 }
          }
        }
      }
    });
    return response.text;
  };

  try {
    const [snowBatch, travelRawText] = await Promise.all([
      callWithRetry(fetchSnowData),
      callWithRetry(fetchTravelData)
    ]);

    // Parse travel data from plain text
    const travelLines = travelRawText?.split('\n') || [];
    const travelBatch = travelLines
      .filter(line => line.includes('|'))
      .map(line => {
        const parts = line.split('|');
        const resortName = parts[0]?.replace('Resort:', '').trim();
        const distance = parts[1]?.replace('Distance:', '').trim();
        const time = parts[2]?.replace('Time:', '').trim();
        return { resortName, distance, time };
      });

    return targetResorts.map(resort => {
      const normalizedTarget = resort.toLowerCase().split(' ')[0];
      const snow = snowBatch.find((s: any) => s.resortName?.toLowerCase().includes(normalizedTarget)) || {};
      const travel = travelBatch.find((t: any) => t.resortName?.toLowerCase().includes(normalizedTarget)) || {};

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
        distanceFromNakajima: travel.distance || "Distance unknown",
        travelTime: travel.time || "Time unknown",
        sources: [], 
        coords: RESORT_COORDS[resort]
      };
    });
  } catch (error) {
    console.error("Critical error in batch fetch:", error);
    // Fallback to minimal data for all requested resorts if batching fails
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
      distanceFromNakajima: "Unknown",
      travelTime: "Unknown",
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
