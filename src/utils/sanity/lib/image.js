import createImageUrlBuilder from '@sanity/image-url'

import { dataset, projectId } from '../env'

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
})

export const urlForImage = (imageBuilder, options) => {
  return imageBuilder?.auto('format').width(options.width).fit('max')
}
