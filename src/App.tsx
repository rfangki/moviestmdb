import { useEffect, useState } from "react";
import { Movie, getNowPlaying, getPopular } from "./lib/apis/movies/index";
import CarouselMovie from "./components/CarouselMovie";
import Layout from "./components/Layout";
import CardMovie from "./components/CardMovie";
import { useQuery } from "./lib/useQuery";
import { useNavigate } from "react-router-dom";

const App = () => {
  const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
  const [nowPopular, setPopular] = useState<Movie[]>([]);
  const query = useQuery();
  const navigate = useNavigate();
  const currentPage = query.get("page") === null ? 1 : parseInt(query.get("page") as string, 10);

  useEffect(() => {
    fetchNowPlaying();
    fetchPopular();
  }, [query]);

  const fetchNowPlaying = async () => {
    try {
      const response = await getNowPlaying();
      setNowPlaying(response.results);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPopular = async () => {
    try {
      const page = currentPage;
      const response = await getPopular(page);
      setPopular(response.results);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNext = () => {
    const page = currentPage;

    navigate(`/?page=${page + 1}`);
  };

  const handleBack = () => {
    const page = currentPage;
    if (page > 1) {
      navigate(`/?page=${page - 1}`);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col gap-10 items-center">
        <div className="self-start pl-7 pt-7 text-5xl">Now Playing</div>
        <div className="flex justify-center">
          <CarouselMovie movie={nowPlaying} />
        </div>
        <div className="self-start pl-7 text-5xl">Popular</div>
        <div className="grid grid-cols-4 justify-items-center text-center gap-8 overflow-hidden">
          {nowPopular &&
            nowPopular.map((item, index) => {
              return <CardMovie key={index} data={item} />;
            })}
        </div>
        <div className="col-span-2 flex justify-between gap-10">
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 192 512"
            className="h-10 w-10 cursor-pointer text-black dark:text-white"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
            onClick={handleBack}
          >
            <path d="M192 127.338v257.324c0 17.818-21.543 26.741-34.142 14.142L29.196 270.142c-7.81-7.81-7.81-20.474 0-28.284l128.662-128.662c12.599-12.6 34.142-3.676 34.142 14.142z"></path>
          </svg>
          <div>{currentPage}</div>
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 192 512"
            className="h-10 w-10 cursor-pointer text-black dark:text-white"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
            onClick={handleNext}
          >
            <path d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"></path>
          </svg>
        </div>
      </div>
    </Layout>
  );
};

export default App;
