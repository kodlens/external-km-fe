import { Link } from "react-router"
import { Copy, ExternalLink, Globe2, UserRound } from "lucide-react"
import type { Article } from "../../../types/article"
import dayjs from "dayjs"
import { useMemo, useState } from "react"
import type { ReactNode } from "react"
import "./style.css"
import ContentRenderer from "./ContentRenderer"

const ArticleContent = ({ article }: { article: Article }) => {
    const [copied, setCopied] = useState(false)

    const metaChips = useMemo(
        () =>
            [
                article?.content_type
                    ? { icon: <UserRound size={14} aria-hidden="true" />, label: article.content_type }
                    : null,
                article?.region ? { icon: <Globe2 size={14} aria-hidden="true" />, label: article.region } : null,
            ].filter(Boolean) as { icon: ReactNode; label: string }[],
        [article?.content_type, article?.region]
    )

    const copyArticleLink = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href)
            setCopied(true)
            window.setTimeout(() => setCopied(false), 1600)
        } catch {
            setCopied(false)
        }
    }

    return (
        <div className="w-full min-w-0">
            <div className="mb-4 flex flex-wrap items-center justify-end gap-3">
                <Link
                    to="/"
                    className="text-sm font-medium text-sky-700 transition hover:text-sky-800"
                >
                    Go to Home
                </Link>
            </div>

            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                <header>
                    <div className="inline-flex items-center rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sky-700 ring-1 ring-sky-100">
                        Digital Collections
                    </div>
                    <h1 className="mt-4 text-2xl font-black leading-tight tracking-tight text-slate-900 md:text-4xl">
                        {article?.title}
                    </h1>
                    <p className="mt-3 text-sm text-slate-500">
                        Published {article?.publish_date ? dayjs(article.publish_date).format("MMM DD, YYYY") : "-"}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-2">
                        {metaChips.map((c, idx) => (
                            <span
                                key={idx}
                                className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-700"
                            >
                                {c.icon}
                                {c.label}
                            </span>
                        ))}

                        {article?.source_url ? (
                            <a
                                href={article?.source_url}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 rounded-full border border-sky-200 bg-sky-50 px-2.5 py-1 text-xs text-sky-700 transition hover:bg-sky-100"
                                title="Open source"
                            >
                                <ExternalLink size={14} aria-hidden="true" /> Source
                            </a>
                        ) : null}

                        <button
                            type="button"
                            onClick={copyArticleLink}
                            className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs text-slate-700 transition hover:bg-slate-50"
                        >
                            <Copy size={14} aria-hidden="true" /> {copied ? "Copied" : "Copy link"}
                        </button>
                    </div>
                </header>

                <div className="my-6 h-px w-full bg-slate-200" />

                <ContentRenderer html={article ? article.description : ""} />
            </article>
        </div>
    )
}

export default ArticleContent
