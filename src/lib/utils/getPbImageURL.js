export function getPbImageURL(item, fileName = 'image', index = 0) {
  if (!Array.isArray(item[fileName])) {
    return `${import.meta.env.VITE_PB_API}/files/${item.collectionId}/${
      item.id
    }/${item[fileName]}`;
  } else {
    return `${import.meta.env.VITE_PB_API}/files/${item.collectionId}/${
      item.id
    }/${item[fileName][index]}`;
  }
}
