export interface Movie{
    id: number;
    adult: boolean;
    backdrop_path: string;
    original_title: string;
    original_language: string;
    overview: string;
    popularity: number;
    title: string;
    poster_path: string;
    release_date: string;
    genre_ids: Genres[];
    video: boolean;
    vote_average: number | undefined;
    vote_count: number;
}

export interface Genres {
    id: number;
    name: string;
}

export interface MovieResponse {
    results: Movie[];
    page: number;
    total_pages: number;
}

export interface SpokenLanguage {
    iso_639_1: string;
    name: string;
    english_name: string;
}

export interface MovieDetail extends Movie{
    spoken_languages: SpokenLanguage[];
}

export interface Cast {
    id: number;
    name: string;
    profile_path: string | null;
    character: string;
    cast_id: number;
    order: number;
}

export interface Trailer {
    id: string;
    key: string;
    name: string;
    site: string;
    type: string;
}