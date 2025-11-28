import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const httpLink = new HttpLink({
  uri: "https://flyby-router-demo.herokuapp.com/",
})

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
