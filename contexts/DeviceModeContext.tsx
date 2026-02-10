import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DeviceModeContextType {
    isMobileMode: boolean;
    toggleDeviceMode: () => void;
}

const DeviceModeContext = createContext<DeviceModeContextType | undefined>(undefined);

export function DeviceModeProvider({ children }: { children: ReactNode }) {
    const [isMobileMode, setIsMobileMode] = useState(false);

    const toggleDeviceMode = () => {
        setIsMobileMode(prev => !prev);
    };

    return (
        <DeviceModeContext.Provider value={{ isMobileMode, toggleDeviceMode }}>
            {children}
        </DeviceModeContext.Provider>
    );
}

export function useDeviceMode() {
    const context = useContext(DeviceModeContext);
    if (context === undefined) {
        throw new Error('useDeviceMode must be used within a DeviceModeProvider');
    }
    return context;
}
