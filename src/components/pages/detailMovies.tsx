import { useEffect, useState } from "react";
import { MovieDetail, Videos } from "@/lib/apis/movies/index";
import { useParams } from "react-router-dom";
import { getData, getVideo } from "@/lib/apis/movies/api";
import Layout from "../Layout";
import { Button } from "../ui/button";
import { useData } from "@/DataContext";

const DetailMovies = () => {
  const { id } = useParams();
  const [data, setData] = useState<MovieDetail>();
  const [video, setVideo] = useState<Videos>();
  const { favorites, changeFavorite } = useData();

  useEffect(() => {
    if (id) {
      fetchData(id);
      fetchVideo(id);
    }
  }, [id]);

  const fetchData = async (id: string) => {
    const response = await getData(id);
    setData(response);
  };

  const fetchVideo = async (id: string) => {
    const response = await getVideo(id);
    setVideo(response);
    console.log(response);
  };

  return (
    <Layout>
      <div className="container mx-auto mt-8">
        {data && (
          <div className="grid grid-cols-1 lg:grid-cols-2 p-8 rounded-lg">
            <div className="lg:col-span-1">
              <img
                src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                alt={`${data.title} Poster`}
                className="w-auto h-auto object-cover mb-4 rounded"
              />
            </div>
            <div className="lg:col-span-1 pl-8">
              <h1 className="text-3xl font-semibold mb-4">{data.title}</h1>
              <p className="text-lg mb-4">{data.overview}</p>
              <div className="flex items-center mb-4">
                <span className="mr-2">Release Date:</span>
                <span className="font-semibold">{data.release_date}</span>
              </div>
              <div className="flex items-center mb-4">
                <span className="mr-2">Rating:</span>
                <span className="font-semibold">{data.vote_average}/10</span>
              </div>
              <div className="flex items-center mb-4">
                <span className="mr-2">Genres:</span>
                <div className="flex flex-wrap">
                  {data.genres.map((genre) => (
                    <span key={genre.id} className="mr-2 mb-2 px-2 py-1 bg-yellow-100 rounded">
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
              <Button onClick={() => changeFavorite(data)}>
                {favorites.some((movie) => movie.id === data.id)
                  ? "REMOVE FROM FAVORITES"
                  : "ADD TO FAVORITES"}
              </Button>
              {video && video.results.length > 0 && (
                <div className="col-span-1 mt-4 pb-8 flex justify-center items-center">
                  <iframe
                    title="Trailer"
                    width="100%"
                    height="400"
                    src={`https://www.youtube.com/embed/${video.results[0].key}`}
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default DetailMovies;
