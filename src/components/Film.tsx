import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import { MovieTitle, MovieTitleFragment } from "./MovieTitle";
import { OpeningCrawl, OpeningCrawlFragment } from "./Crawl";
import { StarshipList, StarshipListFragment } from "./StarshipList";
import { CharacterList, CharacterListFragment } from "./CharacterList";

export interface FilmQuery {
  film:
    | ({
        id: string;
      } & MovieTitleFragment &
        OpeningCrawlFragment &
        CharacterListFragment &
        StarshipListFragment)
    | null;
}

export const filmQuery = gql`
  query FilmQuery($id: ID!) {
    film(id: $id) {
      id
      ...${MovieTitle.fragmentName}
      ...${OpeningCrawl.fragmentName}
      ...${CharacterList.fragmentName}
      ...${StarshipList.fragmentName}
    }
  }

  ${MovieTitle.fragment}
  ${OpeningCrawl.fragment}
  ${CharacterList.fragment}
  ${StarshipList.fragment}
`;

export const Film = () => {
  const { filmId } = useParams<{ filmId: string }>();

  if (!filmId) {
    throw new Error("Film ID not set in URL");
  }

  const { data, loading, error } = useQuery<FilmQuery>(filmQuery, {
    variables: {
      id: filmId,
    },
  });

  if (loading || error) {
    return <></>;
  }

  if (!data || !data.film) {
    throw new Error("something did a whoopsie");
  }

  return (
    <div>
      <Link to="/">{"<-- Back"}</Link>
      <MovieTitle film={data.film} />
      <OpeningCrawl film={data.film} />
      <CharacterList film={data.film} />
      <StarshipList film={data.film} />
    </div>
  );
};
