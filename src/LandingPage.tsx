import { Typography } from "antd";
import { Comparison } from "./comparison/Comparison";

export function LandingPage() {
  const { Paragraph } = Typography
  return <div className="flex flex-col">
    <div className="flex flex-col gap-4">
      <div className="text-4xl">
        <h1>How much CO2 does an electric vehicle emit during its life?</h1>
      </div>
      <div>
        <Paragraph>
          The future of low-carbon mobility is a complex matter. And one of the hottest topics is the electric car.
        </Paragraph>
        <Paragraph>
          It triggers many questions:
          <ul>
            <li>
              Is an electric car really good for climate?
            </li>
            <li>
              What about the emissions caused by the production of the battery?
            </li>
            <li>
              Shouldn't I keep my existing gasoline car that was already produced?
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
          We used the latest studies to build this simulator and help you find the answers on your own.
        </Paragraph>
      </div>
    </div>
    <Comparison />
  </div >

}