
import { Card } from "./Card";
import { Column as ColumnType } from "@/types/board";

interface ColumnProps {
  column: ColumnType;
  onDragStart: (e: React.DragEvent, cardId: string, columnId: string) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, columnId: string) => void;
}

export const Column = ({
  column,
  onDragStart,
  onDragOver,
  onDrop,
}: ColumnProps) => {
  return (
    <div
      className="w-72 mx-2 p-4 rounded-lg bg-trello-column backdrop-blur-sm"
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, column.id)}
    >
      <h2 className="font-semibold mb-4 text-gray-700">{column.title}</h2>
      <div className="min-h-[200px]">
        {column.cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onDragStart={onDragStart}
            columnId={column.id}
          />
        ))}
      </div>
    </div>
  );
};
