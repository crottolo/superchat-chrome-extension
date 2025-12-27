export interface Message {
  id: string;
  text: string;
  time: string;
  type: "sent" | "received";
  status?: "sent" | "delivered" | "read";
  senderInitials?: string;
  senderColor?: string;
  reactions?: { emoji: string; count?: number }[];
  replyTo?: {
    sender: string;
    text: string;
  };
}

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const hasReactions = message.reactions && message.reactions.length > 0;

  return (
    <div
      className={`mh-message ${message.type} ${hasReactions ? "has-reactions" : ""}`}
    >
      <div className="mh-bubble">
        {/* Reply Preview */}
        {message.replyTo && (
          <div className="mh-reply-preview">
            <div className="mh-reply-bar" />
            <div className="mh-reply-content">
              <span className="mh-reply-sender">{message.replyTo.sender}</span>
              <span className="mh-reply-text">{message.replyTo.text}</span>
            </div>
          </div>
        )}

        {/* Message Text */}
        <p className="mh-bubble-text">{message.text}</p>

        {/* Footer */}
        <div className="mh-bubble-footer">
          <span className="mh-bubble-time">{message.time}</span>
          {message.type === "sent" && message.status && (
            <StatusIcon status={message.status} />
          )}
        </div>

        {/* Reactions */}
        {hasReactions && (
          <div className="mh-reactions">
            {message.reactions!.map((r, i) => (
              <span key={i} className="mh-reaction">
                <span>{r.emoji}</span>
                {r.count && r.count > 1 && (
                  <span className="mh-reaction-count">{r.count}</span>
                )}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Avatar for sent messages */}
      {message.type === "sent" && message.senderInitials && (
        <div
          className="mh-avatar"
          style={{ backgroundColor: message.senderColor || "#7c3aed" }}
        >
          {message.senderInitials}
        </div>
      )}
    </div>
  );
}

function StatusIcon({ status }: { status: "sent" | "delivered" | "read" }) {
  return (
    <span className={`mh-status-icon ${status}`}>
      {status === "sent" ? (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-4.5 4.5a.75.75 0 0 1-1.08 0l-2-2a.75.75 0 1 1 1.08-1.04l1.47 1.47 3.97-3.98z" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l7-7zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0z" />
        </svg>
      )}
    </span>
  );
}
