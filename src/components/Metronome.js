import React, { Component } from "react";
import click1 from "../audio/click1.wav";
import click2 from "../audio/click2.wav";
import bleep1 from "../audio/bleep1.wav";
import bleep2 from "../audio/bleep2.wav";
import drum1 from "../audio/drum1.wav";
import drum2 from "../audio/drum2.wav";
import * as audioContextTimers from "audio-context-timers";
import "./Metronome.css";

class Metronome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      count: 0,
      bpm: 120,
      beatsPerMeasure: 4,
      click: "Bleep"
    };

    this.click1 = new Audio(click1);
    this.click2 = new Audio(click2);
    this.bleep1 = new Audio(bleep1);
    this.bleep2 = new Audio(bleep2);
    this.drum1 = new Audio(drum1);
    this.drum2 = new Audio(drum2);
  }

  startStop = () => {
    if (this.state.playing) {
      //stops timer
      audioContextTimers.clearInterval(this.timer);
      this.setState({
        playing: false
      });
    } else {
      //starts timer with current bpm
      this.timer = audioContextTimers.setInterval(
        this.playClick,
        (60 / this.state.bpm) * 1000
      );
      this.setState(
        {
          count: 0,
          playing: true
          //plays a click "immediately" (after setState finishes)
        },
        this.playClick
      );
    }
  };

  playClick = () => {
    const { count, beatsPerMeasure } = this.state;
    //The first beat will have a different sound that the others
    if (count % beatsPerMeasure === 0) {
      switch (this.state.click) {
        case "Click":
          this.click2.play();
          break;
        case "Bleep":
          this.bleep2.play();
          break;
        case "808":
          this.drum2.play();
          break;
        default:
          this.click2.play();
      }
    } else {
      switch (this.state.click) {
        case "Click":
          this.click1.play();
          break;
        case "Bleep":
          this.bleep1.play();
          break;
        case "808":
          this.drum1.play();
          break;
        default:
          this.click1.play();
      }
    }
    //Keep track of which beat we're on
    this.setState(state => ({
      count: (state.count + 1) % state.beatsPerMeasure
    }));
  };

  handleBpmChange = event => {
    const bpm = event.target.value;

    if (this.state.playing) {
      //stop the old timer and start a new one
      audioContextTimers.clearInterval(this.timer);
      this.timer = audioContextTimers.setInterval(
        this.playClick,
        (60 / bpm) * 1000
      );
      //Set the new bpm, and reset the beat counter
      this.setState({
        count: 0,
        bpm
      });
    } else {
      //otherwise just update the bpm
      this.setState({ bpm });
    }
  };

  handleTimeChange = event => {
    if (event.target.value <= 20 && event.target.value >= 1) {
      this.setState({
        beatsPerMeasure: event.target.value
      });
    } else {
      //disableInput should eliminate the need for this
      alert("Please select a value between 1 & 20");
      this.setState({
        beatsPerMeasure: 4
      });
    }
  };

  handleClickChange = event => {
    this.setState({
      click: event.target.value
    });
  };

  disableInput = event => {
    event.preventDefault();
    event.stopPropagation();
  };

  componentWillUnmount = () => {
    audioContextTimers.clearInterval(this.timer);
    this.setState({
      playing: false,
      count: 0,
      bpm: 120,
      beatsPerMeasure: 4,
      click: "Click"
    });
  };

  render() {
    const { playing, bpm, click } = this.state;

    return (
      <div className="metronome">
        <h1>React Metronome</h1>
        <div className="time-signature">
          <fieldset>
            <legend>{this.state.beatsPerMeasure}/4 Time</legend>
            <input
              type="number"
              min="1"
              max="20"
              onKeyDown={this.disableInput}
              onChange={this.handleTimeChange}
            />
          </fieldset>
        </div>
        <br />
        <div className="bpm-slider">
          <fieldset>
            <legend>{bpm} BPM</legend>
            <input
              type="range"
              min="60"
              max="240"
              value={bpm}
              onChange={this.handleBpmChange}
            />
            <button onClick={this.startStop}>
              {playing ? "Stop" : "Start"}
            </button>
          </fieldset>
        </div>
        <br />
        <div className="click-type">
          <fieldset>
            <legend>{click}</legend>
            <div className="click-input">
              <label>Click</label>
              <input
                type="radio"
                value="Click"
                checked={this.state.click === "Click"}
                onChange={this.handleClickChange}
              />
              <label>Bleep</label>
              <input
                type="radio"
                value="Bleep"
                checked={this.state.click === "Bleep"}
                onChange={this.handleClickChange}
              />
              <label>808</label>
              <input
                type="radio"
                value="808"
                checked={this.state.click === "808"}
                onChange={this.handleClickChange}
              />
            </div>
          </fieldset>
        </div>
      </div>
    );
  }
}

export default Metronome;
