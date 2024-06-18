import { AutoComplete } from "../components/AutoComplete"
import { StockList } from "../components/StockList"
import stock from '../images/stock.jpeg'
export const StockOverviewPage = () => {
  return <div>
    <div className="text-center">
      <img src={stock} />
    </div>
    <AutoComplete/>
    <StockList/>
  </div>
}