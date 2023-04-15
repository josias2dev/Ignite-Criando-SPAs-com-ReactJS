import { produce } from 'immer'

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}
export interface CyclesState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export function CyclesReducer(state: CyclesState, action: any) {
  switch (action.type) {
    case 'ADD_NEW_CYCLE':
      return produce(state, (draft) => {
        draft.cycles.push(action.payload.newCycle)
        draft.activeCycleId = action.payload.newCycle.id
      })

    case 'INTERRUPT_CURRENT_CYCLE': {
      const currentCycleIndex = state.cycles.findIndex((cycle) => cycle.id === state.activeCycleId)

      if (currentCycleIndex < 0) {
        return state
      }

      return produce(state, (draft) => {
        draft.cycles[currentCycleIndex].interruptedDate = new Date()
        draft.activeCycleId = null
      })
    }
    case 'SET_CURRENT_CYCLE_AS_FINISHED':
      {
        const currentCycleIndex = state.cycles.findIndex((cycle) => cycle.id === state.activeCycleId)

        if (currentCycleIndex < 0) {
          return state
        }

        return produce(state, (draft) => {
          draft.cycles[currentCycleIndex].finishedDate = new Date()
          draft.activeCycleId = null
        })
      }
    default:
      return state
  }
}
