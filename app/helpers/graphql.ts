import { GraphQLClient } from "graphql-request";

export const getGqlClient = () =>
    new GraphQLClient(process.env.GRAPHQL_URL as string, {
        headers: {
            Authorization: process.env.GRAPHQL_AUTH_TOKEN as string,
        },
    });
