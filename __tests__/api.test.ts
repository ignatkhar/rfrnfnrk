import * as api from '../src/api'
import AdmZip from 'adm-zip'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

// Mock the action's main function
const certifyMock = jest.spyOn(api, 'certify')
const getVerificationZipMock = jest.spyOn(api, 'getVerificationZip')

describe('api', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('certify', async () => {
    const mock = new MockAdapter(axios)
    mock
      .onPost('https://certify.bloxberg.org/createBloxbergCertificate')
      .reply(200, [
        {
          mockData: ['mockData']
        }
      ])

    await api.certify('test', {
      authorName: '',
      bloxbergAddress: '',
      researchTitle: '',
      email: ''
    })
    expect(certifyMock).toHaveReturned()
  })

  it('certify error', async () => {
    const mock = new MockAdapter(axios)
    mock
      .onPost('https://certify.bloxberg.org/createBloxbergCertificate')
      .reply(200, {
        errors: ['error1', 'error2']
      })

    let res
    try {
      res = await api.certify('test', {
        authorName: '',
        bloxbergAddress: '',
        researchTitle: '',
        email: ''
      })
    } catch (e) {
      console.log(e)
    }
    expect(res).toEqual(undefined)
    expect(certifyMock).toHaveReturned()
  })

  it('getVerificationZip', async () => {
    const mock = new MockAdapter(axios)

    const mockZip = new AdmZip('./__tests__/BloxbergDataCertificatesMock.zip')
    // get everything as a buffer
    const zipFileContents = mockZip.toBuffer()
    mock
      .onPost('https://certify.bloxberg.org/generatePDF')
      .reply(200, zipFileContents, {
        'Content-Disposition':
          'attachment; filename=bloxbergResearchCertificates',
        'Content-Type': 'application/x-zip-compressed'
      })

    await api.getVerificationZip([
      {
        mockData: ['mockData']
      }
    ])
    expect(getVerificationZipMock).toHaveReturned()
  })
})
