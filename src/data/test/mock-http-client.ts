import { HttpPostClient, HttpPostParams } from '../protocols/http/http-post-client'

export class HttpPostClientSpy implements HttpPostClient {
  url?: string
  body?: any
  headers: any

  async post (params: HttpPostParams): Promise<void> {
    this.url = params.url
  }
}
