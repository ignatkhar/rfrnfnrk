import * as core from '@actions/core'
import * as github from '@actions/github'
import { certify } from './api'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const authorName: string = core.getInput('authorName')
    const bloxbergAddress: string = core.getInput('bloxbergAddress')
    const researchTitle: string = core.getInput('researchTitle')
    const email: string = core.getInput('email')

    // Debug logs are only output if the `ACTIONS_STEP_DEBUG` secret is true
    core.debug(`Input listing:`)
    core.debug(`  authorName: ${authorName}`)
    core.debug(`  bloxbergAddress: ${bloxbergAddress}`)
    core.debug(`  researchTitle: ${researchTitle}`)
    core.debug(`  email: ${email}`)

    // Certify commit hash
    let verificationJson = await certify([github.context.sha], {
      authorName,
      bloxbergAddress,
      researchTitle,
      email
    })

    core.debug(`Output 'verificationJson': ${verificationJson}`)

    verificationJson = JSON.stringify(verificationJson)
    verificationJson = verificationJson.replace(/"/g, '\\"')
    // Set outputs for other workflow steps to use
    core.setOutput('certificateVerification', verificationJson)
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error)
      core.setFailed(`Commit hash could not been certified: ${error.message}`)
  }
}
