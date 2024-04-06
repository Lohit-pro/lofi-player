import React, { useState } from 'react'
import './App.css'
import previousIcon from "./icons/previous.svg";
import nextIcon from "./icons/next.svg";
import playIcon from "./icons/play.svg";
import pauseIcon from "./icons/pause.svg";
import useGifs from './hooks/useGifs';
import useQuotes from './hooks/useQuotes';
import useSongs from './hooks/useSongs';
import useTransitionsGifs from './hooks/useTransitionGifs';
import useVolume from './hooks/useVolume';
import Music from './Music';

function App() {

  const [isPlaying, setIsPlaying] = useState(false);
  const { currentGif, currentGifIndex, selectRandomGif } = useGifs();
  const { currentQuoteIndex } = useQuotes();
  const { currentSong, selectRandomSong } = useSongs();
  const { currentTransitionGif, handleGifTransition, selectRandomTransitionGif, showTransition } = useTransitionsGifs();
  const { volume, renderVolumeControl } = useVolume();

  return (
    <div className="App">
      <div className="gif-container">
        <img
          className={`transition-gif ${showTransition ? "show" : ""}`}
          src={currentTransitionGif}
          alt='gif'
        />
        {currentGifIndex !== null && <img className="gifs" src={currentGif} alt='gif' />}
      </div>
      <div className="crt-lines"></div>
      <div className="vignette"></div>
      <div className="dark"></div>
      <div className="button-container">
        <div className="text">
          <span>{currentQuoteIndex}</span>
        </div>
        <div className="button">
          <button
            className="change-gif-btn previous-btn"
            onClick={() => {
              handleGifTransition();
              selectRandomGif();
              selectRandomSong();
              selectRandomTransitionGif();
            }}
          >
            <img className="img-btn" src={previousIcon} alt="Previous" />
          </button>

          {isPlaying ? (
            <>
              <button
                className="change-gif-btn pause-btn"
                onClick={() => {
                  setIsPlaying(false);
                }}
              >
                <img className="img-btn" src={pauseIcon} alt="Play" />
              </button>
            </>
          ) : (
            <>
              <button
                className="change-gif-btn play-btn"
                onClick={() => {
                  setIsPlaying(true);
                  selectRandomSong();
                }}
              >
                <img className="img-btn" src={playIcon} alt="Play" />
              </button>
            </>
          )}
          <button
            className="change-gif-btn next-btn"
            onClick={() => {
              handleGifTransition();
              selectRandomGif();
              selectRandomSong();
              selectRandomTransitionGif();
            }}
          >
            <img className="img-btn" src={nextIcon} alt="Next" />
          </button>
          {renderVolumeControl()}
        </div>
      </div>
      <Music
        isPlaying={isPlaying}
        volume={volume}
        currentSong={currentSong}
        selectRandomSongs={selectRandomSong}
      />
    </div>
  );
}

export default App