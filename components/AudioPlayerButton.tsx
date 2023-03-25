import { useState } from "react";

const AudioPlayerButton = ({ src }: any) => {
  const handleButtonClick = async () => {
    const audio = src;
      audio.play();
  };

  return (
    <button onClick={handleButtonClick}>
      Play again
    </button>
  );
};

export default AudioPlayerButton;