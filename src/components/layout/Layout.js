import { Fragment } from "react";
import classes from "./Layout.module.css";
import MainNavigation from "./MainNavigation";

const Layout = (porps) => {
  return (
    <Fragment>
      <MainNavigation />
      <main className={classes.main}>{porps.children}</main>
    </Fragment>
  );
};

export default Layout;
