export abstract class CustomError extends Error {
  public readonly isOperational: boolean; // Útil para logging y decidir si es seguro mostrar al usuario
  public readonly httpCode?: number; // Codigo HTTP asociado al error
  constructor(message: string, name: string, isOperational: boolean, httpCode: number) {

    super(message)
    this.name = name
    this.isOperational = isOperational
    this.httpCode = httpCode
    Object.setPrototypeOf(this, CustomError.prototype)
  }

  abstract serializeErrors(): {message: string, field?: string}[]
}

export class InfrastructureError extends CustomError {
  constructor(message: string, httpCode: number = 500, isOperational: boolean = false) {
    super(message, "InfrastructureError", isOperational, httpCode)
    this.name = "InfraestrucutureError"
  }

  serializeErrors(): { message: string; field?: string; }[] {
    return [{message: this.message}]
  }
}
export class NetworkError extends InfrastructureError {
  constructor(message: string = "Network connection failed", isOperational:boolean = false) {
    super(message, 0, isOperational)
    this.name = "NetworkError"
  }
}

export class DomainError extends CustomError {
  constructor(message: string, httpCode: number, isOperational: boolean = false) {
    super(message, "DomainError", isOperational, httpCode);
  }

  serializeErrors(): { message: string; field?: string; }[] {
    return [{message: this.message}]
  }
}

export class NotFoundError extends DomainError {
  constructor(message: string = "Resource not found.", httpCode: number, isOperational:boolean = false) {
    super(message, httpCode, isOperational);
    this.name = "NotFoundError";
  }
}

export class ClientValidationError extends DomainError {
  constructor(message: string = "Validation failed.") {
    super(message, 400, true);
    this.name = "ClientValidationError";
  }
}
