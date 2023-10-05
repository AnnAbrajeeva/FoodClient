import { FC } from "react";
import TableCell from "../TableCell";
import s from './Board.module.scss'
import { MealDay } from "../MealPlan";

type BoardProps = {
    board: MealDay;
    onDrop: (e: any, board: any, index: number) => void;
}

const Board: FC<BoardProps> = ({board, onDrop }) => {
    
    function dragOverHandler(e: any): void {
        e.preventDefault();
        if(e.target.className === s.item) {
            e.target.style.boxShadow = '0 4px 3px gray';
        }
    }

  return (
    <tr onDragOver={(e) => dragOverHandler(e)}>
      <td className={s.board__meals}>
        <div className={s.board__title}>{board.title}</div>
      </td>

      {board.day.map((item, i) => (
      <TableCell key={i} index={i} board={board} product={item.items} onDrop={onDrop} />
    ))}
    </tr>
  );
};

export default Board;
