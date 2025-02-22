
import { useState } from "react";
import { Card as CardType } from "@/types/board";

interface CardProps {
  card: CardType;
  onDragStart: (e: React.DragEvent, cardId: string, columnId: string) => void;
  columnId: string;
}

export const Card = ({ card, onDragStart, columnId }: CardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, card.id, columnId)}
      className={`p-4 mb-3 rounded-lg bg-gray-700/90 shadow-sm transition-all duration-200 cursor-move backdrop-blur-sm border border-gray-600 ${
        isHovered ? "animate-card-hover shadow-md" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h3 className="text-sm font-medium mb-2 text-gray-100">{card.title}</h3>
      {card.description && (
        <p className="text-xs text-gray-400">{card.description}</p>
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
    </div>
  );
};
