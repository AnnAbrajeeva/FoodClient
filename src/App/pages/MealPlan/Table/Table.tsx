import { FC, useContext } from 'react';
import s from './Table.module.scss';
import Board from '../Board';
import { MealDay, MealPlanContext } from '../MealPlan';

export type Cell = {
  id: number;
  title: string;
};

export type BoardType = {
  id: number;
  title: string;
  items: Cell[];
};

type BoardsProps = {
  onDrop: (e: any, board: MealDay, index: number) => void;
};

const Table: FC<BoardsProps> = ({ onDrop }) => {
  const { boards } = useContext(MealPlanContext);

  return (
    <div className={s.table}>
      <div>
        <table>
          <thead>         
            <tr className={s.table__days}>
              <th></th>
              <th>Monday</th>
              <th>Tuesday</th>
              <th>Wednesday</th>
              <th>Thursday</th>
              <th>Friday</th>
              <th>Saturday</th>
              <th>Sunday</th>
            </tr>
          </thead>
          <tbody>
            {boards.map((board: any, i) => (
              <Board key={board.id + i} board={board} onDrop={onDrop} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
