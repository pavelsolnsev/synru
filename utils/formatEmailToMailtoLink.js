export default function formatEmailToMailtoLink(email) {
  if (typeof email !== 'string') return email

  return `<a href="mailto:${email}">${email}</a>`
}