import UserDefaulPictureIcon from "../icons/UserDefaulPictureIcon";

export default function ProfilePic({ src = "", size = "sm" }) {
  const imgSize = {
    sm: 25,
    md: 50,
    lg: 100,
    xl: 125,
  };
  return (
    <figure
      className={`overflow-hidden rounded-full`}
      style={{ height: imgSize[size], width: imgSize[size] }}
    >
      {src ? (
        <img
          src={src}
          alt="profile picture"
          style={{ height: imgSize[size], width: imgSize[size] }}
          className={`aspect-square overflow-hidden rounded-full object-cover object-center`}
        />
      ) : (
        <span>
          <UserDefaulPictureIcon size={imgSize[size]} />
        </span>
      )}
    </figure>
  );
}
