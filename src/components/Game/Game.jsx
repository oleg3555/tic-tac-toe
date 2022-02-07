import React from "react";
import {Board} from "../Board/Board";
import {calculateWinner} from "../../scripts/calculate-winner";
import {getLocalStorageData, LocalStorageKeys, updateLocalStorageData} from "../../scripts/localstorage";
import {History} from "../History/History";
import '../../App.css'
import {getRandomValue} from "../../scripts/random";
import {GameMenu} from "../GameMenu/GameMenu";
import {GameInfo} from "../GameInfo/GameInfo";
import {GAME_SYMBOLS} from "../../scripts/libraries";


class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = getLocalStorageData(LocalStorageKeys.game) || this.initStartState();
        this.jumpToHandleClick = this.jumpTo.bind(this);
        this.boardHandleClick = this.handleClick.bind(this);
        this.startNewGameHandler = this.startNewGame.bind(this);
        this.enableBotModeHandler = this.enableBotMode.bind(this);
        this.disableBotModeHandler = this.disableBotMode.bind(this);
    }

    initStartState() {
        return {
            history: [{
                squares: Array(9).fill(null),
            }],
            xIsNext: true,
            stepNumber: 0,
            botMode: false,
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
        this.fillSquare(i);
        if (this.state.botMode && !this.state.history[this.state.stepNumber].squares[i]) {
            const freeSquareIndexes = this.state.history[this.state.history.length - 1].squares.map((el, index) => {
                if (index === i) {
                    return null;
                } else {
                    return el ? null : index
                }
            }).filter(el => el !== null);
            if (freeSquareIndexes.length) {
                setTimeout(() => {
                    this.fillSquare(freeSquareIndexes[getRandomValue(freeSquareIndexes.length)]);
                }, 200)
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
        this.setState({...this.initStartState(), botMode: this.state.botMode});
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: !(step % 2),
        })
        if (step % 2 && this.state.botMode) {
            setTimeout(() => {
                this.jumpTo(step + 1);
            }, 300)
        }
    }

    render() {
        updateLocalStorageData(LocalStorageKeys.game, this.state);
        const currentSquares = this.state.history[this.state.stepNumber].squares;
        const winner = calculateWinner(currentSquares);
        const status = winner ? `Winner is ${winner}` : `Next move: ${this.state.xIsNext ? GAME_SYMBOLS.X : GAME_SYMBOLS.O}`;
        return (
            <div>
                <GameMenu startNewGame={this.startNewGameHandler}
                          enableBotMode={this.enableBotModeHandler}
                          disableBotMode={this.disableBotModeHandler}/>
                <GameInfo status={status}/>
                <Board squares={currentSquares} onClick={this.boardHandleClick}/>
                <History history={this.state.history} jumpTo={this.jumpToHandleClick}/>
            </div>
        );
    }
}

export default Game;

