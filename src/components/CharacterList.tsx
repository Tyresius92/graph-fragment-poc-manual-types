import React from "react";
import { gql } from "@apollo/client";
import { CharacterCard, CharacterCardFragment } from "./CharacterCard";

export interface CharacterListFragment {
  characterConnection: {
    __typename: "FilmCharactersConnection";
    characters: ({
      __typename: "Person";
      id: string;
    } & CharacterCardFragment)[];
  };
}

export const characterListFragment = gql`
  fragment CharacterListFragment on Film {
    characterConnection {
      characters {
        id
        ...${CharacterCard.fragmentName}
      }
    }
  }

  ${CharacterCard.fragment}
`;

export interface CharacterListProps {
  film: CharacterListFragment;
}

export const CharacterList = ({ film }: CharacterListProps) => {
  return (
    <div>
      <h2>Characters</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 10,
        }}
      >
        {film.characterConnection?.characters?.map((character) => (
          <div key={character!.id} style={{ gridColumn: "auto / span 1" }}>
            <CharacterCard person={character!} />
          </div>
        ))}
      </div>
    </div>
  );
};

CharacterList.fragment = characterListFragment;
CharacterList.fragmentName = "CharacterListFragment" as const;
