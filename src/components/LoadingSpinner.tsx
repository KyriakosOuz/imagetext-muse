
const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-slate-200/20 animate-[spin_1.5s_linear_infinite]" />
        <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-t-white animate-[spin_1s_ease-in-out_infinite]" />
      </div>
    </div>
  );
};

export default LoadingSpinner;
