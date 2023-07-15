import { Resolvers } from "@apollo/client";

export const resolvers: Resolvers = {
  Mutation: {
    changeTripType: (data, args, { cache }) => {
      console.log({ data, args, cache });
    },
  },
};
