import { Movie } from "../typings";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "../atoms/modalAtom";
import Image from "next/image";

interface Props {
  movie: string;
}

function Thumbnail({ movie }: Props) {
  // const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
  // const [showModal, setShowModal] = useRecoilState(modalState);

  return (
    <div
      className={`relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] 
      md:hover:scale-105`}
    >
      <Image
        src={movie}
        className="rounded-sm object-cover md:rounded"
        layout="fill"
      />
    </div>
  );
}

export default Thumbnail;
