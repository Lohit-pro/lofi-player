import { useState, useEffect } from "react";

const useQuotes = () => {
    const [ quotesList, setQuotesList ] = useState([])
    const [ currentQuoteIndex, setCurrentQuoteIndex ] = useState(null)

    useEffect(() => {
        const fetchData = async() => {
            try{
                const response = await fetch('/quotes.json')
                if(!response){
                    throw new Error("Error " + response.status)
                }

                const data = await response.json();
                setQuotesList(data.quotes)
            } catch(error) {
                console.log(error)
            }
        }

        fetchData();
    })

    const selectRandomQuote = () => {
        const randomIndex = Math.floor(Math.random() * quotesList.length)
        setCurrentQuoteIndex(randomIndex)
    }

    useEffect(() => {
        const interval = setInterval(() => {
            selectRandomQuote();
        }, 10000);

        return clearInterval(interval)
    })

    return {
        currentQuoteIndex: currentQuoteIndex
    }
}

export default useQuotes;