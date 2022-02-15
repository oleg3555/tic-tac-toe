import React from "react";
import styles from './Settings.module.css'
import {MenuButton} from "../Buttons/MenuButton";
import {BUTTON_VALUES, COLORS} from "../../scripts/libraries";
import {Checkbox} from "./Checkbox/Checkbox";

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            settingsMode: false,
        }
        this.enableSettingsMode = this.enableSettingsMode.bind(this);
        this.disableSettingsMode = this.disableSettingsMode.bind(this);
    }

    enableSettingsMode() {
        this.setState({settingsMode: true})
    }

    disableSettingsMode() {
        this.setState({settingsMode: false})
    }

    render() {
        return (
            <div>
                <MenuButton color={COLORS.yellow} text={BUTTON_VALUES.settings} onClick={this.enableSettingsMode}/>
                {this.state.settingsMode && <div className={styles.popup}>
                    <div className={styles.popup__content}>
                        <div className={styles.popup__title}>Settings</div>
                        <button className={styles.popup__close} onClick={this.disableSettingsMode}>X</button>
                        <div className={styles.popup__settings}>
                            <div>
                                <Checkbox onClick={this.props.enableBotMode}
                                          text={BUTTON_VALUES.vsBot}
                                          name='bot'
                                          checked={this.props.botMode}/>
                                <Checkbox onClick={this.props.disableBotMode}
                                          checked={!this.props.botMode}
                                          name='player'
                                          text={BUTTON_VALUES.vsFriend}/>
                            </div>
                            <button className={styles.resetBtn} onClick={this.props.resetScore}>Reset score</button>
                        </div>
                    </div>
                </div>}
            </div>
        )
    }
}

export default Settings;