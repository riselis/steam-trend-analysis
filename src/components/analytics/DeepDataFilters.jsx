import { useState, useEffect } from "react";
import { Box, TextField, Autocomplete, Chip, Paper } from "@mui/material";
import { getGenres } from "../../api/mockApi";
import "./DeepDataFilters.css";

function DeepDataFilters({ onFilterChange }) {
  const [tags, setTags] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [wishlistMin, setWishlistMin] = useState(0);
  const [wishlistMax, setWishlistMax] = useState(1000000);
  const [revenueMin, setRevenueMin] = useState(0);
  const [revenueMax, setRevenueMax] = useState(10000000);
  const [reviewsMin, setReviewsMin] = useState(0);
  const [reviewsMax, setReviewsMax] = useState(100000);

  const getDefaultStartDate = () => {
    const date = new Date();
    date.setMonth(date.getMonth() - 6);
    return date.toISOString().split("T")[0];
  };

  const getDefaultEndDate = () => {
    return new Date().toISOString().split("T")[0];
  };

  const [startdate, setStartdate] = useState(getDefaultStartDate());
  const [enddate, setEnddate] = useState(getDefaultEndDate());

  useEffect(() => {
    loadTags();
  }, []);

  useEffect(() => {
    const filters = {
      tags,
      wishlistMin: Number(wishlistMin) || 0,
      wishlistMax: Number(wishlistMax) || 1000000,
      revenueMin: Number(revenueMin) || 0,
      revenueMax: Number(revenueMax) || 10000000,
      reviewsMin: Number(reviewsMin) || 0,
      reviewsMax: Number(reviewsMax) || 100000,
      startdate,
      enddate,
    };
    onFilterChange(filters);
  }, [
    tags,
    wishlistMin,
    wishlistMax,
    revenueMin,
    revenueMax,
    reviewsMin,
    reviewsMax,
    startdate,
    enddate,
  ]);

  const loadTags = async () => {
    try {
      const result = await getGenres();
      if (result.success) {
        setAvailableTags(result.genres);
      }
    } catch (error) {
      // Error handling
    }
  };

  return (
    <Paper className="deep-data-filters" elevation={0}>
      <Box className="filters-grid">
        <Box className="filter-group">
          <Autocomplete
            multiple
            options={availableTags}
            value={tags}
            onChange={(event, newValue) => setTags(newValue)}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  {...getTagProps({ index })}
                  key={option}
                  label={option}
                  size="small"
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Tags (Genres)"
                placeholder="Select genres"
              />
            )}
            className="filter-autocomplete"
          />
        </Box>

        <Box className="filter-group">
          <TextField
            label="Wishlist Min"
            type="number"
            value={wishlistMin}
            onChange={(e) => setWishlistMin(e.target.value)}
            fullWidth
            inputProps={{ min: 0 }}
          />
        </Box>

        <Box className="filter-group">
          <TextField
            label="Wishlist Max"
            type="number"
            value={wishlistMax}
            onChange={(e) => setWishlistMax(e.target.value)}
            fullWidth
            inputProps={{ min: 0 }}
          />
        </Box>

        <Box className="filter-group">
          <TextField
            label="Revenue Min"
            type="number"
            value={revenueMin}
            onChange={(e) => setRevenueMin(e.target.value)}
            fullWidth
            inputProps={{ min: 0 }}
          />
        </Box>

        <Box className="filter-group">
          <TextField
            label="Revenue Max"
            type="number"
            value={revenueMax}
            onChange={(e) => setRevenueMax(e.target.value)}
            fullWidth
            inputProps={{ min: 0 }}
          />
        </Box>

        <Box className="filter-group">
          <TextField
            label="Reviews Min"
            type="number"
            value={reviewsMin}
            onChange={(e) => setReviewsMin(e.target.value)}
            fullWidth
            inputProps={{ min: 0 }}
          />
        </Box>

        <Box className="filter-group">
          <TextField
            label="Reviews Max"
            type="number"
            value={reviewsMax}
            onChange={(e) => setReviewsMax(e.target.value)}
            fullWidth
            inputProps={{ min: 0 }}
          />
        </Box>

        <Box className="filter-group">
          <TextField
            label="Start Date"
            type="date"
            value={startdate}
            onChange={(e) => setStartdate(e.target.value)}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>

        <Box className="filter-group">
          <TextField
            label="End Date"
            type="date"
            value={enddate}
            onChange={(e) => setEnddate(e.target.value)}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
      </Box>
    </Paper>
  );
}

export default DeepDataFilters;
