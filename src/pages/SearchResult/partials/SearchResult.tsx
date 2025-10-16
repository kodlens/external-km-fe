import { useQuery } from "@tanstack/react-query";
import { config } from "../../../config/config";
import axios from "axios";
import { Link } from "react-router";
import { SearchX } from "lucide-react";
import Skeleton from "../../../components/Skeleton";
import ReactPaginate from "react-paginate";
import { useState } from "react";


interface InfoProps {
    title: string;
    description: string;
    slug: string;
    source_url: string;
}


const SearchResult = ( { search } : { search?:string } ) => {
    const [page, setPage] = useState<number>(1)
    
    const { data, isFetching, error } = useQuery({
        queryKey: ['fetchSearch', page],
        queryFn: async () => {
            const res =  await axios.get(`${config.baseUri}/api/search/s?key=${search}&page=${page}`)

            return res.data
        },

        refetchOnWindowFocus: false
    })
    
    if(error){
        <div>
            There is an error occured while fetching the data.
        </div>
    }

    
    const redirection = (i: any) => {
        if (i.source_url) {
            return `${i.source_url}/article/${i.slug}`
        } else {
            return `view/article/${i.slug}`
        }
    }


    
    const MySkeleton = () => {
        return (
            <div className='min-h-screen max-w-7xl md:mx-auto mx-auto'>
                <div className=''>
                    <Skeleton />
                </div>
            </div>
        );
    }


    function Items({ currentItems } : { currentItems:any } ) {
        return (
            <>
            {currentItems &&
                currentItems.map((item:number) => (
                <div>
                    <h3>Item #{item}</h3>
                </div>
                ))}
            </>
        );
        }



    return (
        <>
            { !isFetching ? (
                <>
                    {data?.data.length > 0 ? (
                        <div className="grid gap-6">
                            {data?.data.map((item: InfoProps, i:number) => (
                                <div
                                    key={i}
                                    className="p-6 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition bg-white"
                                >
                                    {/* Title */}
                                    <h3 className="text-lg font-semibold text-blue-600 mb-2">
                                        <Link
                                            to={redirection(item)}
                                            target="_blank"
                                            className="hover:underline"
                                        >
                                            {item.title}
                                        </Link>
                                    </h3>

                                    {/* Description */}
                                    <div
                                        className="text-sm text-gray-700 mb-3 line-clamp-3"
                                        dangerouslySetInnerHTML={{ __html: item.description }}
                                    />

                                    {/* Source */}
                                    {item.source_url && (
                                        <Link
                                            to={item.source_url}
                                            target="_blank"
                                            className="text-xs text-blue-500 hover:underline"
                                        >
                                            {item.source_url}
                                        </Link>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 text-gray-500 italic text-sm mt-6">
                            <SearchX size={18} /> No results found
                        </div>
                    )}
                </>
            ) : (
                <MySkeleton />
            )}
            
            


            <div className="my-4">
                <ReactPaginate
                    className="flex"
                    breakLabel="..."
                    activeClassName="bg-red-300"
                    pageClassName="px-4 py-2 bg-blue-200 hover:cursor-pointer hover:bg-blue-100"
                    nextClassName="px-4 py-2 hover:cursor-pointer hover:bg-blue-100"
                    previousClassName="px-4 py-2 hover:cursor-pointer hover:bg-blue-100"
                    breakClassName="px-4 py-2"
                    nextLabel="NEXT >"
                    onPageChange={(num)=> {
                        setPage(num.selected);
                    }}
                    pageRangeDisplayed={5}
                    pageCount={data ? data?.total : 0}
                    previousLabel="< PREV"
                    renderOnZeroPageCount={null}
                />
            </div>
        </>
    )
}

export default SearchResult