import classes from '../resources/css/components/newForm.module.css';
import { useState } from 'react';

function NewForm ({ onClickCancel, onSave, formError }) {
    const [newWord, setNewWord] = useState({word : '', syllables:'', pronunciation: ''});
    const [newDefinition, setNewDefinition] = useState({definition: '', pos: '', examples: '', synonyms: '', antonyms: ''});
    const [definitions, setDefinitions] = useState([]);
    const [missingDef, setMissingDef] = useState(false);
    const [missingWord, setMissingWord] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newDefinition.definition
            && newDefinition.pos
            && newDefinition.antonyms
            && newDefinition.synonyms
            && newDefinition.examples
            && newWord.word
            && newWord.pronunciation
            && newWord.syllables
        ) {
            const defFormatted = [];
            const allDefs = [...definitions, newDefinition]; //safe version doesnt mutate state instead of definitions.push(newDefinition) not so good

            allDefs.forEach((def) => {
                defFormatted.push({
                    definition: def.definition,
                    partOfSpeech: def.pos,
                    synonyms: def.synonyms.split(",").map(word => word.trim()),
                    examples: def.examples.split('.').map(sentence => sentence.trim() + "."),
                    antonyms: def.antonyms.split(',').map(word => word.trim()),
                    isFavoriteDefinition: false,
                    note: ''
                })
            })
            const word = {
                word: newWord.word,
                results : defFormatted,
                syllables: parseInt(newWord.syllables), //syllables here is saved as stringcos e.target.value always gives u sstring? now save parsteINt(syllable) so it INT
                pronunciation: newWord.pronunciation,
                isFavoriteWord: false
            };

            const response = await onSave(word);

            if (!response) {
                setDefinitions([]);
                setNewWord({word : '', syllables:'', pronunciation: ''});
                setNewDefinition({definition: '', pos: '', examples: '', synonyms: '', antonyms: ''})
                setMissingDef(false);
                setMissingWord(false);
                onClickCancel();
            }
        } else {
            setMissingWord(true);
        }
    }

    const handleChangeWord = (e) => {
        setNewWord(prev => ({...prev, [e.target.name]: e.target.value}));
        setMissingWord(false);
    }

    const handleChangeDef = (e) => {
        setNewDefinition(prev => ({...prev, [e.target.name]: e.target.value}));
        setMissingDef(false);
        setMissingWord(false);
    }

    const handleAddDef = () => {
        if(newDefinition.definition
            && newDefinition.pos
            && newDefinition.antonyms
            && newDefinition.synonyms
            && newDefinition.examples
        ) {
            setDefinitions(prev => ([...prev, newDefinition]));
            setNewDefinition({definition: '', pos: '', examples: '', synonyms: '', antonyms: ''});
            setMissingDef(false);
        } else {
            setMissingDef(true);
        }
    }

    return (
        <form className={classes.formContainer} onSubmit={handleSubmit}>
            <h3>Add a new Word!</h3>
            <fieldset className={classes.fieldSet}>
                <legend>Basics</legend>
                <div>
                    <label htmlFor='word'>Word:</label>
                    <input id="word" name="word" type="text" value={newWord.word} onChange={handleChangeWord}  autoFocus/>
                </div>
                <div>
                    <label htmlFor='syllables'>Syllables</label>
                    <input id='syllables' name='syllables' type="number" value={newWord.syllables} onChange={handleChangeWord} />
                </div>
                <div>
                    <label htmlFor='pronunciation'>Pronunciation</label>
                    <input id='pronunciation' name='pronunciation' type="text" value={newWord.pronunciation} onChange={handleChangeWord} />
                </div>
            </fieldset>
            <fieldset className={classes.fieldSet}>
                <legend>Definitions</legend>
                <div>
                    <label htmlFor='definition'>Definition</label>
                    <input id="definition" name='definition' type='text' value={newDefinition.definition} onChange={handleChangeDef} />
                </div>
                <div>
                    <label htmlFor='pos'>Part of Speech</label>
                    <input id='pos' name='pos' type='text' value={newDefinition.pos} onChange={handleChangeDef} />
                </div>
                <div>
                    <label htmlFor='examples'>Examples *separated by period</label>
                    <textarea id='examples' name='examples' maxLength="10000" value={newDefinition.examples} onChange={handleChangeDef} ></textarea>
                </div>
                <div>
                    <label htmlFor='synonyms'>Synonyms *separated by comma</label>
                    <textarea id='synonyms' name='synonyms' maxLength="10000" value={newDefinition.synonyms} onChange={handleChangeDef} ></textarea>
                </div>
                <div>
                    <label htmlFor='antonyms'>Antonyms *separated by comma</label>
                    <textarea id='antonyms' name='antonyms' maxLength="10000" value={newDefinition.antonyms} onChange={handleChangeDef} ></textarea>
                </div>
                <button type="button" onClick={handleAddDef}>Add Another Definition</button>
                {missingDef && <p className={classes.alert}>Fill out the definition fully before adding a new one!</p>}
            </fieldset>
            <div className={classes.buttons}>
                <button type="reset" onClick={onClickCancel}>Cancel</button>
                <button type="submit" onClick={handleSubmit}>Save</button>
            </div>
            {missingWord && <p className={classes.alert}>Please fill out all fields before submitting!</p>}
            {formError && <p className={classes.alert}>Something went wrong, please try again! Error: {formError.message}</p>}
        </form>
    )
}

export default NewForm;