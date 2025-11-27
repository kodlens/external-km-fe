import { useEffect, useRef } from "react";

interface ContentRendererProps {
  html: string;
}

export default function ContentRenderer({ html }: ContentRendererProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const images = container.querySelectorAll<HTMLImageElement>("img");

    images.forEach((img) => {
      let src = img.getAttribute("src") || "";

      console.log(src);
      

      // Prepend domain if src is relative
      if (src && !src.startsWith("http://") && !src.startsWith("https://")) {
        src = `https://science.ph${src}`;
        img.setAttribute("src", src);
      }

      img.setAttribute("referrerpolicy", "no-referrer");
      img.loading = "lazy";
    });


    console.log(html);
    
  }, [html]);

  return (
    <div
      ref={containerRef}
      className="prose prose-sm md:prose lg:prose-lg max-w-none mt-6 text-gray-800 paragraph"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
