import React from "react";
import {Board} from "../Board/Board";
import {calculateWinner} from "../../scripts/calculate-winner";
import {getLocalStorageData, LocalStorageKeys, updateLocalStorageData} from "../../scripts/localstorage";
import {History} from "../History/History";
import '../../App.css'
import {GameMenu} from "../GameMenu/GameMenu";
import {GameInfo} from "../GameInfo/GameInfo";
import {GAME_SYMBOLS} from "../../scripts/libraries";
import {calculateBotMove} from "../../scripts/bot-move";
import {calculateScore} from "../../scripts/calculate-score";
import {initStartState} from "../../scripts/initStartState";
import {getHistory, getSquares, getStatus} from "../../scripts/helpers";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = initStartState();
        this.jumpToHandleClick = this.jumpTo.bind(this);
        this.handleBoardClick = this.handleClick.bind(this);
        this.startNewGameHandler = this.startNewGame.bind(this);
        this.enableBotModeHandler = this.enableBotMode.bind(this);
        this.disableBotModeHandler = this.disableBotMode.bind(this)
        this.resetScoreHandler = this.resetScore.bind(this);
    }

    componentDidMount() {
        const data = getLocalStorageData(LocalStorageKeys.game);
        if (data) {
            this.setState(data);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (!this.state.isGameOver) {
            const lastSquares = getSquares(this.state.history);
            const winner = calculateWinner(lastSquares);
            if (winner) {
                const {winsX, winsO} = this.state.score;
                const {updatedWinsX, updatedWinsO} = calculateScore(winner, winsX, winsO);
                this.setState({
                    isGameOver: true,
                    score: {
                        winsX: updatedWinsX,
                        winsO: updatedWinsO,
                    }
                })
            } else if (lastSquares.indexOf(null) < 0) {
                this.setState({
                    isGameOver: true,
                })
            }
        }
        updateLocalStorageData(LocalStorageKeys.game, this.state);
    }

    fillSquare(i) {
        const history = getHistory(this.state);
        const currentSquares = getSquares(history);
        if (!(calculateWinner(currentSquares) || currentSquares[i])) {
            this.setState((prevState) => {
                const prevHistory = getHistory(prevState);
                const squares = [...getSquares(prevHistory)];
                squares[i] = prevState.xIsNext ? GAME_SYMBOLS.X : GAME_SYMBOLS.O;
                return {
                    ...prevState,
                    history: prevHistory.concat([{squares}]),
                    xIsNext: !prevState.xIsNext,
                    stepNumber: prevHistory.length,
                }
            });
        }
    }


    handleClick(i) {
        if (!(this.state.isMoveBlocked || this.state.isGameOver)) {
            this.fillSquare(i);
            const squares = getSquares(this.state.history, this.state.stepNumber);
            const isMoveLast = squares.filter(el => el === null).length === 1;
            if (this.state.botMode && !(isMoveLast || squares[i])) {
                this.setState({isMoveBlocked: true});
                setTimeout(() => {
                    const botMoveIndex = calculateBotMove(getSquares(this.state.history));
                    this.setState({isMoveBlocked: false});
                    this.fillSquare(botMoveIndex);
                }, 500)
            }
        }
    }

    enableBotMode() {
        this.setState({...initStartState(), botMode: true});
    }

    disableBotMode() {
        this.setState({...initStartState(), botMode: false});
    }

    startNewGame() {
        this.setState((prevState) => {
            return {
                ...initStartState(),
                botMode: prevState.botMode,
                score: prevState.score,
            }
        });
    }

    jumpTo(isNextMove) {
        let step = isNextMove ? this.state.stepNumber + 1 : this.state.stepNumber - 1;
        let xIsNext = step % 2;
        if (xIsNext && this.state.botMode && !this.state.isGameOver) {
            isNextMove ? step += 1 : step -= 1;
        } else {
            xIsNext = !xIsNext;
        }
        if (this.state.history[step] && !this.state.isMoveBlocked) {
            this.setState({
                stepNumber: step,
                xIsNext,
            })
        }
    }

    resetScore() {
        this.setState({
            score: {
                winsX: 0,
                winsO: 0,
            }
        })
    }

    render() {
        const {history, stepNumber} = this.state;
        const currentSquares = getSquares(history, stepNumber);
        const winner = calculateWinner(currentSquares);
        const status = getStatus(winner, this.state);
        return (
            <div>
                <GameMenu startNewGame={this.startNewGameHandler}
                          isGameStarted={history.length > 1}
                          enableBotMode={this.enableBotModeHandler}
                          resetScore={this.resetScoreHandler}
                          botMode={this.state.botMode}
                          disableBotMode={this.disableBotModeHandler}/>
                <GameInfo status={status}
                          botMode={this.state.botMode}
                          score={this.state.score}/>
                <Board squares={currentSquares} onClick={this.handleBoardClick}/>
                <History jumpTo={this.jumpToHandleClick}/>
            </div>
        );
    }
}

export default App;
