function WordDefinitionList ({ list }) {
    
    if (!list){
        return (
            <p>None found.</p>
        )
    }

    return (
        <ul>
            {list && list.map((item, i) => {
                return (
                    <li key={`wordDef_${item}_${i}`}>{item}</li>
                )
            })}
        </ul>
    )
}

export default WordDefinitionList;