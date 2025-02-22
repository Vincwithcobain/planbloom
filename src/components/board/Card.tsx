
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
      className={`p-4 mb-3 rounded-lg bg-trello-card shadow-sm transition-all duration-200 cursor-move backdrop-blur-sm border border-gray-100 ${
        isHovered ? "animate-card-hover shadow-md" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h3 className="text-sm font-medium mb-2">{card.title}</h3>
      {card.description && (
        <p className="text-xs text-gray-500">{card.description}</p>
      )}
    </div>
  );
};
