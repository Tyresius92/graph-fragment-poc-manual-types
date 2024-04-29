import React from "react";
import { Film } from "./components/Film";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo";
import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";
import { Films } from "./components/Films";

const App = () => {
  return (
    <div style={{ padding: 40 }}>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Routes>
            <Route path="/" Component={() => <Navigate to="/films" />} />
            <Route path="/films" Component={Films} />
            <Route path="/film/:filmId" Component={Film} />
            <Route
              path="*"
              Component={() => (
                <div>
                  Could not find that page. <Link to="/">Take me home.</Link>
                </div>
              )}
            />
          </Routes>
        </BrowserRouter>
      </ApolloProvider>
    </div>
  );
};

export default App;
