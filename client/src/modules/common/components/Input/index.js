import React, {useRef, useState, useEffect} from 'react';

const Index = ({ type, name, label, errors, touched, required, ...props}, ref) => {
    const inputRef = useRef(null);
    const [showPassword, setShowPassword] = useState(false);
    const [inputType, setInputType] = useState(type);

    useEffect(() => {
        if (type === "password" && showPassword) {
            setInputType("text")
        }

        if (type === "password" && !showPassword) {
            setInputType("password")
        }
    }, [type, showPassword])

    return (
        <div>
            
        </div>
    );
};

export default Index;