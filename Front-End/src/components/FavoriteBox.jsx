import WordDefinition from "./WordDefinition";
import classes from '../resources/css/components/favoriteBox.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare  } from '@fortawesome/free-regular-svg-icons'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'

function FavoriteBox ({ def , word, onClickEdit, onClickDelete, defIndex, wordIndex, deleteError }) {
    return (
        <div className={classes.favoriteBoxContainer}>
            {deleteError && <p className={classes.error}>Oopsie, there's been an error in deleting your word. Error: {deleteError.message}</p>}
            <WordDefinition def={def} word={word}/>
            <p>{def.note}</p>
            <div className={classes.buttonContainer}>
                <button onClick={onClickEdit} value={`${defIndex}_${wordIndex}`}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                </button>
                <button onClick={onClickDelete} value={`${defIndex}_${wordIndex}`}>
                    <FontAwesomeIcon icon={faTrashCan} />
                </button>
            </div>
        </div>
    )
}

export default FavoriteBox;