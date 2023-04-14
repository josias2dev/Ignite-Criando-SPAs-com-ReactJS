import { useContext, useEffect, useState } from "react";
import { CountDownContainer, Separator } from "./styles";
import { differenceInSeconds } from "date-fns";
import { CyclesContext } from "../../../../contexts/CyclesContext";

export function CountDown() {

  const {
    activeCycle,
    setCurrentCycleAsFinished,
    setAmmountSecondsPassed,
    activeCycleId,
    ammountSecondsPassed,
    
  } = useContext(CyclesContext)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>

    if (activeCycle) {
      interval = setInterval(() => {

        const secondsPassed = differenceInSeconds(
          new Date(),
          activeCycle.startDate
        )

        if (secondsPassed >= totalSeconds) {
          setCurrentCycleAsFinished()

          clearInterval(interval)
          setAmmountSecondsPassed(0)

        } else {
          setAmmountSecondsPassed(
            secondsPassed,
          )
        }


      }, 1000)
    }

    return () => clearInterval(interval)
  }, [activeCycle, totalSeconds, activeCycleId, setCurrentCycleAsFinished])

  const secondsLeft = activeCycle ? totalSeconds - ammountSecondsPassed : 0
  const minutesLeft = Math.floor(secondsLeft / 60)
  const secondsLeftInMinutes = secondsLeft % 60
  const minutesLeftFormatted = String(minutesLeft).padStart(2, '0')
  const secondsLeftFormatted = String(secondsLeftInMinutes).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutesLeftFormatted}:${secondsLeftFormatted}`
    }
  }, [minutesLeftFormatted, secondsLeftFormatted])

  return (
    <CountDownContainer>
      <span>{minutesLeftFormatted[0]}</span>
      <span>{minutesLeftFormatted[1]}</span>
      <Separator>:</Separator>
      <span>{secondsLeftFormatted[0]}</span>
      <span>{secondsLeftFormatted[1]}</span>
    </CountDownContainer>
  )
}