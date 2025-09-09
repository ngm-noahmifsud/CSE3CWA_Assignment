import { createContext } from "react";

export type CodeOutputContextType = {
    output: string;
    setOutput: React.Dispatch<React.SetStateAction<string>>;
}

export const CodeOutputContext = createContext<CodeOutputContextType | null>(null);