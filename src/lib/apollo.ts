import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://api-sa-east-1.graphcms.com/v2/cl4szh7mr2rn701z32n6x1obm/master",
  cache: new InMemoryCache()
})