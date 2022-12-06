import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import {
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
} from "../redux/services/shazamCore";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
const SongDetails = () => {
  const { songid } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data: songData, isFetching: isFetchingSongDetail } =
    useGetSongDetailsQuery({ songid });
  const {
    data,
    isFetching: isFetchingRelatedSongs,
    error,
  } = useGetSongRelatedQuery({ songid });
  function handlePlayClick(song, i) {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(false));
  }
  function handlePauseClick() {
    dispatch(playPause(false));
  }
  if (isFetchingSongDetail || isFetchingRelatedSongs) {
    return <Loader title="searching song detail" />;
  }
  if (error) return <Error />;
  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={""} songData={songData} />
      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics</h2>
      </div>
      <div className="mt-5">
        {songData?.sections[1].type === "LYRICS" ? (
          songData?.sections[1].text.map((line, i) => {
            return <p className="text-gray-400 text-base my-1"> {line}</p>;
          })
        ) : (
          <p>Sorry No lyrics found</p>
        )}
      </div>
      <RelatedSongs
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
        data={data}
        isPlaying={isPlaying}
        activeSong={activeSong}
      />
    </div>
  );
};

export default SongDetails;
