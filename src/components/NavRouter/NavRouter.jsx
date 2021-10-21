import React from 'react'
import { Route } from 'react-router';
import { Navbar } from '../../layouts/Navbar';

const NavRouter = ({exact, path, component: Component}) => (
    <Route exact={exact} path={path} render={(props) => (
      <div>
        <Navbar/>
        <Component {...props}/>
      </div>
    )}/>
  )

export default NavRouter
