const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 bg-base-100 mt-20">
      <span className="loading loading-spinner loading-lg text-red-600"></span>
      <p className="text-gray-600 text-lg font-medium">
        Loading, please wait...
      </p>
    </div>
  );
};

export default Loading;
