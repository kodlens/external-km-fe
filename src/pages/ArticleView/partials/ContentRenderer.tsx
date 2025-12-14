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
                    //return;
                }else{
                    img.setAttribute("referrerpolicy", "no-referrer");
                    img.loading = "lazy";
                     // If starts with "/", don't add extra slash
                    if (src.startsWith("/")) {
                        img.src = `https://science.ph${src}`;
                    } else {
                        img.src = `https://science.ph/${src}`;
                    }
                }

               
                
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
            className="prose prose-sm md:prose lg:prose-lg max-w-none mt-6 text-gray-800 paragraph"
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
}
