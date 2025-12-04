
import { useParams } from 'react-router';

import { Search } from 'lucide-react';
import { useRef, useState } from 'react';
// import type { SearchResultRef } from '../SearchResult/partials/SearchResultLatest';
import type { SubjectLabelRef } from '../SearchResult/partials/SubjectLabel';
import type { SubjectHeadingRef } from '../SearchResult/partials/SubjectHeadingLabel';
//import SubjectLabel from '../SearchResult/partials/SubjectLabel';
//import SubjectHeadingLabel from '../SearchResult/partials/SubjectHeadingLabel';
import SearchResult from '../SearchResult/partials/SearchResultLatest';
import SubjectLabel from '../SearchResult/partials/SubjectLabel';
import SubjectHeadingLabel from '../SearchResult/partials/SubjectHeadingLabel';


const SubjectHeadingIndex = () => {

    const { slug } = useParams();
    // const { search } = useLocation(); // gives "?key=something"
    // const query = new URLSearchParams(search);
    // const key = query.get("key"); // 👉 "something"

    const searchRef = useRef<SearchResultRef>(null)
    const subjectRef = useRef<SubjectLabelRef>(null)
    const subjectHeadingRef = useRef<SubjectHeadingRef>(null)

    const [textSearch, setTextSearch] = useState<string>("");
    
    // update textSearch whenever the URL param changes
    // useEffect(() => {
    //     setTextSearch(key || "");
    // }, []);
    

    const handleKeyDown = () => {
        searchRef.current?.reload()
        subjectRef.current?.reload()
        subjectHeadingRef.current?.reload()
    }

    return (
        <div className='min-h-screen mt-24 md:w-7xl md:mx-auto mx-2'>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Sidebar - Topics */}
                <aside className="lg:w-64 w-full bg-white shadow rounded-xl border border-gray-100 p-6 space-y-6">
                    {/* Topics */}
                    <div>
                        <h2 className="font-semibold text-gray-800 mb-4">📂 Classes</h2>
                        <SubjectLabel ref={subjectRef} search={textSearch} />
                    </div>

                    {/* Subtopics */}
                    <div>
                        <h2 className="font-semibold text-gray-800 mb-4">📑 Subject Headings</h2>
                        <SubjectHeadingLabel ref={subjectHeadingRef} search={textSearch} subject={slug ? slug : 'all'} />
                    </div>
                </aside>



                {/* Main Results */}
                <main className="flex-1">

                    <div className="w-full flex flex-col sm:flex-row rounded-3xl overflow-hidden border border-gray-200 shadow-md bg-white mb-6">
                        <input
                            type="text"
                           
                            placeholder="Search collections, innovations, technology, news & events, topics, trends..."
                            className="flex-1 px-4 py-3 md:px-6 md:py-4 text-gray-700 outline-none placeholder:text-gray-400"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") handleKeyDown()
                            }}
                            onChange={(e) => {
                                setTextSearch(e.target.value)
                            }}
                            value={textSearch}
                            autoComplete="off"
                        />
                        <button
                            onClick={handleKeyDown}
                            type="button"
                            className="flex items-center justify-center gap-2 bg-danger px-6 py-3 md:py-4 text-white font-medium transition-all hover:bg-red-500 active:bg-red-600"
                        >
                            <Search size={18} />
                            <span>Search</span>
                        </button>
                    </div>

                    <h2 className="mb-4 text-xl font-bold text-gray-800">

                        📚 Digital Collections
                    </h2>

                    {/* <div className='my-2'>
                        Search: {textSearch}
                    </div> */}

                    <SearchResult ref={searchRef} search={textSearch} subject={slug ? slug : ''} sh={'all'} />
                </main>
            </div>
        </div>
    );
};

export default SubjectHeadingIndex;
