import { useEffect, useRef } from "react";

interface ContentRendererProps {
    html: string;
}

export default function ContentRenderer({ html }: ContentRendererProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const fixImages = () => {
            const images = container.querySelectorAll<HTMLImageElement>("img");

            images.forEach((img) => {
                let src = img.getAttribute("src") || "";
                src = src.trim();

                // Ignore if absolute URL
                if (src.startsWith("http://") || src.startsWith("https://")) {
                    img.setAttribute("referrerpolicy", "no-referrer");
                    img.loading = "lazy";
                }else{
                    img.setAttribute("referrerpolicy", "no-referrer");
                    img.loading = "lazy";
                    if (src.startsWith("/")) {
                        img.src = `https://science.ph${src}`;
                    } else {
                        img.src = `https://science.ph/${src}`;
                    }
                }
                img.classList.add("article-image");
            });
        };

        // Run once
        fixImages();

        // Watch for new images dynamically
        const observer = new MutationObserver(fixImages);
        observer.observe(container, { childList: true, subtree: true });

        return () => observer.disconnect();
    }, [html]);

    return (
        <div
            ref={containerRef}
            className="article-prose prose prose-sm mt-2 max-w-none text-wrap text-slate-800 md:prose-base lg:prose-lg flex-1 min-w-0"
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
}
