import { RemoteAuthentication } from './remote-authetication'
import { HttpPostClientSpy } from '../../test/mock-http-client'

describe('RemoteAuthetication', () => {
  test('Should call HttpPostClient with correct URL', async () => {
    const url = 'any_url'
    const httpPostClientSpy = new HttpPostClientSpy()
    const sut = new RemoteAuthentication(url, httpPostClientSpy)
    await sut.auth()
    expect(httpPostClientSpy.url).toBe(url)
  })
})
