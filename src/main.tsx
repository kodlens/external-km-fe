import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router' // keep as-is to match your setup
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import MainLayout from './pages/Layouts/MainLayout.tsx'
import ArticleView from './pages/ArticleView/ArticleViewIndex.tsx'
import SubjectIndex from './pages/Subjects/SubjectIndex.tsx'
import SubjectHeadingIndex from './pages/SubjectHeading/SubjectHeadingIndex.tsx'
import SearchResultIndex from './pages/SearchResult/SearchResultIndex.tsx'
  // ⬅️ add this

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<App />} />
            <Route path="/search/:search" element={<SearchResultIndex />} />
            <Route path="/subjects/:subject/:search" element={<SubjectIndex />} />
            <Route path="/subject-headings/:subjectHeading" element={<SubjectHeadingIndex />} />
            {/* ⬇️ New route for /view/article/:slug */}
            <Route path="/view/article/:slug" element={<ArticleView />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
)
