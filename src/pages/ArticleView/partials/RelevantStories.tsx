import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router";
import { config } from "../../../config/config";
import type { Article } from "../../../types/article";
import dayjs from 'dayjs'


export default function RelevantStories({ slug }: { slug: string }) {

    const { data, isFetching } = useQuery({
        queryKey: ["relevantArticle"],
        queryFn: async () => {
            const res = await axios.get(`${config.baseUri}/api/load-related-article/${slug}`)
            return res.data
        },
        refetchOnWindowFocus: false,
    });


    if(isFetching){
        return (
            <div className="w-80 flex flex-col gap-6">
                {[...Array(4)].map((_, i) => (
                    <div
                        key={i}
                        className="animate-pulse rounded-2xl p-4 w-80"
                    >
                        <div className="h-6 w-2/3 bg-gray-300 rounded mb-4" />
                        <div className="space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-full" />
                            <div className="h-4 bg-gray-200 rounded w-5/6" />
                            <div className="h-4 bg-gray-200 rounded w-4/6" />
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className="w-80 flex-shrink-0 pt-4">
            <h2 className="text-lg font-semibold mb-4">Relevant Stories</h2>
            <ul className="space-y-3">
                { Array.isArray(data) ? (
                     data?.map((article: Article) => (
                        <li key={article.slug}>
                            <Link to={`/view/article/${article.slug}`}
                                className="block p-3 rounded-lg hover:bg-gray-100 bg-white shadow-sm transition">

                                <h3 className="text-sm font-medium text-gray-800">{article.title}</h3>
                                <p className="text-xs text-gray-500 mt-1">
                                    { article.publish_date ? dayjs(article?.publish_date).format('MMM DD, YYYY') : '' }
                                </p>
                                <p className="text-xs text-gray-500 mt-1">Read more →</p>

                            </Link>
                        </li>
                    ))
                ) : null }
                
            </ul>
        </div>
    );
}
