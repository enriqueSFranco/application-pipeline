/**
 * Application Dependency Injection Module
 * ---------------------------------------
 * Este módulo centraliza la configuración de dependencias del dominio (Applications)
 * Su responsabilidad es decidir que implementación de persistencia usar (API, LocalStorage, ect)
 * y ensamblar los casos de uso con sus dependencias
 *
 * Patrón aplicado: Inversión de Dependencias (Dependency Inversion Principle)
 * Beneficio: Permite intercambiar infraestructuras sin modificar la lógica de negocio.
 *
 * @author Enrique SF
 * @module ApplicationModule
 * @since  2025-10
 */
import { IJobApplicationRepository } from "../application/ports/IJobApplicationRepository";
import { GetApplicationsUseCase } from "../application/use-cases/GetAllApplications.usecase";
import { RemoveApplicationUseCase } from "../application/use-cases/RemoveApplication.usecase";
import { SaveApplicationUseCase } from "../application/use-cases/SaveApplication.usecase";
import { GraphqlAdapter } from "../infraestructure/persistence/graphql/Graphql.adapter";
import { InMemoryAdapter } from "../infraestructure/persistence/InMemory.adapter";

export const applicationDI = new Map()

const PERSISTENCE_MODE = import.meta.env.VITE_PERSISTENCE_MODE || 'API'

console.log(`Application Module DI: Using persistence mode: ${PERSISTENCE_MODE}`);

let repository: IJobApplicationRepository
if (PERSISTENCE_MODE === 'MOCK_LOCAL_STORAGE') {
  repository = new InMemoryAdapter()
} else {
  repository = new GraphqlAdapter()
}
console.log("DI initialized. Repository type:", repository.constructor.name);

applicationDI.set('ApplicationRepositoryPort', repository)

// Registramos los casos de uso
const getApplicationsUseCase = new GetApplicationsUseCase(applicationDI.get('ApplicationRepositoryPort'))
applicationDI.set('GetApplicationUseCase', getApplicationsUseCase)

const saveApplicationUseCase = new SaveApplicationUseCase(applicationDI.get('ApplicationRepositoryPort'))
applicationDI.set('SaveApplicationUseCase', saveApplicationUseCase)

const removeApplicationUseCase = new RemoveApplicationUseCase(applicationDI.get('ApplicationRepositoryPort'))
applicationDI.set('RemoveApplicationUseCase', removeApplicationUseCase)

export const applicationModule = {
  get: <T>(key: string): T => applicationDI.get(key) as T,
  getApplicationsUseCase: getApplicationsUseCase,
  saveApplicationUseCase: saveApplicationUseCase,
  removeApplicationUseCase: removeApplicationUseCase
}

export default applicationDI
