import { Vehicle } from "../simulator/db/vehicleTypes";
import { EnergyIcon } from "./EnergyIcon";

export function VehicleTitle(props: { vehicle: Vehicle }) {
  const { vehicle } = props
  return <>
    <span className='inline-flex mr-1 align-middle mb-1'>
      <EnergyIcon energy={vehicle.energy} />
    </span>
    {`${vehicle.name}`}
  </>
}