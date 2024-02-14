import * as verification from '../src/verification'
import AdmZip from 'adm-zip'

// Mock the action's main function
const extractVerificationJsonMock = jest.spyOn(verification, 'extractVerificationJson')

describe('verification', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('getVerificationZip', async () => {
    var mockZip = new AdmZip('./__tests__/BloxbergDataCertificatesMock.zip');
    // get everything as a buffer
    var zipFileContents = mockZip.toBuffer();

    await verification.extractVerificationJson(zipFileContents)
    expect(extractVerificationJsonMock).toHaveReturned()
  })
})