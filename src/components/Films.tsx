import React from "react";
import { Link } from "react-router-dom";
import { MovieTitle, MovieTitleFragment } from "./MovieTitle";
import { useQuery, gql } from "@apollo/client";

export interface GetFilms {
  allFilms: {
    films: ({
      id: string;
      episodeID: number | null;
      releaseDate: string | null;
    } & MovieTitleFragment)[];
  };
}

const getFilmsQuery = gql`
  query GetFilms {
    allFilms {
      films {
        id
        episodeID
        releaseDate
        ...${MovieTitle.fragmentName}
      }
    }
  }

  ${MovieTitle.fragment}
`;

export const Films = () => {
  const { data, loading, error } = useQuery<GetFilms>(getFilmsQuery);

  if (loading || error) {
    return <></>;
  }

  if (!data) {
    return <div>Got bad data from the api</div>;
  }

  return (
    <div>
      <h1>Star Wars Movies</h1>
      {[...data.allFilms.films]
        .sort((a, b) => a.episodeID! - b.episodeID!)
        .map((film) => {
          return (
            <div style={{ marginBlock: 50 }}>
              <Link key={film.id} to={`/film/${film.id}`}>
                <MovieTitle film={film} />
              </Link>
              <p>
                Released:{" "}
                {Intl.DateTimeFormat().format(new Date(film.releaseDate!))}
              </p>
            </div>
          );
        })}
    </div>
  );
};
