import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import MovieCard from "../components/MovieCard";
import { BrowserRouter } from "react-router-dom";
import type { Movie } from "../types/tmdb";

// Mock useGenres hook
vi.mock("../hooks/useMovies", () => ({
  useGenres: () => ({
    data: {
      genres: [
        { id: 28, name: "Action" },
        { id: 12, name: "Adventure" },
      ],
    },
  }),
}));

const mockMovie: Movie = {
  id: 1,
  title: "Test Movie",
  poster_path: "/test.jpg",
  backdrop_path: "/backdrop.jpg",
  overview: "Test overview",
  release_date: "2023-01-01",
  vote_average: 8.5,
  vote_count: 100,
  popularity: 50,
  adult: false,
  original_language: "en",
  original_title: "Test Movie Original",
  video: false,
  genre_ids: [28, 12],
};

describe("MovieCard", () => {
  it("renders movie title and rating", () => {
    render(
      <BrowserRouter>
        <MovieCard movie={mockMovie} />
      </BrowserRouter>,
    );

    expect(screen.getByText("Test Movie")).toBeInTheDocument();
    expect(screen.getByText("8.5")).toBeInTheDocument();
  });

  it("renders genres based on ids", () => {
    render(
      <BrowserRouter>
        <MovieCard movie={mockMovie} />
      </BrowserRouter>,
    );

    // Should display genre names joined by dot
    expect(screen.getByText(/Action/)).toBeInTheDocument();
    expect(screen.getByText(/Adventure/)).toBeInTheDocument();
  });

  it("renders release year", () => {
    render(
      <BrowserRouter>
        <MovieCard movie={mockMovie} />
      </BrowserRouter>,
    );

    expect(screen.getByText("2023")).toBeInTheDocument();
  });
});
