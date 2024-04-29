import React from "react";
import { gql } from "@apollo/client";
import { CharacterCard, CharacterCardFragment } from "./CharacterCard";

export interface StarshipCardFragmentType {
  __typename: "Starship";
  id: string;
  name: string | null;
  model: string | null;
  starshipClass: string | null;
  costInCredits: number | null;
  crew: string | null;
  pilotConnection: {
    __typename: "StarshipPilotsConnection";
    pilots: ({
      __typename: "Person";
      id: string;
    } & CharacterCardFragment)[];
  };
}

export const starshipCardFragment = gql`
  fragment StarshipCardFragment on Starship {
    id
    name
    model
    starshipClass
    costInCredits
    crew
    pilotConnection {
      pilots {
        id
        ...${CharacterCard.fragmentName}
      }
    }
  }
  ${CharacterCard.fragment}
`;

export interface StarshipCardProps {
  starship: StarshipCardFragmentType;
}

export const StarshipCard = ({ starship }: StarshipCardProps) => {
  return (
    <div
      style={{
        backgroundColor: "lightgray",
        padding: 20,
      }}
    >
      <h3>{starship.name}</h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
        }}
      >
        <div>
          <h4>Starship Specs</h4>
          <dl>
            <dt>Model</dt>
            <dd>{starship.model}</dd>

            <dt>Starship Class</dt>
            <dd>{starship.starshipClass}</dd>

            <dt>Cost In Credits</dt>
            <dd>{starship.costInCredits}</dd>

            <dt>Crew</dt>
            <dd>{starship.crew}</dd>
          </dl>
        </div>
        <div>
          <h4>Known Pilots</h4>
          <ul>
            {starship.pilotConnection?.pilots?.map((pilot) => (
              <li key={pilot.id} style={{ marginBlock: 4 }}>
                <CharacterCard person={pilot} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

StarshipCard.fragment = starshipCardFragment;
StarshipCard.fragmentName = "StarshipCardFragment" as const;
