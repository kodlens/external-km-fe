import { Link } from 'react-router';
import type { Article } from '../types/article'
import { View } from 'lucide-react';

const SearchResultCard = ( { data } : { data:Article[] }) => {
  
    const redirection = (i: Article) => {
        if (i.source_url) {
            return `${i.source_url}/article/${i.slug}`
        } else {
            return `/view/article/${i.slug}`
        }
    }
   
    return (
        <div className="flex flex-col gap-4">
            { data?.map((item:Article, i:number) => (
                <div
                    key={i}
                    className="p-6 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition bg-white"
                >
                    {/* Title */}
                    <h3 className="text-lg font-semibold text-blue-600 mb-2">
                        <Link

                            to={`/view/article/${item.slug}`}
                            target="_blank"
                            className="hover:underline"
                        >
                            {item.title}
                        </Link>
                    </h3>

                    <div className='my-2 font-bold text-sm text-gray-500'>
                        Publish on: {item.publish_date ? (new Date(item.publish_date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })) : ''}
                    </div>

                    {/* Description */}
                    <div className="text-sm text-gray-700 mb-3 line-clamp-3">
                        {item.description_text}
                    </div>


                    {item.description && (

                        <div className="flex gap-2 items-center">
                            <View size={12} />
                            <Link
                                to={redirection(item)}
                                target="_blank"
                                className="text-xs text-blue-500 hover:underline"
                            >
                                {item.source_url}/{item.slug}
                            </Link>
                        </div>
                    )}

                </div>
            ))}
        </div>
    )
}

export default SearchResultCard