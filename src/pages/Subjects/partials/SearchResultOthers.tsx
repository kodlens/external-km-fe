import { useQuery } from "@tanstack/react-query";
import { config } from "../../../config/config";
import axios from "axios";
import Skeleton from "../../../components/Skeleton";
import ReactPaginate from "react-paginate";
import { forwardRef,  useImperativeHandle, useState } from "react";
import SearchResultCard from "../../../components/SearchResultCard";
import { SearchX } from "lucide-react";
//import { div } from "framer-motion/client";


interface SearchResultProps {
    search: string;
    subject: string | null;
    sh: string | null;
}

export interface SearchResultRefOthers {
    reload: (subject?: string) => void;
}


const SearchResultOthers = forwardRef<SearchResultRefOthers, SearchResultProps>(( { search, subject, sh }, ref  ) => {
   
    const [page, setPage] = useState<number>(1)

    const { data = [], isFetching, error, refetch } = useQuery({
        queryKey: ['subjectFetchSearchOthers', page, subject, sh],
        queryFn: async () => {
            const res =  await axios.get(`${config.baseUri}/api/search/others?key=${search}&subj=${subject}&sh=${sh}&page=${page}`)
            return res.data
        },

        refetchOnWindowFocus: false
    })

    useImperativeHandle(ref, () => ({
        reload() {
            refetch()
        }
    }))


    if (error) {
        return <div>
            There is an error occurred while fetching the data.
        </div>
    }

    const MySkeleton = () => {
        return (
            // <div className='min-h-screen max-w-7xl md:mx-auto mx-auto'>
            //     <div className=''>
                   
            //     </div>
            // </div>
             <Skeleton />
        );
    }

    const handlePageChange = (pageNo:number) => {
        setPage(pageNo + 1);
    }

    return (
        <>
            { !isFetching ? (
                
                data?.data.length > 0 ? (
                    <>
                        <div className="flex items-center my-6">
                            <div className="flex-grow border-t border-gray-300"></div>
                            <span className="mx-4 text-gray-500 text-sm">
                                You may also want these results
                            </span>
                            <div className="flex-grow border-t border-gray-300"></div>
                        </div>

                        <SearchResultCard data={data?.data} />

                        <div className="my-4 overflow-x-auto">

                            <ReactPaginate
                                className="flex"
                                breakLabel="..."
                                activeClassName="pagination-button active"
                                pageClassName="pagination-button"
                                nextClassName="pagination-button"
                                previousClassName="pagination-button"
                                breakClassName="pagination-button"
                                nextLabel=">"
                                onPageChange={(num) => {
                                handlePageChange(num.selected)
                                }}
                                pageRangeDisplayed={5}
                                pageCount={data?.total ? Math.ceil(data.total / 10) : 0}
                                previousLabel="<"
                            />
                        </div>
                    </>
                ) : 
                    <div className="flex items-center gap-2 text-gray-500 italic text-sm mt-6">
                        <SearchX size={18} /> No results found
                    </div>
            ) : (
                <MySkeleton />
            )}
        </>
    )
})


export default SearchResultOthers