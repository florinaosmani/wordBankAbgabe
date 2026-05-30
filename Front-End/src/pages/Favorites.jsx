import CheckFavorite from '../components/CheckFavorite';
import FavoriteBox from '../components/FavoriteBox';
import classes from '../resources/css/pages/favorites.module.css';

import { useState, useEffect } from 'react';
import { getAllWords, updateWord } from '../api/words';

function Favorites () {
    const [showEdit, setShowEdit] = useState(false);
    const [allWords, setAllWords] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [note, setNote] = useState("");
    const [favDefIndex, setFavDefIndex] = useState(null);
    const [favIndex, setFavIndex] = useState(null);
    const [favError, setFavError] = useState(null);
    const [deleteError, setDeleteError] = useState(null);

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

    const filteredWords = allWords.filter(word => word.isFavoriteWord);

    const handleSubmit = async (word) => {
        try {
            const updated = await updateWord(word.id, word);
            setAllWords(prev => prev.map(w => (w.id === word.id ? updated : w)));
            return null;
        } catch (e) {
            return e;
        }
    }

    const handleClickEdit = (e) => {
        if (deleteError) {
            setDeleteError(null);
            setShowEdit(true);
            setFavDefIndex(e.currentTarget.value.split("_")[0]);
            setFavIndex(e.currentTarget.value.split("_")[1]);
        }
       
        if(!showEdit && favIndex === null){
            setShowEdit(true);
            setFavDefIndex(e.currentTarget.value.split("_")[0]);
            setFavIndex(e.currentTarget.value.split("_")[1]);
        }
    }

    const handleChangeNote = (e) => {
        setFavError(null);
        setNote(e.target.value);
    }
    
    const handleDeleteWord = async (e) => {
        if (!showEdit){
            setDeleteError(null);

            const defIndex = e.currentTarget.value.split("_")[0];
            const wordIndex = e.currentTarget.value.split("_")[1]
            setFavDefIndex(defIndex);
            setFavIndex(wordIndex);

            const wordData = filteredWords.filter(word => word.id == wordIndex)[0];

            let changedWord;
                
            const changedDef = {
                ...wordData.results[defIndex],
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
                results: wordData.results.map((def, i) => (i == defIndex ? changedDef : def))
                };
            } else {
                changedWord = {
                    ...wordData,
                isFavoriteWord: false,
                results: wordData.results.map((def, i) => (i == defIndex ? changedDef : def))
                };
            }

            const response = await handleSubmit(changedWord);

            if(!response){
                setFavDefIndex(null);
                setFavIndex(null);
            } else {
                setDeleteError(response);
            }
        }
    }

    const handleCloseFav = () => {
        setShowEdit(false);
        setNote("");
        setFavDefIndex(null);
        setFavIndex(null);
        setFavError(null);
    }

    const handleSaveNote = async (e) => {
        e.preventDefault();
        setFavError(null);

        const word = filteredWords.filter(word => word.id == favIndex)[0];

        const changedDef = {
            ...word.results[favDefIndex],
            note: note
        };

        const changedWord = {
            ...word,
        results: word.results.map((def, i) => (i == favDefIndex ? changedDef : def))
        };

        const response = await handleSubmit(changedWord);

        if (!response) {
            setFavDefIndex(null);
            setShowEdit(false);
            setNote("");
            setFavIndex(null);
            setFavError(null);
        } else {
            setFavError(response);
        }
    }

    if(isLoading){
        return (
            <p>I'm still loading</p>
        )
    }

    if(error){
        return(
            <div>
                <p style={{marginBottom:1 + "rem"}}>
                    Error: {error}
                </p>
                <button 
                onClick={() => window.location.reload()}>
                    Try again
                </button>
            </div>
        )
    }

    return(
        <div className={classes.favContainer}>
            {filteredWords.map((word) => {

                if(word.isFavoriteWord){
                    return word.results.map((def, i) => {
                        if(def.isFavoriteDefinition){
                            return (
                                <FavoriteBox 
                                def={def} 
                                word={word.word} 
                                key={`favbox_${i}${word.id}`} 
                                onClickDelete={handleDeleteWord} 
                                onClickEdit={handleClickEdit}
                                defIndex={i}
                                wordIndex={word.id}
                                deleteError={word.id == favIndex && i == favDefIndex ? deleteError : false}/>
                            )
                        } else {
                            return null;
                        }
                    })
                }
            })}
            { showEdit && 
            <CheckFavorite 
            onClickClose={handleCloseFav} 
            def={filteredWords.filter(word => word.id === favIndex)[0].results[favDefIndex]}
            word={filteredWords.filter(word => word.id === favIndex)[0].word}
            onSubmit={handleSaveNote}
            note={note}
            onChange={handleChangeNote}
            error={favError}/>}
        </div>
    )
}

export default Favorites;