import classes from '../resources/css/components/wordDefinition.module.css';
import WordDefinitionList from './WordDefinitionList';

function WordDefinition ({ def, word, checkBoxes = {"examples": false, "synonyms": false, "antonyms": false} , isAdmin = false }) {
    return (
        <div className={classes.wordDefinitionContainer}>
            {!isAdmin && 
            <h3>
                {word} | {def.partOfSpeech}
            </h3>}
            <h3>Definition</h3>
            <p>{def.definition}</p>
            {checkBoxes.examples && (
                <>
                    <h3>
                        Examples
                    </h3>
                    <WordDefinitionList list={def.examples} />
                </>
            )}
            {checkBoxes.synonyms && (
                <>
                    <h3>
                        Synonyms
                    </h3>
                    <WordDefinitionList list={def.synonyms} />
                </>
            )}
            {checkBoxes.antonyms && (
                <>
                    <h3>
                        Antonyms
                    </h3>
                    <WordDefinitionList list={def.antonyms} />
                </>
            )}
        </div>
    )
}

export default WordDefinition;