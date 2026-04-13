export default function mapCustomFields(customFields) {
  return customFields?.reduce((acc, field) => Object.assign(acc, field), {}) || {};
}
