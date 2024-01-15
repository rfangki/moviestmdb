import { useState, createContext, ReactNode, useMemo, useContext, useCallback } from "react";
import { Movie } from "./lib/apis/movies";
import { useToast } from "./components/ui/use-toast";

interface Context {
  favorites: Movie[];
  changeFavorite: (favorite: Movie) => void;
}

interface Props {
  children: ReactNode;
}

const contextValue = {
  favorites: [],
  changeFavorite: () => {},
};

const DataContext = createContext<Context>(contextValue);

export const DataProvider = ({ children }: Readonly<Props>) => {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const { toast } = useToast();

  const changeFavorite = useCallback(
    (favorite: Movie) => {
      const isAlreadyFavorite = favorites.some((movie) => movie.id === favorite.id);
      if (isAlreadyFavorite) {
        const removeFavorites = favorites.filter((movie) => movie.id !== favorite.id);
        setFavorites(removeFavorites);
        toast({
          title: "Berhasil dihapus",
          description: "Movie berhasil dihapus dari favorites",
        });
      } else {
        setFavorites((prevFavorites) => [...prevFavorites, favorite]);
        toast({
          title: "Berhasil ditambahkan",
          description: "Movie berhasil ditambahkan dalam favorites",
        });
      }
    },
    [favorites]
  );

  const dataContextValue = useMemo(
    () => ({
      favorites,
      changeFavorite,
    }),
    [favorites]
  );

  return <DataContext.Provider value={dataContextValue}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("ERROR: useData must be used within DataContext");
  }
  return context;
};
