import { Link } from "react-router-dom";
import { Heart, Home, ExternalLink, Github } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { t } from "../utils/translations";

const Footer = () => {
  const { language } = useLanguage();

  return (
    <footer className="relative z-10 border-t border-white/5 bg-linear-to-b from-transparent to-cinema-dark mt-20">
      <div className="container mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6 group">
              <img src="/cinehub.svg" alt="CineHub" className="w-8 h-8" />
              <span className="text-xl md:text-2xl font-black tracking-tighter text-white uppercase">
                CINE<span className="text-cinema-accent">HUB</span>
              </span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed max-w-sm font-medium">
              {t("footer.description", language)}
            </p>
            <div className="flex items-center gap-4 mt-8">
              <a
                href="https://github.com/Marlblue/CineHub"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 glass rounded-xl text-gray-400 hover:text-white transition-all"
                title="GitHub Repository"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-[10px] font-black text-white uppercase tracking-[0.2em] mb-6">
              {t("footer.navigate", language)}
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/"
                  className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-cinema-accent transition-colors"
                >
                  <Home className="w-4 h-4" />
                  {t("footer.browseHome", language)}
                </Link>
              </li>
              <li>
                <Link
                  to="/watchlist"
                  className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-cinema-accent transition-colors"
                >
                  <Heart className="w-4 h-4" />
                  {t("footer.yourWatchlist", language)}
                </Link>
              </li>
            </ul>
          </div>

          {/* Attribution */}
          <div>
            <h3 className="text-[10px] font-black text-white uppercase tracking-[0.2em] mb-6">
              {t("footer.legalData", language)}
            </h3>
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-cinema-accent transition-colors mb-4"
            >
              <ExternalLink className="w-4 h-4" />
              TMDB Database
            </a>
            <p className="text-[10px] text-gray-600 leading-relaxed font-bold uppercase tracking-tight">
              {t("footer.attribution", language)}
            </p>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">
            © {new Date().getFullYear()} CINEHUB PREMIA. {t("footer.allRightsReserved", language)}
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-[10px] font-black text-gray-600 hover:text-white transition-colors uppercase tracking-widest">{t("footer.privacy", language)}</a>
            <a href="#" className="text-[10px] font-black text-gray-600 hover:text-white transition-colors uppercase tracking-widest">{t("footer.terms", language)}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
