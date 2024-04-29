import React from "react";
import { gql, useQuery } from "@apollo/client";

export interface CharacterCardFragment {
  id: string;
  name: string | null;
  gender: string | null;
  species: {
    id: string;
    name: string | null;
  } | null;
}

export const characterCardFragment = gql`
  fragment CharacterCardFragment on Person {
    id
    name
    gender
    species {
      id
      name
    }
  }
`;

export interface CharacterCardProps {
  person: CharacterCardFragment;
}

const characterCardQuery = gql`
  query CharacterCardQuery($id: ID!) {
    person(id: $id) {
      ...CharacterCardFragment
    }
  }

  ${characterCardFragment}
`;

interface CharacterCardQuery {
  person: CharacterCardFragment
}

export const CharacterCard = ({ person }: CharacterCardProps) => {
  const { data: _data } = useQuery<CharacterCardQuery>(characterCardQuery, {
    variables: {
      id: person.id,
    },
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "lightblue",
        padding: 20,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          flexWrap: "wrap",
        }}
      >
        <h2>{person.name}</h2>
      </div>
      <div>
        <span>{person.species?.name ?? "unknown"}</span>{" "}
        <span>{person.gender}</span>
      </div>
    </div>
  );
};

CharacterCard.fragment = characterCardFragment;
CharacterCard.fragmentName = "CharacterCardFragment";
