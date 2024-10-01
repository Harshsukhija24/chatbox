import React from "react";

interface ChatSessionCardProps {
  id: string;
  name: string;
  lastMessageTimestamp: string;
  onClick: (id: string) => void;
}

const ChatSessionCard: React.FC<ChatSessionCardProps> = ({
  id,
  name,
  lastMessageTimestamp,
  onClick,
}) => {
  const formatTimestamp = (timestamp: string) => {
    const now = new Date();
    const messageTime = new Date(timestamp);

    if (messageTime.toDateString() === now.toDateString()) {
      return messageTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    } else {
      return `${String(messageTime.getDate()).padStart(2, "0")}/${String(
        messageTime.getMonth() + 1
      ).padStart(2, "0")}`;
    }
  };

  return (
    <div
      className="flex items-center border-t border-gray-300 p-2 cursor-pointer hover:bg-gray-100"
      onClick={() => onClick(id)}
    >
      <div className="flex-shrink-0">
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-300 text-white text-xl">
          👨‍💻
        </span>
      </div>

      <div className="flex-1 flex justify-between ml-3">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <p className="text-gray-500 text-sm">
          {formatTimestamp(lastMessageTimestamp)}
        </p>
      </div>
    </div>
  );
};

export default ChatSessionCard;
