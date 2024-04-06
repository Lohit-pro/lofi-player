import { useState, useEffect } from "react";

const useSongs = () => {
    const [ songList, setSongList ] = useState([])
    const [ currentSongIndex, setCurrentSongIndex ] = useState(null)

    const songs = require.context('../songs', true)

    useEffect(()=> {
        setSongList(songs.keys().map((song) => songs(song)))
    }, [songs])

    const selectRandomSong = () => {
        const randomIndex = Math.floor(Math.random() * songList.length)
        setCurrentSongIndex(randomIndex)
    }

    return {
        currentSong: songList[currentSongIndex],
        selectRandomSong: selectRandomSong,
    }
}

export default useSongs;