import React from "react";
import { gql } from "@apollo/client";

import "./crawl.css";

export interface OpeningCrawlFragment {
  __typename: "Film";
  id: string;
  openingCrawl: string | null;
  episodeID: number | null;
  title: string | null;
}

export const openingCrawlFragment = gql`
  fragment OpeningCrawlFragment on Film {
    id
    openingCrawl
    episodeID
    title
  }
`;

export interface OpeningCrawlProps {
  film: OpeningCrawlFragment;
}

export const OpeningCrawl = ({ film }: OpeningCrawlProps) => (
  <div className="crawl-container">
    <div className="fade"></div>

    <section className="star-wars">
      <div className="crawl">
        <div className="title">
          <p>Episode {film.episodeID}</p>
          <h1>{film.title}</h1>
        </div>
        {film.openingCrawl?.split("\n\r").map((row) => <p key={row}>{row}</p>)}
      </div>
    </section>
  </div>
);

OpeningCrawl.fragment = openingCrawlFragment;
OpeningCrawl.fragmentName = "OpeningCrawlFragment" as const;
