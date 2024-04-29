import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://swapi-graphql.netlify.app/.netlify/functions/index",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          person(_, { args, toReference }) {
            return toReference({
              __typename: "Person",
              id: args?.["id"],
            });
          },
        },
      },
    },
  }),
});
