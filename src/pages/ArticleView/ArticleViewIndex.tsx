import axios from "axios";
import { Link, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { config } from "../../config/config";
import Loader from "../../components/loader/Loader";
import { ChevronLeft, ExternalLink, Globe2, UserRound } from "lucide-react";

type Info = {
  title: string;
  alias: string; // slug
  description: string; // HTML
  content_type?: string; // e.g., 'person'
  region?: string;       // e.g., 'NCR'
  source_url?: string | null; // optional if your API returns it
};

async function fetchArticle(slug: string): Promise<Info | null> {
  const { data } = await axios.get(`${config.baseUri}/api/load-article/${slug}`);
  // Expect your API to return either the info object or null/404-like payload
  // Normalize falsy to null so the UI can show "not found".
  return data?.data ?? data ?? null;
}

export default function ArticleView() {
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

  if (isError) {
    return (
      <div className="min-h-screen flex justify-center items-center">

        <div className="max-w-4xl mx-auto p-6">
          <div className="rounded-xl border border-red-200 bg-red-50 p-6">
            <h2 className="text-lg font-semibold text-red-700">Error loading article</h2>
            <p className="text-sm text-red-600 mt-2">
              {(error as any)?.message ?? "Please try again."}
            </p>
            <div className="mt-4 flex items-center gap-3">
              <button
                onClick={() => refetch()}
                className="px-4 py-2 rounded-lg border border-red-300 bg-white hover:bg-red-100 text-red-700 text-sm"
              >
                Retry
              </button>
              <Link
                to="/"
                className="px-4 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-sm"
              >
                Back to search
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Link to="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800">
          <ChevronLeft size={18} /> Back
        </Link>
        <div className="mt-4 rounded-xl border border-gray-200 p-8 bg-white">
          <h1 className="text-xl font-semibold text-gray-800">Article not found</h1>
          <p className="text-sm text-gray-600 mt-2">
            We couldn’t find any content for: <span className="font-mono">{slug}</span>.
          </p>
          <div className="mt-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-blue-600 hover:underline text-sm"
            >
              Search again
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const metaChips = [
    article.content_type ? { icon: <UserRound size={14} />, label: article.content_type } : null,
    article.region ? { icon: <Globe2 size={14} />, label: article.region } : null,
  ].filter(Boolean) as any[];

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 mt-20">
      {/* Back link */}
      <div className="mb-4">
        <Link to="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800">
          <ChevronLeft size={18} /> Back
        </Link>
      </div>

      {/* Card */}
      <article className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{article.title}</h1>

        {/* Meta */}
        {metaChips.length > 0 || article.source_url ? (
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
            {article.source_url ? (
              <a
                href={article.source_url}
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
          dangerouslySetInnerHTML={{ __html: article.description }}
        />

        {/* Footer actions */}
        <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
          <div className="text-xs text-gray-500">
            Alias: <span className="font-mono">{article.alias}</span>
          </div>
          <Link
            to="/"
            className="text-sm text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center gap-2"
          >
            <ChevronLeft size={16} />
            Back to search
          </Link>
        </div>
      </article>
    </div>
  );
}
