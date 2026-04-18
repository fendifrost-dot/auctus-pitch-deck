import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Wordmark } from "@/components/Wordmark";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 — route not found:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-navy text-cream flex flex-col">
      <div className="container py-8">
        <Wordmark variant="light" />
      </div>
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-lg">
          <p className="eyebrow text-cream/50 mb-4">Error 404</p>
          <h1 className="font-serif text-6xl mb-4 text-cream">Page not found.</h1>
          <p className="text-cream/70 mb-8">
            The page you're looking for has moved or was never listed on the platform.
          </p>
          <Button asChild variant="gold" size="lg">
            <Link to="/">Return home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
