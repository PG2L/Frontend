import React, {
    FC,
    useContext
} from 'react';
import { Switch } from '@/_components/ui/switch';
import * as icons from 'lucide-react';
import { DarkModeContext } from '@/_contexts/DarkModeProvider';

interface DarkModeToggleProps { }

/**
 * Renders a toggle switch for dark mode.
 *
 * @component
 */
const DarkModeToggle: FC<DarkModeToggleProps> = ({ }: DarkModeToggleProps): React.JSX.Element => {

    /**
     * Retrieves the dark mode provider from the context.
     */
    const darkModeProvider: any = useContext(DarkModeContext);

    /**
     * Gets the value of the darkMode property from the darkModeProvider.
     * @returns The value of the darkMode property.
     */
    const darkMode: any = darkModeProvider.darkMode;

    /**
     * Toggles the dark mode.
     * @param {any} darkModeProvider - The dark mode provider.
     */
    const toggleDarkMode: any = darkModeProvider.toggleDarkMode;

    return (

        <div className="flex gap-2 items-center select-none">
            <Switch
                checked={ darkMode }
                onCheckedChange={ (): any => toggleDarkMode() }
                aria-label="Dark mode toggle"
                id="dark-mode-toggle"
            />
            <icons.Moon
                height={ 20 }
                width={ 20 }
            />
        </div>

    );
};

export default DarkModeToggle;
