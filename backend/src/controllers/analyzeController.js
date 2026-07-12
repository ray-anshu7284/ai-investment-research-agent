import { generateInvestmentReport } from "../services/langchainService.js";

// Simple in-memory fallback cache in case MongoDB is offline
const inMemoryCache = new Map();

// Standardize cache key creation
function getCacheKey(company, model, temp) {
  return `${company.toLowerCase()}:${model}:${temp}`;
}

/**
 * Controller to handle company analysis requests.
 * Orchestrates caching check, calls LangChain for report generation, and caches results.
 */
export async function analyzeCompanyController(req, res, next) {
  try {
    const {
      company,
      apiKey,
      tavilyApiKey,
      model: requestedModel = "llama-3.3-70b-versatile",
      temperature = 0.2,
    } = req.body;

    // Guard: replace any decommissioned Groq models with current default
    const DECOMMISSIONED = ["llama-3.1-70b-versatile", "llama-2-70b-4096", "mixtral-8x7b-32768"];
    const model = DECOMMISSIONED.includes(requestedModel) ? "llama-3.3-70b-versatile" : requestedModel;
    if (DECOMMISSIONED.includes(requestedModel)) {
      console.warn(`[Controller] Decommissioned model "${requestedModel}" requested — switching to llama-3.3-70b-versatile`);
    }

    const normalizedCompany = company.trim();
    const cacheKey = getCacheKey(normalizedCompany, model, temperature);

    console.log(
      `[Controller] Starting analysis for: "${normalizedCompany}" using model: "${model}" (temp: ${temperature})`
    );

    // 1. Check in-memory cache
    if (inMemoryCache.has(cacheKey)) {
      console.log(`[Cache Hit] Serving cached report from Memory for: "${normalizedCompany}"`);
      const cachedData = inMemoryCache.get(cacheKey);
      return res.status(200).json({
        success: true,
        source: "cache_memory",
        data: cachedData,
      });
    }

    // 2. Cache Miss: Generate new report via LangChain & Groq
    console.log(`[Cache Miss] Initiating AI agent research for: "${normalizedCompany}"`);
    const generatedReport = await generateInvestmentReport({
      company: normalizedCompany,
      apiKey,
      tavilyApiKey,
      model,
      temperature,
    });

    // 3. Store in cache (In-Memory only)
    inMemoryCache.set(cacheKey, generatedReport);
    console.log(`[Cache Save] Saved report for "${normalizedCompany}" in Memory.`);

    return res.status(200).json({
      success: true,
      source: "ai_generation",
      data: generatedReport,
    });
  } catch (error) {
    next(error);
  }
}
