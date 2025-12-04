import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ page, pages, onPageChange }) => {
    return (
        <div className="flex items-center justify-center space-x-2 mt-8">
            <button
                onClick={() => onPageChange(page - 1)}
                disabled={page === 1}
                className="p-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
                <ChevronLeft className="h-5 w-5" />
            </button>

            <span className="text-gray-700">
                Page {page} of {pages}
            </span>

            <button
                onClick={() => onPageChange(page + 1)}
                disabled={page === pages}
                className="p-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
                <ChevronRight className="h-5 w-5" />
            </button>
        </div>
    );
};

export default Pagination;
