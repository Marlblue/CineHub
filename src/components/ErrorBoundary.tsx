import React from "react";
import { t } from "../utils/translations";
import type { Language } from "../utils/translations";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  private getLanguage(): Language {
    return (localStorage.getItem("cinehub-lang") as Language) || "en-US";
  }

  render() {
    if (this.state.hasError) {
      const lang = this.getLanguage();
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
          <div className="text-center max-w-lg">
            <h1 className="text-4xl font-bold mb-4 text-red-500">{t("error.oops", lang)}</h1>
            <p className="text-xl mb-4">{t("error.somethingWrong", lang)}</p>
            <p className="text-gray-400 mb-8">
              {t("error.apology", lang)}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition-colors"
            >
              {t("error.refreshPage", lang)}
            </button>
            {import.meta.env.DEV && this.state.error && (
              <div className="mt-8 p-4 bg-gray-800 rounded text-left overflow-auto max-h-64">
                <p className="text-red-400 font-mono text-sm">
                  {this.state.error.toString()}
                </p>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
