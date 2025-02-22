
import { useState } from "react";
import { Card as CardType } from "@/types/board";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, UserPlus, Save } from "lucide-react";

interface CardProps {
  card: CardType;
  onDragStart: (e: React.DragEvent, cardId: string, columnId: string) => void;
  columnId: string;
  isAdmin: boolean;
}

export const Card = ({ card, onDragStart, columnId, isAdmin }: CardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(card.title);
  const [editedDescription, setEditedDescription] = useState(card.description || "");
  const [isHovered, setIsHovered] = useState(false);

  const handleSave = () => {
    card.title = editedTitle;
    card.description = editedDescription;
    setIsEditing(false);
  };

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, card.id, columnId)}
      className={`p-4 rounded-lg bg-gray-700/90 shadow-sm transition-all duration-200 cursor-move backdrop-blur-sm border border-gray-600 ${
        isHovered ? "shadow-md" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isEditing ? (
        <div className="space-y-2">
          <Input
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="bg-gray-600 border-gray-500 text-gray-100"
          />
          <Input
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            placeholder="Description"
            className="bg-gray-600 border-gray-500 text-gray-100"
          />
          <div className="flex gap-2">
            <Button 
              size="sm" 
              onClick={handleSave}
              className="bg-gray-600 hover:bg-gray-500"
            >
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsEditing(false)}
              className="border-gray-500"
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-start">
            <h3 className="text-sm font-medium text-gray-100">{card.title}</h3>
            <div className="flex gap-1">
              {(isAdmin || card.createdBy === "user1") && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsEditing(true)}
                  className="h-6 w-6 p-0 hover:bg-gray-600"
                >
                  <Edit className="w-4 h-4 text-gray-400" />
                </Button>
              )}
              {(isAdmin || card.createdBy === "user1") && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 p-0 hover:bg-gray-600"
                >
                  <UserPlus className="w-4 h-4 text-gray-400" />
                </Button>
              )}
            </div>
          </div>
          {card.description && (
            <p className="text-xs text-gray-400 mt-2">{card.description}</p>
          )}
          {card.assignedUsers && card.assignedUsers.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {card.assignedUsers.map((user) => (
                <span
                  key={user.id}
                  className="px-2 py-1 text-xs rounded-full bg-gray-600 text-gray-300"
                >
                  {user.name}
                </span>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};
