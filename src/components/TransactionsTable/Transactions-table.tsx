import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const transactions = [
  {
    id: 1,
    type: "Swap",
    totalValue: "$370.65",
    tokenAmount: "118.08 SU",
    tokenAmount2: "0.09 ETH",
    account: "0x864A...9436",
    time: "47 minutes ago"
  },
]

export function TransactionsTable() {
  return (
    <div className=" rounded-lg py-4 ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Transactions</h2>
        <button className="text-sm text-white">Explore </button>
      </div>
      <div className="overflow-x-auto bg-[#1a1b1f] rounded-lg">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-gray-900 border-b border-gray-800">
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Total Value</TableHead>
              <TableHead className="text-right">Token Amount</TableHead>
              <TableHead className="text-right">Token Amount</TableHead>
              <TableHead className="text-right">Account</TableHead>
              <TableHead className="text-right">Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((tx) => (
              <TableRow key={tx.id} className="hover:bg-gray-900 border-b border-gray-800/30">
                <TableCell className="text-pink-500">{tx.type}</TableCell>
                <TableCell className="text-right">{tx.totalValue}</TableCell>
                <TableCell className="text-right">{tx.tokenAmount}</TableCell>
                <TableCell className="text-right">{tx.tokenAmount2}</TableCell>
                <TableCell className="text-right text-pink-500">{tx.account}</TableCell>
                <TableCell className="text-right">{tx.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
    </div>
  )
}

