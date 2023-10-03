class AppError extends Error {
    status = 400;
    constructor(error, status, stack) {
        super();
        console.error("\n⚠️ Erro ao executar: ", error)
        this.error = error.message || error.error || error;
        this.stack = stack || error.stack || "Stack não disponivel";
        this.status = status || error.status || 400;
    }
}

module.exports = { AppError }