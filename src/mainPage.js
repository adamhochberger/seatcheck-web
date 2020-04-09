import React from 'react';
import './index.css';

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

class MainPage extends React.Component {
      render() {

        return (
            <div className="background-img">

                <Typography class="page-header" variant="h1" component="h1">
                    Welcome to Social Compass
                </Typography>
                <Typography class="page-text" variant="body1" component ="body1">
                A seating platform for <br/>professionals and students <br/><br/>
                    To begin, create an account by clicking on the profile icon <br/>
                    Afterwards, the left menu lets you access the website features. <br/>
                    Or, you can access those pages through these buttons:<br/>
                </Typography>
                <br/>

                <Grid  xs={12} md={12} lg={12}>
                    <Button variant="contained" color="primary" href="/create">
                            Create map
                    </Button>
                    <Button variant="contained" color="primary" href="/view">
                            View map
                    </Button>
                    <Button variant="contained" color="primary" href="/maps">
                            List of your maps
                    </Button>
                </Grid>
            </div>
        );
      }

}

export default MainPage;
