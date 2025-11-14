"use client";

import React, { useState } from "react";

interface SearchFormProps {
    onSubmit: (data: Record<string, string>) => void;
}

export default function SearchForm({ onSubmit }: SearchFormProps) {
    const [inputText, setInputText] = useState("");

    const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(event.target.value);
    };

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit({ searchTerm: inputText });
    };

    return (
        <form onSubmit={handleFormSubmit} className="form-group">
            <label htmlFor="search-term">Search for</label>
            <input
                id="search-term"
                type="text"
                className="form-control"
                placeholder="Enter search term here"
                value={inputText}
                onChange={handleChangeInput}
            />
        </form>
    );
}
