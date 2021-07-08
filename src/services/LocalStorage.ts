const TOKEN = 'token'

const TokenService = {
  get(): string {
    const token = localStorage.getItem(TOKEN)
    return token ? token : ''
  },
  set(value: string) {
    localStorage.setItem(TOKEN, value)
  },
  remove() {
    localStorage.removeItem(TOKEN)
  },
}

export { TokenService }
