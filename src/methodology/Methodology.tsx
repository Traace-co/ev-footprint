'use client'

import { Typography } from "antd";

export function Methodology() {
  const { Paragraph, Title } = Typography
  return <div>
    <Title level={3}>
      Hypotheses
    </Title>
    <Paragraph>
      Our model was built thanks to the research of the French consultancy firm Carbone 4. For a full understanding of the hypotheses you can read the publication on their website: <a href="https://www.carbone4.com/en/publication-road-transportation-what-aternative-motorisation-are-suitable-for-the-climate" target='_blank' rel="noreferrer">[EN] Road transportation: what alternative motorisations are suitable for the climate?</a>.
    </Paragraph>
    <Paragraph>
      For the purpose of this simulator we used a simplified model, focusing on Gasoline and Electricity.
    </Paragraph>
    <Paragraph>
      For the estimation of the emissions caused by battery manufacturing, we used more up-to-date data from <a href="https://theicct.org/publication/a-global-comparison-of-the-life-cycle-greenhouse-gas-emissions-of-combustion-engine-and-electric-passenger-cars/" target='_blank' rel="noreferrer">ICCT</a>.
    </Paragraph>
    <Title level={3}>
      Open-source
    </Title>
    <Paragraph>
      This simulator was released under an open-source license. Feel free to contribute or give feedback by creating issues on the <a href="https://github.com/Traace-co/ev-footprint" target='_blank' rel="noreferrer" >GitHub project</a>!
    </Paragraph>
  </div>
}