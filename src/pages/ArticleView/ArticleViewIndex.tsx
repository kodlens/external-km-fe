import axios from "axios";
import { Link, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { config } from "../../config/config";
import Loader from "../../components/loader/Loader";
import { ChevronLeft, ExternalLink, Globe2, UserRound } from "lucide-react";
import { div } from "framer-motion/client";
import ArticleContent from "./partials/ArticleContent";
import RelevantStories from "./partials/RelevantStories";

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
      <div className="max-w-4xl mx-auto p-6 min-h-screen">
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

  
  return (
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row">
      <ArticleContent />
      <RelevantStories slug={slug} />
    </div>
  );
}
