import React, { useEffect, useState, useCallback } from "react";
import ChatSessionCard from "./components/Chatcard";
import ChatMessages from "./components/Chatbar";

const ChatSessions: React.FC = () => {
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

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
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const data = await fetchChatSessions(page);
      setSessions((prevSessions) => [...prevSessions, ...data.chat_sessions]);
      setHasMore(data.chat_sessions.length > 0);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching chat sessions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSessions();
  }, []);

  const handleChatClick = (id: string) => {
    setSelectedChatId(id);
  };

  const selectedSession = sessions.find(
    (session) => session.id === selectedChatId
  );
  const messages = selectedSession ? selectedSession.messages : [];
  const chatName = selectedSession ? selectedSession.name : "";

  const handleScroll = useCallback(
    (event: React.UIEvent<HTMLDivElement>) => {
      const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
      if (scrollTop + clientHeight >= scrollHeight - 10 && hasMore) {
        loadSessions();
      }
    },
    [hasMore, loadSessions]
  );

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-80 border-r border-gray-300 md:rounded-lg">
        <h1 className="text-xl font-semibold bg-gray-200 p-4">Messages</h1>
        <div
          className="bg-white rounded-lg shadow h-[calc(100vh-60px)] overflow-y-auto"
          onScroll={handleScroll}
        >
          {sessions.map((session) => (
            <ChatSessionCard
              key={session.id}
              id={session.id}
              name={session.name}
              lastMessageTimestamp={
                session.messages[session.messages.length - 1]?.timestamp
              }
              onClick={handleChatClick}
            />
          ))}
          {loading && (
            <p className="text-center py-4">Loading more sessions...</p>
          )}
        </div>
      </div>

      <div className="flex-1 bg-white">
        {!selectedChatId ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p>Select a message to view the conversation</p>
          </div>
        ) : (
          <ChatMessages messages={messages} chatName={chatName} />
        )}
      </div>
    </div>
  );
};

export default ChatSessions;
