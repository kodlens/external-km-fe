import { useLocation, useNavigate } from 'react-router';
import { Search } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import SearchResultLatest, { type SearchResultLatestRef } from './partials/SearchResultLatest';
import SearchResultOthers, { type SearchResultOthersRef } from './partials/SearchResultOthers';
import SubjectLabel, { type SubjectLabelRef } from './partials/SubjectLabel';
import SubjectHeadingLabel, { type SubjectHeadingRef } from './partials/SubjectHeadingLabel';
import SearchParamChip from '../../components/SearchParamChip';
import { useIsFetching } from '@tanstack/react-query';
import CircleLoading from '../../components/CircleLoading';


const SearchResultIndex = () => {
    const { search } = useLocation();
    const navigate = useNavigate();

    const isFetching = useIsFetching();
    const isLoading = isFetching > 0;

    const query = new URLSearchParams(search);
    const key = query.get('key') ?? '';
    const paramSubject = query.get('subj') ?? '';
    const paramSh = query.get('sh') ?? '';

    const [textSearch, setTextSearch] = useState<string>(key);

    const [subj, setSubj] = useState<string>(paramSubject);
    const [sh, setSh] = useState<string>(paramSh);


    const searchRefLatest = useRef<SearchResultLatestRef>(null);
    const searchRefOthers = useRef<SearchResultOthersRef>(null);
    const subjectRef = useRef<SubjectLabelRef>(null);
    const subjectHeadingRef = useRef<SubjectHeadingRef>(null);



    useEffect(() => {
        setTextSearch(key);

        setSubj('')
        setSh('')
    }, [key]);

    const handleSearch = () => {
        navigate(
            `/search?key=${encodeURIComponent(textSearch)}&subj=${subj}&sh=${sh}`
        );

        searchRefLatest.current?.reload();
        searchRefOthers.current?.reload();
        subjectRef.current?.reload();
        subjectHeadingRef.current?.reload();
    };

    return (
        <div className="min-h-screen max-w-7xl mx-auto px-4 py-6">

            {/* 🔍 Sticky Search Bar */}
            <div className="sticky top-5 z-20 bg-white/90 backdrop-blur border-gray-200 mb-6">
                <div className="py-4">
                    <div className="relative flex items-center">
                        <Search className="absolute left-4 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search collections, technology, news, topics…"
                            className="w-full pl-12 pr-32 py-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 text-gray-800"
                            value={textSearch}
                            onChange={(e) => setTextSearch(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            autoComplete="off"
                        />
                        <button
                            onClick={handleSearch}
                            className={`
                                absolute right-2 px-6 py-2 rounded-full font-medium transition
                                ${isLoading
                                    ? 'bg-gray-400 text-white cursor-not-allowed'
                                    : 'bg-danger text-white hover:bg-red-600'}
                            `}
                        >
                            <div className='flex items-center gap-2'>
                                <div>
                                    Search
                                </div>
                                { isLoading ? (<div>
                                    <CircleLoading />
                                </div>) : (
                                    null
                                ) }
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">

                {/* 📂 Sidebar */}
                <aside className="lg:w-72 space-y-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
                        <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            📂 Classes
                        </h2>
                        <SubjectLabel ref={subjectRef} search={textSearch} />
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
                        <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            📑 Subject Headings
                        </h2>
                        <SubjectHeadingLabel
                            ref={subjectHeadingRef}
                            search={textSearch}
                            subject={paramSubject || 'all'}
                        />
                    </div>
                </aside>

                {/* 📚 Main Content */}
                <main className="flex-1 min-w-0">

                    {/* Active Filters */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {paramSubject && (
                            <span className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm">
                                <SearchParamChip title={paramSubject} />
                                <button
                                    className="hover:text-green-900"
                                    onClick={() =>
                                        navigate(
                                            `/search?key=${encodeURIComponent(textSearch)}&subj=&sh=${paramSh}`
                                        )
                                    }
                                >
                                    ✕
                                </button>
                            </span>
                        )}

                        {paramSh && (
                            <span className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm">
                                <SearchParamChip title={paramSh} />
                                <button
                                    className="hover:text-green-900"
                                    onClick={() =>
                                        navigate(
                                            `/search?key=${encodeURIComponent(textSearch)}&subj=${paramSubject}&sh=`
                                        )
                                    }
                                >
                                    ✕
                                </button>
                            </span>
                        )}
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        📚 Digital Collections
                    </h2>

                    {!textSearch && (
                        <div className="text-center text-gray-500 mt-12">
                            🔍 Start typing to search our digital collections
                        </div>
                    )}

                    {/* Latest Results */}
                    <SearchResultLatest
                        ref={searchRefLatest}
                        search={textSearch}
                        subject={paramSubject}
                        sh={paramSh}
                    />

                    {/* Divider */}
                    <div className="flex items-center my-6">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="mx-4 text-gray-500 text-sm">
                            You may also want these results
                        </span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>

                    {/* Other Results */}
                    
                    <SearchResultOthers
                        ref={searchRefOthers}
                        search={textSearch}
                        subject={paramSubject}
                        sh={paramSh}
                    />
                    
                </main>
            </div>
        </div>
    );
};

export default SearchResultIndex;
