import { Energy } from "../simulator/db/vehicle"
import { assertUnreachable } from './assertUnreachable'
import dieselIcon from './mediumDiesel.svg'
import electricityIcon from './mediumElectricity.svg'
import gasolineIcon from './mediumGasoline.svg'

export function iconSrcForEnergy(energy: Energy) {
  switch (energy) {
    case Energy.Gasoline:
      return gasolineIcon.src
    case Energy.Diesel:
      return dieselIcon.src
    case Energy.Electricity:
      return electricityIcon.src
  }
  assertUnreachable(energy)
}

export function EnergyIcon(props: { energy: Energy }) {
  return <img src={iconSrcForEnergy(props.energy)} alt={props.energy} />
}
