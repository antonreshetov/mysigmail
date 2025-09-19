import { signatureState } from '~/store/signature'

export function useSignatureData() {
  /**
   * Generates a JSON string of the current signature state for download.
   */
  const getJsonForDownload = (): string => {
    return JSON.stringify(signatureState, null, 2)
  }

  /**
   * Loads state from a parsed JSON object into the application.
   * @param uploadedState - The object parsed from the user's uploaded JSON file.
   */
  const loadStateFromJson = (uploadedState: object) => {
    // A simple merge. For a more robust solution, you might validate
    // the uploadedState structure before merging.
    Object.assign(signatureState, uploadedState)

    // Ensure nested objects are reactive if they were replaced entirely.
    if (!signatureState.customSocialIcons)
      signatureState.customSocialIcons = {}
    if (!signatureState.socials)
      signatureState.socials = {}
  }

  return {
    getJsonForDownload,
    loadStateFromJson,
  }
}
