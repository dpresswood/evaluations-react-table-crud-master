import React from 'react';
import { ApolloProvider, useQuery} from '@apollo/react-hooks';
import  ApolloClient, { gql } from 'apollo-boost';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom';
import env from './env.js';
import Home from './Home';
import Edit from './Edit';
import './App.css';


const client = new ApolloClient({
  uri: env.GRAPHQL_ENDPOINT,
  request: operation => {
    operation.setContext({
      headers: {
        'x-api-key': env.GRAPHQL_API_KEY,
        
      }
    })
  }
});


const ALL_USERS_QUERY = gql`
  query {
    allUsers {
      email
      name
      role
    }
  }
`;


const App = () => {
  const { loading, error, data } = useQuery(ALL_USERS_QUERY);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {JSON.stringify(error)}</p>;
  }

return(
  <main>
    <Routes>
    <Route strict exact path="/" element={<Home allUsers={data.allUsers} />}/>
    <Route strict path="/edit/:email" element={<Edit allUsers={data.allUsers} />}/>
    </Routes>
  </main>
  ) 
};

const Root = () => (
  <BrowserRouter>
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  </BrowserRouter>

);


ReactDOM.render(<Root />, document.getElementById('root'));

