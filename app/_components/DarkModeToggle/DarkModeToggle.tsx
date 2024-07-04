import React, { FC, useContext } from 'react';
import { useMediaQuery } from "react-responsive";
import { Switch } from '../ui/switch';
import * as icons from 'lucide-react';
import { DarkModeContext } from '../../_contexts/DarkModeProvider';

interface DarkModeToggleProps { }

const DarkModeToggle: FC<DarkModeToggleProps> = ({ }): React.JSX.Element => {

    const darkModeProvider: any = useContext(DarkModeContext);
    const darkMode: any = darkModeProvider.darkMode;
    const toggleDarkMode: any = darkModeProvider.toggleDarkMode;

    return (
        <div className={ `flex gap-2 items-center select-none` }>
            <Switch
                checked={ darkMode }
                onCheckedChange={ (): any => toggleDarkMode() }
                aria-label="Dark mode toggle"
                id="dark-mode-toggle"
            />
            <icons.Moon height={ 20 } width={ 20 } />
        </div>
    );
};

export default DarkModeToggle;
