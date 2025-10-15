import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router'
import { config } from '../../config/config';
import axios from 'axios';
//import { article } from 'framer-motion/client';
import type { Article } from '../../types/article';
import { Link } from 'react-router';
import Skeleton from '../../components/Skeleton';

const SubjectIndex = ( ) => {

    const { subject, search } = useParams<{ subject: string, search: string }>();


    console.log(subject, search);
    

    const { data, isFetching, error } = useQuery<Article[]>({
        refetchOnWindowFocus: false,
        queryKey: ['article'],
        queryFn: async () => {
            const res = await axios.get(`${config.baseUri}/api/subject/articles-by-subject?subject=${subject}&search=${search}`)

            return res.data
        }
    })

    if (isFetching) {
        return (
            <div className='min-h-screen  w-7xl md:mx-auto mx-2'>
                <div className='mt-20'>
                    <Skeleton />
                </div>
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
            <main className="flex-1">
                <h2 className="mb-4 text-xl font-bold text-gray-800">
                    📚 Digital Collections
                </h2>
                
                <div className='my-4'>
                    <div>
                        Subject: { data ? data[0]?.subject : '' }
                    </div>

                    <div className=''>
                        Search: { search }
                    </div>
                </div>


                <div className="grid gap-6">
                    { data?.map((item: Article, i) => (
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
                </div>
             
            </main>
        </div>
    )
}

export default SubjectIndex