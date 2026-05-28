const Shimmer = () => {
  return (
    <div className="shimmer-container">
      {Array.from({ length: 12 }).map((_, index) => (
        <div className="shimmer-card" key={index}>
          <div className="shimmer-image"></div>
          <div className="shimmer-line short"></div>
          <div className="shimmer-line"></div>
          <div className="shimmer-line smaller"></div>
        </div>
      ))}
    </div>
  );
};

export default Shimmer;
