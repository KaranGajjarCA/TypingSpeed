import React from 'react';
import './App.css';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Timer from './components/Timer';
import CounterBox from "./components/CounterBox";

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';


class App extends React.Component {
    state = {
        sentence: "Hello,Suddenly quite near him there was a rifle shot. He heard the crack and\n" +
            "                            smack and whistling ricochet among the rocks behind him. He dropped his\n" +
            "                            torch and began feebly to trot.",
        currentString: "",
    }

    componentDidMount() {
        let character_length = 30;
        let index = 0;
        let letters = this.state.sentence;
        let started = false;
        let current_string = letters.substring(index, index + character_length);
        this.setState({
            currentString: current_string
        });
    }

    render() {
        return (
            <div className="App">
                <CssBaseline/>
                <Container>
                    <Box my={2}>
                        <Typography variant="h5" className="AppLogo" align="left">
                            Typing Speed
                        </Typography>
                        <Grid item xs={12}>
                            <Timer/>
                            <CounterBox/>

                            {/* Main Content */}
                            <Box my={2}>
                                <Grid container
                                      direction="row"
                                      justify="center"
                                      alignItems="center">
                                    <Card variant="outlined" className="card">
                                        <CardActions>
                                            <Typography color="textSecondary" gutterBottom>
                                                Start typing ...
                                            </Typography>
                                        </CardActions>
                                        <CardContent className="CardContent">
                                            <Typography variant="h3" align="left" className="WriteContent">
                                                {this.state.currentString}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>

                            </Box>
                            <Box my={2}>
                                <Grid container
                                      direction="row"
                                      justify="center"
                                      alignItems="center">
                                    <Card variant="outlined" className="card writtencontent">

                                        <CardContent className="CardContent">
                                            <Typography variant="h5" align="left" className="WrittenContent">
                                                {/*{this.state.sentence}*/}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Box>
                        </Grid>
                    </Box>
                </Container>
            </div>
        );
    }
}

export default App;
