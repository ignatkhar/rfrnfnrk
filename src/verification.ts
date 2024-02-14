import AdmZip from 'adm-zip'
// this needs to be imported with require otherwise Jest will not import the package and leave it undefined. Also
// the package version is pinned to 3.11.174 because newer versions use .mjs files that are not yet fully supported
// with jest https://jestjs.io/docs/ecmascript-modules.
var pdfjs = require('pdfjs-dist')

export async function extractVerificationJson(zipDataBuffer: Buffer): Promise<string> {
  let zip = new AdmZip(zipDataBuffer);
  let zipEntries = zip.getEntries();

  // only look at the first file. There should be only one file.
  let pdfFile = zipEntries[0];
  if (pdfFile) {
    let pdfDocument,pdfAttachments
    try {
      let pdfData  = new Uint8Array(pdfFile.getData())
      pdfDocument = await pdfjs.getDocument(pdfData).promise
      pdfAttachments = await pdfDocument.getAttachments();
      // pdfAttachments is an object that has the zipped file names as properties
      return new TextDecoder().decode(pdfAttachments.bloxbergJSONCertificate.content)
    } catch (e) {
      throw Error("There was a problem extracting the JSON attachment of the PDF file.")
    }
  } else {
    throw Error("There was no file inside the zip.")
  }
}