
import { useState } from "react";
import { Column } from "./Column";
import { Board as BoardType, Card, Column as ColumnType } from "@/types/board";
import { useAuth } from "@/contexts/AuthContext";

const initialBoard: BoardType = {
  id: "1",
  title: "Main Board",
  columns: [
    {
      id: "1",
      title: "To Do",
      cards: [
        { 
          id: "1", 
          title: "Learn TypeScript", 
          description: "Study the basics",
          createdBy: "user1",
          createdAt: new Date().toISOString(),
        },
        { 
          id: "2", 
          title: "Build a project", 
          description: "Apply knowledge",
          createdBy: "user1",
          createdAt: new Date().toISOString(),
        },
      ],
      createdBy: "user1",
    },
    {
      id: "2",
      title: "In Progress",
      cards: [
        {
          id: "3",
          title: "Create Trello Clone",
          description: "Using React and TypeScript",
          createdBy: "user1",
          createdAt: new Date().toISOString(),
        },
      ],
      createdBy: "user1",
    },
    {
      id: "3",
      title: "Done",
      cards: [
        { 
          id: "4", 
          title: "Setup Development Environment",
          createdBy: "user1",
          createdAt: new Date().toISOString(),
        },
      ],
      createdBy: "user1",
    },
  ],
  users: [],
  createdBy: "user1",
  createdAt: new Date().toISOString(),
};

export const Board = () => {
  const [board, setBoard] = useState<BoardType>(initialBoard);
  const [draggedCard, setDraggedCard] = useState<{
    cardId: string;
    sourceColumnId: string;
  } | null>(null);
  const { user } = useAuth();

  const handleDragStart = (
    e: React.DragEvent,
    cardId: string,
    columnId: string
  ) => {
    setDraggedCard({ cardId, sourceColumnId: columnId });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
    e.preventDefault();

    if (!draggedCard) return;

    const sourceColumn = board.columns.find(
      (col) => col.id === draggedCard.sourceColumnId
    );
    const targetColumn = board.columns.find((col) => col.id === targetColumnId);

    if (!sourceColumn || !targetColumn) return;

    const card = sourceColumn.cards.find(
      (card) => card.id === draggedCard.cardId
    );
    if (!card) return;

    const newColumns = board.columns.map((col) => {
      if (col.id === draggedCard.sourceColumnId) {
        return {
          ...col,
          cards: col.cards.filter((c) => c.id !== draggedCard.cardId),
        };
      }
      if (col.id === targetColumnId) {
        return {
          ...col,
          cards: [...col.cards, card],
        };
      }
      return col;
    });

    setBoard({
      ...board,
      columns: newColumns,
    });
    setDraggedCard(null);
  };

  return (
    <div className="flex overflow-x-auto p-6 min-h-screen bg-trello bg-gradient-to-br from-gray-800 to-gray-900">
      {board.columns.map((column) => (
        <Column
          key={column.id}
          column={column}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        />
      ))}
    </div>
  );
};
