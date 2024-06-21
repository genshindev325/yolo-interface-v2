import { ApolloClient, InMemoryCache } from '@apollo/client'

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache'
    // errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache'
    // errorPolicy: 'all',
  },
  mutate: {
    fetchPolicy: 'no-cache'
  }
}

export function apolloClient(uri) {
  const client = new ApolloClient({
    uri,
    cache: new InMemoryCache(),
    defaultOptions: defaultOptions
  })

  const query = async (query, vars = '', onError) => {
    const queryResponse = await client.query({ query, variables: vars }).catch((err) => {
      console.log('Error in query,', err)
      onError && onError()
      return
    })
    return queryResponse?.data
  }
  return { query }
}
