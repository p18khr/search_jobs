import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardActionArea, Container, Grid, Paper, styled } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Navbar from "./Navbar";
import "../css/SearchJob.css";

export default function SearchJobs() {
  const [jobListings, setJobListings] = useState([]);
  const [filteredJobListings, setFilteredJobListings] = useState([]);
  const [uniqueRoles, setUniqueRoles] = useState([]);
  const [uniqueLocation, setUniqueLocation] = useState([]);
  const [uniqueCompany, setUniqueCompany] = useState([]);
  const [filters, setFilters] = useState({
    minExperience: "",
    companyName: "",
    location: "",
    remoteOnSite: "",
    techStack: "",
    role: "",
    minBasePay: "",
  });
  

  const fetchJobListings = async () => {
    const listings = await fetch(
      `https://api.weekday.technology/adhoc/getSampleJdJSON`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ limit: 100, offset: 0 }),
      }
    );
    const json = await listings.json();

    setJobListings(json.jdList);
    setFilteredJobListings(json.jdList);

    removeDuplicatesRole();
    removeDuplicatesLocation();
    removeDuplicatesCompany();
  };

  const removeDuplicatesLocation = () => {
    const uniqueSet = new Set();
    const uniqueArray = jobListings.filter(obj => {
      const isDuplicate = uniqueSet.has(obj.location);
      uniqueSet.add(obj.location);
      return !isDuplicate;
    });
    setUniqueLocation(uniqueArray);
  };

  const removeDuplicatesCompany = () => {
    const uniqueSet = new Set();
    const uniqueArray = jobListings.filter(obj => {
      const isDuplicate = uniqueSet.has(obj.companyName);
      uniqueSet.add(obj.companyName);
      return !isDuplicate;
    });
    setUniqueCompany(uniqueArray);
  };

  const removeDuplicatesRole = () => {
    const uniqueSet = new Set();
    const uniqueArray = jobListings.filter(obj => {
      const isDuplicate = uniqueSet.has(obj.jobRole);
      uniqueSet.add(obj.jobRole);
      return !isDuplicate;
    });
    setUniqueRoles(uniqueArray);
  };

  useEffect(() => {
    // Fetch job listings when component mounts
    
    fetchJobListings();
  });


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));

    handleSubmit();
  };

  const handleSubmit = () => {
    const filteredList = jobListings.filter(job => {
      for (let key in filters) {
        if (filters[key] && job[key] !== filters[key]) {
          return false;
        }
      }
      return true;
    });
    console.log(filteredList);
    setFilteredJobListings(filteredList);
  };


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
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={6}>6</MenuItem>
                  <MenuItem value={7}>7</MenuItem>
                  <MenuItem value={8}>8</MenuItem>
                  <MenuItem value={9}>9</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
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
                  label="companyName"
                  onChange={handleChange}
                >
                  {uniqueCompany.map((job) => (
                    <MenuItem value={job.companyName}>{job.companyName}</MenuItem>
                  ))}

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
                  label="location"
                  onChange={handleChange}
                >
                  {uniqueLocation.map((job) => (
                    <MenuItem value={job.location}>{job.location}</MenuItem>
                  ))}
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
                  label="Remote/on-site"
                  onChange={handleChange}

                >
                  <MenuItem value={"Remote"}>Remote</MenuItem>
                  <MenuItem value={"On-Site"}>On-Site</MenuItem>
                  <MenuItem value={"Hybrid"}>Hybrid</MenuItem>
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
                  label="TechStack"
                  onChange={handleChange}
                >
                  <MenuItem value={"Python"}>Python</MenuItem>
                  <MenuItem value={"Java"}>Java</MenuItem>
                  <MenuItem value={"Golang"}>Golang</MenuItem>
                  <MenuItem value={"Ruby/Rails"}>Ruby/Rails</MenuItem>
                  <MenuItem value={"C++"}>C++</MenuItem>
                  <MenuItem value={"Kotlin"}>Kotlin</MenuItem>
                  <MenuItem value={"Django"}>Django</MenuItem>
                  <MenuItem value={"C#"}>C#</MenuItem>
                  <MenuItem value={"GraphQL"}>GraphQL</MenuItem>
                  <MenuItem value={"Flask"}>Flask</MenuItem>
                  <MenuItem value={"TypeScript"}>TypeScript</MenuItem>
                  <MenuItem value={"AWS"}>AWS</MenuItem>
                  <MenuItem value={"JavaScript"}>JavaScript</MenuItem>
                  <MenuItem value={"Rust"}>Rust</MenuItem>
                  <MenuItem value={"NodeJs"}>NodeJs</MenuItem>
                  <MenuItem value={"React"}>React</MenuItem>
                  
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
                  label="Role"
                  onChange={handleChange}
                >
                  {uniqueRoles.map((job) => (
                    <MenuItem value={job.jobRole}>{job.jobRole}</MenuItem>
                  ))}
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
                  label="MinBasePay"
                  onChange={handleChange}
                >
                  <MenuItem value={10}>10L</MenuItem>
                  <MenuItem value={20}>20L</MenuItem>
                  <MenuItem value={30}>30L</MenuItem>
                  <MenuItem value={40}>40L</MenuItem>
                  <MenuItem value={50}>50L</MenuItem>
                  <MenuItem value={60}>60L</MenuItem>
                  <MenuItem value={70}>70L</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={3} padding="10px">
          {filteredJobListings.length > 0 &&
            filteredJobListings.map((job) => (
              <Grid item xs={6} md={4} lg={4}>
                <Card sx={{ maxWidth: 350, minHeight: 700, maxHeight: 700 }}>
                  <CardContent>
                    <Grid container>
                      <Grid
                        item
                        sx={{ textAlign: "left" }}
                        xs={0.5}
                        md={0.5}
                        lg={0.5}
                      >
                        <img
                          src={job.logoUrl}
                          alt="company-logo"
                          style={{ height: "50px", width: "30px" }}
                        />
                      </Grid>
                      <Grid item xs={11.5} md={11.5} lg={11.5}>
                        <div
                          hidden={job.companyName === null}
                          style={{
                            color: "Grey",
                            fontSize: 14,
                            padding: "2px",
                          }}
                        >
                          {job.companyName}
                        </div>
                        <div
                          hidden={job.jobRole === null}
                          style={{ fontSize: 16, padding: "2px" }}
                        >
                          {job.jobRole}
                        </div>
                        <div
                          hidden={job.location === null}
                          style={{ fontSize: 12, padding: "2px" }}
                        >
                          {job.location}&nbsp;
                          <span
                            hidden={job.minExp === null && job.maxExp === null}
                          >
                            | Exp: {job.minExp} - {job.maxExp}
                          </span>
                        </div>
                      </Grid>
                    </Grid>

                    <Typography
                      variant="h5"
                      component="div"
                      sx={{ fontSize: 16, padding: "2px" }}
                    >
                      <span
                        hidden={
                          job.salaryCurrencyCode !== "USD" ||
                          job.minJdSalary === null
                        }
                      >
                        Estimated Salary :&nbsp;&#x24;&nbsp;{job.minJdSalary} -{" "}
                        {job.maxJdSalary} k
                      </span>
                      <span
                        hidden={
                          job.salaryCurrencyCode === "USD" ||
                          job.minJdSalary === null
                        }
                      >
                        Estimated Salary :&nbsp;&#8377;&nbsp;{job.minJdSalary} -{" "}
                        {job.maxJdSalary} lpa
                      </span>
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 16,
                        padding: "2px",
                        fontWeight: "bold",
                        mb: 1.5,
                      }}
                    >
                      About Company :
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 13,
                        padding: "2px",
                        fontWeight: "bold",
                        mb: 1.5,
                      }}
                    >
                      About us :
                    </Typography>
                    <Typography sx={{ fontSize: 13, padding: "2px", mb: 1.5 }}>
                      {job.jobDetailsFromCompany}
                    </Typography>

                    <Typography
                      variant="body2"
                      hidden={job.minExp === null}
                      sx={{
                        fontSize: 13,
                        padding: "5px",
                        fontWeight: "bold",
                        mb: 1.5,
                      }}
                    >
                      Minimum Experience:
                      <br /> {job.minExp}
                    </Typography>
                  </CardContent>
                  <CardContent sx={{ marginTop: "auto" }}>
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
                            alt="thunder"
                          />
                          Easy Apply
                        </Button>
                      </Box>
                      <Box width="100%" mt={1}>
                        {" "}
                        {/* Add margin top for spacing */}
                        <Button variant="contained" color="primary" fullWidth>
                          <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR84JY6ZLxN2lrd0LQMzMq7-cyv7kkdYk49fCJLD_T8gw&s"
                            alt="random1"
                            style={{
                              height: "25px",
                              width: "25px",
                              borderRadius: "50px",
                            }}
                          />
                          &nbsp;
                          <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR84JY6ZLxN2lrd0LQMzMq7-cyv7kkdYk49fCJLD_T8gw&s"
                            alt="random1"
                            style={{
                              height: "25px",
                              width: "25px",
                              borderRadius: "50px",
                            }}
                          />
                          &nbsp; Unlock Referrals
                        </Button>
                      </Box>
                    </Box>
                  </CardContent>
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
