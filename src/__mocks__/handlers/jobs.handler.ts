import { http, HttpResponse, delay } from "msw";
import mockJobScraping from "../jobScraping.json";
import mockJobScrapingError from "../jobScrapingError.json"

// helper
const simulateNetworkLatency = async (min = 300, max = 1200) => {
  await delay(Math.random() * (max - min) + min)
}

export const jobHandlers = [
  http.post("http://localhost:8000/jobs/scrape", async ({ request }) => {
    const body = (await request.json()) as { url: string };
    if (!body.url) {
      return HttpResponse.json(
        {
          error: true,
          message: "Falta el parámetro 'url'.",
          status: "error",
        },
        { status: 422 }
      );
    }
    const url = body.url;
    console.log("🔍 Mock scraper recibido:", url);

    await simulateNetworkLatency()

    if (url.includes("occ.com.mx")) {
      const mockOccJobs = mockJobScraping["occ"]
      if (mockOccJobs.length > 1) {
        for (const it of mockOccJobs) {
          const {job} = it
          if (job.url === url) return HttpResponse.json(it, { status: 200 });
        }
      }
      return HttpResponse.json(mockOccJobs, { status: 200 });
    }

    if (url.includes("indeed.com")) {
      const mockIndeedJobs = mockJobScraping["indeed"]
      if (mockIndeedJobs.length > 1) {
        for (const it of mockIndeedJobs) {
          const {job} = it
          if (job.url === url) return HttpResponse.json(it, { status: 200 });
        }
      }
      return HttpResponse.json(mockIndeedJobs, { status: 200 });
    }

    return HttpResponse.json(mockJobScrapingError, {status: 400})
  }),
];
