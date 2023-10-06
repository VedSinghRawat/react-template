/* eslint-disable @typescript-eslint/ban-ts-comment */
import axios, { AxiosError, AxiosRequestConfig, AxiosRequestHeaders } from 'axios'
import { matchPath, PathMatch } from 'react-router'

type APIMethods = 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT'
const authUrls: string[] = []

export class ApiService {
  private static instance: ApiService

  public static getInstance(): ApiService {
    if (!this.instance) {
      this.instance = new ApiService()
    }
    return this.instance
  }

  public API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string

  private async request<T>(urlSuffix: string, method: APIMethods, config: AxiosRequestConfig<T> = {}, headers?: AxiosRequestHeaders, data?: unknown) {
    try {
      const response = await axios.request({
        withCredentials: true,
        method,
        data,
        baseURL: this.API_BASE_URL + urlSuffix,
        ...config,
        headers,
      })

      return response.data as T
    } catch (error) {
      const err = error as AxiosError

      let match: PathMatch<string> | null = null

      for (let i = 0; i < authUrls.length; i++) {
        const route = authUrls[i]!
        match = matchPath(route, window.location.pathname)
        if (match) break
      }

      if (err.response?.status === 401 && !match) window.location.pathname = '/'

      throw err
    }
  }

  async get<T>(urlSuffix: string, config?: AxiosRequestConfig<T>, headers?: AxiosRequestHeaders) {
    return await this.request<T>(urlSuffix, 'GET', config, headers)
  }

  async post<T>(urlSuffix: string, data?: unknown, config?: AxiosRequestConfig<T>, headers?: AxiosRequestHeaders) {
    return await this.request<T>(urlSuffix, 'POST', config, headers, data)
  }

  async delete<T>(urlSuffix: string, config?: AxiosRequestConfig<T>, headers?: AxiosRequestHeaders) {
    return await this.request<T>(urlSuffix, 'DELETE', config, headers)
  }

  async patch<T>(urlSuffix: string, data?: unknown, config?: AxiosRequestConfig<T>, headers?: AxiosRequestHeaders) {
    return await this.request<T>(urlSuffix, 'PATCH', config, headers, data)
  }

  async put<T>(urlSuffix: string, data?: unknown, config?: AxiosRequestConfig<T>, headers?: AxiosRequestHeaders) {
    return await this.request<T>(urlSuffix, 'PUT', config, headers, data)
  }
}

export const apiService = ApiService.getInstance()
