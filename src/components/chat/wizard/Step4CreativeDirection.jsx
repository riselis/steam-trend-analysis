import {
  Autocomplete,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Box,
  Typography,
  FormGroup,
  MenuItem,
} from "@mui/material";

const genres = [
  "Action",
  "Adventure",
  "RPG",
  "Strategy",
  "Simulation",
  "Puzzle",
  "Platformer",
  "Racing",
  "Sports",
  "Horror",
  "Educational",
];

const themes = ["cozy", "horror", "strategy", "educational"];
const visualStyles = ["pixel art", "low-poly", "realistic"];

const artHeavyLevels = [
  { value: "minimal", label: "Minimal" },
  { value: "moderate", label: "Moderate" },
  { value: "heavy", label: "Heavy" },
  { value: "very-heavy", label: "Very Heavy" },
];

function Step4CreativeDirection({
  data,
  onUpdate,
  onNext,
  onPrevious,
  onSkip,
}) {
  const handleChange = (field, value) => {
    onUpdate({ [field]: value });
  };

  const handleCheckboxChange = (field, value, checked) => {
    const current = data[field] || [];
    if (checked) {
      onUpdate({ [field]: [...current, value] });
    } else {
      onUpdate({ [field]: current.filter((item) => item !== value) });
    }
  };

  return (
    <Box className="wizard-step">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6" className="step-title">
          Creative Direction
        </Typography>
        <Button variant="text" onClick={onSkip} sx={{ textTransform: "none" }}>
          Skip
        </Button>
      </Box>
      <Typography variant="body2" className="step-description">
        Define the creative vision and style for your game.
      </Typography>

      <Box className="step-fields" sx={{ mt: 3 }}>
        <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
          Preferred Genres
        </Typography>
        <FormGroup sx={{ mb: 3 }}>
          {genres.map((genre) => (
            <FormControlLabel
              key={genre}
              control={
                <Checkbox
                  checked={(data.preferredGenres || []).includes(genre)}
                  onChange={(e) =>
                    handleCheckboxChange(
                      "preferredGenres",
                      genre,
                      e.target.checked
                    )
                  }
                />
              }
              label={genre}
            />
          ))}
        </FormGroup>

        <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
          Theme Preferences
        </Typography>
        <FormGroup sx={{ mb: 3 }}>
          {themes.map((theme) => (
            <FormControlLabel
              key={theme}
              control={
                <Checkbox
                  checked={(data.themePreferences || []).includes(theme)}
                  onChange={(e) =>
                    handleCheckboxChange(
                      "themePreferences",
                      theme,
                      e.target.checked
                    )
                  }
                />
              }
              label={theme.charAt(0).toUpperCase() + theme.slice(1)}
            />
          ))}
        </FormGroup>

        <Autocomplete
          multiple
          options={visualStyles}
          value={data.visualStyle || []}
          onChange={(event, newValue) => {
            handleChange("visualStyle", newValue);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Visual Style" />
          )}
          sx={{ mb: 3 }}
        />

        <Autocomplete
          options={artHeavyLevels}
          getOptionLabel={(option) => option.label}
          value={
            artHeavyLevels.find(
              (level) => level.value === data.artHeavyLevel
            ) || null
          }
          onChange={(event, newValue) => {
            handleChange("artHeavyLevel", newValue ? newValue.value : "");
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Art Heavy Level"
              placeholder="Select level"
            />
          )}
          sx={{ mb: 3 }}
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

export default Step4CreativeDirection;
