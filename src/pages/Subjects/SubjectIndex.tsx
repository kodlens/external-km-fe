import { useLocation } from 'react-router';
import { Search } from 'lucide-react';
import { useRef, useState } from 'react';

import SubjectLabel, { type SubjectLabelRef } from './partials/SubjectLabel';
import SubjectHeadingLabel, { type SubjectHeadingRef } from './partials/SubjectHeadingLabel';

import SearchResultLatest, { type SearchResultRefLatest } from './partials/SearchResultLatest';
import SearchResultOthers, { type SearchResultRefOthers } from './partials/SearchResultOthers';
import CircleLoading from '../../components/CircleLoading';
import { useIsFetching } from '@tanstack/react-query';
//import { div } from 'framer-motion/client';


const SubjectIndex = () => {
    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const isFetching = useIsFetching();
    const isLoading = isFetching > 0;

    const paramSubject = query.get('subj') ?? '';
    const paramSh = query.get('sh') ?? '';

    const [textSearch, setTextSearch] = useState('');

    const searchRefLatest = useRef<SearchResultRefLatest>(null);
    const searchRefOthers = useRef<SearchResultRefOthers>(null);
    const subjectRef = useRef<SubjectLabelRef>(null);
    const subjectHeadingRef = useRef<SubjectHeadingRef>(null);

    const handleSearch = () => {
        searchRefLatest.current?.reload();
        searchRefOthers.current?.reload();
        subjectRef.current?.reload();
        subjectHeadingRef.current?.reload();

    };

    return (
        <div className="min-h-screen max-w-7xl mx-auto px-4 py-6">
            
            {/* 🔍 Search Bar */}
            <div className="mb-6">
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

            <div className="flex flex-col lg:flex-row gap-6">

                {/* 📂 Sidebar */}
                <aside className="lg:w-72 w-full space-y-6">

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
                        <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            📂 Classes
                        </h2>
                        <SubjectLabel
                            ref={subjectRef}
                            search={textSearch}
                            subject={paramSubject}
                        />
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
                        <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            📑 Subject Headings
                        </h2>
                        <SubjectHeadingLabel
                            ref={subjectHeadingRef}
                            search={textSearch}
                            subject={paramSubject}
                        />
                    </div>

                </aside>

                {/* 📚 Results */}
                <main className="flex-1 min-w-0">

                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        📚 Digital Collections
                    </h2>

                    {!textSearch && (
                        <div className="text-center text-gray-500 mt-12">
                            🔍 Type a keyword to filter results in this classes
                        </div>
                    )}

                    <SearchResultLatest
                        ref={searchRefLatest}
                        search={textSearch}
                        subject={paramSubject}
                        sh={paramSh}
                    />

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

export default SubjectIndex;
