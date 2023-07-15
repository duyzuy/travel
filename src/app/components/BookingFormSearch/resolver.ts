import { Resolvers, gql } from "@apollo/client";
import { NextSSRInMemoryCache } from "@apollo/experimental-nextjs-app-support/ssr";
import { QUERY_BOOING_INFORMATION } from "./operations/queries";
export const bookingInformationResolver: Resolvers = {
  Mutation: {
    changeTripType: (
      data,
      { tripType },
      { cache }: { cache: NextSSRInMemoryCache }
    ) => {
      cache.writeQuery({
        query: QUERY_BOOING_INFORMATION,
        data: {
          currentAuthor: {
            name: "John Smith",
            authorId: 12345,
          },
        },
      });
    },
  },
};
