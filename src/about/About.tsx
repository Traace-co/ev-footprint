import { Typography } from "antd";

export function About() {
  const { Paragraph, Title } = Typography
  return <div>
    <Title level={3}>
      The problem
    </Title>
    <Paragraph>
      The future of low-carbon mobility is a complex matter. And one of the hottest topics is the electric car.
    </Paragraph>
    <Paragraph>
      The use of cars is one of the major sources of emissions on a national and individual scale. The objectives set internationally with the Paris agreements require us to question our uses and the possible alternatives to traditional mobility.
    </Paragraph>
    <Paragraph>
      Yet, we believe that the transition to other forms of transportation than the traditional car will take time. In the meantime, electric vehicles can help dramatically reduce the emissions of the transportation sector. But they do have some drawbacks that can have a varying impact, depending on various parameters.
    </Paragraph>
    <Paragraph>
      These drawbacks trigger many questions:
      <ul>
        <li>
          Has an electric car a net positive impact on the climate?
        </li>
        <li>
          What about the emissions caused by the production of the battery?
        </li>
        <li>
          Shouldn't I keep my existing gasoline car that was already produced? It's better, right?
        </li>
        <li>
          How does a large electric SUV compare to a small gasoline car?
        </li>
        <li>
          Is the electric car worth it even in countries with a high-carbon electricity mix?
        </li>
      </ul>
    </Paragraph>
    <Paragraph>
      We realized that most people do not have the answer to these questions. We believe that helping them find the answers on their own will accelerate their decision making.
    </Paragraph>
    <Paragraph>
      That is why we built this simulator. To help people realize what would be the gain to switch to an electric vehicle <strong>in their own use case</strong>.
    </Paragraph>
    <Title level={3}>
      What does the science say?
    </Title>
    <Paragraph>
      Many studies (e.g. from Carbone 4, Transport & Environment, Paul Scherrer Institute…) show that for a primary vehicle, the electric vehicle is less emissive than its thermal equivalent, even in countries with a more carbon intensive energy mix than France.
    </Paragraph>
    <Paragraph>
      Except in the case of secondary vehicles (which drive an average of 3,000 kilometers per year), it is therefore useful for the purpose of reducing emissions to promote the use of electric cars rather than gasoline-powered cars. However, this transition raises other societal and geopolitical questions, which Carbone 4 attempts to answer in this comprehensive FAQ: <a href="https://www.carbone4.com/analyse-faq-voiture-electrique" target='_blank' rel="noreferrer">[FR] Preconceived ideas about electric cars</a>.
    </Paragraph>
    <Title level={3}>
      Who created this tool?
    </Title>
    <Paragraph>
      This simulator was originally created as a side project by team members of <a href="https://traace.co" target='_blank' rel="noreferrer">Traace</a>.
    </Paragraph>
    <Paragraph>
      Traace is developing a software platform to help companies of all sizes decarbonize faster and more efficiently, thanks to advanced data analysis and forecast models. And they are <a href="https://traace.co/notre-equipe" target='_blank' rel="noreferrer">hiring</a>!
    </Paragraph>
  </div>
}