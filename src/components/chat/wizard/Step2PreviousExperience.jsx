import { useState } from "react";
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Box,
  Typography,
  FormGroup,
} from "@mui/material";

const platforms = ["PC", "Mobile", "Console", "Web", "Steam", "Itch.io"];
const genres = [
  "Action",
  "RPG",
  "Strategy",
  "Puzzle",
  "Platformer",
  "Shooter",
  "Simulation",
  "Sports",
  "Racing",
  "Other",
];

function Step2PreviousExperience({ data, onUpdate, onNext, onPrevious }) {
  const [releasedGamesCount, setReleasedGamesCount] = useState(
    data.releasedGamesCount || ""
  );

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

  const showAdditionalFields =
    releasedGamesCount !== "" && parseInt(releasedGamesCount) > 0;

  return (
    <Box className="wizard-step">
      <Typography variant="h6" className="step-title">
        Previous Experience
      </Typography>
      <Typography variant="body2" className="step-description">
        Share your team's previous game development experience.
      </Typography>

      <Box className="step-fields" sx={{ mt: 3 }}>
        <TextField
          label="Number of Released Games"
          type="number"
          inputProps={{ min: 0 }}
          value={releasedGamesCount}
          onChange={(e) => {
            const value = e.target.value;
            setReleasedGamesCount(value);
            handleChange("releasedGamesCount", value);
          }}
          placeholder="0"
          fullWidth
          autoComplete="off"
          sx={{ mb: 3 }}
        />

        {showAdditionalFields && (
          <>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Release Platforms
            </Typography>
            <FormGroup sx={{ mb: 3 }}>
              {platforms.map((platform) => (
                <FormControlLabel
                  key={platform}
                  control={
                    <Checkbox
                      checked={(data.releasePlatforms || []).includes(platform)}
                      onChange={(e) =>
                        handleCheckboxChange(
                          "releasePlatforms",
                          platform,
                          e.target.checked
                        )
                      }
                    />
                  }
                  label={platform}
                />
              ))}
            </FormGroup>

            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Genres Released
            </Typography>
            <FormGroup sx={{ mb: 3 }}>
              {genres.map((genre) => (
                <FormControlLabel
                  key={genre}
                  control={
                    <Checkbox
                      checked={(data.genresReleased || []).includes(genre)}
                      onChange={(e) =>
                        handleCheckboxChange(
                          "genresReleased",
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

            <TextField
              label="Previous Project Problems"
              multiline
              rows={4}
              value={data.previousProjectProblems || ""}
              onChange={(e) =>
                handleChange("previousProjectProblems", e.target.value)
              }
              placeholder="Describe any challenges or problems encountered in previous projects..."
              fullWidth
              autoComplete="off"
            />
          </>
        )}
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

export default Step2PreviousExperience;
