import { useQuery } from "@tanstack/react-query";
import { config } from "../../../config/config";
import axios from "axios";
import Skeleton from "../../../components/Skeleton";
import ReactPaginate from "react-paginate";
import { forwardRef,  useImperativeHandle, useState } from "react";
import SearchResultCard from "../../../components/SearchResultCard";
//import { div } from "framer-motion/client";




interface SearchResultProps {
    search: string;
    subject: string | null;
    sh: string | null;
}

export interface SearchResultLatestRef {
    reload: (subject?: string) => void;
}


const SearchResultLatest = forwardRef<SearchResultLatestRef, SearchResultProps>(( { search, subject, sh }, ref  ) => {
   
    const [page, setPage] = useState<number>(1)

    const { data = [], isFetching, error, refetch } = useQuery({
        queryKey: ['fetchSearchLatest', page, subject, sh],
        queryFn: async () => {
            const res =  await axios.get(`${config.baseUri}/api/search/latest?key=${search}&subj=${subject}&sh=${sh}&page=${page}`)
            return res.data
        },

        refetchOnWindowFocus: false
    })

    useImperativeHandle(ref, () => ({
        reload() {
            refetch()
        }
    }))

    
    if(error){
        <div>
            There is an error occured while fetching the data.
        </div>
    }
    
    const MySkeleton = () => {
        return (
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
                        <div className="flex items-center my-4">
                            <div className="flex-grow border-t border-gray-300"></div>
                            <span className="mx-4 text-gray-500">Latest</span>
                            <div className="flex-grow border-t border-gray-300"></div>
                        </div>

                        <SearchResultCard data={data?.data} />

                        <div className="my-4 overflow-x-auto">

                            <div className="my-4 overflow-x-auto">
                                <ReactPaginate
                                    className="flex"
                                    pageClassName="pagination-button"
                                    pageLinkClassName="pagination-link"
                                    activeClassName="active"
                                    activeLinkClassName="active-link"
                                    previousClassName="pagination-button"
                                    nextClassName="pagination-button"
                                    breakClassName="pagination-button"
                                    breakLabel="..."
                                    nextLabel=">"
                                    previousLabel="<"
                                    pageRangeDisplayed={5}
                                    pageCount={data?.total ? Math.ceil(data.total / 10) : 0}
                                    forcePage={page - 1}   // 🔴 IMPORTANT
                                    onPageChange={(e) => handlePageChange(e.selected)}
                                />
                            </div>
                        </div>
                    </>
                ) : (
                    null
                )
            ) : (
                <MySkeleton />
            )}

            
        </>
    )
})


export default SearchResultLatest