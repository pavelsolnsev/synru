export default function formatPhoneToTelLink(phone) {
  if (typeof phone !== 'string') return phone

  const regexp = /(?!^\+)\D/g  
  const getOnlyNumber = phone.replace(regexp, '')
  return `<a href="tel:${getOnlyNumber}">${phone}</a>`
}