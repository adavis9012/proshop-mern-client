import React from 'react';
import CartScreen from "./screens/CartScreen";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from './screens/ProductScreen';
import {BrowserRouter as Router, Route} from "react-router-dom";
import {Container} from "react-bootstrap";
import LoginScreen from "./screens/LoginScreen";

function App() {
  return (
    <Router>
      <Header/>
        <main className="py-3">
          <Container>
            <Route path="/login" component={LoginScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path={"/cart/:id?"} component={CartScreen} />
            <Route path="/" component={HomeScreen} exact />
          </Container>
        </main>
        <Footer/>
    </Router>
  );
}

export default App;
