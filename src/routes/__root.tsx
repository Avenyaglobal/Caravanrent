import { createRootRoute, HeadContent, Outlet, Scripts, useRouterState } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import appCss from "../styles.css?url";

function languageFromPath(pathname: string) {
  const segment = pathname.split("/").filter(Boolean)[0];
  if (segment === "en" || segment === "fr" || segment === "de" || segment === "ru" || segment === "ua") return segment;
  return "es";
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#1F4A38" },
      { name: "google-site-verification", content: "YIu2MBC0QYyj8EiTDEslr3a_EUJO9s_e_GKQOzQQy2o" },
    ],
    links: [
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32.png" },
      { rel: "icon", type: "image/png", sizes: "192x192", href: "/favicon-192.png" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,400;0,500;0,600;0,700;0,900;1,400&display=swap",
      },
    ],
  }),
  component: RootDocument,
});

function RootDocument() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const lang = languageFromPath(pathname);

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{history.scrollRestoration="manual"}catch(e){}var moved=false,allow=false;addEventListener("wheel",function(){moved=true},{passive:true,capture:true});addEventListener("touchmove",function(){moved=true},{passive:true,capture:true});addEventListener("click",function(e){var t=e.target;if(t&&t.closest&&t.closest(".progress-wrap"))allow=true},true);var orig=window.scrollTo;window.scrollTo=function(){var top=typeof arguments[0]==="object"?arguments[0]&&arguments[0].top:arguments[1];if(!allow&&moved&&top===0)return;allow=false;return orig.apply(this,arguments)}})();`,
          }}
        />
        <PreviewHostBridge />
        <AuthProvider>
          <Outlet />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}
