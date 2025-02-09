const Loading = () => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-70 flex justify-center items-center z-50">
      <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;
