import { useData } from "@/DataContext";
import CardMovie from "../CardMovie";
import Layout from "../Layout";

const Favorites = () => {
  const { favorites } = useData();
  console.log(favorites);
  return (
    <Layout>
      <div className="flex flex-col gap-10 items-center">
        <div className="self-start pl-7 text-5xl">Favorites</div>
        <div className="grid grid-cols-4 justify-items-center text-center gap-8 overflow-hidden">
          {favorites &&
            favorites.map((item, index) => {
              return <CardMovie key={index} data={item} />;
            })}
        </div>
      </div>
    </Layout>
  );
};

export default Favorites;
