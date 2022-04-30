import { Energy } from "../simulator/db/vehicle"
import { assertUnreachable } from './assertUnreachable'
import dieselIcon from './mediumDiesel.svg'
import electricityIcon from './mediumElectricity.svg'
import gasolineIcon from './mediumGasoline.svg'

export function iconSrcForEnergy(energy: Energy) {
  switch (energy) {
    case Energy.Gasoline:
      return gasolineIcon
    case Energy.Diesel:
      return dieselIcon
    case Energy.Electricity:
      return electricityIcon
  }
  assertUnreachable(energy)
}

export function EnergyIcon(props: { energy: Energy }) {
  return <img src={iconSrcForEnergy(props.energy)} alt={props.energy} />
}
