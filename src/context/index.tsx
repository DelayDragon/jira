import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "store";
import { AuthProvider } from "./auth-context";

export const AppProviders = ({ children }: { children: ReactNode }) => {
    return <Provider store={store}>
        <AuthProvider>
            {children}
        </AuthProvider>
    </Provider>

}