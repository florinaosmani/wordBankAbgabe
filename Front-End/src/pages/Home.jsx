import { useState, useEffect } from "react";
import RandomBox from "../components/RandomBox";
import WordInfo from "../components/WordInfo";
import classes from '../resources/css/pages/home.module.css';
import { getAllWords, updateWord } from "../api/words";

function Home () {
    const [index, setIndex] = useState(0);
    const [checkBoxes, setCheckBoxes] = useState({"examples": false, "synonyms": false, "antonyms": false});
    const [showWord, setShowWord] = useState(false);
    const [allWords, setAllWords] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [favError, setFavError] = useState(false);

    useEffect(()=>{
        async function loadWords() {
            try{
                const data = await getAllWords();
                setAllWords(data);
            } catch (e) {
                setError(e.message);
            } finally {
                setIsLoading(false);
            }
        }
        loadWords();
    },[])

    const handleClickGo = () => {
        if (allWords.length === 1) {
            setIndex(0);
            setShowWord(true);
            return;
        }

        let ran;
        do {  
            ran = Math.floor(Math.random() * allWords.length);
        } while (ran === index);

        setIndex(ran);
        setShowWord(true);
    }

    const wordData = allWords[index];

    const handleChangeCheckBox = (e) => {
        const toggleBool = !checkBoxes[e.target.value];
        setCheckBoxes(checkBoxes => ({...checkBoxes, [e.target.value]: toggleBool}));
    }

    const handleSubmitFav = async (word) => {
        try {
            const updated = await updateWord(word.id, word);
            setAllWords(prev => prev.map(w => (w.id === word.id ? updated : w)));
            return null;
        } catch (e) {
            return e;
        }
    }

    if (isLoading) {
        return (
            <div className={classes.homeContainer}>
                <RandomBox 
                onClick={handleClickGo} 
                onChange={handleChangeCheckBox} 
                checked={checkBoxes}/>
                <p>I'm still loading. Please wait for me.</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className={classes.homeContainer}>
                <RandomBox 
                onClick={handleClickGo} 
                onChange={handleChangeCheckBox} 
                checked={checkBoxes}/>
                <div>
                    <p style={{marginBottom:1 + "rem"}}>
                        Error: {error}
                    </p>
                    <button 
                    onClick={() => window.location.reload()}>
                        Try again
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className={classes.homeContainer}>
            <RandomBox 
            onClick={handleClickGo} 
            onChange={handleChangeCheckBox} 
            checked={checkBoxes}/>
            {showWord && 
            <WordInfo 
            wordData={wordData} 
            checkBoxes={checkBoxes}
            onSubmit={handleSubmitFav}
            favError={favError}
            setFavError={setFavError}
            />}
        </div>
    )
}

export default Home;