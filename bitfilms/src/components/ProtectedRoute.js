import React from 'react';
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props  }) => {

  return (
    <Route>
      
      {
      () => 
        props.isCheckingToken ?
          ""
        :
          // console.log(1)
          !props.loggedIn ? <Redirect to="/" /> : props.render()
      }

    </Route>
)}

export default ProtectedRoute;

// {
//  props.render()
//}
//console.log("PR log ",props.loggedIn);