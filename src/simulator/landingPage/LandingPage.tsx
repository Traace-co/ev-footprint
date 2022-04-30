import { VehicleProvider } from "../db/VehicleProvider";
import { Combinations } from "./combinations/Combinations";
import { Comparison } from "./comparison/Comparison";
import headerIcon1 from './headerIcon1.svg';
import { SimulatorSection } from "./SimulatorSection";

export function LandingPage() {
  return <div className="flex flex-col text-xl">
    <div className="flex flex-col gap-4">
      <div className="mb-8">
        <SimulatorSection
          level={1}
          icon={headerIcon1}
          title='Should you switch to an electric vehicle?'>
          <div>
            This simulator is based on the latest studies and we built it to:
            <ul className='list-disc list-inside'>
              <li>simply compare carbon emissions through their lifecycle of most common types of cars.</li>
              <li>break down misconceptions about the electric car.</li>
              <li>help you estimate if you should switch to an electric vehicle.</li>
            </ul>
          </div>
        </SimulatorSection>
      </div>
    </div>
    <VehicleProvider>
      <>
        <Comparison />
        <SimulatorSection
          level={2}
          title="Test other combinations">
          <Combinations />
        </SimulatorSection>
      </>
    </VehicleProvider>
  </div >

}