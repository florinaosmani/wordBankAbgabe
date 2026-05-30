import WordDefinition from "./WordDefinition";
import classes from '../resources/css/components/wordDefinitionBox.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as heartFull } from '@fortawesome/free-solid-svg-icons'
import { faHeart as heartEmpty } from '@fortawesome/free-regular-svg-icons'

function WordDefinitionBox ({ def, index, word, checkBoxes, onClick}) {
    return (
        <div className={classes.wordDefinitionBoxContainer}>
            <p className={classes.defNum}>
                {index + 1}
            </p>
            <WordDefinition def={def} word={word} checkBoxes={checkBoxes}/>
            <button className={classes.favButton} onClick={onClick} value={index}>
                {def.isFavoriteDefinition && <FontAwesomeIcon icon={heartFull}/>}
                {!def.isFavoriteDefinition && <FontAwesomeIcon icon={heartEmpty}/>}
            </button>
        </div>
    )
}

export default WordDefinitionBox;