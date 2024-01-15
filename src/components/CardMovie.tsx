import { Link } from "react-router-dom";

interface cardProps {
  data: any;
}

const CardMovie = (props: cardProps) => {
  const { data } = props;
  return (
    <Link
      to={`/detail/${data.id}`}
      className="bg-amber-100 w-80 text-gray-800 flex flex-col items-center"
    >
      <img
        style={{ cursor: "pointer" }}
        src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
        alt="Movie Poster"
        className="aspect-[2/3] object-cover"
      />

      <div
        style={{ cursor: "pointer" }}
        className="h-16 font-bold text-lg flex justify-center items-center"
      >
        {data.title}
      </div>
    </Link>
  );
};

export default CardMovie;
