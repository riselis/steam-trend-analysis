import {
  Autocomplete,
  TextField,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Button,
  Box,
  Typography,
} from "@mui/material";

const dimensions = ["2D", "2.5D", "3D"];
const engines = [
  "Unity",
  "Unreal Engine",
  "Godot",
  "GameMaker",
  "Construct",
  "Custom Engine",
  "Other",
];

function Step3TechnicalScope({ data, onUpdate, onNext, onPrevious }) {
  const handleChange = (field, value) => {
    onUpdate({ [field]: value });
  };

  return (
    <Box className="wizard-step">
      <Typography variant="h6" className="step-title">
        Technical Scope
      </Typography>
      <Typography variant="body2" className="step-description">
        Define the technical requirements for your project.
      </Typography>

      <Box className="step-fields" sx={{ mt: 3 }}>
        <Autocomplete
          multiple
          options={dimensions}
          value={data.gameDimension || []}
          onChange={(event, newValue) => {
            handleChange("gameDimension", newValue);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Game Dimension" autoComplete="off" />
          )}
          sx={{ mb: 3 }}
        />

        <Autocomplete
          multiple
          options={engines}
          value={data.gameEngine || []}
          onChange={(event, newValue) => {
            handleChange("gameEngine", newValue);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Game Engine" autoComplete="off" />
          )}
          sx={{ mb: 3 }}
        />

        <FormControl sx={{ mb: 3 }}>
          <FormLabel>Game Mode</FormLabel>
          <RadioGroup
            row
            value={data.gameMode || ""}
            onChange={(e) => handleChange("gameMode", e.target.value)}
          >
            <FormControlLabel
              value="singleplayer"
              control={<Radio />}
              label="Singleplayer"
            />
            <FormControlLabel
              value="multiplayer"
              control={<Radio />}
              label="Multiplayer"
            />
          </RadioGroup>
        </FormControl>

        <Typography variant="body2" sx={{ mb: 1, color: "text.secondary" }}>
          Includes servers, matchmaking, accounts, live ops, or real-time
          features
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={data.onlineSystemRequired || false}
              onChange={(e) =>
                handleChange("onlineSystemRequired", e.target.checked)
              }
            />
          }
          label="Online System Required"
        />
      </Box>

      <Box
        className="wizard-actions"
        sx={{ mt: 4, pt: 3, borderTop: 1, borderColor: "divider" }}
      >
        <Button variant="outlined" onClick={onPrevious}>
          Previous
        </Button>
        <Button variant="contained" onClick={onNext}>
          Next
        </Button>
      </Box>
    </Box>
  );
}

export default Step3TechnicalScope;
