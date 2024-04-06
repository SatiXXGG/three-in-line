export default function CurrentTurn({ isSelected, letter, winner }) {
  let className = `turn ${isSelected ? "selected" : ""}`;

  if (winner === letter) {
    //miramos si si es un winner o no

    className = "turn winner"; //pone la clase css correspondiente
    console.log("Updating as winner");
  }

  return (
    <span
      id={"turn-" + letter}
      className={
        " m-2 flex text-2xl rounded-2xl bg-neutral-800 outline outline-2 outline-neutral-900 p-2 w-12 h-12 justify-center " +
        className
      }
    >
      {letter}
    </span>
  );
}
