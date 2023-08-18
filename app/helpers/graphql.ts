import { GraphQLClient } from "graphql-request";

export const getGqlClient = () =>
    new GraphQLClient(`https://plus.dutchie.com/plus/2021-07/graphql`, {
        headers: {
            Authorization: process.env.GRAPHQL_AUTH_TOKEN as string,
        },
    });
