
import { useParams } from 'react-router';
import SearchResult from './partials/SearchResult';
import SubjectLabel from './partials/SubjectLabel';
import SubjectHeadingLabel from './partials/SubjectHeadingLabel';


const SearchResultIndex = () => {

    const { search } = useParams()

    return (
        <div className='min-h-screen mt-24 md:w-7xl md:mx-auto mx-2'>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Sidebar - Topics */}
                <aside className="lg:w-64 w-full bg-white shadow rounded-xl border border-gray-100 p-6 space-y-6">
                    {/* Topics */}
                    <div>
                        <h2 className="font-semibold text-gray-800 mb-4">📂 Subjects</h2>
                        <SubjectLabel search={search}/>
                    </div>

                    {/* Subtopics */}
                    <div>
                        <h2 className="font-semibold text-gray-800 mb-4">📑 Subject Headings</h2>
                        <SubjectHeadingLabel search={search}/>
                    </div>
                </aside>

                {/* Main Results */}
                <main className="flex-1">
                     <h2 className="mb-4 text-xl font-bold text-gray-800">
                        📚 Digital Collections
                    </h2>

                    <div className='my-2'>
                        Search: {search}
                    </div>

                    <SearchResult search={search}/>
                </main>
            </div>
        </div>
    );
};

export default SearchResultIndex;
