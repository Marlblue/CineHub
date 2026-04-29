import { Link } from "react-router-dom";
import { Home, Film } from "lucide-react";
import SEO from "../components/SEO";
import { useLanguage } from "../context/LanguageContext";
import { t } from "../utils/translations";

const NotFound = () => {
  const { language } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 animate-fade-in">
      <SEO title="404 Not Found" />
      <div className="relative mb-8">
        <span className="text-[120px] md:text-[180px] font-black text-cinema-card leading-none select-none">
          404
        </span>
        <div className="absolute inset-0 flex items-center justify-center">
          <Film className="w-16 h-16 text-cinema-accent/50" />
        </div>
      </div>
      <h1 className="text-2xl md:text-3xl font-bold mb-3 text-white">
        {t("notFound.title", language)}
      </h1>
      <p className="text-gray-500 text-sm mb-8 max-w-md">
        {t("notFound.description", language)}
      </p>
      <Link
        to="/"
        className="flex items-center gap-2 px-6 py-3 bg-cinema-accent hover:bg-amber-500 text-black rounded-xl font-bold transition-all duration-300 text-sm"
      >
        <Home className="w-4 h-4" />
        {t("notFound.backHome", language)}
      </Link>
    </div>
  );
};

export default NotFound;
