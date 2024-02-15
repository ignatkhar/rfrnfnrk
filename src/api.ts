import axios from 'axios'

const baseUrl = 'https://certify.bloxberg.org'
const apiKey = 'b7fe0027-b419-4b73-958d-0b3153366e7f'

export async function certify(
  data: string,
  metaData: BloxbergCertifyMetaData
  /* eslint-disable @typescript-eslint/no-explicit-any */
): Promise<any> {
  /* eslint-enable @typescript-eslint/no-explicit-any */
  console.log('executing request')
  let res
  try {
    res = await axios.post(
      `${baseUrl}/createBloxbergCertificate`,
      {
        publicKey: metaData.bloxbergAddress,
        crid: data,
        cridType: 'sha2-256',
        enableIPFS: false,
        metadataJson: JSON.stringify({
          authorName: metaData.authorName,
          researchTitle: metaData.researchTitle,
          email: metaData.email
        })
      },
      {
        headers: {
          api_key: apiKey
        }
      }
    )
  } catch (e) {
    console.log(e)
    console.log(res?.status)
  }

  console.log(res?.status)

  if (res?.data.errors !== undefined) {
    let error = ''
    for (const err of res.data.errors) {
      error = error.concat(' ', err)
    }
    throw new Error(`Error certifying data: ${error}`)
  } else {
    if (res?.status !== 200) {
      console.log(res)
      return res
    } else {
      return res.data
    }
  }
}

// Returns a zip file with a PDF file inside it. The PDF file has a JSON file attached to it.
/* eslint-disable @typescript-eslint/no-explicit-any */
export async function getVerificationZip(data: any): Promise<Buffer> {
  /* eslint-enable @typescript-eslint/no-explicit-any */
  const response = await axios.post(`${baseUrl}/generatePDF`, data, {
    responseType: 'arraybuffer',
    headers: {
      api_key: apiKey
    }
  })
  return response.data
}

interface BloxbergCertifyMetaData {
  authorName: string
  bloxbergAddress: string
  researchTitle: string
  email: string
}
