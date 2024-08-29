import React from 'react'
import { IoMdClose } from "react-icons/io";
import useFetchDetail from '../Hooks/UseFetchDetail';

const VideoPlay = ({data,close, media_type}) => {
  const { data: videoData } = useFetchDetail(
    `/${media_type}/${data?.id}/videos`
  );



  return (
    <section className="fixed bg-neutral-700 top-0 left-0 right-0 bottom-0 z-40 bg-opacity-50 flex justify-center items-center">
      <div className="bg-black w-full max-h-[80vh] max-w-screen-lg aspect-video rounded  relative">
        <button onClick={close} className="absolute -top-7 -right-1 text-3xl">
          <IoMdClose />
        </button>

        <iframe
          src={`https://www.youtube.com/embed/${videoData?.results[0]?.key}`}
          className="w-full h-full"
          title="video"
        />
      </div>
    </section>
  );
}

export default VideoPlay