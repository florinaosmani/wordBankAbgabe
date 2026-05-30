const API_URL = import.meta.env.VITE_API_URL;

export async function getAllWords () {
    const response = await fetch(`${API_URL}/words`);
    if (!response.ok) {
        throw new Error("Words couldn't be loaded");
    }
    return response.json();
}

export async function deleteWord(id) {
    const response = await fetch(`${API_URL}/words/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error("Couldn't delete word");
    }
}

export async function createWord(word) {
    const response = await fetch(`${API_URL}/words`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(word),
    });
    if (!response.ok) {
        throw new Error("Couldn't save your word");
    }
    return response.json();
}

export async function updateWord(id, word){
    const response = await fetch(`${API_URL}/words/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(word),
    }); 
    if(!response.ok){
        throw new Error("Couldn't update word :/");
    }
    return response.json();
}