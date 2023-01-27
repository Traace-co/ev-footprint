import { useTypedTranslation } from "../../utils/translation-codegen";
import { VehicleProvider } from "../db/VehicleProvider";
import { Combinations } from "./combinations/Combinations";
import { Comparison } from "./comparison/Comparison";
import headerIcon1 from './headerIcon1.svg';
import { SimulatorSection } from "./SimulatorSection";

export function LandingPage() {
  const { t } = useTypedTranslation()

  return <div className="flex flex-col text-xl">
    <div className="flex flex-col gap-4">
      <div className="mb-8">
        <SimulatorSection
          level={1}
          icon={headerIcon1}
          title={t('landing_page.title')}>
          <div>
            {t('landing_page.description')}
            <ul className='list-disc list-inside'>
              <li>{t('landing_page.description_list_1')}</li>
              <li>{t('landing_page.description_list_2')}</li>
              <li>{t('landing_page.description_list_3')}</li>
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
          title={t('landing_page.results.combinations.title')}>
          <Combinations />
        </SimulatorSection>
      </>
    </VehicleProvider>
  </div >

}