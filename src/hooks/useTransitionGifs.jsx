import { useState, useEffect } from "react";

const useTransitionsGifs = () => {
    const [ showTransition, setShowTransition ] = useState(false)
    const [ transitionsList, setTransitionsList ] = useState([])
    const [ currentTransitionIndex, setCurrentTransitionIndex ] = useState(null)

    const transitionGifs = require.context('../transitionGifs', true)

    useEffect(() => {
        setTransitionsList(transitionGifs.keys().map((transitionGif) => transitionGifs(transitionGif)))
    }, [transitionGifs])

    const selectRandomTransitionGif = () => {
        const randomIndex = Math.floor(Math.random() * transitionsList.length)
        setCurrentTransitionIndex(randomIndex)
    }

    const handleGifTransition = () => {
        setShowTransition(true)
        setTimeout(() => {
            setShowTransition(false)
        }, 200);
    }

    return {
        currentTransitionGif: transitionsList[currentTransitionIndex],
        handleGifTransition,
        selectRandomTransitionGif,
        showTransition
    }
}

export default useTransitionsGifs;