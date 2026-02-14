import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Link } from "react-router"
import { config } from "../../../config/config"
import type { Article } from "../../../types/article"
import dayjs from "dayjs"
import { ArrowRight, Newspaper } from "lucide-react"

export default function RelevantStories({ slug }: { slug: string }) {
    const { data, isFetching } = useQuery({
        queryKey: ["relevantArticle", slug],
        queryFn: async () => {
            const res = await axios.get(`${config.baseUri}/api/load-related-article/${slug}`)
            return res.data?.data ?? res.data ?? []
        },
        refetchOnWindowFocus: false,
    })

    if (isFetching) {
        return (
            <aside className="w-full lg:sticky lg:top-6 lg:w-84 lg:self-start">
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="h-5 w-1/2 animate-pulse rounded bg-slate-200" />
                    <div className="mt-4 space-y-3">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="animate-pulse rounded-xl border border-slate-100 p-3">
                                <div className="h-4 w-4/5 rounded bg-slate-200" />
                                <div className="mt-2 h-3 w-1/3 rounded bg-slate-100" />
                            </div>
                        ))}
                    </div>
                </div>
            </aside>
        )
    }

    return (
        <aside className="w-full lg:sticky lg:top-6 lg:w-84 lg:self-start">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <h2 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-slate-700">
                    <Newspaper size={16} className="text-sky-700" />
                    Relevant Stories
                </h2>

                <ul className="space-y-3">
                    {Array.isArray(data) && data.length > 0 ? (
                        data.map((article: Article) => (
                            <li key={article.slug}>
                                <Link
                                    to={`/view/article/${article.slug}`}
                                    className="group block rounded-xl border border-slate-200 bg-white p-3 transition hover:border-sky-200 hover:bg-sky-50/40"
                                >
                                    <h3 className="text-sm font-semibold text-slate-800 transition group-hover:text-sky-700">
                                        {article.title}
                                    </h3>
                                    <p className="mt-1 text-xs text-slate-500">
                                        {article.publish_date
                                            ? dayjs(article.publish_date).format("MMM DD, YYYY")
                                            : ""}
                                    </p>
                                    <p className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-sky-700">
                                        Read article <ArrowRight size={13} />
                                    </p>
                                </Link>
                            </li>
                        ))
                    ) : (
                        <li className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-500">
                            No relevant stories available.
                        </li>
                    )}
                </ul>
            </div>
        </aside>
    )
}
