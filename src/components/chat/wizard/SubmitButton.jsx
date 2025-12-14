import { useState, useEffect } from "react";
import { Button, Box } from "@mui/material";

const loadingTexts = [
  "Analyzing inputs...",
  "Evaluating constraints...",
  "Generating strategic insights...",
];

function SubmitButton({ onSubmit, disabled, formData }) {
  const [loading, setLoading] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [highlightPosition, setHighlightPosition] = useState(0);

  useEffect(() => {
    if (loading) {
      // Cycle through texts
      const textInterval = setInterval(() => {
        setCurrentTextIndex((prev) => (prev + 1) % loadingTexts.length);
        setHighlightPosition(0);
      }, 2000);

      // Animate highlight
      const highlightInterval = setInterval(() => {
        setHighlightPosition((prev) => {
          const text = loadingTexts[currentTextIndex];
          if (prev >= text.length * 10) {
            return 0;
          }
          return prev + 2;
        });
      }, 50);

      return () => {
        clearInterval(textInterval);
        clearInterval(highlightInterval);
      };
    } else {
      setCurrentTextIndex(0);
      setHighlightPosition(0);
    }
  }, [loading, currentTextIndex]);

  const handleClick = async () => {
    if (disabled || loading) return;
    setLoading(true);
    try {
      await onSubmit(formData);
      // Keep loading state - navigation will happen in parent component
    } catch (error) {
      console.error("Submit error:", error);
      setLoading(false);
    }
  };

  return (
    <Button
      variant="contained"
      onClick={handleClick}
      disabled={disabled || loading}
      sx={{
        position: "relative",
        overflow: "hidden",
        minWidth: 200,
      }}
    >
      {loading ? (
        <Box
          sx={{
            position: "relative",
            width: "100%",
            textAlign: "center",
          }}
        >
          <Box
            component="span"
            sx={{
              position: "relative",
              zIndex: 1,
            }}
          >
            {loadingTexts[currentTextIndex]}
          </Box>
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: `${highlightPosition}px`,
              width: "60px",
              height: "100%",
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
              transform: "skewX(-20deg)",
              transition: "left 0.05s linear",
            }}
          />
        </Box>
      ) : (
        "Submit"
      )}
    </Button>
  );
}

export default SubmitButton;

