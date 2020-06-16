import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import './style.css';

const CounterBox = () => {

    return (
        <div className="icon-bar">
            <li className="countBox">
                <Grid item>
                    <Paper className="count-paper">
                        <Typography variant="h4" align="center">
                            0
                        </Typography>
                        <Typography variant="h6" align="center">
                            WPM
                        </Typography>
                    </Paper>
                </Grid>
            </li>
            <li className="countBox">
                <Grid item>
                    <Paper className="count-paper">
                        <Typography variant="h4" align="center">
                            0
                        </Typography>
                        <Typography variant="h6" align="center">
                            WORDS
                        </Typography>
                    </Paper>
                </Grid>
            </li>
            <li className="countBox ErrorBox">
                <Grid item>
                    <Paper className="count-paper">
                        <Typography variant="h4" align="center">
                            0
                        </Typography>
                        <Typography variant="h6" align="center">
                            ERROR
                        </Typography>
                    </Paper>
                </Grid>
            </li>
        </div>
    );
}

export default CounterBox;