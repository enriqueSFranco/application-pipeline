import axios, { AxiosError } from "axios"
import { JobScraping } from "../../../lib/scraper/domain/Scraper.schema"
import { ClientValidationError, InfrastructureError, NetworkError } from "../../../lib/shared/domain/errors"
import apiClient from "../../../lib/shared/infraestructure/http/apiClient"

export const jobService = {
  /**
   * Envía una URL al endpoint de scraping y devuelve los datos del trabajo.
   * @param url La URL de la vacante a scrapear.
   * @returns Un objeto con la información del trabajo.
   */
  scrapeJob: async (url: string): Promise<JobScraping | null> => {
    try {
      if (!url || url.trim() === "") {
        throw new ClientValidationError('La URL de la vacante no puede estar vacía.')
      }
      const response = await apiClient.post('/jobs/scrape', {url})

      if (response.status < 200 || response.status >= 300) {
        throw new InfrastructureError(`Error inesperado del servidor (status: ${response.status})`,
          response.status)
      }

      const data = response.data;
      if (!data || !data.job) {
        throw new InfrastructureError("Respuesta del servidor inválida o incompleta", response.status);
      }

      if (data.status === 'error' && data.message?.includes("no está soportado")) {
        throw new ClientValidationError(data.message);
      }
      return response.data
    } catch(e) {
      if (axios.isAxiosError(e)) {
        const axiosError = e as AxiosError
        if (!axiosError.response) {
          throw new NetworkError("Fallo de conexión o el servidor no respondió")
        }
        const status = axiosError.response.status
        const message = axiosError.response.data?.message || "Error desconocido del servidor"

        if (status >= 500) {
          throw new InfrastructureError(message, status)
        }
        if (status >= 400 && status < 500) {
          throw new ClientValidationError(message)
        }
      }
      throw new InfrastructureError("Error inesperado en el frontend", 500)
    }
  },
}
