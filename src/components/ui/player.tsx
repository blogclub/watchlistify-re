"use client";
import React from "react";
import { MediaPlayer, MediaProvider, Poster } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";

interface PlayerProps {
  src: string;
  cover?: string;
}

const Player: React.FC<PlayerProps> = ({ src, cover }) => {
  return (
    <MediaPlayer src={src} autoPlay>
      <MediaProvider>
        <Poster src={cover} alt="Poster" />
      </MediaProvider>
      <DefaultVideoLayout
        icons={defaultLayoutIcons}
        slots={{ googleCastButton: null }}
      />
    </MediaPlayer>
  );
};

export default Player;
