// main index.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import "./index.css";
import CourseDetail from "./components/sections/CourseDetail";
import Layout from "./components/sections/Main";
import TeacherDetail from "./components/sections/TeacherDetail";
import NewsDetail from "./components/sections/NewsDetail";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Layout />} />
          </Route>
            <Route path="courses/:id" element={<CourseDetail />} />
            <Route path="teachers/:id" element={<TeacherDetail />} />
            <Route path="news/:id" element={<NewsDetail />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  </QueryClientProvider>
);
