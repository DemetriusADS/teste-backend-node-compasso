class AppError {
  public readonly message: string;

  public readonly status: number;

  constructor(message: string, status = 400) {
    this.status = status;
    this.message = message;
  }
}

export default AppError;
