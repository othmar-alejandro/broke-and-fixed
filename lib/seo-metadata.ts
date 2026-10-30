const DEFAULT_MAX_DESCRIPTION_LENGTH = 158

export function metaDescription(text: string, maxLength = DEFAULT_MAX_DESCRIPTION_LENGTH) {
  const clean = text.replace(/\s+/g, " ").trim()

  if (clean.length <= maxLength) return clean

  const sentenceBreak = clean.slice(0, maxLength + 1).search(/[.!?](?=\s|$)/)
  if (sentenceBreak >= 90) return clean.slice(0, sentenceBreak + 1)

  const cutoff = clean.slice(0, maxLength - 1).lastIndexOf(" ")
  const end = cutoff >= 90 ? cutoff : maxLength - 1
  return `${clean.slice(0, end).replace(/[,:;\s]+$/, "")}.`
}
