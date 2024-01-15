import { Movie } from "@/lib/apis/movies";
import { getSearch } from "@/lib/apis/movies/api";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [searchMovie, setSearchMovie] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const search = async (q: string) => {
    if (q.length > 3) {
      const response = await getSearch(q);
      setSearchMovie(response.results);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    search(query);
  };

  return (
    <nav className="bg-black p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to={`/`}>
          <span className="text-white text-2xl font-bold">Movie Kita</span>
        </Link>
        <div className="flex-grow mx-5">
          <input
            type="text"
            placeholder="Search..."
            className="w-full py-2 px-4 rounded-md bg-gray-800 text-white focus:outline-none"
            value={searchQuery}
            onChange={handleSearch}
          />
          {searchQuery && searchMovie.length > 3 && (
            <ul className="absolute z-10 top-10 left-0 right-0 bg-white dark:bg-gray-900 rounded-md mr-4 outline-none border-gray-100 dark:border-gray-800 border-2 border-solid">
              {searchMovie.map((item, index) => (
                <li
                  key={index}
                  className="py-1 px-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => {
                    setSearchQuery("");
                    setSearchMovie([]);
                    navigate(`/detail/${item.id}`);
                  }}
                >
                  {item.title}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="hidden lg:flex space-x-6 ml-5">
          <Link to={`/favorites`}>
            <p className="text-white hover:text-gray-300">Favorite</p>
          </Link>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
