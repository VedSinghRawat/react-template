export class LocalStorageService {
  private static _instance: LocalStorageService

  static getInstance(): LocalStorageService {
    if (!this._instance) {
      this._instance = new LocalStorageService()
    }

    return this._instance
  }

  static KEYS: Record<string, string | ((...args: any) => string)> = {}

  setValue(key: string, value: unknown) {
    localStorage.setItem(key, typeof value !== 'string' ? JSON.stringify(value) : value)
  }

  getValue(key: string) {
    return localStorage.getItem(key)
  }

  getObj<T>(key: string) {
    const val = this.getValue(key)

    if (val) {
      return JSON.parse(val) as T
    }
  }

  removeValue(key: string) {
    localStorage.removeItem(key)
  }
}

export const localStorageService = LocalStorageService.getInstance()
