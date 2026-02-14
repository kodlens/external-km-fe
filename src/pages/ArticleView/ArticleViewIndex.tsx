import { Link, useNavigate, useParams } from "react-router"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { config } from "../../config/config"
import Loader from "../../components/loader/Loader"
import { AlertCircle, ArrowLeft } from "lucide-react"
import ArticleContent from "./partials/ArticleContent"
import RelevantStories from "./partials/RelevantStories"
import axios from "axios"
import type { Article } from "../../types/article"

async function fetchArticle(slug: string): Promise<Article | null> {
    const { data } = await axios.get(`${config.baseUri}/api/load-article/${slug}`)
    return data?.data ?? data ?? null
}

export default function ArticleView() {
    const navigate = useNavigate()
    const { slug = "" } = useParams()

    const {
        data: article,
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: ["article", slug],
        queryFn: () => fetchArticle(slug),
        enabled: !!slug,
        retry: 1,
        refetchOnWindowFocus: false,
    })

    useEffect(() => {
        if (article?.title) {
            document.title = `${article.title} | Digital Collections`
        } else {
            document.title = "Article | Digital Collections"
        }
    }, [article?.title])

    if (isLoading) {
        return (
            <div className="mx-auto mt-20 max-w-4xl p-4">
                <Loader />
            </div>
        )
    }

    if (isError) {
        return (
            <div className="min-h-screen bg-slate-50 px-4 py-16">
                <div className="mx-auto max-w-3xl rounded-2xl border border-red-200 bg-white p-6 shadow-sm">
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-sm font-medium text-red-700 ring-1 ring-red-100">
                        <AlertCircle size={16} /> Unable to load article
                    </div>
                    <p className="text-sm text-slate-600">{(error as Error)?.message ?? "Please try again."}</p>
                    <div className="mt-6 flex flex-wrap items-center gap-3">
                        <button
                            type="button"
                            onClick={() => refetch()}
                            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                        >
                            Retry
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="inline-flex items-center gap-2 rounded-lg bg-danger px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
                        >
                            <ArrowLeft size={16} /> Back
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    if (!article) {
        return (
            <div className="min-h-screen bg-slate-50 px-4 py-16">
                <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                    <h1 className="text-2xl font-bold text-slate-800">Article not found</h1>
                    <p className="mt-2 text-sm text-slate-600">
                        We could not find content for <span className="font-mono">{slug}</span>.
                    </p>
                    <Link
                        to="/"
                        className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-sky-700 transition hover:text-sky-800"
                    >
                        <ArrowLeft size={16} /> Back to home
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-sky-50/60 via-white to-white">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 md:px-6 lg:flex-row">
                <ArticleContent article={article} />
                <RelevantStories slug={slug} />
            </div>
        </div>
    )
}
