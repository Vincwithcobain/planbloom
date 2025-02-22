
import { useState } from "react";
import { Card } from "./Card";
import { Column as ColumnType, Card as CardType } from "@/types/board";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

interface ColumnProps {
  column: ColumnType;
  onDragStart: (e: React.DragEvent, cardId: string, columnId: string) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, columnId: string) => void;
  isAdmin: boolean;
}

export const Column = ({
  column,
  onDragStart,
  onDragOver,
  onDrop,
  isAdmin,
}: ColumnProps) => {
  const [newCardTitle, setNewCardTitle] = useState("");
  const [showAddCard, setShowAddCard] = useState(false);

  const handleAddCard = () => {
    if (!newCardTitle.trim()) return;

    const newCard: CardType = {
      id: Date.now().toString(),
      title: newCardTitle,
      description: "",
      createdBy: "user1",
      createdAt: new Date().toISOString(),
      assignedUsers: [],
    };

    column.cards.push(newCard);
    setNewCardTitle("");
    setShowAddCard(false);
  };

  return (
    <div
      className="w-72 shrink-0 mx-2 p-4 rounded-lg bg-gray-800/80 backdrop-blur-sm border border-gray-700"
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, column.id)}
    >
      <h2 className="font-semibold mb-4 text-gray-100">{column.title}</h2>
      <div className="space-y-3 min-h-[100px]">
        {column.cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onDragStart={onDragStart}
            columnId={column.id}
            isAdmin={isAdmin}
          />
        ))}
      </div>
      
      {showAddCard ? (
        <div className="mt-4 space-y-2">
          <Input
            placeholder="Card Title"
            value={newCardTitle}
            onChange={(e) => setNewCardTitle(e.target.value)}
            className="bg-gray-700 border-gray-600 text-gray-100"
          />
          <div className="flex gap-2">
            <Button onClick={handleAddCard} size="sm" className="bg-gray-700 hover:bg-gray-600">
              Add
            </Button>
            <Button 
              onClick={() => setShowAddCard(false)} 
              size="sm"
              variant="outline" 
              className="border-gray-600"
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <Button
          onClick={() => setShowAddCard(true)}
          className="w-full mt-4 bg-gray-700 hover:bg-gray-600"
          size="sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Card
        </Button>
      )}
    </div>
  );
};
