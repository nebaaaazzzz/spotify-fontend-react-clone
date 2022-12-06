import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
console.log(import.meta.env.VITE_GEO_API_KEY);
const headers = {
  "X-RapidAPI-Key": import.meta.env.VITE_GEO_API_KEY,
  "X-RapidAPI-Host": import.meta.env.VITE_SHAZAM_CORE_RAPID_API_KEY,
};

export const ShazamApi = createApi({
  reducerPath: "shazamApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam-core.p.rapidapi.com/v1/",
    headers,
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({
      query: () => "/charts/world",
    }),
    getSongDetails: builder.query({
      query: ({ songid }) => {
        return `/tracks/details?track_id=${songid}`;
      },
    }),
    getSongsByGenre: builder.query({
      query: (genre) => `/charts/genre-world?genre_code=${genre}`,
    }),
    getSongRelated: builder.query({
      query: ({ songid }) => `/tracks/related?track_id=${songid}`,
    }),
    getArtistDetail: builder.query({
      query: ({ artistId }) => `/artists/details?artist_id=${artistId}`,
    }),
    getSongsByCountry: builder.query({
      query: (countryCode) => `/charts/country?country_code=${countryCode}`,
    }),
    getSongsBySearch: builder.query({
      query: (searchTerm) =>
        `/search/multi?query=${searchTerm}&search_type=SONGS_ARTISTS`,
    }),
  }),
});
export const {
  useGetSongRelatedQuery,
  useGetSongDetailsQuery,
  useGetSongsBySearchQuery,
  useGetSongsByGenreQuery,
  useGetTopChartsQuery,
  useGetSongsByCountryQuery,
  useGetArtistDetailQuery,
} = ShazamApi;
