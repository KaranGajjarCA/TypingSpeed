import React from 'react';
import {useState, useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import './style.css';

const Timer = () => {
    const [seconds, setSeconds] = useState({
        minutes: 0,
        seconds: 0,
    });

    let timer = 0;
    useEffect(() => {
        setInterval(() => {
            timer += 1000;
            let sec = (timer / 1000) % 60;
            let min = Math.floor(timer / 1000 / 60) % 60;
            setSeconds({seconds: sec, minutes: min})
        }, 1000);
    }, []);

    return (
        <Grid container justify="center" spacing={2}>
            <Grid item>
                <Paper className="paper">
                    <Typography variant="h3" align="center">
                        {seconds.minutes}
                    </Typography>
                    <Typography variant="h6" align="center">
                        MIN
                    </Typography>
                </Paper>
            </Grid>
            <Grid item>
                <Box mt={0.5}>
                    <Typography variant="h2" align="center">
                        :
                    </Typography>
                </Box>
            </Grid>
            <Grid item>
                <Paper className="paper">
                    <Typography variant="h3" align="center">
                        {seconds.seconds}
                    </Typography>
                    <Typography variant="h6" align="center">
                        SEC
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default Timer;