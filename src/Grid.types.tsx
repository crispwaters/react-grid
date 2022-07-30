export enum GridActionKind {
  UPDATE_CELL = 'UPDATE_CELL',
  TOP_ADD = 'TOP_ADD',
  TOP_SUB = 'TOP_SUB',
  BOTTOM_ADD = 'BOTTOM_ADD',
  BOTTOM_SUB = 'BOTTOM_SUB',
  LEFT_ADD = 'LEFT_ADD',
  LEFT_SUB = 'LEFT_SUB',
  RIGHT_ADD = 'RIGHT_ADD',
  RIGHT_SUB = 'RIGHT_SUB'
}

export interface GridAction {
  type: GridActionKind
  payload: GridState
}

export interface GridState {
  height: number
  width: number
  cursor?: {
    nRow: number,
    nColumn: number
  }
  rows: Array<Row>
}

export interface Row {
  id: string,
  cells: Array<Cell>
}

export interface Cell {
  id: string,
  isOn: boolean
}