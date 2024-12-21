import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const pools = [
  {
    id: 1,
    pair: "WBTC/ETH",
    fee: "0.3%",
    tvl: "$413.40m",
    volume24h: "$11.85m",
    volume7d: "$484.91m"
  },
]

export function PoolsTable() {
  return (
    <div className="rounded-lg py-4 ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Top Pools</h2>
        <button className="text-sm text-white">Explore</button>
      </div>
      <div className="overflow-x-auto bg-[#1a1b1f] rounded-lg">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-gray-900 border-b border-gray-800">
              <TableHead className="w-[50px]">#</TableHead>
              <TableHead>Pool</TableHead>
              <TableHead className="text-right">TVL</TableHead>
              <TableHead className="text-right">Volume 24H</TableHead>
              <TableHead className="text-right">Volume 7D</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pools.map((pool) => (
              <TableRow key={pool.id} className="hover:bg-gray-900 border-b border-gray-800/30">
                <TableCell>{pool.id}</TableCell>
                <TableCell className="flex items-center gap-2">
                  <span>{pool.pair}</span>
                  <span className="text-gray-400 px-2 py-1 bg-gray-800 rounded-md">{pool.fee}</span>
                </TableCell>
                <TableCell className="text-right">{pool.tvl}</TableCell>
                <TableCell className="text-right">{pool.volume24h}</TableCell>
                <TableCell className="text-right">{pool.volume7d}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
    </div>
  )
}

