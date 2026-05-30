import WordDefinitionBox from "./WordDefinitionBox";
import CheckFavorite from "./CheckFavorite";

import classes from '../resources/css/components/wordInfo.module.css';
import { useState } from "react";

function WordInfo ({ wordData, checkBoxes, onSubmit}) {
    const [favOpen, setFavOpen] = useState(false);
    const [favDefIndex, setFavDefIndex] = useState(null);
    const [note, setNote] = useState("");
    const [favError, setFavError] = useState(null);

    const handleClickHeart = (e) => {
        const index = e.currentTarget.value;

        if (!favOpen && !wordData.results[index].isFavoriteDefinition){ //so you cant open other definitions while its still open + if it black no open
            setFavOpen(true);
            setFavDefIndex(e.currentTarget.value);
        } else if (!favOpen && wordData.isFavoriteWord && wordData.results[index].isFavoriteDefinition) {
            let changedWord;
                
            const changedDef = {
                ...wordData.results[index],
                isFavoriteDefinition: false,
                note: ""
            };

            let hasAnotherFav = false;
            let counter = 0;
            wordData.results.forEach(def => {
                if (def.isFavoriteDefinition){
                    counter++;
                }
            })
            if(counter > 1) {
                hasAnotherFav = true;
            }
            
            if (hasAnotherFav) {
                changedWord = {
                    ...wordData,
                isFavoriteWord: true,
                results: wordData.results.map((def, i) => (i == index ? changedDef : def))
                };
            } else {
                changedWord = {
                    ...wordData,
                isFavoriteWord: false,
                results: wordData.results.map((def, i) => (i == index ? changedDef : def))
                };
            }

            onSubmit(changedWord);
        }
    }

    const handleCloseFav = () => {
        setFavOpen(false);
        setNote("");
        setFavDefIndex(null);
        setFavError(null);
    }

    const handleChangeNote = (e) => {
        setNote(e.target.value);
        setFavError(null);
    }

    const handleSaveNote = async (e) => {
        setFavError(null);
        e.preventDefault();

        const changedDef = {
            ...wordData.results[favDefIndex],
            isFavoriteDefinition: true,
            note: note
        };

        const changedWord = {
            ...wordData,
        isFavoriteWord: true,
        results: wordData.results.map((def, i) => (i == favDefIndex ? changedDef : def))
        };

        const response = await onSubmit(changedWord);

        if (!response) {
            setFavDefIndex(null);
            setFavOpen(false);
            setNote("");
        } else {
            setFavError(response);
        }
    }
    
    return (
        <div className={classes.wordInfoContainer}>
            <div className={classes.basicInfoContainer}>
                <h2>{wordData.word}</h2>
                <p>{wordData.pronunciation}</p>
                <p>{wordData.syllables} {wordData.syllables > 1 ? "syllables" : "syllable"}</p>
            </div>

            {wordData.results.map((def, i) => 
            <WordDefinitionBox 
            def={def} 
            index={i} 
            word={wordData.word} 
            key={i} 
            checkBoxes={checkBoxes}
            onClick={handleClickHeart}/>)}

            {favOpen && 
            <CheckFavorite 
            onClickClose={handleCloseFav} 
            def={wordData.results[favDefIndex]} 
            word={wordData.word}
            onSubmit={handleSaveNote}
            note={note}
            onChange={handleChangeNote}
            error={favError}/>}
        </div>
    )
}

export default WordInfo;