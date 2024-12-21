import { useEffect, useState } from 'react'
import './App.css'
import { Header } from './components/Header/Header'
import { Charts } from './components/Overview/CharArt' // Fixed typo in import path
import { TokensTable } from './components/TokenTable/TokenRow' // Fixed import path
import { PoolsTable } from './components/TopPoolsTable/PoolRow'
import { TransactionsTable } from './components/TransactionsTable/Transactions-table'
import { FlattenedStock, Stock } from './types'

function App() {
  const [data, setData] = useState<FlattenedStock[]>([]);
  const [selectedName, setSelectedName] = useState<string>("PRFX");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/data.json");
      const json = await response.json();

      const flatten = (data: Stock[]): FlattenedStock[] => {
        const result: FlattenedStock[] = [];

        data.forEach(item => {
          const flattenedItem: FlattenedStock = {
            ticker: item.ticker,
            price: item.price.toString(),
            change_amount: item.change_amount,
            change_percentage: item.change_percentage,
            volume: parseInt(item.volume.toString(), 10),
          };
          result.push(flattenedItem);
        });

        return result;
      };

      const flattenedGainers = flatten(json.top_gainers);
      const flattenedLosers = flatten(json.top_losers);
      const flattenedActive = flatten(json.most_actively_traded);

      setData([...flattenedGainers, ...flattenedLosers, ...flattenedActive]);
    };

    fetchData();
  }, []);
  const handleNameSelect = (name: string) => {
    setSelectedName(name);
  };

  return (
    <div className="min-h-screen bg-[#131313] text-white">
      <Header />
      <main className="container mx-auto">
        <div className="py-6">
          <h1 className="text-xl font-semibold mb-6 px-2 mx-2">Uniswap Overview</h1>
          <Charts selectedName={selectedName} />
          <div className="flex flex-wrap gap-4 text-sm my-1 p-5 bg-[#1a1b1f] rounded-lg">
            <div>Volume 24H: <span className="text-red-500">$860.60m</span> <span className="text-red-500">↓30.33%</span></div>
            <div>Fees 24H: <span className="text-red-500">$2.45m</span> <span className="text-red-500">↓15.75%</span></div>
            <div>TVL: <span className="text-green-500">$5.32b</span> <span className="text-green-500">↑0.34%</span></div>
          </div>
          <TokensTable data={data} onNameSelect={handleNameSelect} />
          <PoolsTable />
          <TransactionsTable />
        </div>
      </main>
    </div>
  )
}

export default App
