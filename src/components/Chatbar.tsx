// ChatMessages.tsx
import React from "react";

interface Message {
  action: string; // "AI" or "USER"
  content: string;
  id: number; // Message ID
  timestamp: string; // Message timestamp
}

interface ChatMessagesProps {
  messages: Message[]; // Messages array
  chatName: string; // Name of the chat
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, chatName }) => {
  // Function to format the timestamp
  const formatTimestamp = (timestamp: string) => {
    const messageTime = new Date(timestamp);
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);

    // Check if the message is today, yesterday, or older
    if (messageTime.toDateString() === now.toDateString()) {
      return messageTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    } else if (messageTime.toDateString() === yesterday.toDateString()) {
      return (
        "Yesterday " +
        messageTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
    } else {
      return `${String(messageTime.getDate()).padStart(2, "0")}/${String(
        messageTime.getMonth() + 1
      ).padStart(2, "0")} ${messageTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })}`;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-none p-4 bg-gray-200">
        <h2 className="text-xl font-semibold">{chatName}</h2>
      </div>
      <div className="flex-1 bg-gray-100 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <p>No messages to display.</p>
        ) : (
          <div className="flex flex-col space-y-2">
            {messages.map((msg) => (
              <div key={msg.id}>
                <div
                  className={`flex ${
                    msg.action === "USER" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`p-3 rounded-lg ${
                      msg.action === "USER" ? "bg-blue-200" : "bg-white"
                    } border ${
                      msg.action === "USER"
                        ? "border-blue-300"
                        : "border-gray-300"
                    } shadow-md max-w-xs`}
                  >
                    <p>{msg.content}</p>
                  </div>
                </div>
                {/* Display timestamp below the message, outside of the message border */}
                <p
                  className={`text-gray-500 text-xs ${
                    msg.action === "USER" ? "text-right" : "text-left"
                  } mt-1`}
                >
                  {formatTimestamp(msg.timestamp)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessages;
