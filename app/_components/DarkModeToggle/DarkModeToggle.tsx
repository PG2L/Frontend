import React, { FC, useContext } from 'react';
import { useMediaQuery } from "react-responsive";
import { Switch } from '../ui/switch';
import * as icons from 'lucide-react';
import { DarkModeContext } from '../../_contexts/DarkModeProvider';

interface DarkModeToggleProps { isOpen: boolean; }

const DarkModeToggle: FC<DarkModeToggleProps> = ({
    isOpen,
}) => {

    const darkModeProvider = useContext(DarkModeContext);

    const darkMode = darkModeProvider.darkMode;
    const toggleDarkMode = darkModeProvider.toggleDarkMode;

    // const systemPrefersDark = useMediaQuery(
    //     {
    //         query: "(prefers-color-scheme: dark)",
    //     },
    //     undefined,
    //     (isSystemDark) => setIsDark(isSystemDark)
    // );

    // const [isDark, setIsDark] = useState(value === 'dark' || false);

    // const value: string = useMemo(
    //     () => (isDark === undefined ? !!systemPrefersDark : isDark),
    //     [isDark, systemPrefersDark]
    // );

    // useEffect(() => {
    //     if (value) {
    //         document.body.classList.add('dark');
    //     } else {
    //         document.body.classList.remove('dark');
    //     }
    // }, [value]);

    return (
        <div className={ `flex gap-2 items-center select-none` }>
            <Switch
                checked={ darkMode }
                onCheckedChange={ () => toggleDarkMode() }
                aria-label="Dark mode toggle"
                id="dark-mode-toggle"
            />
            <icons.Moon height={ 20 } width={ 20 } />
        </div>
    );
};

export default DarkModeToggle;
