import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link, useParams } from 'react-router';
import { config } from '../../../config/config';
import { useEffect } from 'react';
import Loader from '../../../components/loader/Loader';
import { ChevronLeft, ExternalLink, Globe2, UserRound } from 'lucide-react';
import type { Article } from '../../../types/article';

async function fetchArticle(slug: string): Promise<Article | null> {
  const { data } = await axios.get(`${config.baseUri}/api/load-article/${slug}`);
  // Expect your API to return either the info object or null/404-like payload
  // Normalize falsy to null so the UI can show "not found".
  return data?.data ?? data ?? null;
}


const ArticleContent = () => {

  const { slug = "" } = useParams();

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
  });

  // Set document title for nicer UX/SEO
  useEffect(() => {
    if (article?.title) {
      document.title = article.title;
    } else {
      document.title = "Article | Digital Collections";
    }
  }, [article?.title]);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-4 mt-20">
        <Loader />
      </div>
    );
  }


  const metaChips = [
    article?.content_type ? { icon: <UserRound size={14} />, label: article.content_type } : null,
    article?.region ? { icon: <Globe2 size={14} />, label: article.region } : null,
  ].filter(Boolean) as any[];


  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      {/* Back link */}
      <div className="mb-4">
        <Link to="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800">
          <ChevronLeft size={18} /> Back to main
        </Link>
      </div>

      {/* Card */}
      <article className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{article?.title}</h1>

        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <h1>{ article.publish_date ? article?.publish_date : ''}</h1>

        {/* Meta */}
        {metaChips.length > 0 || article?.source_url ? (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {metaChips.map((c, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 rounded-full bg-gray-100 border border-gray-200 px-2.5 py-1 text-xs text-gray-700"
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
                className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800"
                title="Open source"
              >
                <ExternalLink size={14} /> Source
              </a>
            ) : null}
          </div>
        ) : null}

        {/* Content */}
        <div
          className="prose prose-sm md:prose lg:prose-lg max-w-none mt-6 text-gray-800"
          // Your `description` already contains sanitized/controlled HTML from your DB.
          dangerouslySetInnerHTML={{ __html: article ? article.description : '' }}
        />

        {/* Footer actions */}
        <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
          <div className="text-xs text-gray-500">
            Alias: <span className="font-mono">{article?.alias}</span>
          </div>
          <Link
            to="/"
            className="text-sm text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center gap-2"
          >
            <ChevronLeft size={16} />
            Back to main
          </Link>
        </div>
      </article>
    </div>
  )
}

export default ArticleContent