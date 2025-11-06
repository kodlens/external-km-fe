import { useEffect, useRef, useState } from "react"
import { Search } from "lucide-react"
import WelcomeHeroWithSearch from "../../components/WelcomeHeroWithSearch"
//import ResultIndex from "../Result/ResultIndex"
import Subjects from "../../components/Subjects"
import { useNavigate } from "react-router"

export const WelcomeIndex = () => {
  const searchRef = useRef<HTMLInputElement>(null)
  // const resultRef = useRef<{ handleSearch: (search: string) => void }>(null)
  // const resultSectionRef = useRef<HTMLElement>(null)

 // const [searchValue, setSearchValue] = useState<string>("")

  const navigate = useNavigate()

  // useEffect(() => {
  //   if (searchValue) {
  //     resultRef.current?.handleSearch(searchValue)
  //     // Scroll to results
  //     resultSectionRef.current?.scrollIntoView({ behavior: "smooth" })
  //   }
  // }, [searchValue])

  const handleKeyDown = () => {
    const value = searchRef.current?.value.trim() || ""
    //setSearchValue(value)
    navigate(`/search?key=${encodeURIComponent(value)}&subj=all&sh=all`);
  }

  return (
    <>
      {/* Hero + Search */}
      <section
        id="search"
        className="bg-gradient-to-b from-blue-50 to-white px-6"
      >
        <div
          className="
            mx-auto
            w-full max-w-4xl
            min-h-[60vh] md:min-h-[50vh]
            flex flex-col items-center justify-center
            gap-6
            py-12 md:py-16
          "
        >
          {/* Hero */}
          <div className="text-center">
            <WelcomeHeroWithSearch />
          </div>

          <div className="text-center text-2xl md:text-3xl font-bold text-gray-800">
            STII - Knowledge Management
          </div>

          {/* Search Bar */}
          <div className="w-full flex flex-col sm:flex-row rounded-3xl overflow-hidden border border-gray-200 shadow-md bg-white">
            <input
              type="text"
              ref={searchRef}
              placeholder="Search collections, innovations, technology, news & events, topics, trends..."
              className="flex-1 px-4 py-3 md:px-6 md:py-4 text-gray-700 outline-none placeholder:text-gray-400"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleKeyDown()
              }}
              autoComplete="off"
            />
            <button
              type="button"
              onClick={handleKeyDown}
              className="flex items-center justify-center gap-2 bg-danger px-6 py-3 md:py-4 text-white font-medium transition-all hover:bg-red-500 active:bg-red-600"
            >
              <Search size={18} />
              <span>Search</span>
            </button>
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
              Browse through curated knowledge areas — find insights, topics, and
              innovations.
            </p>
            <Subjects />
          </div>
        </section>
      )} */}
      <section id="subjects" className="bg-gray-50 py-16">
        <div className="lg:max-w-7xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
            Explore Class
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Browse through curated knowledge areas — find insights, topics, and
            innovations.
          </p>
          <Subjects />
        </div>
      </section>
    </>
  )
}
