
import React, { useEffect, useState } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

interface MarkdownPreviewProps {
  markdownText: string;
}

marked.setOptions({
  renderer: new marked.Renderer(),
  pedantic: false,
  gfm: true,
  breaks: true,
});

const preprocessCustomMarkdown = (text: string): string => {
  let processedText = text;

  const getYouTubeVideoId = (url: string): string | null => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  processedText = processedText.replace(/^:::(danger|info|success|note|DANGER|INFO|SUCCESS|NOTE|D|I|S|N)\s*([\s\S]*?):::$/gm, (_match, type, content) => {
    const typeLower = type.toLowerCase();
    let blockClass = '';
    let iconSvg = '';
    let title = '';

    if (typeLower.startsWith('d')) {
      blockClass = 'custom-md-admonition-danger';
      title = 'DANGER';
      iconSvg = `<svg viewBox="0 0 24 24" fill="currentColor" class="custom-md-admonition-icon"><path fill-rule="evenodd" d="M11.407 2.33a1.5 1.5 0 012.186 0l9.333 14A1.5 1.5 0 0121.427 19H3.573a1.5 1.5 0 01-1.5-2.67l9.334-14zM12 14a1 1 0 100-2 1 1 0 000 2zm0-5a1 1 0 011 1v2a1 1 0 11-2 0V10a1 1 0 011-1z" clip-rule="evenodd"></path></svg>`;
    } else if (typeLower.startsWith('i')) {
      blockClass = 'custom-md-admonition-info';
      title = 'INFO';
      iconSvg = `<svg viewBox="0 0 24 24" fill="currentColor" class="custom-md-admonition-icon"><path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12 17a1 1 0 100-2 1 1 0 000 2zm0-4a1 1 0 011-1v-2a1 1 0 11-2 0v2a1 1 0 011 1z" clip-rule="evenodd"></path></svg>`;
    } else if (typeLower.startsWith('s')) {
      blockClass = 'custom-md-admonition-success';
      title = 'SUCCESS';
      iconSvg = `<svg viewBox="0 0 24 24" fill="currentColor" class="custom-md-admonition-icon"><path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.524 7.01-5.25 5.25a.75.75 0 01-1.06 0l-2.25-2.25a.75.75 0 111.06-1.06L10.5 12.94l4.72-4.72a.75.75 0 111.06 1.06z" clip-rule="evenodd"></path></svg>`;
    } else if (typeLower.startsWith('n')) {
      blockClass = 'custom-md-admonition-note';
      title = 'NOTE';
      iconSvg = `<svg viewBox="0 0 24 24" fill="currentColor" class="custom-md-admonition-icon"><path d="M12 2a7 7 0 00-7 7c0 3.053 1.666 5.607 4 6.685V18a1 1 0 001 1h4a1 1 0 001-1v-2.315c2.334-1.078 4-3.632 4-6.685a7 7 0 00-7-7zm0 12.5a.5.5 0 01-.5-.5v-1a.5.5 0 011 0v1a.5.5 0 01-.5.5zM12 5a1 1 0 011 1v3a1 1 0 11-2 0V6a1 1 0 011-1z"></path></svg>`;
    }
    
    const processedContent = preprocessCustomMarkdown(content.trim());

    return `<div class="custom-md-admonition ${blockClass}">
              <div class="custom-md-admonition-title">${iconSvg}<span>${title}</span></div>
              <div class="custom-md-admonition-content">${processedContent}</div>
            </div>`;
  });

  processedText = processedText.replace(/^(####(?:yt|Y):(.+?))(?:\|start=(\d+))?(?:&end=(\d+))?$/gm, (_match, _prefix, url, start, end) => {
    const videoId = getYouTubeVideoId(url.trim());
    if (!videoId) return `<p class="custom-md-error">[Invalid YouTube URL: ${url}]</p>`;
    let embedUrl = `https://www.youtube.com/embed/${videoId}`;
    const params = [];
    if (start) params.push(`start=${start}`);
    if (end) params.push(`end=${end}`);
    if (params.length > 0) embedUrl += `?${params.join('&')}`;
    return `<div class="custom-md-youtube-embed custom-md-youtube-segment"><iframe src="${embedUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>`;
  });

  processedText = processedText.replace(/^(###(?:yt|Y):(.+?))$/gm, (_match, _prefix, url) => {
    const videoId = getYouTubeVideoId(url.trim());
    if (!videoId) return `<p class="custom-md-error">[Invalid YouTube URL: ${url}]</p>`;
    return `<div class="custom-md-youtube-embed custom-md-youtube-left"><iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe></div><div style="clear:both;"></div>`;
  });

  processedText = processedText.replace(/^(##(?:yt|Y):(.+?))$/gm, (_match, _prefix, url) => {
    const videoId = getYouTubeVideoId(url.trim());
    if (!videoId) return `<p class="custom-md-error">[Invalid YouTube URL: ${url}]</p>`;
    return `<div class="custom-md-youtube-embed custom-md-youtube-right"><iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe></div><div style="clear:both;"></div>`;
  });

  processedText = processedText.replace(/^(#(?:yt|Y):(.+?))$/gm, (_match, _prefix, url) => {
    const videoId = getYouTubeVideoId(url.trim());
    if (!videoId) return `<p class="custom-md-error">[Invalid YouTube URL: ${url}]</p>`;
    return `<div class="custom-md-youtube-embed custom-md-youtube-center"><iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>`;
  });

  processedText = processedText.replace(/^(#(?:img|I):center:(.+?))$/gm, (_match, _prefix, url) => {
    return `<img src="${url.trim()}" class="custom-md-img custom-md-img-center" alt="Centered image" loading="lazy"/>`;
  });

  processedText = processedText.replace(/^(#(?:img|I):left:(.+?))(?:\|radius=(\d+))?(?:\|shadow)?$/gm, (_match, _prefix, url, radius, shadow) => {
    let styles = 'float: left; margin-right: 1em; margin-bottom: 0.5em; max-width: 50%; height: auto;';
    if (radius) styles += ` border-radius: ${radius}px;`;
    if (shadow !== undefined) styles += ` box-shadow: 5px 5px 15px rgba(0,0,0,0.2);`;
    return `<img src="${url.trim()}" style="${styles}" class="custom-md-img custom-md-img-left" alt="Left-aligned image" loading="lazy"/><div style="clear:both;"></div>`;
  });
  
  processedText = processedText.replace(/^(#(?:img|I):gallery:\[(.+?)\])$/gm, (_match, _prefix, urlsString) => {
    const urls = urlsString.split(',').map(u => u.trim());
    const imagesHtml = urls.map(url => `<img src="${url}" alt="Gallery image" loading="lazy"/>`).join('');
    return `<div class="custom-md-img-gallery">${imagesHtml}</div>`;
  });

  processedText = processedText.replace(/^(#(?:img|I):blur:(.+?))$/gm, (_match, _prefix, url) => {
    return `<img src="${url.trim()}" class="custom-md-img custom-md-img-blur" alt="Blurred image" loading="lazy"/>`;
  });

  return processedText;
};


const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ markdownText }) => {
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    const processedCustomMarkdown = preprocessCustomMarkdown(markdownText);
    const rawHtml = marked.parse(processedCustomMarkdown) as string;
    const cleanHtml = DOMPurify.sanitize(rawHtml, { 
        USE_PROFILES: { html: true },
        ADD_TAGS: ['iframe'], 
        ADD_ATTR: ['allowfullscreen', 'frameborder', 'loading', 'allow', 'src', 'style', 'class'],
    });
    setHtmlContent(cleanHtml);
  }, [markdownText]);

  return (
    <>
      <style>{`
        /* Styles for custom markdown elements are defined here. 
           They use CSS variables set by the theme for colors. */
        .custom-md-error {
          color: var(--theme-text-primary, red); /* Fallback */
          font-weight: bold;
          padding: 0.5em;
          border: 1px solid var(--theme-text-accent, red);
          border-radius: 4px;
          background-color: color-mix(in srgb, var(--theme-bg-content-area, #ffe0e0) 80%, var(--theme-text-accent, red) 20%);
        }
        .custom-md-youtube-embed {
          margin-bottom: 1rem;
          overflow: hidden;
        }
        .custom-md-youtube-embed iframe {
          width: 100%;
          aspect-ratio: 16 / 9;
          border-radius: 8px;
        }
        .custom-md-youtube-center {
          max-width: 720px; 
          margin-left: auto;
          margin-right: auto;
        }
        .custom-md-youtube-left {
          float: left;
          width: 320px;
          max-width: 45%;
          margin-right: 1em;
          margin-bottom: 0.5em;
        }
        .theme-dark .custom-md-youtube-left, .theme-dark .custom-md-youtube-right { /* Specific to dark class if needed */
           box-shadow: 0 0 15px rgba(0,0,0,0.5);
        }
        html:not(.dark) .custom-md-youtube-left, html:not(.dark) .custom-md-youtube-right {
           box-shadow: 0 0 15px rgba(0,0,0,0.2);
        }
        .custom-md-youtube-right {
          float: right;
          width: 320px;
          max-width: 45%;
          margin-left: 1em;
          margin-bottom: 0.5em;
        }
        
        .custom-md-img {
          display: block; 
          margin-bottom: 1rem;
          border-radius: 8px; 
        }
        .custom-md-img-center {
          margin-left: auto;
          margin-right: auto;
          max-width: 100%; 
        }
        
        .custom-md-img-gallery {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem; 
          margin-bottom: 1rem;
        }
        .custom-md-img-gallery img {
          flex: 1 1 auto; 
          max-width: 200px; 
          height: auto;
          object-fit: cover;
          border-radius: 6px;
           box-shadow: 0 4px 6px color-mix(in srgb, var(--theme-text-primary, #000) 10%, transparent);
        }
        .theme-dark .custom-md-img-gallery img {
           box-shadow: 0 4px 6px color-mix(in srgb, var(--theme-text-primary, #000) 30%, transparent);
        }

        .custom-md-img-blur {
          filter: blur(8px);
          transition: filter 0.3s ease-in-out;
        }
        .custom-md-img-blur:hover {
          filter: blur(0);
        }

        .custom-md-admonition {
          padding: 1rem 1.25rem;
          margin-bottom: 1.25rem;
          border-left-width: 4px;
          border-radius: 0.25rem; 
        }
        .custom-md-admonition-title {
          display: flex;
          align-items: center;
          font-weight: 600; 
          margin-bottom: 0.5rem;
        }
        .custom-md-admonition-icon {
          width: 1.25rem; 
          height: 1.25rem; 
          margin-right: 0.5rem; 
          flex-shrink: 0;
        }
        .custom-md-admonition-content > :first-child { margin-top: 0; }
        .custom-md-admonition-content > :last-child { margin-bottom: 0; }

        /* Admonition colors are now driven by CSS variables injected from themes */
        .custom-md-admonition-danger {
          border-left-color: var(--theme-admonition-danger-border, #ef4444); 
          background-color: var(--theme-admonition-danger-bg, #fee2e2); 
          color: var(--theme-admonition-danger-text, #b91c1c); 
        }
        .custom-md-admonition-danger .custom-md-admonition-title,
        .custom-md-admonition-danger .custom-md-admonition-icon { color: var(--theme-admonition-danger-title, #dc2626);  }
        
        .custom-md-admonition-info {
          border-left-color: var(--theme-admonition-info-border, #3b82f6); 
          background-color: var(--theme-admonition-info-bg, #dbeafe); 
          color: var(--theme-admonition-info-text, #1e40af); 
        }
        .custom-md-admonition-info .custom-md-admonition-title,
        .custom-md-admonition-info .custom-md-admonition-icon { color: var(--theme-admonition-info-title, #2563eb);  }

        .custom-md-admonition-success {
          border-left-color: var(--theme-admonition-success-border, #22c55e); 
          background-color: var(--theme-admonition-success-bg, #dcfce7); 
          color: var(--theme-admonition-success-text, #15803d); 
        }
        .custom-md-admonition-success .custom-md-admonition-title,
        .custom-md-admonition-success .custom-md-admonition-icon { color: var(--theme-admonition-success-title, #16a34a);  }

        .custom-md-admonition-note {
          border-left-color: var(--theme-admonition-note-border, #f59e0b); 
          background-color: var(--theme-admonition-note-bg, #fef3c7); 
          color: var(--theme-admonition-note-text, #b45309); 
        }
        .custom-md-admonition-note .custom-md-admonition-title,
        .custom-md-admonition-note .custom-md-admonition-icon { color: var(--theme-admonition-note-title, #d97706);  }
        
        /* Ensure admonition content uses prose styles correctly but allows overrides */
        .custom-md-admonition-content {
          /* This will inherit from the parent .prose or .dark:prose-invert */
        }
         .custom-md-admonition-content p { margin-top: 0.5em; margin-bottom: 0.5em; }
         .custom-md-admonition-content p:first-child { margin-top: 0; }
         .custom-md-admonition-content p:last-child { margin-bottom: 0; }
         .custom-md-admonition-content ul, .custom-md-admonition-content ol { margin-top: 0.5em; margin-bottom: 0.5em; }
         .custom-md-admonition-content pre { margin-top: 0.5em; margin-bottom: 0.5em; }
         .custom-md-admonition-content .custom-md-youtube-embed,
         .custom-md-admonition-content .custom-md-img,
         .custom-md-admonition-content .custom-md-img-gallery {
            margin-left: 0; 
            margin-right: 0;
         }
      `}</style>
      <div
        className="prose prose-base lg:prose-lg dark:prose-invert w-full h-full p-6 md:p-8 overflow-y-auto break-words selection:bg-sky-500 selection:text-white max-w-none"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
        aria-live="polite"
      />
    </>
  );
};

export default MarkdownPreview;
