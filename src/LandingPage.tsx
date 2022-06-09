import { Typography } from "antd";
import { Comparison } from "./comparison/Comparison";

export function LandingPage() {
  const { Title, Paragraph } = Typography
  return <div className="flex flex-col p-4">
    <Title className="text-center">EV Footprint</Title>
    <div className="max">
      <Paragraph>
        The future of low-carbon mobility is a complex matter. And one of the hottest topics is the electric car. It triggers many questions: Is an electric car really good for climate? What about the emissions caused by the production of the battery? Shouldn't I keep my existing gasoline car that was already produced? How does a large electric SUV compare to a small gasoline car? Is the electric car worth it even in countries with a high-carbon electricity mix?
      </Paragraph>
      <Paragraph>
        We used the latest studies to build this simulator and help you build your own opinion. Please note that only the effect on climate is considered here. Electric cars have benefits in other domains (noise, particle emissions…) and drawbacks (metal mining). But that is a discussion for another day.
      </Paragraph>
    </div>
    <Comparison />
  </div >

}