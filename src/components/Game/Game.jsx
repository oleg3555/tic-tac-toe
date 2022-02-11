import React from "react";
import {Board} from "../Board/Board";
import {calculateWinner} from "../../scripts/calculate-winner";
import {getLocalStorageData, LocalStorageKeys, updateLocalStorageData} from "../../scripts/localstorage";
import {History} from "../History/History";
import '../../App.css'
import {GameMenu} from "../GameMenu/GameMenu";
import {GameInfo} from "../GameInfo/GameInfo";
import {GAME_SYMBOLS} from "../../scripts/libraries";
import {bestBotMove} from "../../scripts/bot-move";


class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initStartState();
        this.jumpToHandleClick = this.jumpTo.bind(this);
        this.boardHandleClick = this.handleClick.bind(this);
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
            const lastSquares = this.state.history[this.state.history.length - 1].squares;
            const winner = calculateWinner(lastSquares);
            if (winner) {
                this.setState({
                    isGameOver: true,
                    score: {
                        winsX: winner === GAME_SYMBOLS.X ? this.state.score.winsX + 1 : this.state.score.winsX,
                        winsO: winner === GAME_SYMBOLS.O ? this.state.score.winsO + 1 : this.state.score.winsO,
                    }
                })
            } else if (lastSquares.indexOf(null) < 0) {
                this.setState({
                    isGameOver: true,
                })
            }
        }
        if (prevState !== this.state) {
            updateLocalStorageData(LocalStorageKeys.game, this.state);
        }
    }

    initStartState() {
        return {
            history: [{
                squares: Array(9).fill(null),
            }],
            xIsNext: true,
            stepNumber: 0,
            botMode: false,
            isGameOver: false,
            isMoveBlocked: false,
            score: {
                winsX: 0,
                winsO: 0,
            }
        }
    }

    fillSquare(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const currentSquares = history[history.length - 1].squares;
        if (!(calculateWinner(currentSquares) || currentSquares[i])) {
            const squares = [...currentSquares];
            squares[i] = this.state.xIsNext ? GAME_SYMBOLS.X : GAME_SYMBOLS.O;
            this.setState(() => {
                return {
                    history: history.concat([{squares: squares}]),
                    xIsNext: !this.state.xIsNext,
                    stepNumber: history.length,
                }
            });
        }
    }


    handleClick(i) {
        if (!(this.state.isMoveBlocked || this.state.isGameOver)) {
            this.fillSquare(i);
            const squares = this.state.history[this.state.stepNumber].squares;
            const isMoveLast = squares.filter(el => el === null).length === 1;
            if (this.state.botMode && !(isMoveLast || squares[i])) {
                this.setState({isMoveBlocked: true});
                setTimeout(() => {
                    this.setState({isMoveBlocked: false});
                    this.fillSquare(bestBotMove(this.state.history[this.state.history.length - 1].squares));
                }, 500)
            }
        }
    }

    enableBotMode() {
        this.setState({...this.initStartState(), botMode: true});
    }

    disableBotMode() {
        this.setState({...this.initStartState(), botMode: false});
    }

    startNewGame() {
        this.setState({
            ...this.initStartState(),
            botMode: this.state.botMode,
            score: this.state.score,
        });
    }

    jumpTo(isNextMove) {
        let step = isNextMove ? this.state.stepNumber + 1 : this.state.stepNumber - 1;
        if (step % 2 && this.state.botMode && !this.state.isGameOver) {
            isNextMove ? step += 1 : step -= 1;
        }
        if (this.state.history[step]) {
            this.setState({
                stepNumber: step,
                xIsNext: !(step % 2),
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
        const currentSquares = this.state.history[this.state.stepNumber].squares;
        const winner = calculateWinner(currentSquares);
        const status = winner ? `Winner is ${winner}` : `Next move: ${this.state.xIsNext ? GAME_SYMBOLS.X : GAME_SYMBOLS.O}`;
        return (
            <div>
                <GameMenu startNewGame={this.startNewGameHandler}
                          enableBotMode={this.enableBotModeHandler}
                          disableBotMode={this.disableBotModeHandler}/>
                <GameInfo status={status}
                          botMode={this.state.botMode}
                          resetScore={this.resetScoreHandler}
                          score={this.state.score}/>
                <Board squares={currentSquares} onClick={this.boardHandleClick}/>
                <History jumpTo={this.jumpToHandleClick}/>
            </div>
        );
    }
}

export default Game;
