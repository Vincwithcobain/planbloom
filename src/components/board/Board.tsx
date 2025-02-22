import { useState } from "react";
import { Column } from "./Column";
import { Board as BoardType, Card, Column as ColumnType } from "@/types/board";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

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
          assignedUsers: [],
        },
        { 
          id: "2", 
          title: "Build a project", 
          description: "Apply knowledge",
          createdBy: "user1",
          createdAt: new Date().toISOString(),
          assignedUsers: [],
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
          assignedUsers: [],
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
          assignedUsers: [],
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
  const [newColumnTitle, setNewColumnTitle] = useState("");
  const { user } = useAuth();

  const handleDragStart = (e: React.DragEvent, cardId: string, columnId: string) => {
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

  const addColumn = () => {
    if (!newColumnTitle.trim()) return;
    
    const newColumn: ColumnType = {
      id: Date.now().toString(),
      title: newColumnTitle,
      cards: [],
      createdBy: user?.id || "unknown",
    };

    setBoard({
      ...board,
      columns: [...board.columns, newColumn],
    });
    setNewColumnTitle("");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center gap-4">
          <Input
            placeholder="New Column Title"
            value={newColumnTitle}
            onChange={(e) => setNewColumnTitle(e.target.value)}
            className="max-w-xs bg-gray-800 text-gray-100 border-gray-700"
          />
          <Button onClick={addColumn} className="bg-gray-700 hover:bg-gray-600">
            <Plus className="w-4 h-4 mr-2" />
            Add Column
          </Button>
        </div>
      </div>
      <div className="flex-1 overflow-x-auto p-6">
        <div className="flex gap-4">
          {board.columns.map((column) => (
            <Column
              key={column.id}
              column={column}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              isAdmin={user?.isAdmin || false}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
