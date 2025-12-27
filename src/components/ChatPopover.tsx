import { ThreadHeader } from "./ThreadHeader";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";
import { ChatWithMessages, systemMessage } from "../data/mockData";

interface ChatPopoverProps {
  chat: ChatWithMessages;
  onClose?: () => void;
}

export function ChatPopover({ chat, onClose }: ChatPopoverProps) {
  const handleSend = (text: string) => {
    console.log("Sending message:", text, "to chat:", chat.id);
  };

  return (
    <div className="mh-chat-container">
      <ThreadHeader
        contactName={chat.name}
        contactNumber={chat.number}
        channelType={chat.channel}
        instanceName={chat.instance}
        onClose={onClose}
      />
      <MessageList groups={chat.messages} systemMessage={systemMessage} />
      <MessageInput onSend={handleSend} placeholder="Type a message..." />
    </div>
  );
}
