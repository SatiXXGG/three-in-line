export default function Square({ children, updateBoard, index }) {
  const handleClick = () => {
    updateBoard(index); //llamamos la funcion
    console.log("Updating...");
  };

  return (
    <div
      className="outline-white outline-2 cursor-pointer p-2 outline rounded-2xl m-2 flex"
      id="square"
      onClick={handleClick}
    >
      {children}
    </div>
  );
}
