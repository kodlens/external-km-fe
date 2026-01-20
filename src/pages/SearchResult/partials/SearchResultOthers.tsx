import { useQuery } from "@tanstack/react-query";
import { config } from "../../../config/config";
import axios from "axios";

import Skeleton from "../../../components/Skeleton";
import ReactPaginate from "react-paginate";
import { forwardRef,  useEffect,  useImperativeHandle, useState } from "react";
import SearchResultCard from "../../../components/SearchResultCard";
//import { div } from "framer-motion/client";


interface SearchResultProps {
    search: string;
    subject: string | null;
    sh: string | null;
}

export interface SearchResultOthersRef {
    reload: (subject?: string) => void;
}


const SearchResultOthers = forwardRef<SearchResultOthersRef, SearchResultProps>(( { search, subject, sh }, ref  ) => {
   
    const [page, setPage] = useState<number>(1)

    useEffect(() => {
        setPage(1);
    }, [search, subject, sh]);

    const { data = [], isFetching, error, refetch } = useQuery({
        queryKey: ['fetchSearchOthers', page, subject, sh],
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

    
    if(error){
        <div>
            There is an error occured while fetching the data.
        </div>
    }

    
    const MySkeleton = () => {
        return (
            // <div className='min-h-screen max-w-7xl md:mx-auto mx-auto'>
                
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
                
                Array.isArray(data?.data) && data?.data.length > 0 ? (
                    <>
                        <SearchResultCard data={data?.data} />
                
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


export default SearchResultOthers