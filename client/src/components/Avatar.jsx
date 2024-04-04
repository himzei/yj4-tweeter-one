import { IoPerson } from "react-icons/io5";

export default function Avatar({
  size,
  textSize,
  text,
  username,
  email,
  photo = "basic",
}) {
  return (
    <div className="flex items-center gap-2">
      {photo === "basic" ? (
        <div
          className={`bg-neutral-300 rounded-full ${size} flex justify-center items-center text-white p-2`}
        >
          <IoPerson size="20" />
        </div>
      ) : (
        <div className={`${size} rounded-full overflow-hidden`}>
          <img
            className="w-full h-full object-cover"
            src={photo}
            alt="avatar"
          />
        </div>
      )}
      {text === "hidden" ? null : (
        <div className={`font-semibold text-neutral-500 ${textSize}`}>
          <div className="flex flex-col">
            <span>{username}</span>
            <span>{email}</span>
          </div>
        </div>
      )}
    </div>
  );
}
