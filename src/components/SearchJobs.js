import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container, Grid, Paper, styled } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Navbar from "./Navbar";
import "../css/SearchJob.css";

export default function SearchJobs() {
  const [jobListings, setJobListings] = useState([]);
  const [filteredJobListings, setFilteredJobListings] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({});

  useEffect(() => {
    // Fetch job listings when component mounts

    fetchJobListings();
  }, []);

  const fetchJobListings = async () => {
    try {
      const listings = await fetch(
        `https://api.weekday.technology/adhoc/getSampleJdJSON`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ limit: 10, offset: 0 }),
        }
      );

      setJobListings(listings);
      setFilteredJobListings(listings);

    } catch (error) {
      console.error("Error fetching job listings:", error);
    }
  };

  // const handleFilterChange = (filters) => {
  //   setSelectedFilters(filters);
  //   filterJobListings(filters);
  // };

  // const filterJobListings = (filters) => {
  //   const filtered = jobListings.filter((job) => {
  //     return Object.keys(filters).every((key) => {
  //       if (!filters[key]) return true; // If filter is not selected, include the job
  //       return job[key] === filters[key];
  //     });
  //   });
  //   setFilteredJobListings(filtered);
  // };

  // const Item = styled(Paper)(() => ({
  //   backgroundColor: "#98d6a9",
  //   padding: 8,
  //   textAlign: "center",
  //   color: "black",
  // }));

  const bull = (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
      •
    </Box>
  );

  return (
    <div className="container">
      <Navbar />
      <Container sx={{ paddingTop: "20px" }}>
        <Grid container spacing={1}>
          <Grid item xs={6} md={4} lg={1.7}>
            <Box>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Min Experience
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Min Experience"
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={6} md={4} lg={1.7}>
            <Box>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Company name
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Age"
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={6} md={4} lg={1.7}>
            <Box>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Location</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Age"
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={6} md={4} lg={1.7}>
            <Box>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Remote/on-site
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Age"
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={6} md={4} lg={1.7}>
            <Box>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Tech stack
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Age"
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={6} md={4} lg={1.7}>
            <Box>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Age"
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={6} md={4} lg={1.7}>
            <Box>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Min base pay
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Age"
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={3} padding="10px">
          {jobListings.length > 0 &&
            jobListings.map((job) => (
              <Grid item xs={6} md={4} lg={4}>
                <Card sx={{ maxWidth: 350 }}>
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      Word of the Day
                    </Typography>
                    <Typography variant="h5" component="div">
                      be{bull}nev{bull}o{bull}lent
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      adjective
                    </Typography>
                    <Typography variant="body2">
                      well meaning and kindly.
                      <br />
                      {'"a benevolent smile"'}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Box width="100%">
                      <Box width="100%">
                        <Button
                          variant="contained"
                          fullWidth
                          sx={{ backgroundColor: "#33FFFF", color: "black" }}
                        >
                          <img
                            src="https://freesvg.org/img/lightning.png"
                            style={{ height: "25px", width: "25px" }}
                          />
                          Easy Apply
                        </Button>
                      </Box>
                      <Box width="100%" mt={1}>
                        {" "}
                        {/* Add margin top for spacing */}
                        <Button variant="contained" color="primary" fullWidth>
                          Unlock Referrals
                        </Button>
                      </Box>
                    </Box>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          <div style={{ padding: "50px" }} hidden={jobListings.length > 0}>
            Sorry! No Jobs Found
          </div>
        </Grid>
      </Container>
    </div>
  );
}
