/**
 * Unit tests for the action's main functionality, src/main.ts
 *
 * These should be run as if the action was called from a workflow.
 * Specifically, the inputs listed in `action.yml` should be set as environment
 * variables following the pattern `INPUT_<INPUT_NAME>`.
 */

import * as core from '@actions/core'
import * as main from '../src/main'
import AdmZip from 'adm-zip'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

// Mock the action's main function
const runMock = jest.spyOn(main, 'run')

// Mock the GitHub Actions core library
let errorMock: jest.SpyInstance
let getInputMock: jest.SpyInstance
let setOutputMock: jest.SpyInstance

describe('action', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    errorMock = jest.spyOn(core, 'error').mockImplementation()
    getInputMock = jest.spyOn(core, 'getInput').mockImplementation()
    setOutputMock = jest.spyOn(core, 'setOutput').mockImplementation()

    const mock = new MockAdapter(axios)
    mock
      .onPost('https://certify.bloxberg.org/createBloxbergCertificate')
      .reply(200, [
        {
          mockData: ['mockData']
        }
      ])

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
  })

  it('sets the certificateVerification output', async () => {
    // Set the action's inputs as return values from core.getInput()
    getInputMock.mockImplementation((name: string): string => {
      switch (name) {
        case 'authorName':
          return 'mockName'
        case 'bloxbergAddress':
          return 'mockAddress'
        case 'researchTitle':
          return 'mockTitle'
        case 'email':
          return 'mockEmail'
        default:
          return ''
      }
    })

    await main.run()
    expect(runMock).toHaveReturned()

    expect(setOutputMock).toHaveBeenCalledTimes(1)
    expect(errorMock).not.toHaveBeenCalled()
  })
})
