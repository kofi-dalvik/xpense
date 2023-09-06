import { createContext, useContext } from 'react';

const StoreContext = createContext({});

export const StoreProvider = ({ children, value }) => {
    return (
        <StoreContext.Provider value={ value }>
            {children}
        </StoreContext.Provider>
    );
};

export const useStore = () => {
    return useContext(StoreContext) || {};
}

export const useCategories = () => {
    const { categories } = useStore();

    return categories || [];
};