import { ImageResponse } from "next/og";

export const alt = "Fish Me Aqua | Living Art for Your Aquarium";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#141414",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: 10,
            background:
              "linear-gradient(90deg, #F91C13 0%, #00CB83 100%)",
            display: "flex",
          }}
        />
        <div
          style={{
            fontSize: 96,
            fontWeight: 700,
            color: "#FFFFFF",
            letterSpacing: -2,
            display: "flex",
          }}
        >
          Fish Me Aqua
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 32,
            fontWeight: 400,
            color: "#006E5C",
            letterSpacing: 4,
            textTransform: "uppercase",
            display: "flex",
          }}
        >
          Living Art for Your Aquarium
        </div>
      </div>
    ),
    { ...size }
  );
}
