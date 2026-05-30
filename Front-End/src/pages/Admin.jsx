import classes from '../resources/css/pages/admin.module.css';
import { useState, useEffect } from 'react';
import { getAllWords, deleteWord, createWord } from '../api/words';
import WordDefinition from '../components/WordDefinition';
import NewForm from '../components/NewForm';

function Admin () {
    const [allWords, setAllWords] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [formError, setFormError] = useState(null);

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

    async function handleDelete(id){
        await deleteWord(id);
        setAllWords(prev => prev.filter(word => word.id !== id));
    }


    async function handleOnSave(newWord) {
        setFormError(null);
        try {
            const saved = await createWord(newWord);
        
            setAllWords(prev => [...prev, saved]);
            setShowForm(false);
            return null;
        } catch (e) {
            setFormError(e);
            return e;
        }
    }


    if (isLoading) {
        return (
            <div className={classes.adminContainer}>
                <h2>All Words: </h2>
                <p>I'm still loading, please wait!</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className={classes.adminContainer}>
                <h2>All Words: </h2>
                <div>
                    <p style={{marginBottom:1 + "rem"}}>Error: {error}</p>
                    <button onClick={() => window.location.reload()}>Try again</button>
                </div>
            </div>
        )
    }

    return (
        <div className={classes.adminContainer}>
            <div className={classes.flexHeader}>
                <h2>All Words: {allWords.length}</h2>
                <button onClick={() => setShowForm(true)}>
                    Add new Word
                </button>
            </div>
            <div className={classes.wordsContainer}>
                {allWords.map((word, i) => {
                    return (
                        <div className={classes.word} key={`adminwords_${i}`}>
                            <h3>{word.word}</h3>
                            <button onClick={() => handleDelete(word.id)}>Delete</button>
                            <div>
                                {word.results.map((def, j) => {
                                    return (
                                        <WordDefinition 
                                        def={def} 
                                        word={word.word} 
                                        checkBoxes={{"examples": true, "synonyms": true, "antonyms": true}} 
                                        isAdmin={true} 
                                        key={`adminworddefinitions_${i}_${j}`}/>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>
            {showForm && 
            <NewForm 
            onClickCancel={() => {setShowForm(false); setFormError(false)}}
            onSave={handleOnSave}
            formError={formError}/>}
        </div>
    )
}

export default Admin;