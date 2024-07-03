import React, { forwardRef, useEffect, useRef } from 'react';

const FileInput = forwardRef(({ className = '', isFocused = false, ...props }, ref) => {
    const inputRef = ref || useRef();

    useEffect(() => {
        if (isFocused) {
            inputRef.current.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type="file"
            className={`border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ${className}`}
            ref={inputRef}
        />
    );
});

export default FileInput;
