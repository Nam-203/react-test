import { Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function Header() {
  return (
    <header className="flex items-center justify-between p-4 border-b border-gray-800">
      <div className="flex items-center space-x-6">
        <div className="text-xl font-bold">Uniswap</div>
        <nav className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" className="text-gray-400 hover:text-white">Overview</Button>
          <Button variant="ghost" className="text-gray-400 hover:text-white">Pools</Button>
          <Button variant="ghost" className="text-gray-400 hover:text-white">Tokens</Button>
        </nav>
      </div>
      
      <div className="flex items-center space-x-4">
      <Select defaultValue="ethereum">
          <SelectTrigger className="w-[50px] bg-gray-900 border-gray-700 md:w-[100px] lg:[150px]">
            <SelectValue placeholder="Select Network" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ethereum">Ethereum</SelectItem>
            <SelectItem value="polygon">Polygon</SelectItem>
            <SelectItem value="optimism">Optimism</SelectItem>
          </SelectContent>
        </Select>
        <div className="relative w-32 lg:w-96">
          <Input 
            placeholder="Search pools or tokens " 
            className="bg-gray-900 border-gray-700 pl-10"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        
       
      </div>
    </header>
  )
}

