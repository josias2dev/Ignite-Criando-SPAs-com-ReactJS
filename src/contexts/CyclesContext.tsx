import { createContext, useReducer, useState } from "react"

interface Cycle {
    id: string
    task: string
    minutesAmount: number
    startDate: Date,
    interruptedDate?: Date,
    finishedDate?: Date,
}
 
interface CreateNewCycleData {
    task: string,
    minutesAmount: number,
}

interface CyclesContextData {
    cycles: Cycle[],
    activeCycle: Cycle | undefined,
    activeCycleId: string | null,
    setCurrentCycleAsFinished: () => void,
    setAmmountSecondsPassed: (seconds: number) => void,
    ammountSecondsPassed: number,
    createNewCycle: (data: CreateNewCycleData) => void,
    interruptCurrentCycle: () => void,
}

interface CyclesContextProviderProps {
    children: React.ReactNode
}

export const CyclesContext = createContext({} as CyclesContextData)

export function CyclesContextProvider({ children }: CyclesContextProviderProps) {
    
    const [cycles, dispatch] = useReducer((state: Cycle[], action: any) => {
        console.log(cycles)
        console.log(action)

        return state
    }, [])

    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
    const [ammountSecondsPassed, setAmmountSecondsPassed] = useState(0)

    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

    function setCurrentCycleAsFinished() {
        setCycles((state) => state.map((cycle) => {
            if (cycle.id === activeCycleId) {
                return {
                    ...cycle,
                    finishedDate: new Date(),
                }
            }

            setActiveCycleId(null)
            document.title = 'Ignite timer'

            return cycle
        }))
    }


    function createNewCycle(data: CreateNewCycleData) {
        const newCycle: Cycle = {
            id: String(new Date().getTime()),
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        }

        dispatch((state) => [...state, newCycle])
        setActiveCycleId(newCycle.id)
        setAmmountSecondsPassed(0)
    }

    function interruptCurrentCycle() {

        dispatch(cycles.map((cycle) => {
            if (cycle.id === activeCycleId) {
                return {
                    ...cycle,
                    interruptedDate: new Date(),
                }
            }

            return cycle
        }))

        setActiveCycleId(null)
        document.title = 'Ignite timer'
    }

    return (
        <CyclesContext.Provider value={{
            cycles,
            activeCycle,
            activeCycleId,
            ammountSecondsPassed,
            setCurrentCycleAsFinished,
            setAmmountSecondsPassed,
            createNewCycle,
            interruptCurrentCycle,

        }}>
            {children}
        </CyclesContext.Provider>
    )
}