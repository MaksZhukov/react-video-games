import React from 'react';
import queryString from 'query-string';
import { Redirect, Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { BrokenImage } from '@material-ui/icons';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';

const styles = ({
  container: {
    padding: 20,
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    textTransform: 'uppercase',
  },
});

class NavBar extends React.PureComponent {
  componentWillMount() {
    const { props } = this;
    const { location } = props;
    const token = localStorage.getItem('token') || queryString.parse(location.search).token;
    if (token) {
      props.checkToken(token);
    } else {
      props.push('/sign-in');
    }
  }

  render() {
    const { props } = this;
    const { classes } = props;
    const { responseCheckToken } = props;
    if (responseCheckToken.loading === false) {
      if (responseCheckToken.user) {
        return (
          <React.Fragment>
            <AppBar position="fixed">
              <Grid container spacing={16} className={classes.container} align="center">
                <Grid item xs="auto" style={{ alignSelf: 'center' }}>
                  <BrokenImage />
                </Grid>
                <Grid item xs="auto" style={{ alignSelf: 'center' }}>
                  <Link to="/explore" className={classes.link}>
                      Discovery
                  </Link>
                </Grid>
                <Grid item xs="auto" style={{ alignSelf: 'center' }}>
                  <Link to="/games" className={classes.link}>
                      My
                    <br />
                      Games
                  </Link>
                </Grid>
                <Grid item xs />
                <Grid item xs="auto" style={{ alignSelf: 'center' }}>
                  <Link to="/user/:id" className={classes.link}>
                    {responseCheckToken.user.name}
                  </Link>
                </Grid>
              </Grid>
            </AppBar>
          </React.Fragment>
        );
      }
      return <Redirect to="/sign-in" />;
    }
    return null;
  }
}

export default withStyles(styles)(NavBar);
