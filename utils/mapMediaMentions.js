export default function mapMediaMentions(mediaMentions) {
  if (!Array.isArray(mediaMentions)) return []
  return mediaMentions.map(({ attributes }) => {
    const { title, published_at, slug } = attributes

    const { media_mention_author = null } = mapCustomFields(
      attributes.custom_field_values
    )

    return { 
      title, 
      published_at, 
      slug, 
      source: media_mention_author ? ` | ${media_mention_author} ` : '' 
    }
  })
}
