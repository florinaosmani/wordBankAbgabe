import classes from '../resources/css/components/checkFavorite.module.css';

function CheckFavorite ({ onClickClose, def, word, onChange, onSubmit, note, error}) {
    return (
        <form className={classes.favContainer} onSubmit={onSubmit}>
            <div className={classes.infoContainer}>
                <p>{word} | {def.partOfSpeech} <br/> {def.definition} </p>
                <div className={classes.textContainer}>
                    <label>Add a Note:</label>
                    <textarea maxLength="1000" onChange={onChange} value={note}></textarea>
                </div>
            </div>
            {error && <p className={classes.error}>Try again there's been an error! Error: {error.message}</p>}
            <div className={classes.buttonContainer}>
                <button type="reset" onClick={onClickClose}>
                    Cancel
                </button>
                <button type="submit" onClick={onSubmit}>
                    Save
                </button>
            </div>
        </form>
    )
}

export default CheckFavorite;