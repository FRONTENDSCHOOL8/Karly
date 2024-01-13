<<<<<<< HEAD
export function getPbImageURL(item, fileName = 'image', index = 0) {
  return `${import.meta.env.VITE_PB_API}/files/${item.collectionId}/${
    item.id
  }/${item[fileName][index]}`;
=======
export function getPbImageURL(item, fileName = 'image') {
  return `${import.meta.env.VITE_PB_API}/files/${item.collectionId}/${
    item.id
  }/${item[fileName]}`;
>>>>>>> dev
}
