import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router'
import { config } from '../../config/config';
import axios from 'axios';
//import { article } from 'framer-motion/client';
import type { Article } from '../../types/article';
import { Link } from 'react-router';
import Skeleton from '../../components/Skeleton';
import SubjectLabel from '../SearchResult/partials/SubjectLabel';
import SubjectHeadingLabel from '../SearchResult/partials/SubjectHeadingLabel';
import ReactPaginate from 'react-paginate';
import { useState } from 'react';

const SubjectIndex = ( ) => {

    const { subject, search } = useParams<{ subject: string, search: string }>();
    const [page, setPage] = useState<number>(1)
    

    const { data, isFetching, error } = useQuery({
        refetchOnWindowFocus: false,
        queryKey: ['article'],
        queryFn: async () => {
            const res = await axios.get(`${config.baseUri}/api/subject/articles-by-subject?subject=${subject}&search=${search}`)

            return res.data
        }
    })

    const MySkeleton = () => {
        return (
            <div className='min-h-screen  w-7xl md:mx-auto mx-2'>
                <Skeleton />
            </div>
        )
    }

    if (error) {
        return (
            <div className='min-h-screen'>
                Error!!
            </div>
        )
    }

    const redirection = (i: any) => {
        if (i.source_url) {
            return `${i.source_url}/article/${i.slug}`
        } else {
            return `view/article/${i.slug}`
        }
    }


    return (
        <div className='mt-20 p-6 flex max-w-7xl mx-auto min-h-screen'>

            <div className="flex flex-col lg:flex-row gap-6">

                <aside className="lg:w-64 w-full bg-white shadow rounded-xl border border-gray-100 p-6 space-y-6">
                    {/* Topics */}
                    <div>
                        <h2 className="font-semibold text-gray-800 mb-4">📂 Subjects</h2>
                        <SubjectLabel search={search}/>
                    </div>

                    {/* Subtopics */}
                    <div>
                        <h2 className="font-semibold text-gray-800 mb-4">📑 Subject Headings</h2>
                        <SubjectHeadingLabel search={search}/>
                    </div>
                </aside>
                
                <main className="flex-1">
                    <h2 className="mb-4 text-xl font-bold text-gray-800">
                        📚 Digital Collections
                    </h2>
                    
                    <div className='my-4'>
                        <div>
                            Subject: { data ? data?.data[0]?.subject : '' }
                        </div>

                        <div className=''>
                            Search: { search }
                        </div>
                    </div>


                    <div className="grid gap-6">

                        { !isFetching ? (
                            <>
                                { data?.data.map((item: Article, i:number) => (
                                    <div
                                        key={i}
                                        className="p-6 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition bg-white">
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
                                        { item.source_url && (
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
                            </>

                        ) : (
                            <MySkeleton />
                        ) }
                        

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
                        
                    </div>
                
                </main>
            </div>
        </div>
    )
}

export default SubjectIndex