export function objectNormalizer(data: Array<object>, indice: Array<string>) {

  return data.map(element => {
    if (element.hasOwnProperty(indice[0]) && element.hasOwnProperty(indice[1])){
      return {
        id: element[indice[0]],
        label: element[indice[1]]
      }
    }
  })

}