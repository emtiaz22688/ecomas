export default function AboutVideo() {
  return (
    <section
      style={{
        width: "100%",
        height: "215px",
        backgroundColor: "#d6c4b2",
        backgroundImage: 'url("/about-woman.png")',
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <button
        type="button"
        aria-label="Play video"
        style={{
          width: "42px",
          height: "42px",
          border: "none",
          outline: "none",
          borderRadius: "50%",
          backgroundColor: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "transform 0.3s ease",
        }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 6.5L18 12L9 17.5V6.5Z"
            fill="#C68A4B"
          />
        </svg>
      </button>
    </section>
  );
}