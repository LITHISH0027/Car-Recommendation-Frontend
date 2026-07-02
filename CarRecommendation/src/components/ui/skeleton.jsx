function Skeleton({ className = "" }) {
  return <div className={`animate-pulse rounded-md bg-muted ${className}`.trim()} />;
}

export { Skeleton };
export default Skeleton;
