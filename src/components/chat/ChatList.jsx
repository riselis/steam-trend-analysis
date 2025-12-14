import { useState, useEffect } from "react";
import {
  Button,
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  Paper,
} from "@mui/material";
import { chatStore } from "../../store/chatStore";

function ChatList({ onNewChat, onChatSelect }) {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const loadChats = () => {
      const allChats = chatStore.getAllChats();
      setChats(allChats);
    };

    loadChats();
    // Refresh chat list periodically
    const interval = setInterval(loadChats, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ maxWidth: 800, margin: "0 auto" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5">Chat Sessions</Typography>
        <Button variant="contained" onClick={onNewChat}>
          New Chat
        </Button>
      </Box>

      {chats.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            No chat sessions yet. Start a new analysis to begin.
          </Typography>
          <Button variant="contained" onClick={onNewChat}>
            Start New Analysis
          </Button>
        </Paper>
      ) : (
        <List>
          {chats.map((chat) => (
            <ListItem key={chat.responseId} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => onChatSelect(chat.responseId)}
                sx={{
                  backgroundColor: "background.paper",
                  borderRadius: 1,
                  border: 1,
                  borderColor: "divider",
                  "&:hover": {
                    backgroundColor: "action.hover",
                  },
                }}
              >
                <Box sx={{ width: "100%" }}>
                  <Typography variant="subtitle1">{chat.chatName}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(chat.createdAt).toLocaleString()}
                  </Typography>
                </Box>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}

export default ChatList;
