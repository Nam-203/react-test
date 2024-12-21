import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface PanigationsProps {
  currentPage: number;
  totalPages: number;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
}

const Panigations: React.FC<PanigationsProps> = ({ currentPage, totalPages, goToNextPage, goToPreviousPage }) => {
  return (
    <div className="flex items-center justify-center p-4 text-sm bg-[#1a1b1f]">
      <div className="flex gap-2 ">
        <Button
          variant="outline"
          size="icon"
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className="h-8 w-8 border-none bg-[#1a1b1f] hover:bg-gray-800"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="text-gray-400 text-center">
          Page {currentPage} of {totalPages}
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className="h-8 w-8 border-none bg-[#1a1b1f] hover:bg-gray-800"
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Panigations;
