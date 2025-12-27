import { Message, MessageBubble } from "./MessageBubble";

interface DateGroup {
  date: string;
  messages: Message[];
}

interface SystemMessage {
  id: string;
  text: string;
  icon?: "lock" | "info";
}

interface MessageListProps {
  groups: DateGroup[];
  systemMessage?: SystemMessage;
}

export function MessageList({ groups, systemMessage }: MessageListProps) {
  return (
    <div className="mh-messages">
      {/* System Message */}
      {systemMessage && (
        <div className="mh-system-message">
          <span className="mh-system-badge">
            {systemMessage.icon === "lock" && <LockIcon />}
            {systemMessage.text}
          </span>
        </div>
      )}

      {/* Message Groups by Date */}
      {groups.map((group) => (
        <div key={group.date}>
          <div className="mh-date-separator">
            <span>{group.date}</span>
          </div>
          {group.messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
        </div>
      ))}
    </div>
  );
}

function LockIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

export type { DateGroup, SystemMessage };
