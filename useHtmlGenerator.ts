import { getIconData } from '@iconify/utils/lib/loader/index'
import { iconToSVG } from '@iconify/utils/lib/svg/build'

import { signatureState } from '~/store/signature'

/**
 * Converts an SVG string to a Base64-encoded data URI.
 * @param svgString The raw SVG code.
 * @returns A data URI string.
 */
function svgToDataUri(svgString: string): string {
  // btoa() is available in browser environments.
  return `data:image/svg+xml;base64,${btoa(svgString)}`
}

/**
 * Generates the final, email-safe HTML for the signature.
 * It replaces icon placeholders with embedded <img> tags.
 * @param previewHtml The innerHTML of the live preview element.
 * @returns A promise that resolves to the final HTML string.
 */
export async function generateFinalHtml(previewHtml: string): Promise<string> {
  const domParser = new DOMParser()
  const doc = domParser.parseFromString(previewHtml, 'text/html')

  // Find all icon placeholders (divs with classes like i-mdi-github)
  const iconPlaceholders = doc.body.querySelectorAll('[class*="i-"]')

  for (const placeholder of iconPlaceholders) {
    const classList = Array.from(placeholder.classList)
    const iconClass = classList.find(c => c.startsWith('i-'))

    if (!iconClass)
      continue

    // e.g., 'i-custom-social-github' -> ['i', 'custom', 'social', 'github']
    // e.g., 'i-mdi-github' -> ['i', 'mdi', 'github']
    const parts = iconClass.split('-')
    const isCustom = parts[1] === 'custom' && parts[2] === 'social'

    const collection = isCustom ? 'custom-social' : parts[1]
    const name = isCustom ? parts[3] : parts[2]

    let svgString: string | undefined

    if (collection === 'custom-social' && signatureState.customSocialIcons[name]) {
      // 1. It's a custom icon. Get the SVG from our state.
      svgString = signatureState.customSocialIcons[name]
    }
    else {
      // 2. It's a default Iconify icon. Fetch its data.
      const iconData = await getIconData(collection, name)
      if (iconData) {
        // Build a full SVG from the Iconify data.
        const svgData = iconToSVG(iconData, { height: '24px', width: '24px' })
        svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="${svgData.attributes.width}" height="${svgData.attributes.height}" viewBox="0 0 ${iconData.width || 24} ${iconData.height || 24}">${svgData.body}</svg>`
      }
    }

    if (svgString) {
      // 3. Replace the placeholder div with an email-safe <img> tag.
      const img = document.createElement('img')
      img.src = svgToDataUri(svgString)
      img.width = 24 // Or make this configurable
      img.height = 24
      img.alt = `${name} icon`
      img.style.border = '0'
      img.style.display = 'block'

      placeholder.parentNode?.replaceChild(img, placeholder)
    }
  }

  // 4. Return the cleaned, final HTML string.
  return doc.body.innerHTML
}
