// NextGen Education - Video Player View
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Bookmark, 
  Share2, 
  CheckCircle2, 
  Clock, 
  Video, 
  User, 
  Layers 
} from "lucide-react";
import { getVideoById } from "../services/firebaseService";
import { useProgress } from "../context/ProgressContext";
import { useToast } from "../context/ToastContext";
import RelatedResources from "../components/common/RelatedResources";

export default function VideoDetail() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  const { isBookmarked, toggleBookmark, markVideoWatched, watchedVideos } = useProgress();
  const { addToast } = useToast();

  useEffect(() => {
    async function loadVideo() {
      setLoading(true);
      const data = await getVideoById(id);
      setVideo(data);
      setLoading(false);
    }
    loadVideo();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="container" style={{ padding: "4rem 1rem", textAlign: "center" }}>
        <p style={{ color: "var(--accent-rose)" }}>Loading Video Player...</p>
      </div>
    );
  }

  if (!video) {
    return (
      <div className="container" style={{ padding: "4rem 1rem", textAlign: "center" }}>
        <h2>Video Not Found</h2>
        <p style={{ marginBottom: "1.5rem" }}>The requested engineering video could not be located.</p>
        <Link to="/videos" className="btn btn-primary">
          <ArrowLeft size={16} /> Return to Video Hub
        </Link>
      </div>
    );
  }

  const isWatched = watchedVideos.includes(video.id);
  const bookmarked = isBookmarked(video.id);

  const handleToggleBookmark = () => {
    const state = toggleBookmark({
      id: video.id,
      type: "video",
      title: video.title,
      category: video.category,
      link: `/videos/${video.id}`
    });
    addToast(state ? "Video saved to bookmarks!" : "Removed from bookmarks.", "info");
  };

  const handleMarkWatched = () => {
    markVideoWatched(video.id, video.title);
    addToast("Video recorded as watched! +50 XP gained.", "success");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    addToast("Video URL copied to clipboard!", "success");
  };

  return (
    <div className="container" style={{ padding: "2rem 1rem", maxWidth: "980px" }}>
      {/* Breadcrumbs */}
      <div className="breadcrumbs">
        <Link to="/videos">Video Hub</Link>
        <span>/</span>
        <span>{video.category}</span>
        <span>/</span>
        <span style={{ color: "var(--text-main)" }}>{video.title}</span>
      </div>

      {/* Embedded YouTube Player */}
      <div style={{
        position: "relative",
        width: "100%",
        paddingTop: "56.25%",
        background: "#000",
        borderRadius: "var(--radius-xl)",
        overflow: "hidden",
        border: "1px solid var(--border-card)",
        boxShadow: "var(--shadow-lg)",
        marginBottom: "2rem"
      }}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?rel=0&modestbranding=1`}
          title={video.title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: "none"
          }}
        />
      </div>

      {/* Video Details & Action Header */}
      <div className="card" style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", flexWrap: "wrap", marginBottom: "1rem" }}>
          <div>
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "0.5rem" }}>
              <span className="badge badge-rose">{video.channel}</span>
              <span className="badge badge-cyan">{video.category}</span>
              <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                <Clock size={13} /> {video.duration}
              </span>
            </div>
            <h1 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>{video.title}</h1>
          </div>

          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button onClick={handleToggleBookmark} className={`btn btn-sm ${bookmarked ? 'btn-primary' : 'btn-secondary'}`}>
              <Bookmark size={15} /> {bookmarked ? "Bookmarked" : "Save"}
            </button>
            <button onClick={handleShare} className="btn btn-secondary btn-sm" title="Share URL">
              <Share2 size={15} />
            </button>
            <button 
              onClick={handleMarkWatched} 
              disabled={isWatched}
              className={`btn btn-sm ${isWatched ? 'btn-secondary' : 'btn-primary'}`}
            >
              <CheckCircle2 size={15} /> {isWatched ? "Watched ✓" : "Mark Watched"}
            </button>
          </div>
        </div>

        <p style={{ fontSize: "1rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "1.25rem" }}>
          {video.description}
        </p>

        {/* Topics Covered */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", alignSelf: "center" }}>Key Topics:</span>
          {video.topics?.map(topic => (
            <span key={topic} className="badge" style={{ textTransform: "none" }}>
              {topic}
            </span>
          ))}
        </div>
      </div>

      {/* Connected Related Resources */}
      <RelatedResources currentType="video" currentId={video.id} related={video.related} />
    </div>
  );
}
