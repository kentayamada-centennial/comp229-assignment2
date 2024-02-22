export const getErrorMessage = (message, error) => {
  return { message, "error": error.errors }
}

export const getMessage = (message, data) => {
  return { message, data }
}
