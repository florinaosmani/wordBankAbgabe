import classes from '../resources/css/components/randomBox.module.css';
import CheckBox from './CheckBox';

function RandomBox ({ onClick, onChange, checked }) {
    return(
        <div className={classes.questionContainer}>
            <div className={classes.borderStyling}>
                <p>Show</p>
                <CheckBox onChange={onChange} checked={checked}/>
                <p>for a random word</p>
            </div>
            <button onClick={onClick}>
                Go
            </button>
        </div>
    )
}

export default RandomBox;