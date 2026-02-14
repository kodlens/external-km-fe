import { Link } from "react-router"
import type { Article } from "../types/article"
import { CalendarDays, ExternalLink } from "lucide-react"

const SearchResultCard = ({ data }: { data: Article[] }) => {
    const redirection = (i: Article) => {
        if (i.source_url) {
            return `${i.source_url}/article/${i.slug}`
        } else {
            return `/view/article/${i.slug}`
        }
    }
   
    return (
        <div className="flex flex-col gap-4">
            {data?.map((item: Article, i: number) => (
                <div
                    key={i}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                    <h3 className="mb-2 text-lg font-bold text-sky-700">
                        <Link
                            to={`/view/article/${item.slug}`}
                            target="_blank"
                            className="transition hover:text-sky-800 hover:underline"
                        >
                            {item.title}
                        </Link>
                    </h3>

                    <div className="my-2 flex items-center gap-2 text-sm font-medium text-slate-500">
                        <CalendarDays size={14} aria-hidden="true" />
                        <span>
                            Published:{" "}
                            {item.publish_date
                                ? new Date(item.publish_date).toLocaleDateString("en-US", {
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                  })
                                : "-"}
                        </span>
                    </div>

                    <div className="mb-3 line-clamp-3 text-sm leading-relaxed text-slate-700">
                        {item.description_text}
                    </div>

                    {item.description && (
                        <div className="flex items-center gap-2 text-xs">
                            <ExternalLink size={12} className="text-slate-500" aria-hidden="true" />
                            <Link
                                to={redirection(item)}
                                target="_blank"
                                className="truncate text-sky-600 transition hover:text-sky-700 hover:underline"
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
