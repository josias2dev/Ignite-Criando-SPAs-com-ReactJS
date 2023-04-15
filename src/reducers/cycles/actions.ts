import { Cycle } from './reducers'

export enum CyclesActionTypes {
  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
  INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE',
  SET_CURRENT_CYCLE_AS_FINISHED = 'SET_CURRENT_CYCLE_AS_FINISHED',
}

export function addNewCycle(newCycle: Cycle) {
  return {
    type: CyclesActionTypes.ADD_NEW_CYCLE,
    payload: {
      newCycle,
    },
  }
}

export function markInterruptCurrentCycle() {
  return {
    type: CyclesActionTypes.INTERRUPT_CURRENT_CYCLE,
  }
}

export function markCurrentCycleAsFinished() {
  return {
    type: CyclesActionTypes.SET_CURRENT_CYCLE_AS_FINISHED,
  }
}
