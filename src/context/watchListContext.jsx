import { createContext, useState, useEffect } from "react";

export const WatchListContext = createContext()
//['GOOGL', 'MSFT', 'AMZN']
export const WatchListContextProvider = (props) => {

  const [watchList, setWatchList] = useState(
    localStorage.getItem('watchList')?.split(',') || ['BTC-USD', 'ETH-USD', 'GOOGL', 'MSFT']
  )

  useEffect(() => {
    localStorage.setItem('watchList', watchList)
  }, [watchList])

  const addStock = (stock) => {
    if (watchList.indexOf(stock) === -1) {
      setWatchList([...watchList, stock])
    }

  }

  const deleteStock = (stock) => {
    setWatchList(watchList.filter((el) => {
      return el !== stock
    }))
  }

  return <WatchListContext.Provider value={{ watchList, addStock, deleteStock }}>
    {props.children}
  </WatchListContext.Provider>
}