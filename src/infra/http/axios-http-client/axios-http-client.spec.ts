import { AxiosHttpClient } from './axios-http-client'

import axios from 'axios'
import faker from '@faker-js/faker'

import { HttpPostParams } from '@/data/protocols/http'

jest.mock('axios')
const mockedObject = { keyA: 'valueA', keyB: 42 }

const mockedAxiosResult = {
  data: faker.random.objectElement(mockedObject),
  status: faker.datatype.number()
}

const mockedAxios = axios as jest.Mocked<typeof axios>
mockedAxios.post.mockResolvedValue(mockedAxiosResult)

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}

const mockPostRequest = (): HttpPostParams<any> => {
  return {
    url: faker.internet.url(),
    body: faker.random.objectElement(mockedObject)
  }
}

describe('AxiosHttpClient', () => {
  test('Should call axios with correct values', async () => {
    const request = mockPostRequest()
    const sut = makeSut()

    await sut.post(request)

    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })

  test('Should returns the correct statusCode and body', async () => {
    const sut = makeSut()

    const httpResponse = await sut.post(mockPostRequest())

    expect(httpResponse).toEqual({
      statusCode: mockedAxiosResult.status,
      body: mockedAxiosResult.data
    })
  })
})
