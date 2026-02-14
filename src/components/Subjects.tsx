import axios from "axios"
import { config } from "../config/config"
import { useQuery } from "@tanstack/react-query"
import { AlertCircle, ChevronRight } from "lucide-react"
import type { Subject } from "../types/subject"
import { motion } from "framer-motion"
import { Link } from "react-router"

const Subjects = () => {
    const {
        data: subjects,
        error,
        isFetching,
    } = useQuery({
        queryKey: ["subjects-cards"],
        refetchOnWindowFocus: false,
        queryFn: async () => {
            const res = await axios.get<Subject[]>(`${config.baseUri}/api/load-subjects`)
            return res.data
        },
    })

    if (isFetching) {
        return (
            <div className="grid gap-6 p-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="animate-pulse rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="h-6 w-2/3 rounded bg-slate-200" />
                        <div className="mt-4 space-y-2">
                            <div className="h-4 w-full rounded bg-slate-100" />
                            <div className="h-4 w-5/6 rounded bg-slate-100" />
                            <div className="h-4 w-4/6 rounded bg-slate-100" />
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex min-h-[180px] items-center justify-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700">
                    <AlertCircle size={16} /> Failed to load categories
                </span>
            </div>
        )
    }

    return (
        <motion.div
            className="grid gap-5 p-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            initial="hidden"
            animate="visible"
            variants={{
                hidden: {},
                visible: {
                    transition: { staggerChildren: 0.08 },
                },
            }}
        >
            {subjects?.map((item) => (
                <motion.article
                    key={item.id}
                    className="group flex min-h-[340px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition"
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    whileHover={{ y: -4, boxShadow: "0px 14px 28px -18px rgba(15,23,42,0.35)" }}
                >
                    <div className="border-b border-slate-100 bg-gradient-to-r from-sky-50 to-white p-4">
                        <div className="mb-2 inline-flex rounded-full border border-sky-100 bg-white px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-sky-700">
                            {item.subject_headings?.length ?? 0} topics
                        </div>
                        <h3 className="text-base font-bold leading-tight text-slate-800">
                            <Link
                                to={`/subject/search?key=&subj=${item.slug}&sh=`}
                                className="transition hover:text-sky-700"
                            >
                                {item.subject}
                            </Link>
                        </h3>
                    </div>

                    <div className="flex flex-1 flex-col p-3">
                        <ul className="space-y-1.5">
                            {item.subject_headings?.slice(0, 6).map((sh) => (
                                <li key={sh.id}>
                                    <Link
                                        to={`/subject/search?key=&subj=${item.slug}&sh=${sh.slug}`}
                                        className="group/item flex items-start gap-2 rounded-lg px-2 py-2 text-sm text-slate-700 transition hover:bg-sky-50"
                                    >
                                        <ChevronRight
                                            size={16}
                                            className="mt-0.5 shrink-0 text-sky-600 transition group-hover/item:translate-x-0.5"
                                        />
                                        <span className="line-clamp-2 leading-snug">{sh.subject_heading}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-auto px-2 pt-3">
                            <Link
                                to={`/subject/search?key=&subj=${item.slug}&sh=`}
                                className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-sky-700 transition hover:text-sky-800"
                            >
                                View all category topics
                                <ChevronRight size={14} />
                            </Link>
                        </div>
                    </div>
                </motion.article>
            ))}
        </motion.div>
    )
}

export default Subjects
