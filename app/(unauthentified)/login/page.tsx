import React from 'react';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from '../../_components/ui/tabs';
import LoginForm from '../../_components/forms/LoginForm/LoginForm';
import SigninForm from '../../_components/forms/SigninForm/SigninForm';

/**
 * Renders the login page component.
 * 
 * @returns The JSX element representing the login page.
 */
export default function Page(): React.JSX.Element {

    return (

        <Tabs defaultValue="login" className="max-w-[400px] m-auto">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Log In</TabsTrigger>
                <TabsTrigger value="signup">Sign up</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
                <LoginForm />
            </TabsContent>
            <TabsContent value="signup">
                <SigninForm />
            </TabsContent>
        </Tabs>

    );
}