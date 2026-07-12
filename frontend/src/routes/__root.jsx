import { QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect } from "react";
import appCss from "../styles.css?url";
import { reportErrorLog } from "../lib/error-reporting";
function NotFoundComponent() {
  return (
    <div
      className="flex min-h-screen items-center justify-center px-4 grid-bg"
      style={{ background: "oklch(0.08 0.01 260)" }}
    >
      <div className="max-w-md text-center">
        <div
          className="text-8xl font-black mb-4"
          style={{
            background: "linear-gradient(135deg, oklch(0.72 0.25 255), oklch(0.75 0.22 300))",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          404
        </div>
        <h2 className="text-xl font-bold mb-2" style={{ color: "oklch(0.92 0.01 255)" }}>
          Page Not Found
        </h2>
        <p className="text-sm mb-8" style={{ color: "oklch(0.52 0.02 255)" }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-bold text-white transition-all hover:scale-[1.02]"
          style={{
            background: "linear-gradient(135deg, oklch(0.65 0.25 255), oklch(0.60 0.22 280))",
            boxShadow: "0 4px 20px oklch(0.65 0.25 255 / 0.35)",
          }}
        >
          Return to Terminal
        </Link>
      </div>
    </div>
  );
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportErrorLog(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground text-destructive">
          {error?.message ||
            "Something went wrong on our end. You can try refreshing or head back home."}
        </p>
        {error?.stack && (
          <pre className="mt-4 max-h-48 overflow-auto rounded-lg border border-destructive/20 bg-destructive/5 p-3 text-left font-mono text-[10px] text-destructive-foreground/80">
            {error.stack}
          </pre>
        )}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}
export const Route = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Apex Research Investment Terminal" },
      { name: "description", content: "Institutional-grade platform for global investment research and quantitative analysis." },
      { name: "author", content: "Apex Research" },
      { property: "og:title", content: "Apex Research Investment Terminal" },
      { property: "og:description", content: "Institutional-grade platform for global investment research and quantitative analysis." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/logo.png", type: "image/png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});
function RootShell({ children }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* Terminal scanline effect */}
        <div className="scanline" />
        {children}
        <Scripts />
      </body>
    </html>
  );
}
function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
