import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { getAllWords } from '../api/words';
import WordDefinition from '../components/WordDefinition';
import WordDefinitionList from '../components/WordDefinitionList';
import NewForm from '../components/NewForm';

const mockDef = {
    definition: "existing or available in large quantities",
    partOfSpeech: "adjective",
    synonyms: ["plentiful", "ample"],
    antonyms: ["scarce", "rare"],
    examples: ["The region has abundant resources."],
    isFavoriteDefinition: false,
    note: ""
};

// Test 1: WordDefinition rendert Wort und Definition korrekt
describe("WordDefinition", () => {
    test("rendert Wortname, Wortart und Definitionstext", () => {
        render(
            <WordDefinition
                def={mockDef}
                word="abundant"
                checkBoxes={{ examples: false, synonyms: false, antonyms: false }}
            />
        );

        expect(screen.getByText(/abundant/i)).toBeInTheDocument();
        expect(screen.getByText(/adjective/i)).toBeInTheDocument();
        expect(screen.getByText(/existing or available in large quantities/i)).toBeInTheDocument();
    });
});

// Test 2: Checkboxes in WordDefinition funktionieren
describe("WordDefinition Checkboxes", () => {
    test("zeigt Synonyme nur wenn Checkbox aktiv ist", () => {
        const { rerender } = render(
            <WordDefinition
                def={mockDef}
                word="abundant"
                checkBoxes={{ examples: false, synonyms: false, antonyms: false }}
            />
        );
        expect(screen.queryByText("plentiful")).not.toBeInTheDocument();

        rerender(
            <WordDefinition
                def={mockDef}
                word="abundant"
                checkBoxes={{ examples: false, synonyms: true, antonyms: false }}
            />
        );
        expect(screen.getByText("plentiful")).toBeInTheDocument();
    });
});

// Test 3: NewForm Validierung
describe("NewForm Validierung", () => {
    test("zeigt Fehlermeldung wenn Pflichtfelder leer sind", async () => {
        render(
            <NewForm
                onClickCancel={() => {}}
                onSave={() => {}}
                formError={false}
                setFormError={() => {}}
            />
        );

        const saveButton = screen.getByText(/save/i);
        fireEvent.click(saveButton);

        expect(
            screen.getByText(/please fill out all fields/i)
        ).toBeInTheDocument();
    });
}); 

//Test 4 & 5: API Mock, getAllWords ruft richtige URL auf
describe("getAllWords API", () => {
    beforeEach(() => {
        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => []
        });
    });

    test("ruft die richtige URL auf", async () => {
        await getAllWords();
        expect(fetch).toHaveBeenCalledWith(
            expect.stringContaining("/words")
        );
    });

    test("wirft einen Error wenn Response nicht ok ist", async () => {
        global.fetch = vi.fn().mockResolvedValue({
            ok: false,
            json: async () => {}
        });

        await expect(getAllWords()).rejects.toThrow("Words couldn't be loaded");
    });
});