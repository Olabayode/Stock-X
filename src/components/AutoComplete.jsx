import { useState, useEffect, useContext } from 'react'
import finnhub from '../apis/finnhub'
import { WatchListContext } from '../context/watchListContext'

export const AutoComplete = () => {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState([])
  const { addStock } = useContext(WatchListContext)

  const renderDropDown = () => {
    const dropDownClass = search ? 'show' : null
    return (
      <ul style={{
        height: '500px',
        overflowY: 'scroll',
        overflowX: 'hidden',
        cursor: 'pointer'
      }} className={`dropdown-menu ${dropDownClass}`}>
        {results.map((result) => {
          return (
            <li onClick={() => {
              addStock(result.symbol)
              setSearch('')
            }} key={result.symbol} className='dropdown-item'>{result.description} ({result.symbol})</li>
          )
        })}
      </ul>
    )
  }

  const searchStock = async () => {
    const response = await finnhub.get('/search', {
      params: {
        q: search
      }
    })
    return response.data.result
  }

  const searchCrypto = async () => {
    let matchingSymbols = []
    if (search.length >= 3) {
      const response = await finnhub.get('/crypto/symbol?exchange=binance')
      const symbols = response.data
      matchingSymbols = symbols.filter(symbol => {
        return symbol.symbol.toLowerCase().includes(
          search.toLowerCase()
        ) ||
          symbol.description.toLowerCase().includes(search.toLowerCase())
      })
    }
    return matchingSymbols || []
  }

  useEffect(() => {
    let isMounted = true
    const fetchData = async () => {
      try {
        const stocks = await searchStock()
        const cryptos = await searchCrypto()
        // if(isMounted) {
        console.log(stocks)
        console.log(cryptos)
        setResults([...stocks, ...cryptos])
        // }

      } catch (error) {

      }
    }
    if (search.length > 0) {
      fetchData()
    } else {
      setResults([])
    }
    return () => (isMounted = false)
  }, [search])

  return <div className='w-50 p-5 rounded mx-auto'>
    <div className='form-floating dropdown'>
      <input style={{ backgroundColor: 'rgba(145, 158, 171, 0.4)' }} id='search' type='text' className='form-control' placeholder='Search' autoComplete='off' value={search} onChange={(e) => setSearch(e.target.value)} ></input>
      <label htmlFor='search'>Search</label>
      {renderDropDown()}
    </div>
  </div>
}