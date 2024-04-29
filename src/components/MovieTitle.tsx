import React from "react";
import { gql } from "@apollo/client";

export interface MovieTitleFragment {
  id: string;
  episodeID: number | null;
  title: string | null;
}

export const movieTitleFragment = gql`
  fragment MovieTitleFragment on Film {
    id
    episodeID
    title
  }
`;

export interface MovieTitleProps {
  film: MovieTitleFragment;
}

export const MovieTitle = ({ film }: MovieTitleProps) => {
  return (
    <h1>
      Episode {film.episodeID}: {film.title}
    </h1>
  );
};

MovieTitle.fragment = movieTitleFragment;
MovieTitle.fragmentName = "MovieTitleFragment";
