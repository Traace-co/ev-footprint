import { VehicleTitle } from "@/utils/VehicleTitle";
import Link from "next/link";
import { useContext } from "react";
import { VehicleContext } from "../../db/VehicleProvider";
import { Energy } from "../../db/vehicle";

export function Combinations() {
  const { allVehicles } = useContext(VehicleContext)
  return <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
    {allVehicles.map(vehicle1 => (
      allVehicles.filter(v => v.energy === Energy.Electricity
        && (vehicle1.energy !== Energy.Electricity
          || (vehicle1.energy === Energy.Electricity && v.id < vehicle1.id)) // Prevent duplicate comparisons
      ).map(vehicle2 => (
        <div key={`${vehicle1.id}-${vehicle2.id}`}>
          <Link href={`/compare/${vehicle1.id}/${vehicle2.id}/`}>
            <p className="">
              <VehicleTitle vehicle={vehicle1} />
              <span className='inline-flex px-2'>
                vs
              </span>
              <VehicleTitle vehicle={vehicle2} />
            </p>
          </Link>
        </div>
      ))
    )
    )
    }
  </div>
}