import { DragEvent, FC, useContext } from 'react';
import s from './TableCell.module.scss';
import { MealDay, MealPlanContext } from '../MealPlan';
import { RecipeModel } from 'entites/Recipe';
import SmallCard from '../SmallCard';

type TableCellProps = {
  product: RecipeModel[];
  board: MealDay;
  onDrop: (e: any, board: MealDay, index: number) => void;
  index: number;
};

const TableCell: FC<TableCellProps> = ({ product, board, onDrop, index }) => {
  const { setCurrentBoard, setCurrentItem, currentItem } = useContext(MealPlanContext);

  function dragOverHandler(e: any): void {
    e.preventDefault();
    if (e.target.className === s.item) {
      e.target.style.boxShadow = '0 4px 3px gray';
    }
  }

  function dragLeaveHandler(e: any): void {
    e.target.style.boxShadow = 'none';
  }

  function dragStartHandler(e: DragEvent, product: RecipeModel): void {
    setCurrentBoard(board);
    setCurrentItem(product);
  }

  function dragEndHandler(e: any): void {
    e.target.style.boxShadow = 'none';
  }

  function dropHandler(e: any): void {
    e.preventDefault();
    if (currentItem) {
      onDrop(e, board, index);
    }
  }

  return (
    <td
      onDragOver={(e) => dragOverHandler(e)}
      onDragLeave={(e) => dragLeaveHandler(e)}
      onDragEnd={(e) => dragEndHandler(e)}
      onDrop={(e) => dropHandler(e)}
      draggable={true}
      className={s.cell}
    >
      {product.map((item) => (
        <div
          onDragOver={(e) => dragOverHandler(e)}
          onDragLeave={(e) => dragLeaveHandler(e)}
          onDragStart={(e) => dragStartHandler(e, item)} 
          onDragEnd={(e) => dragEndHandler(e)}
          onDrop={(e) => dropHandler(e)} 
          draggable={true}
          className={s.cell__card}
          key={item.id} 
        >
          {item && <SmallCard product={item} />}
        </div>
      ))}
    </td>
  );
};
export default TableCell;
