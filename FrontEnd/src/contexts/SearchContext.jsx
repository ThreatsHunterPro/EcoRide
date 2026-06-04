import { createContext, useContext } from "react";
import { useSearchLogic } from "../hooks/search/useSearchLogic";

const SearchContext = createContext(null);

function SearchProvider({children}) {
  const searchData = useSearchLogic();

  return (
    <SearchContext.Provider value={searchData}>
      {children}
    </SearchContext.Provider>
  );
}

export { SearchContext, SearchProvider };