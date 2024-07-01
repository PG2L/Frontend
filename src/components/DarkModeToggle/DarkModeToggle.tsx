import React, { FC, useState, useEffect, useMemo } from 'react';
import { useMediaQuery } from "react-responsive";
import { Switch } from '../ui/switch';
import * as icons from 'lucide-react';

interface DarkModeToggleProps { isOpen: boolean; }

const DarkModeToggle: FC<DarkModeToggleProps> = ({
    isOpen,
}) => {

    const getTheme: string = useMemo(() => {
        return localStorage.getItem('theme') || 'light';
    }, []);

    const [isDark, setIsDark] = useState(getTheme === 'dark');

    const systemPrefersDark = useMediaQuery(
        {
            query: "(prefers-color-scheme: dark)",
        },
        undefined,
        (isSystemDark) => setIsDark(isSystemDark)
    );

    useEffect(() => {
        if (isDark) {
            document.body.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark, systemPrefersDark]);

    return (
        <div className={ `flex gap-2 items-center select-none ${!isOpen && "w-full justify-center"}` }>
            <Switch
                checked={ isDark }
                onCheckedChange={ () => setIsDark(!isDark) }
                aria-label="Dark mode toggle"
                id="dark-mode-toggle"
            />
            <icons.Moon height={ 20 } width={ 20 } />
        </div>
    );
};

export default DarkModeToggle;
