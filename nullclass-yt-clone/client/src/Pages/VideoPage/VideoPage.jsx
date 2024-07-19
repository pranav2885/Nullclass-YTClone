import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Comments from "../../Components/Comments/Comments";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import LikeWatchLaterSaveBtns from "./LikeWatchLaterSaveBtns";
import "./VideoPage.css";
import { addToHistory } from "../../actions/History";
import { viewVideo } from "../../actions/video";

function VideoPage() {
  const { vid } = useParams();
  const vids = useSelector((state) => state.videoReducer);
  const vv = vids?.data ? vids.data.filter((q) => q._id === vid)[0] : null;
  const dispatch = useDispatch();
  const CurrentUser = useSelector((state) => state?.currentUserReducer);
  const videoContainerRef = useRef(null);
  const tapTimeoutRef = useRef(null);
  const tapCountRef = useRef(0);
  const holdTimeoutRef = useRef(null);

  const handleHistory = () => {
    dispatch(
      addToHistory({
        videoId: vid,
        Viewer: CurrentUser?.result._id,
      })
    );
  };

  const handleViews = () => {
    dispatch(viewVideo({ id: vid }));
  };

  useEffect(() => {
    if (CurrentUser) {
      handleHistory();
    }
    handleViews();
  }, []);

  const handleTap = (e) => {
    tapCountRef.current++;
    clearTimeout(tapTimeoutRef.current);

    tapTimeoutRef.current = setTimeout(() => {
      if (tapCountRef.current === 1) {
        handleSingleTap(e);
      } else if (tapCountRef.current === 2) {
        handleDoubleTap(e);
      } else if (tapCountRef.current === 3) {
        handleTripleTap(e);
      }
      tapCountRef.current = 0;
    }, 300);
  };

  const handleSingleTap = (e) => {
    const iframe = videoContainerRef.current.querySelector('iframe');
    const rect = iframe.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (x > rect.width * 0.9 && y < rect.height * 0.1) {
      showLocationAndTemperature();
    } else {
      toggleVideoPlayPause();
    }
  };

  const handleDoubleTap = (e) => {
    const iframe = videoContainerRef.current.querySelector('iframe');
    const rect = iframe.getBoundingClientRect();
    const x = e.clientX - rect.left;

    if (x < rect.width / 2) {
      adjustVideoTime(-10);
    } else {
      adjustVideoTime(10);
    }
  };

  const handleTripleTap = (e) => {
    const iframe = videoContainerRef.current.querySelector('iframe');
    const rect = iframe.getBoundingClientRect();
    const x = e.clientX - rect.left;

    if (x < rect.width / 3) {
      showCommentSection();
    } else if (x > rect.width * 2 / 3) {
      closeWebsite();
    } else {
      playNextVideo();
    }
  };

  const handleHold = (e) => {
    const iframe = videoContainerRef.current.querySelector('iframe');
    const rect = iframe.getBoundingClientRect();
    const x = e.clientX - rect.left;

    holdTimeoutRef.current = setTimeout(() => {
      if (x < rect.width / 2) {
        adjustPlaybackRate(0.5);
      } else {
        adjustPlaybackRate(2);
      }
    }, 500);
  };

  const handleHoldEnd = () => {
    clearTimeout(holdTimeoutRef.current);
    adjustPlaybackRate(1);
  };

  const showLocationAndTemperature = () => {
    // Implement location and temperature popup logic here
    alert("Current Location: Your Location\nTemperature: 25°C");
  };

  const showCommentSection = () => {
    // Implement show comment section logic here
    alert("Show comment section");
  };

  const closeWebsite = () => {
    // Implement close website logic here
    alert("Closing website...");
  };

  const playNextVideo = () => {
    // Implement play next video logic here
    alert("Playing next video...");
  };

  const toggleVideoPlayPause = () => {
    // Implement play/pause logic for iframe video
  };

  const adjustVideoTime = (seconds) => {
    // Implement time adjustment logic for iframe video
  };

  const adjustPlaybackRate = (rate) => {
    // Implement playback rate adjustment logic for iframe video
  };

  if (!vv) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="container_videoPage">
        <div className="container2_videoPage">
          <div className="video_display_screen_videoPage" ref={videoContainerRef}>
            <iframe
              src={`http://localhost:5500/${vv?.filePath}`} 
              className={"video_ShowVideo_videoPage"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onClick={handleTap}
              onTouchStart={handleHold}
              onTouchEnd={handleHoldEnd}
            ></iframe>
            <div className="video_details_videoPage">
              <div className="video_btns_title_VideoPage_cont">
                <p className="video_title_VideoPage">{vv?.videoTitle}</p>
                <div className="views_date_btns_VideoPage">
                  <div className="views_videoPage">
                    {vv?.Views} views <div className="dot"></div>{" "}
                    {moment(vv?.createdAt).fromNow()}
                  </div>
                  <LikeWatchLaterSaveBtns vv={vv} vid={vid} />
                </div>
              </div>
              <Link
                to={`/chanel/${vv?.videoChanel}`}
                className="chanel_details_videoPage"
              >
                <b className="chanel_logo_videoPage">
                  <p>{vv?.Uploder.charAt(0).toUpperCase()}</p>
                </b>
                <p className="chanel_name_videoPage">{vv?.Uploder}</p>
              </Link>
              <div className="comments_VideoPage">
                <h2>
                  <u>Comments</u>
                </h2>
                <Comments videoId={vv._id} />
              </div>
            </div>
          </div>
          <div className="moreVideoBar">More video</div>
        </div>
      </div>
    </>
  );
}

export default VideoPage;
////src={`https://youtube-server-eight.vercel.app/${vv?.filePath}`}