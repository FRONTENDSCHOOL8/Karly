export function getPbImageURL(item, fileName = 'image', index = 0) {
  return `${import.meta.env.VITE_PB_API}/files/${item.collectionId}/${
    item.id
  }/${item[fileName][index]}`;
}
