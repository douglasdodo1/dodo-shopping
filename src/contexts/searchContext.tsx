"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type search = {
  searchedProduct: string;
  setSearchedProducts: React.Dispatch<React.SetStateAction<string>>;
};

const SearchContext = createContext<search | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchedProduct, setSearchedProducts] = useState<string>("");
  return <SearchContext.Provider value={{ searchedProduct, setSearchedProducts }}>{children}</SearchContext.Provider>;
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) throw new Error("useSearchContext must be used inside SearchProvider");
  return context;
};
