class ApiError extends Error{
    constructor(status, message) {
        super();
        this.status = status
        this.message = message
    }

    static badRequest(message) { // некорректный запрос или запрос не может быть обработан сервером из-за синтаксических ошибок, отсутствия обязательных полей
        return new ApiError(400, message)
    }

    static internal(message) {
        return new ApiError(500, message) // внутренняя ошибка сервера
    }

    static forbidden(message) {  // unauthorized
        return new ApiError(403, message)
    }
}

module.exports = ApiError