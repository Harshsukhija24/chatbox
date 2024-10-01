import React, { useEffect, useState, useCallback } from "react";
import ChatSessionCard from "./components/Chatcard"; // Ensure the path is correct
import ChatMessages from "./components/Chatbar"; // Import the new ChatMessages component

const ChatSessions: React.FC = () => {
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null); // State to store the selected chat ID
  const [page, setPage] = useState<number>(1); // State to track the current page
  const [hasMore, setHasMore] = useState<boolean>(true); // State to track if there are more sessions to load

  const fetchChatSessions = async (page: number) => {
    const response = await fetch(
      `https://admin-backend-docker-india-306034828043.asia-south2.run.app/nlp/api/chat_sessions?page=1&per_page=20`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  const loadSessions = async () => {
    if (loading || !hasMore) return; // Prevent loading if already loading or no more sessions
    setLoading(true);
    try {
      const data = await fetchChatSessions(page);
      // Sort messages for each session by timestamp in descending order
      const sortedSessions = data.chat_sessions.map((session: any) => {
        const sortedMessages = session.messages.sort(
          (a: any, b: any) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
        return { ...session, messages: sortedMessages };
      });

      setSessions((prevSessions) => [...prevSessions, ...sortedSessions]);
      setHasMore(data.chat_sessions.length > 0); // Check if more data is available
      setPage((prevPage) => prevPage + 1); // Increment the page number
    } catch (error) {
      console.error("Error fetching chat sessions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSessions(); // Initial load
  }, []);

  const handleChatClick = (id: string) => {
    setSelectedChatId(id); // Set the selected chat ID when a card is clicked
  };

  const selectedSession = sessions.find(
    (session) => session.id === selectedChatId
  );
  const messages = selectedSession ? selectedSession.messages : [];
  const chatName = selectedSession ? selectedSession.name : ""; // Get the chat name for display

  const handleScroll = useCallback(
    (event: React.UIEvent<HTMLDivElement>) => {
      const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
      if (scrollTop + clientHeight >= scrollHeight - 10 && hasMore) {
        loadSessions(); // Load more sessions when scrolled to the bottom
      }
    },
    [hasMore, loadSessions]
  );

  return (
    <div className="flex h-screen">
      <div className="w-80 border-r border-gray-300">
        <h1 className="text-xl font-semibold bg-gray-200 p-4">Messages</h1>
        <div
          className="bg-white rounded-lg shadow h-[calc(100vh-60px)] overflow-y-auto"
          onScroll={handleScroll} // Add the scroll event handler
        >
          {sessions.map((session) => (
            <ChatSessionCard
              key={session.id}
              id={session.id}
              name={session.name}
              lastMessageTimestamp={
                session.messages[session.messages.length - 1]?.timestamp
              }
              onClick={handleChatClick} // Pass the click handler
            />
          ))}
          {loading && (
            <p className="text-center py-4">Loading more sessions...</p>
          )}
        </div>
      </div>

      <div className="flex-1 bg-white">
        {/* Show a message when no chat is selected */}
        {!selectedChatId ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p>Select a message to view the conversation</p>
          </div>
        ) : (
          // Render ChatMessages component on the right side
          <ChatMessages messages={messages} chatName={chatName} />
        )}
      </div>
    </div>
  );
};

export default ChatSessions;
