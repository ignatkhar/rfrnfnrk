import * as api from '../src/api'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

// Mock the action's main function
const certifyMock = jest.spyOn(api, 'certify')

describe('api', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('certify', async () => {
    const mock = new MockAdapter(axios)
    mock
      .onPost('https://certify.bloxberg.org/generateJsonResponse')
      .reply(200, [
        {
          mockData: ['mockData']
        }
      ])

    try {
      await api.certify(['test'], {
        authorName: '',
        bloxbergAddress: '0x9858eC18a269EE69ebfD7C38eb297996827DDa98',
        researchTitle: '',
        email: ''
      })
    } catch (e) {
      console.log(e)
    }

    expect(certifyMock).toHaveReturned()
  })

  it('certify error', async () => {
    const mock = new MockAdapter(axios)
    mock
      .onPost('https://certify.bloxberg.org/generateJsonResponse')
      .reply(200, {
        errors: ['error1', 'error2']
      })

    let res
    try {
      res = await api.certify(['test'], {
        authorName: '',
        bloxbergAddress: '0x9858eC18a269EE69ebfD7C38eb297996827DDa98',
        researchTitle: '',
        email: ''
      })
    } catch (e) {
      console.log(e)
    }
    expect(res).toEqual(undefined)
    expect(certifyMock).toHaveReturned()
  })
})
