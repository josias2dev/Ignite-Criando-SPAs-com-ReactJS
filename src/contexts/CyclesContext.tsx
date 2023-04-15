import { createContext, useEffect, useReducer, useState } from 'react'
import { Cycle, CyclesReducer } from '../reducers/cycles/reducers'
import {
  addNewCycle,
  markCurrentCycleAsFinished,
  markInterruptCurrentCycle,
} from '../reducers/cycles/actions'
import { differenceInSeconds } from 'date-fns'

interface CreateNewCycleData {
  task: string
  minutesAmount: number
}

interface CyclesContextData {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  setCurrentCycleAsFinished: () => void
  setAmmountSecondsPassed: (seconds: number) => void
  ammountSecondsPassed: number
  createNewCycle: (data: CreateNewCycleData) => void
  interruptCurrentCycle: () => void
}

interface CyclesContextProviderProps {
  children: React.ReactNode
}

export const CyclesContext = createContext({} as CyclesContextData)

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(CyclesReducer, {
    cycles: [],
    activeCycleId: null,
  }, (initialState) => {
    const stateJSON = localStorage.getItem('@ignite-timer:cycles-state-1.0.0')

    if (stateJSON) {
      return JSON.parse(stateJSON)
    }

    return initialState
  })

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)
    localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON)

  }, [cyclesState])



  const { cycles, activeCycleId } = cyclesState
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const [ammountSecondsPassed, setAmmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }

    return 0
  })

  function setCurrentCycleAsFinished() {
    markCurrentCycleAsFinished()
  }

  function createNewCycle(data: CreateNewCycleData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }
    setAmmountSecondsPassed(0)

    dispatch(addNewCycle(newCycle))
  }

  function interruptCurrentCycle() {
    dispatch(markInterruptCurrentCycle())
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        ammountSecondsPassed,
        setCurrentCycleAsFinished,
        setAmmountSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
