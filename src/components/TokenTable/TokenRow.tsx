import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatPrice, formatVolume } from "@/lib/utils";
import { FlattenedStock } from "@/types";
import Panigations from "./Panigations";

const ITEMS_PER_PAGE = 10;

export function TokensTable({ data, onNameSelect }: { data: FlattenedStock[], onNameSelect: (name: string) => void }) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentStocks = data.slice(startIndex, endIndex);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNameClick = (name: string) => {
    onNameSelect(name);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Top Gainers</h2>
        <button className="text-sm text-blue-500">Explore →</button>
      </div>
      <div className="overflow-x-auto bg-[#1a1b1f] rounded-lg p-1" >
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-gray-900 border-b border-gray-800">
              <TableHead className="w-[50px]">#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Price Change</TableHead>
              <TableHead className="text-right">volume24h </TableHead>
              <TableHead className="text-right">TVL ↓</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentStocks.map((stock, index) => (
              <TableRow
                key={stock.ticker}
                className="hover:bg-gray-900 border-b border-gray-800/30"
              >
                <TableCell>{startIndex + index + 1}</TableCell>
                <TableCell className="font-medium" onClick={() => handleNameClick(stock.ticker)}>{stock.ticker}</TableCell>
                <TableCell className="text-right">${formatPrice(stock.price)}</TableCell>
                <TableCell
                  className={`text-right ${
                    parseFloat(stock.change_amount) > 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {parseFloat(stock.change_amount) > 0 ? "↑ " : "↓"}
                  {stock.change_amount}
                </TableCell>
                <TableCell
                  className={`text-right ${
                    parseFloat(stock.change_percentage) > 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  ${formatVolume(stock.volume)}
                </TableCell>
                <TableCell className="text-right">
                  {formatVolume(stock.volume)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Panigations
        currentPage={currentPage}
        totalPages={totalPages}
        goToNextPage={goToNextPage}
        goToPreviousPage={goToPreviousPage}
      />
    </div>
  );
}
