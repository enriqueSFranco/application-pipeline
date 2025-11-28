import initialMockData from "../../../../__mocks__/applications.json";
import { IJobApplicationRepository } from "../../application/ports/IJobApplicationRepository";
import { JobApplication } from "../../domain/JobApplication.schema";

const STORAGE_KEY = "job_applications_mock_data";

const readData = (): JobApplication[] => {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      writeData(initialMockData);
      return initialMockData;
    }

    const parsed = JSON.parse(stored);

    if (!Array.isArray(parsed)) {
      console.warn(
        `Invalid data format in localStorage for key "${STORAGE_KEY}"`
      );
      writeData(initialMockData);
      return initialMockData;
    }
    return parsed;
  } catch (e) {
    console.error(
      `[readData] Error reading from localStorage (${STORAGE_KEY}):`,
      e
    );
    return [];
  }
};

const writeData = (data: JobApplication[]) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Error writing data to localStorage:", e);
  }
};

export class InMemoryAdapter implements IJobApplicationRepository {
  private cache: JobApplication[] = [];
  private idIndex = new Map<string, JobApplication>();

  constructor() {
    this.loadCache();
  }

  private loadCache() {
    const apps = readData();
    this.cache = apps;
    this.rebuildIndex();
  }

  private persist() {
    writeData(this.cache);
  }

  private rebuildIndex() {
    this.idIndex.clear();
    for (const app of this.cache) {
      this.idIndex.set(app.id, app);
    }
  }

  async getAll(): Promise<JobApplication[]> {
    console.log("findAll se ejecuto con: ", this.cache);
    return Promise.resolve(this.cache);
  }
  // async findById(id: string): Promise<JobApplication | null> {
  //   const found = this.idIndex.get(id.id) || null;
  //   return Promise.resolve(found);
  // }
  async create(input: {company: string, position: string}): Promise<JobApplication> {
    const newJobApplication: JobApplication = {
      ...input,
      appliedAt: new Date(),
      updatedAt: new Date(),
    };
    this.cache.push(newJobApplication);
    this.idIndex.set(newJobApplication.id, newJobApplication);
    this.persist();
    return Promise.resolve(newJobApplication);
  }

  async updateStatus(id: string, status: string): Promise<JobApplication> {

  }
}

/**
Extensión opcional: Búsqueda por texto a escala
Búsqueda por texto (“desarrollador React México”):
Trie: para búsquedas por prefijo (rápido para autocompletado).
Inverted Index (Diccionario invertido): mapea palabra → lista de IDs.
Algoritmo clásico usado por motores de búsqueda (Lucene, Elastic, etc.)
Ejemplo: "react" → [id_12, id_57, id_102].
Eso permitiría búsquedas full-text en miles/millones de registros sin recorrer el array
 */
