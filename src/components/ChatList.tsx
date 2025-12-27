import { useState } from "react";
import { ChatListItem } from "./ChatListItem";
import { ChatPopover } from "./ChatPopover";
import { ChatWithMessages } from "../data/mockData";

interface ChatListProps {
  chats: ChatWithMessages[];
}

export function ChatList({ chats }: ChatListProps) {
  const [selectedChat, setSelectedChat] = useState<ChatWithMessages | null>(
    null,
  );

  const handleChatClick = (chat: ChatWithMessages) => {
    setSelectedChat(selectedChat?.id === chat.id ? null : chat);
  };

  const handleClosePopover = () => {
    setSelectedChat(null);
  };

  if (chats.length === 0) {
    return (
      <div className="tv-list">
        <div className="tv-empty">
          <InboxIcon />
          <span>No chats</span>
        </div>
      </div>
    );
  }

  return (
    <div className="tv-popover-container">
      <div className="tv-list">
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => handleChatClick(chat)}
            className={selectedChat?.id === chat.id ? "tv-item-selected" : ""}
          >
            <ChatListItem chat={chat} />
          </div>
        ))}
      </div>

      {selectedChat && (
        <div className="tv-chat-popover">
          <ChatPopover chat={selectedChat} onClose={handleClosePopover} />
        </div>
      )}
    </div>
  );
}

function InboxIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
      <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </svg>
  );
}
