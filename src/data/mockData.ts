import { ChatPreview } from "../components/ChatListItem";
import { DateGroup, SystemMessage } from "../components/MessageList";

// Types
export interface ChatWithMessages extends ChatPreview {
  messages: DateGroup[];
}

// System message (same for all chats)
export const systemMessage: SystemMessage = {
  id: "sys-1",
  text: "End-to-end encrypted messages",
  icon: "lock",
};

// Assigned chats with their messages
export const assignedChats: ChatWithMessages[] = [
  {
    id: "1",
    name: "John Smith",
    number: "+1234567890",
    channel: "whatsapp",
    instance: "Sales Team",
    preview: "Thanks for the quick response! 🙏",
    time: "10:30",
    unread: 4,
    messages: [
      {
        date: "Yesterday",
        messages: [
          {
            id: "1-1",
            text: "Hi, I'm interested in your enterprise plan.",
            time: "14:20",
            type: "received",
          },
          {
            id: "1-2",
            text: "Hello! I'd be happy to help you with that. What specific features are you looking for?",
            time: "14:25",
            type: "sent",
            status: "read",
            senderInitials: "JS",
            senderColor: "#7c3aed",
          },
          {
            id: "1-3",
            text: "We need multi-user support and API access.",
            time: "14:30",
            type: "received",
          },
          {
            id: "1-4",
            text: "Our enterprise plan includes both! Let me send you the details.",
            time: "14:35",
            type: "sent",
            status: "read",
            senderInitials: "JS",
            senderColor: "#7c3aed",
          },
        ],
      },
      {
        date: "Today",
        messages: [
          {
            id: "1-5",
            text: "Good morning! Did you have a chance to review the proposal?",
            time: "09:00",
            type: "sent",
            status: "read",
            senderInitials: "JS",
            senderColor: "#7c3aed",
          },
          {
            id: "1-6",
            text: "Yes, it looks great! I have a few questions about the pricing.",
            time: "09:15",
            type: "received",
          },
          {
            id: "1-7",
            text: "Of course, what would you like to know?",
            time: "09:20",
            type: "sent",
            status: "read",
            senderInitials: "JS",
            senderColor: "#7c3aed",
          },
          {
            id: "1-8",
            text: "Is there a discount for annual billing?",
            time: "09:45",
            type: "received",
            reactions: [{ emoji: "👍" }],
          },
          {
            id: "1-9",
            text: "Yes! You get 20% off with annual billing.",
            time: "10:00",
            type: "sent",
            status: "read",
            senderInitials: "JS",
            senderColor: "#7c3aed",
          },
          {
            id: "1-10",
            text: "That's perfect. Can you send me the contract?",
            time: "10:15",
            type: "received",
          },
          {
            id: "1-11",
            text: "Thanks for the quick response! 🙏",
            time: "10:30",
            type: "received",
            reactions: [{ emoji: "❤️" }],
          },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "Sarah Johnson",
    number: "+1987654321",
    channel: "whatsapp",
    instance: "Sales Team",
    preview: "The contract has been sent",
    time: "09:45",
    unread: 0,
    status: "read",
    isOutbound: true,
    messages: [
      {
        date: "Today",
        messages: [
          {
            id: "2-1",
            text: "Hi Sarah, following up on our call yesterday.",
            time: "08:30",
            type: "sent",
            status: "read",
            senderInitials: "MR",
            senderColor: "#059669",
          },
          {
            id: "2-2",
            text: "Yes, I remember! You mentioned the new pricing.",
            time: "08:45",
            type: "received",
          },
          {
            id: "2-3",
            text: "Exactly. I've prepared the contract with the special terms we discussed.",
            time: "09:00",
            type: "sent",
            status: "read",
            senderInitials: "MR",
            senderColor: "#059669",
          },
          {
            id: "2-4",
            text: "Great! Please send it over.",
            time: "09:30",
            type: "received",
          },
          {
            id: "2-5",
            text: "The contract has been sent",
            time: "09:45",
            type: "sent",
            status: "read",
            senderInitials: "MR",
            senderColor: "#059669",
          },
        ],
      },
    ],
  },
  {
    id: "3",
    name: "Mike Wilson",
    number: "@mikewilson",
    channel: "telegram",
    instance: "Support",
    preview: "Photo",
    time: "Yesterday",
    unread: 0,
    messages: [
      {
        date: "Yesterday",
        messages: [
          {
            id: "3-1",
            text: "Hey, I'm having an issue with my account.",
            time: "15:00",
            type: "received",
          },
          {
            id: "3-2",
            text: "Hi Mike! What seems to be the problem?",
            time: "15:05",
            type: "sent",
            status: "read",
            senderInitials: "AV",
            senderColor: "#dc2626",
          },
          {
            id: "3-3",
            text: "I can't access my dashboard. Here's a screenshot:",
            time: "15:10",
            type: "received",
          },
          {
            id: "3-4",
            text: "Photo",
            time: "15:11",
            type: "received",
          },
          {
            id: "3-5",
            text: "I see the issue. Let me fix that for you.",
            time: "15:20",
            type: "sent",
            status: "read",
            senderInitials: "AV",
            senderColor: "#dc2626",
          },
          {
            id: "3-6",
            text: "Done! Please try logging in again.",
            time: "15:25",
            type: "sent",
            status: "read",
            senderInitials: "AV",
            senderColor: "#dc2626",
          },
          {
            id: "3-7",
            text: "It works now! Thanks so much! 🎉",
            time: "15:30",
            type: "received",
            reactions: [{ emoji: "🎉" }],
          },
        ],
      },
    ],
  },
  {
    id: "6",
    name: "Emma Davis",
    number: "+1555123456",
    channel: "whatsapp",
    instance: "Sales Team",
    preview: "Looking forward to the demo!",
    time: "08:15",
    unread: 2,
    messages: [
      {
        date: "Today",
        messages: [
          {
            id: "6-1",
            text: "Hi, I'd like to schedule a product demo.",
            time: "08:00",
            type: "received",
          },
          {
            id: "6-2",
            text: "Looking forward to the demo!",
            time: "08:15",
            type: "received",
          },
        ],
      },
    ],
  },
  {
    id: "7",
    name: "David Brown",
    number: "@davidb",
    channel: "telegram",
    instance: "Support",
    preview: "Issue resolved, thank you!",
    time: "Yesterday",
    unread: 0,
    status: "read",
    isOutbound: true,
    messages: [
      {
        date: "Yesterday",
        messages: [
          {
            id: "7-1",
            text: "The bug has been fixed in version 2.3.1",
            time: "16:00",
            type: "sent",
            status: "read",
            senderInitials: "DB",
            senderColor: "#0891b2",
          },
          {
            id: "7-2",
            text: "Issue resolved, thank you!",
            time: "16:30",
            type: "received",
            reactions: [{ emoji: "👍" }],
          },
        ],
      },
    ],
  },
];

// Unassigned chats
export const unassignedChats: ChatWithMessages[] = [
  {
    id: "4",
    name: "+1444555666",
    number: "+1444555666",
    channel: "whatsapp",
    instance: "Sales Team",
    preview: "Hello, I need some information",
    time: "11:20",
    unread: 1,
    messages: [
      {
        date: "Today",
        messages: [
          {
            id: "4-1",
            text: "Hello, I need some information",
            time: "11:20",
            type: "received",
          },
        ],
      },
    ],
  },
  {
    id: "5",
    name: "+1777888999",
    number: "+1777888999",
    channel: "whatsapp",
    instance: "Support",
    preview: "Audio message",
    time: "10:55",
    unread: 1,
    messages: [
      {
        date: "Today",
        messages: [
          {
            id: "5-1",
            text: "Audio message",
            time: "10:55",
            type: "received",
          },
        ],
      },
    ],
  },
  {
    id: "8",
    name: "+1222333444",
    number: "+1222333444",
    channel: "whatsapp",
    instance: "Sales Team",
    preview: "Can someone help me?",
    time: "10:30",
    unread: 3,
    messages: [
      {
        date: "Today",
        messages: [
          {
            id: "8-1",
            text: "Hi there!",
            time: "10:00",
            type: "received",
          },
          {
            id: "8-2",
            text: "I have a question about pricing",
            time: "10:15",
            type: "received",
          },
          {
            id: "8-3",
            text: "Can someone help me?",
            time: "10:30",
            type: "received",
          },
        ],
      },
    ],
  },
  {
    id: "9",
    name: "@newuser123",
    number: "@newuser123",
    channel: "telegram",
    instance: "Support",
    preview: "Is this the right channel for support?",
    time: "09:45",
    unread: 1,
    messages: [
      {
        date: "Today",
        messages: [
          {
            id: "9-1",
            text: "Is this the right channel for support?",
            time: "09:45",
            type: "received",
          },
        ],
      },
    ],
  },
];

// Helper to get messages for a chat
export function getMessagesForChat(chatId: string): DateGroup[] {
  const allChats = [...assignedChats, ...unassignedChats];
  const chat = allChats.find((c) => c.id === chatId);
  return chat?.messages || [];
}
