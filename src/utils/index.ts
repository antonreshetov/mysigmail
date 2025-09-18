export function clone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}

export function normalizeUrl(link: string) {
  const re = /^https?:|skype:|tg:|whatsapp:/
  let url

  if (re.test(link)) {
    url = link
  }
  else {
    url = `https://${link}`
  }

  return url
}
