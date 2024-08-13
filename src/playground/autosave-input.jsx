import React, { useState, useEffect } from 'react';

interface AutoSaveInputProps {
    initialValue?: string;
    saveData: (value: string) => void; // Function to save the data
}

const AutoSaveInput: React.FC<AutoSaveInputProps> = ({ initialValue = '', saveData }) => {
    const [inputValue, setInputValue] = useState<string>(initialValue);
    const [isSaving, setIsSaving] = useState<boolean>(false);

    useEffect(() => {
        const handler = setTimeout(() => {
            if (inputValue !== initialValue) {
                setIsSaving(true);
                saveData(inputValue);
                setIsSaving(false);
            }
        }, 1000); // Trigger save after 1 second of inactivity

        return () => {
            clearTimeout(handler); // Clear the timeout if the user types again within 1 second
        };
    }, [inputValue, initialValue, saveData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    return (
        <div>
            <input
                type="text"
                value={inputValue}
                onChange={handleChange}
                placeholder="Type something..."
            />
            {isSaving && <p>Saving...</p>}
        </div>
    );
};

export default AutoSaveInput;
