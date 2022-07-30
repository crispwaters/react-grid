import { GridState, GridAction, GridActionKind } from './Grid.types'
import { RowFactory, deepCopy, CellFactory } from './Grid.util'
const GridReducer: React.Reducer<GridState, GridAction> = (state, action) => {
  const { type, payload } = action
  if (type === GridActionKind.UPDATE_CELL) {
    return {
      ...state,
      rows: payload.rows
    }
  }
  const { height, width } = payload
  const rows = deepCopy(payload.rows)
  if (type === GridActionKind.BOTTOM_ADD) {
    rows.push(RowFactory(payload.width))
    return {
      ...state,
      height: height + 1,
      rows
    }
  }
  if (type === GridActionKind.BOTTOM_SUB && height > 1) {
    rows.pop()
    return {
      ...state,
      height: height - 1,
      rows
    }
  }
  if (type === GridActionKind.TOP_ADD) {
    rows.unshift(RowFactory(payload.width))
    return {
      ...state,
      height: height + 1,
      rows
    }
  }
  if (type === GridActionKind.TOP_SUB && height > 1) {
    rows.shift()
    return {
      ...state,
      height: height - 1,
      rows
    }
  }
  if (type === GridActionKind.LEFT_ADD) {
    for(const row of rows) {
      row.cells.unshift(CellFactory())
    }
    return {
      ...state,
      width: width + 1,
      rows
    }
  }
  if (type === GridActionKind.LEFT_SUB && width > 1) {
    for(const row of rows) {
      row.cells.shift()
    }
    return {
      ...state,
      width: width - 1,
      rows
    }
  }
  if (type === GridActionKind.RIGHT_ADD) {
    for (const row of rows) {
      row.cells.push(CellFactory())
    }
    return {
      ...state,
      width: width + 1,
      rows
    }
  }
  if (type === GridActionKind.RIGHT_SUB && width > 1) {
    for (const row of rows) {
      row.cells.pop()
    }
    return {
      ...state,
      width: width - 1,
      rows
    }
  }

  return state
}

export default GridReducer