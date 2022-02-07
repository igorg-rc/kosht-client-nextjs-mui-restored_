import * as React from "react";
import axios from "axios";
import UsersList from "../Users/UserList";
import CategoriesList from "../Categories/CategoriesList";
import { Container, Grid } from "@mui/material";
import { Header } from "../UI/Header";

/**
 * A HOC that wraps a page and adds the UserList component to it.
 *
 * @function withUsersList
 * @param Component - a React component (page)
 * @returns {ReactElement}
 * @example withUsersList(Component)
 */
const withLayout = (Component) => {
  const wrappedComponent = (props) => (
    <Container>
      <Header />
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <UsersList {...props} />
          <CategoriesList {...props} />
        </Grid>
        <Grid item xs={6}>
          <div style={{ width: '100%', height: '40vh', border: '1px solid black', borderRadius: 6 }}>
            <Component {...props} />
          </div>
        </Grid>
        <Grid item xs={3}>
          <div style={{ width: '100%', height: '40vh', border: '1px solid black', borderRadius: 6 }}></div>
        </Grid>
      </Grid>
    </Container>
  );

  return wrappedComponent;
};


export const getStaticProps = async () => {
  try {
    const res = await axios.get("https://jsonplaceholder.typicode.com/users");
    const categoriesList = await axios.get("https://kosht-api.herokuapp.com/api/categories");

    return {
      props: {
        retrieved: true,
        users: res.data,
        categories: categoriesList.data,
        error: ""
      }
    };
  } catch (error) {
    return {
      props: {
        retrieved: true,
        users: [],
        error: error.toString()
      }
    };
  }
};

export default withLayout;