import { useState } from 'react';
import ReactPaginate from 'react-paginate';

const Paginate = ( {data}: {data:any}) => {

    const [page, setPage] = useState<number>(0)

    
  return (
    <ReactPaginate
        className="flex"
        breakLabel="..."
        activeClassName="bg-blue-700 rounded-[50%] text-white"
        pageClassName="px-4 py-2 hover:cursor-pointer hover:bg-blue-100 hover:text-black"
        nextClassName="px-4 py-2 hover:cursor-pointer hover:bg-blue-100"
        previousClassName="px-4 py-2 hover:cursor-pointer hover:bg-blue-100"
        breakClassName="px-4 py-2"
        nextLabel="NEXT >"
        onPageChange={(num) => {
            setPage(num.selected);
        }}
        pageRangeDisplayed={5}
        pageCount={data ? data?.total : 0}
        previousLabel="< PREV"
    />
  )
}

export default Paginate