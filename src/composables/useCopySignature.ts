const { sonner } = useSonner()

const html = ref('')
const isHtmlLarge = computed(() => html.value.length > 10000)

async function checkClipboardPermission() {
  try {
    const permission = await navigator.permissions.query({
      name: 'clipboard-write' as PermissionName,
    })
    return permission.state !== 'denied'
  }
  catch {
    // для Safari и Firefox т.к. не поддерживают clipboard-write
    return true
  }
}

function getHtml() {
  const el = document.querySelector('[data-slot="signature"]')
  if (!el)
    return

  html.value = el.outerHTML.replace(/<!--v-if-->/g, '')
}

async function onCopySelect() {
  const el = document.querySelector('[data-slot="signature"]')
  if (!el)
    return

  const html = el.outerHTML
  const plainText = el.textContent || ''

  try {
    const permission = await checkClipboardPermission()

    if (!permission) {
      sonner({
        title: 'Oops! Something went wrong.',
        type: 'error',
        description: 'You need to allow clipboard access to copy the signature.',
      })
      return
    }

    await navigator.clipboard.write([
      new ClipboardItem({
        'text/html': new Blob([html], { type: 'text/html' }),
        'text/plain': new Blob([plainText], { type: 'text/plain' }),
      }),
    ])

    sonner({
      title: 'Success',
      type: 'success',
      description: 'Signature copied to clipboard.',
    })
  }
  catch (err) {
    if (err instanceof Error && err.name === 'NotAllowedError') {
      sonner({
        title: 'Oops! Something went wrong.',
        type: 'error',
        description: 'You need to allow clipboard access to copy the signature.',
      })
    }
  }
}

async function onCopyHTML() {
  const el = document.querySelector('[data-slot="signature"]')
  if (!el)
    return

  try {
    const permission = await checkClipboardPermission()

    if (!permission) {
      sonner({
        title: 'Oops! Something went wrong.',
        type: 'error',
        description: 'You need to allow clipboard access to copy the signature.',
      })
      return
    }

    getHtml()
    await navigator.clipboard.writeText(html.value)

    sonner({
      title: 'Success',
      type: 'success',
      description: 'Signature copied to clipboard.',
    })
  }
  catch (err) {
    console.error(err)
  }
}

export function useCopySignature() {
  return {
    isHtmlLarge,
    onCopySelect,
    onCopyHTML,
    getHtml,
  }
}
