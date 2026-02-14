import { useEffect, useRef, useState } from "react"
import { BookOpen, Newspaper, Search, Sparkles } from "lucide-react"
import WelcomeHeroWithSearch from "../../components/WelcomeHeroWithSearch"
//import ResultIndex from "../Result/ResultIndex"
import Subjects from "../../components/Subjects"
import OfficeMap from "../../components/OfficeMap"
import { useNavigate } from "react-router"

export const WelcomeIndex = () => {
    const searchRef = useRef<HTMLInputElement>(null)
    const [isVisible, setIsVisible] = useState(false)
    // const resultRef = useRef<{ handleSearch: (search: string) => void }>(null)
    // const resultSectionRef = useRef<HTMLElement>(null)

    // const [searchValue, setSearchValue] = useState<string>("")

    const navigate = useNavigate()
    const quickTags = ["Innovation", "Technology", "Research", "News"]
    const heroBgImage =
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1800&q=80"
    const categoriesBgImage =
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1800&q=80"
    const quickActions = [
        {
            title: "Popular Topics",
            description: "Browse high-interest themes across the portal.",
            icon: Sparkles,
        },
        {
            title: "Latest News",
            description: "Catch up on current updates and announcements.",
            icon: Newspaper,
        },
        {
            title: "New Collections",
            description: "Find recently added knowledge resources quickly.",
            icon: BookOpen,
        },
    ]

    // useEffect(() => {
    //   if (searchValue) {
    //     resultRef.current?.handleSearch(searchValue)
    //     // Scroll to results
    //     resultSectionRef.current?.scrollIntoView({ behavior: "smooth" })
    //   }
    // }, [searchValue])
    useEffect(() => {
        const frame = requestAnimationFrame(() => setIsVisible(true))
        return () => cancelAnimationFrame(frame)
    }, [])

    const handleKeyDown = () => {
        const value = searchRef.current?.value.trim() || ""
        //setSearchValue(value)
        navigate(`/search?key=${encodeURIComponent(value)}&subj=&sh=`)
    }
    const handleTagClick = (tag: string) => {
        if (!searchRef.current) return
        searchRef.current.value = tag
        searchRef.current.focus()
    }
    return (
        <>
            <section
                id="search"
                className="relative overflow-hidden bg-gradient-to-b from-sky-50 via-white to-amber-50/40 px-6"
                style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(15,23,42,0.24) 0%, rgba(15,23,42,0.18) 30%, rgba(240,249,255,0.90) 60%, rgba(255,255,255,0.94) 80%, rgba(255,251,235,0.88) 100%), url("${heroBgImage}")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="pointer-events-none absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-sky-200/30 blur-3xl" />
                <div className="pointer-events-none absolute bottom-0 right-0 h-56 w-56 rounded-full bg-red-200/20 blur-3xl" />

                <div className="mx-auto flex min-h-[64vh] w-full max-w-5xl flex-col items-center justify-center gap-7 py-14 md:min-h-[56vh] md:py-20">
                    <div
                        className={`text-center transition-all duration-700 ${
                            isVisible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                        } drop-shadow-[0_2px_10px_rgba(255,255,255,0.8)]`}
                    >
                        <WelcomeHeroWithSearch />
                    </div>

                    <div
                        className={`text-center transition-all delay-100 duration-700 ${
                            isVisible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                        } [text-shadow:0_2px_10px_rgba(255,255,255,0.75)]`}
                    >
                        <span className="inline-block rounded-full border border-sky-100 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-sky-700 shadow-sm">
                            STII Portal
                        </span>
                        <h1 className="mt-4 text-3xl font-black leading-tight tracking-tight text-bord text-slate-800 md:text-5xl">
                            Knowledge Management
                        </h1>
                        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
                            Explore collections, technology insights, and current updates in one
                            clean search experience.
                        </p>
                    </div>

                    <div
                        className={`w-full max-w-3xl transition-all delay-200 duration-700 ${
                            isVisible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                        }`}
                    >
                        <div className="relative flex items-center">
                            <Search className="absolute left-4 text-slate-400" size={20} aria-hidden="true" />
                            <input
                                type="text"
                                placeholder="Search collections, technology, news, topics..."
                                className="w-full rounded-full border border-slate-300 bg-white py-4 pl-12 pr-32 text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-red-400 focus:ring-4 focus:ring-red-100 focus-visible:ring-red-200"
                                ref={searchRef}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") handleKeyDown()
                                }}
                                autoComplete="off"
                                aria-label="Search knowledge resources"
                            />
                            <button
                                type="button"
                                onClick={handleKeyDown}
                                className="absolute right-2 rounded-full bg-danger px-6 py-2 text-sm font-semibold text-white transition hover:bg-red-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-200"
                                aria-label="Run search"
                            >
                                Search
                            </button>
                        </div>

                        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-slate-600">
                            {quickTags.map((tag) => (
                                <button
                                    key={tag}
                                    type="button"
                                    className="rounded-full bg-white px-3 py-1 ring-1 ring-slate-200 transition hover:bg-sky-50 hover:ring-sky-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
                                    onClick={() => handleTagClick(tag)}
                                    aria-label={`Use ${tag} as search keyword`}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div
                        className={`grid w-full max-w-5xl gap-3 pt-2 md:grid-cols-3 transition-all delay-300 duration-700 ${
                            isVisible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                        }`}
                    >
                        {quickActions.map((item) => {
                            const Icon = item.icon
                            return (
                                <div
                                    key={item.title}
                                    className="rounded-2xl border border-slate-200 bg-white/90 p-4 text-left shadow-sm"
                                >
                                    <div className="mb-2 inline-flex rounded-xl bg-sky-50 p-2 text-sky-700 ring-1 ring-sky-100">
                                        <Icon size={18} aria-hidden="true" />
                                    </div>
                                    <p className="text-sm font-semibold text-slate-800">{item.title}</p>
                                    <p className="mt-1 text-xs leading-relaxed text-slate-600">
                                        {item.description}
                                    </p>
                                    <p className="mt-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                                        Coming soon
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Conditional Sections */}
            {/* {searchValue ? (
        <section
          ref={resultSectionRef}
          id="results"
          className="py-16 lg:max-w-7xl lg:mx-auto px-6"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
            Search Results
          </h2>
          <ResultIndex ref={resultRef} />
        </section>
      ) : (
        <section id="subjects" className="bg-gray-50 py-16">
          <div className="lg:max-w-7xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
              Explore Class
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Browse through curated knowledge areas - find insights, topics, and
              innovations.
            </p>
            <Subjects />
          </div>
        </section>
      )} */}

            <section
                id="subjects"
                className="relative bg-slate-50 py-16"
                style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(248,250,252,0.95), rgba(248,250,252,0.96)), url("${categoriesBgImage}")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="mx-auto px-6 lg:max-w-7xl">
                    <h2 className="mb-4 text-center text-2xl font-extrabold tracking-tight text-slate-800 md:text-3xl">
                        Discover Knowledge Categories
                    </h2>
                    <p className="mx-auto mb-12 max-w-2xl text-center text-slate-600">
                        Browse through curated knowledge areas - find insights, topics, and
                        innovations.
                    </p>
                    <Subjects />
                </div>
            </section>

            <section id="location" className="bg-white py-16">
                <div className="mx-auto px-6 lg:max-w-7xl">
                    <h2 className="mb-4 text-center text-2xl font-extrabold tracking-tight text-slate-800 md:text-3xl">
                        Visit Our Office
                    </h2>
                    <p className="mx-auto mb-8 max-w-2xl text-center text-slate-600">
                        You can find DOST-STII in Bicutan, Taguig City, Metro Manila.
                    </p>
                    <OfficeMap />
                    <div className="mt-6 grid gap-3 md:grid-cols-3">
                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Email</p>
                            <p className="mt-1 text-sm font-medium text-slate-800">stii@dost.gov.ph</p>
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Phone</p>
                            <p className="mt-1 text-sm font-medium text-slate-800">(02) 8837-2071</p>
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Office</p>
                            <p className="mt-1 text-sm font-medium text-slate-800">Bicutan, Taguig City</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
