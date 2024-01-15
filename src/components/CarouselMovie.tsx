import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { PropsCarouselMovie } from "@/lib/types/components";
import Autoplay from "embla-carousel-autoplay";
import { Link } from "react-router-dom";

const CarouselMovie = (props: PropsCarouselMovie) => {
  const { movie } = props;
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-11/12"
    >
      <CarouselContent>
        {movie.map((item, index) => (
          <CarouselItem key={index} className="basis-1/5">
            <div className="p-1">
              <Link to={`/detail/${item.id}`}>
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center">
                    <span className="text-3xl font-semibold">
                      <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default CarouselMovie;
