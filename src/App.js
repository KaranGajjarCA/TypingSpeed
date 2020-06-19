import React from 'react';
import './App.css';
import ReactHtmlParser from 'react-html-parser';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Paper from "@material-ui/core/Paper";
import PauseIcon from "@material-ui/icons/Pause";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import './style.css';

const sentence = "Hello, Suddenly quite near him there was a rifle shot. He heard the crack and smack and whistling ricochet among the rocks behind him. He dropped his torch and began feebly to trot.";
const character_length = 30;
let index = 0;


class App extends React.Component {
    constructor(props) {
        super(props);
        let current_string = sentence.substring(index, index + character_length);
        this.state = {
            index: index,
            sentence: sentence,
            currentString: current_string,
            seconds: 0,
            minutes: 0,
            intervalId: "",
            timerStart: false,
            timer: 0,
            wpm: 0,
            words: 0,
            errors: 0,
            characterTyped: "",
        }
        this.changeText = this.changeText.bind(this);

    }

    componentDidMount() {
        // document.onkeypress = this.startTyping;
    }

    startTimer = () => {
        let intervalId = setInterval(() => {
            let timer = this.state.timer
            timer += 1000;
            let sec = (timer / 1000) % 60;
            let min = Math.floor(timer / 1000 / 60) % 60;
            let wpm = Math.round(this.state.words / (timer / 60000));
            this.setState({seconds: sec, minutes: min, timer: timer, wpm: wpm})
        }, 1000);
        this.setState({intervalId: intervalId, timerStart: true})
    }

    pauseTimer = () => {
        clearInterval(this.state.intervalId);
        this.setState({timerStart: false})

    }
    clearData = () => {
        this.setState({
            index: 0,
            seconds: 0,
            minutes: 0,
            timerStart: false,
            timer: 0,
            wpm: 0,
            words: 0,
            errors: 0,
            characterTyped: "",
        })
    }
    resetProgress = () => {
        clearInterval(this.state.intervalId);
        this.clearData();
        let current_string = this.state.sentence.substring(index, index + character_length);
        this.setState({
            currentString: current_string,
        })

    }
    changeText = (e) => {
        let sentenceList = ["A woman finds a pot of treasure on the road while she is returning from work. Delighted with her luck, she decides to keep it. As she is taking it home, it keeps changing. However, her enthusiasm refuses to fade away.",
            "Timmie Willie is a country mouse who is accidentally transported to a city in a vegetable basket. When he wakes up, he finds himself in a party and makes a friend. When he is unable to bear the city life, he returns to his home but invites his friend to the village. When his friend visits him, something similar happens.",
            "Earth has been destroyed by war and no one lives on it anymore. The robots and the machines continue to function and serve human beings who have long ago died. ",
            "A school teacher is narrating all the recent incidents that have happened on campus. First, they mention a garden where all the trees died. Pretty soon deaths of all kinds begin to occur.",
            "A mother is telling her daughter how to live her life properly. The daughter does not seem to have any say in it.",
            "Dorrit is a child whose father has been in prison ever since she could remember. Unable to pay their debts, the whole family is forced to spend their days in a cell.",
            "A man travels to a freezing, isolated place called Yukon. He only has his dog with him for company. Throughout his journey, he ignores the advice other people had given him and takes his life for granted. Finally, he realizes the real power of nature and how delicate (easily broken) human life actually is.",
            "Sly is a chimpanzee who is much smarter than other beings of his kind. He loves to play with clay on a potter's wheel all day and likes to keep to himself. But one day when the school kids bully him, he loses his temper and acts out in anger. Seeing this, the teacher punishes him and takes away his clay.",
            "A man brings a magical monkey’s paw from India which grants three wishes to three people. When the White family buys it from him, they realize that sometimes you do not want your wishes to come true.",
            "There was once a little girl who was very obstinate and disobedient. How could such a girl be happy? One day she said to her parents, \"I have heard so much of the old witch that I will go and see her. People say that she is a wonderful old woman and has many marvelous things in her house and I am very curious to see them",
            sentence];
        let set = sentenceList[Math.floor(Math.random() * sentenceList.length)];
        let current_string = set.substring(index, index + character_length);
        this.setState({
            currentString: current_string,
            sentence: set,
        })
        this.pauseTimer();
        this.clearData();
    }

    finalResult = (e) => {
        alert("Congratulations!\nWords per minute: " + this.state.wpm + "\nWordcount: " + this.state.words + "\nErrors:" + this.state.errors);
        this.resetProgress();
    }
    startTyping = (e) => {
        if (!this.state.timerStart) {
            this.startTimer();
        }
        let evt = e || window.event;
        let charCode = evt.which || evt.keyCode;
        let charTyped = String.fromCharCode(charCode);
        console.log("charTyped", charTyped, this.state.sentence.charAt(this.state.index))
        if (charTyped === this.state.sentence.charAt(this.state.index)) {
            if (charTyped === " ") {
                this.setState({words: this.state.words + 1})
            }
            this.setState({index: this.state.index + 1})
            let current_string = this.state.sentence.substring(this.state.index, this.state.index + character_length);
            this.setState({
                currentString: current_string,
            })
            this.setState({characterTyped: this.state.characterTyped + charTyped})
            if (this.state.index === this.state.sentence.length) {
                this.setState({words: this.state.words + 1});
                let wpm = Math.round(this.state.words / (this.state.timer / 60000));
                this.setState({wpm: wpm});
                this.finalResult();
            }
        } else {
            console.log(e.type)
            if (e.type !== 'click') {
                this.setState({characterTyped: this.state.characterTyped + "<span class='wrong'>" + charTyped + "</span>"})
                this.setState({errors: this.state.errors + 1});
            }
        }

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
                            <Box mt={2}>
                                <Grid container justify="center" spacing={2}>
                                    <Grid item>
                                        <Paper className="paper">
                                            <Typography variant="h3" align="center">
                                                {this.state.minutes}
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
                                                {this.state.seconds}
                                            </Typography>
                                            <Typography variant="h6" align="center">
                                                SEC
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </Box>
                            <div className="icon-bar">
                                <li className="countBox">
                                    <Grid item>
                                        <Paper className="count-paper">
                                            <Typography variant="h4" align="center">
                                                {this.state.wpm}
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
                                                {this.state.words}
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
                                                {this.state.errors}
                                            </Typography>
                                            <Typography variant="h6" align="center">
                                                ERROR
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                </li>
                            </div>
                            <Grid>
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
                                            <CardContent className="CardContent"
                                                         onClick={document.onkeypress = this.startTyping}
                                                         onKeyPress={this.startTyping}>
                                                <Typography variant="h3" align="left" className="WriteContent">
                                                    {ReactHtmlParser(this.state.currentString)}
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
                                                    {ReactHtmlParser(this.state.characterTyped)}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Box>
                            </Grid>
                            <div className="icon-bar settings">
                                <li className="countBox">
                                    <Grid item>
                                        <Paper className="count-paper pause-btn"
                                               title="Pause">
                                            {this.state.timerStart &&
                                            <PauseIcon color="action" onClick={this.pauseTimer}/>}
                                            {!this.state.timerStart &&
                                            <PlayArrowIcon color="action" onClick={this.startTimer}/>}
                                        </Paper>
                                    </Grid>
                                </li>
                                <li className="countBox">
                                    <Grid item>
                                        <Paper className="count-paper reset-btn" onClick={this.resetProgress}
                                               title="Reset">
                                            <RotateLeftIcon color="action"/>
                                        </Paper>
                                    </Grid>
                                </li>
                                <li className="countBox">
                                    <Grid item>
                                        <Paper className="count-paper change-btn" onClick={this.changeText}
                                               title="Change Sentence">
                                            <AutorenewIcon color="action"/>
                                        </Paper>
                                    </Grid>
                                </li>
                            </div>
                        </Grid>
                    </Box>
                </Container>
            </div>
        );
    }
}

export default App;
