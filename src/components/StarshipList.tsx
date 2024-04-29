import React from "react";
import { StarshipCard, StarshipCardFragmentType } from "./StarshipCard";
import { gql } from "@apollo/client";

export interface StarshipListFragment {
  starshipConnection: {
    starships: ({
      id: string;
    } & StarshipCardFragmentType)[];
  };
}

export const starshipListFragment = gql`
  fragment StarshipListFragment on Film {
    starshipConnection {
      starships {
        id
        ...${StarshipCard.fragmentName}
      }
    }
  }

  ${StarshipCard.fragment}
`;

export interface StarshipListProps {
  film: StarshipListFragment;
}

export const StarshipList = ({ film }: StarshipListProps) => {
  return (
    <>
      <h2>Starships</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gap: 20,
        }}
      >
        {film.starshipConnection?.starships?.map((starship) => (
          <div key={starship!.id} style={{ gridColumn: "auto / span 6" }}>
            <StarshipCard starship={starship!} />
          </div>
        ))}
      </div>
    </>
  );
};

StarshipList.fragment = starshipListFragment;
StarshipList.fragmentName = "StarshipListFragment";
