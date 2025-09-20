import type { AnchorHTMLAttributes } from 'vue'

import type { BasicTool } from '@/composables/signatures/types'

import { normalizeUrl } from '@/utils'

interface AnchorAttrsOptions {
  color: string
  enableAnalytics?: boolean
  analyticTag?: string
}

export function getAnchorAttrs(
  tool: BasicTool,
  options: AnchorAttrsOptions,
): AnchorHTMLAttributes | undefined {
  const attrs: Record<string, any> = {
    style: {
      color: options.color,
    },
  }

  let href = tool.value

  if (tool.type === 'link') {
    href = normalizeUrl(href)
  }
  else if (tool.type === 'email') {
    href = `mailto:${href}`
  }
  else if (tool.type === 'phone') {
    href = `tel:${href}`
  }

  attrs.href = href
  return attrs
}
