import { useLocation, useNavigate } from "react-router"
import { BookOpen, Search, SlidersHorizontal, Tags } from "lucide-react"
import { useEffect, useRef, useState } from "react"

import SubjectLabel, { type SubjectLabelRef } from "./partials/SubjectLabel"
import SubjectHeadingLabel, { type SubjectHeadingRef } from "./partials/SubjectHeadingLabel"

import SearchResultLatest, { type SearchResultRefLatest } from "./partials/SearchResultLatest"
import SearchResultOthers, { type SearchResultRefOthers } from "./partials/SearchResultOthers"
import CircleLoading from "../../components/CircleLoading"
import { useIsFetching } from "@tanstack/react-query"

const SubjectIndex = () => {
    const { search } = useLocation()
    const navigate = useNavigate()
    const query = new URLSearchParams(search)
    const isFetching = useIsFetching()
    const isLoading = isFetching > 0

    const key = query.get("key") ?? ""
    const paramSubject = query.get("subj") ?? ""
    const paramSh = query.get("sh") ?? ""

    const [textSearch, setTextSearch] = useState(key)

    const searchRefLatest = useRef<SearchResultRefLatest>(null)
    const searchRefOthers = useRef<SearchResultRefOthers>(null)
    const subjectRef = useRef<SubjectLabelRef>(null)
    const subjectHeadingRef = useRef<SubjectHeadingRef>(null)

    useEffect(() => {
        setTextSearch(key)
    }, [key])

    const handleSearch = () => {
        navigate(`/subject/search?key=${encodeURIComponent(textSearch)}&subj=${paramSubject}&sh=${paramSh}`)
        searchRefLatest.current?.reload()
        searchRefOthers.current?.reload()
        subjectRef.current?.reload()
        subjectHeadingRef.current?.reload()
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-sky-50/60 to-white">
            <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
                <div className="sticky top-4 z-20 mb-6 rounded-2xl border border-slate-200/80 bg-white/90 px-3 py-3 shadow-sm backdrop-blur md:px-4">
                    <div className="relative flex items-center">
                        <Search className="absolute left-4 text-slate-400" size={20} aria-hidden="true" />
                        <input
                            type="text"
                            placeholder="Search collections, technology, news, topics..."
                            className="w-full rounded-full border border-slate-300 bg-white py-3.5 pl-12 pr-32 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-red-400 focus:ring-4 focus:ring-red-100"
                            value={textSearch}
                            onChange={(e) => setTextSearch(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                            autoComplete="off"
                            aria-label="Search inside selected category"
                        />
                        <button
                            type="button"
                            onClick={handleSearch}
                            disabled={isLoading}
                            className={`absolute right-2 rounded-full px-6 py-2 text-sm font-semibold text-white transition ${
                                isLoading ? "cursor-not-allowed bg-slate-400" : "bg-danger hover:bg-red-600"
                            }`}
                            aria-label="Run search"
                        >
                            <div className="flex items-center gap-2">
                                <span>Search</span>
                                {isLoading ? <CircleLoading /> : null}
                            </div>
                        </button>
                    </div>
                </div>

                <div className="flex flex-col gap-6 lg:flex-row">
                    <aside className="w-full space-y-4 lg:w-72">
                        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                            <h2 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-slate-700">
                                <Tags size={16} className="text-sky-700" />
                                Categories
                            </h2>
                            <SubjectLabel ref={subjectRef} search={key} subject={paramSubject} />
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                            <h2 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-slate-700">
                                <SlidersHorizontal size={16} className="text-sky-700" />
                                Topics
                            </h2>
                            <SubjectHeadingLabel
                                ref={subjectHeadingRef}
                                search={key}
                                subject={paramSubject}
                            />
                        </div>
                    </aside>

                    <main className="min-w-0 flex-1">
                        <h2 className="mb-5 flex items-center gap-2 text-2xl font-extrabold tracking-tight text-slate-800">
                            <BookOpen size={22} className="text-sky-700" />
                            Digital Collections
                        </h2>

                        {!key && (
                            <div className="mb-6 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-10 text-center text-slate-500">
                                Type a keyword to filter topics in this category.
                            </div>
                        )}

                        <SearchResultLatest
                            ref={searchRefLatest}
                            search={key}
                            subject={paramSubject}
                            sh={paramSh}
                        />

                        <SearchResultOthers
                            ref={searchRefOthers}
                            search={key}
                            subject={paramSubject}
                            sh={paramSh}
                        />
                    </main>
                </div>
            </div>
        </div>
    )
}

export default SubjectIndex
