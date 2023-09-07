export interface State{
  entities: Object,
  loaded?: boolean,
  loading?: boolean,
}

export function translateToEntity(dataArray: Array<any>, state: State) {

  const entities = dataArray.reduce((entities, arrayElement) => {
    return {
      ...entities,
      [arrayElement._id]: arrayElement
    }
  }, {
      ...state.entities
  })

  return entities
}