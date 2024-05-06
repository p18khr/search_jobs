import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container, Grid } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Navbar from "./Navbar";
import "../css/SearchJob.css";
import InfiniteScroll from "react-infinite-scroll-component";

export default function SearchJobs() {
  const [jobListings, setJobListings] = useState([]);
  const [filteredJobListings, setFilteredJobListings] = useState([]);
  const [uniqueRoles, setUniqueRoles] = useState([]);
  const [uniqueLocation, setUniqueLocation] = useState([]);
  const [uniqueCompany, setUniqueCompany] = useState([]);
  const [uniqueSalary, setUniqueSalary] = useState([]);
  const [filters, setFilters] = useState({
    minExp: "",
    companyName: "",
    location: "",
    techStack: "",
    jobRole: "",
    minJdSalary: "",
  });

  var [remoteOnSite,setRemoteOnSite] = useState("");

  const [shouldFilter, setShouldFilter] = useState(false);

  const fetchJobListings = async () => {
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
    const json = await listings.json();

    setJobListings(json.jdList);
    setFilteredJobListings(json.jdList);
  };

  const removeDuplicatesLocation = () => {
    const uniqueSet = new Set();
    const uniqueArray = jobListings.filter((obj) => {
      const isDuplicate = uniqueSet.has(obj.location);
      uniqueSet.add(obj.location);
      return !isDuplicate;
    });
    setUniqueLocation(uniqueArray);
  };

  const removeDuplicatesCompany = () => {
    const uniqueSet = new Set();
    const uniqueArray = jobListings.filter((obj) => {
      const isDuplicate = uniqueSet.has(obj.companyName);
      uniqueSet.add(obj.companyName);
      return !isDuplicate;
    });
    setUniqueCompany(uniqueArray);
  };

  const removeDuplicatesRole = () => {
    const uniqueSet = new Set();
    const uniqueArray = jobListings.filter((obj) => {
      const isDuplicate = uniqueSet.has(obj.jobRole);
      uniqueSet.add(obj.jobRole);
      return !isDuplicate;
    });
    setUniqueRoles(uniqueArray);
  };

  const removeDuplicatesMinSalary = () => {
    const uniqueSet = new Set();
    const uniqueArray = jobListings.filter((obj) => {
      const isDuplicate = uniqueSet.has(obj.minJdSalary);
      uniqueSet.add(obj.minJdSalary);
      return !isDuplicate;
    });
    setUniqueSalary(uniqueArray);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
    setShouldFilter(true);
  };

  const handleSubmit = () => {
    var filteredList = jobListings.filter((job) => {
      for (let key in filters) {
        if (filters[key] && job[key] !== filters[key]) {
          return false;
        }
      }
      return true;
    });
    
    setFilteredJobListings(filteredList);
  };

  const handleRemote =()=>{
    const filtered = jobListings.filter((job) => {
      if (remoteOnSite === "remote" && job.location === "remote") {
        return true; // Show all job listings if no filter is selected
      } else if (remoteOnSite === "onsite" && job.location !== "remote") {
        return true;
      } else {
       return false;
      }
    });
    setFilteredJobListings(filtered);
  }


  useEffect(() => {
    // Fetch job listings when component mounts
    fetchJobListings();
  }, []);

  useEffect(() => {
    if (shouldFilter) {
      handleSubmit();
      setShouldFilter(false); // Reset the flag after filtering
    }
  }, [filters]);

  useEffect(() => {
    handleRemote();
  }, [remoteOnSite]);


  useEffect(() => {
    removeDuplicatesCompany();
    removeDuplicatesLocation();
    removeDuplicatesRole();
    removeDuplicatesMinSalary();
  });

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
                  name="minExp"
                  label="Min Experience"
                  onChange={handleChange}
                  value={filters.minExp}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((exp) => (
                    <MenuItem key={exp} value={exp}>
                      {exp}
                    </MenuItem>
                  ))}
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
                  name="companyName"
                  label="companyName"
                  onChange={handleChange}
                  value={filters.companyName}
                >
                  {uniqueCompany.map((job) => (
                    <MenuItem value={job.companyName} key={job.jdUid}>
                      {job.companyName}
                    </MenuItem>
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
                  name="location"
                  label="location"
                  onChange={handleChange}
                  value={filters.location}
                >
                  {uniqueLocation.map((job) => (
                    <MenuItem value={job.location} key={job.jdUid}>
                      {job.location}
                    </MenuItem>
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
                  name="remoteOnSite"
                  label="remoteOnSite"
                  onChange={(e)=>{setRemoteOnSite(e.target.value);}}
                  value={remoteOnSite}
                >
                  <MenuItem value="remote" key="remote">
                    Remote
                  </MenuItem>
                  <MenuItem value="onsite" key="onsite ">
                    On-Site
                  </MenuItem>
                  {/* <MenuItem value={"Hybrid"} key="hybrid">
                    Hybrid
                  </MenuItem> */}
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
                  name="techStack"
                  label="techStack"
                  onChange={handleChange}
                  value={filters.techStack}
                >
                  <MenuItem value={"Python"} key="python">
                    Python
                  </MenuItem>
                  <MenuItem value={"Java"} key="Java">
                    Java
                  </MenuItem>
                  <MenuItem value={"Golang"} key="golang">
                    Golang
                  </MenuItem>
                  <MenuItem value={"Ruby/Rails"} key="rubyRails">
                    Ruby/Rails
                  </MenuItem>
                  <MenuItem value={"C++"} key="c++">
                    C++
                  </MenuItem>
                  <MenuItem value={"Kotlin"} key="kotlin">
                    Kotlin
                  </MenuItem>
                  <MenuItem value={"Django"} key="django">
                    Django
                  </MenuItem>
                  <MenuItem value={"C#"} key="c#">
                    C#
                  </MenuItem>
                  <MenuItem value={"GraphQL"} key="graphql">
                    GraphQL
                  </MenuItem>
                  <MenuItem value={"Flask"} key="flask">
                    Flask
                  </MenuItem>
                  <MenuItem value={"TypeScript"} key="typescript">
                    TypeScript
                  </MenuItem>
                  <MenuItem value={"AWS"} key="aws">
                    AWS
                  </MenuItem>
                  <MenuItem value={"JavaScript"} key="javascript">
                    JavaScript
                  </MenuItem>
                  <MenuItem value={"Rust"} key="rust">
                    Rust
                  </MenuItem>
                  <MenuItem value={"NodeJs"} key="nodejs">
                    NodeJs
                  </MenuItem>
                  <MenuItem value={"React"} key="react">
                    React
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={6} md={4} lg={1.7}>
            <Box>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Job Role</InputLabel>
                <Select
                  name="jobRole"
                  label="jobRole"
                  onChange={handleChange}
                  value={filters.jobRole}
                >
                  {uniqueRoles.map((job) => (
                    <MenuItem value={job.jobRole} key={job.jdUid}>
                      {job.jobRole}
                    </MenuItem>
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
                  name="minJdSalary"
                  label="minJdSalary"
                  onChange={handleChange}
                  value={filters.minJdSalary}
                >
                  {uniqueSalary.map((job) => (
                    <MenuItem value={job.minJdSalary} key={job.jdUid}>
                      {job.minJdSalary}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>
        </Grid>
        <InfiniteScroll
        dataLength={jobListings.length}
        next={fetchJobListings}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        >
        <Grid container spacing={3} padding="10px">
          {filteredJobListings.length > 0 &&
            filteredJobListings.map((job) => (
              <Grid key={job.jdUid} item xs={6} md={4} lg={4}>
                <Card sx={{ maxWidth: 350, minHeight: 650, maxHeight: 650 }}>
                  <CardContent>
                    <Grid container>
                      <Grid
                        item
                        sx={{ textAlign: "left" }}
                        xs={2}
                        md={2}
                        lg={2}
                      >
                        <img
                          src={job.logoUrl}
                          alt="company-logo"
                          style={{ height: "50px", width: "30px" }}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={10}
                        md={10}
                        lg={10}
                        sx={{ paddingRight: "30%" }}
                      >
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
                      sx={{
                        fontSize: 16,
                        padding: "10px 10px 10px 0",
                        textAlign: "left",
                      }}
                    >
                      <span
                        hidden={
                          job.salaryCurrencyCode !== "USD" ||
                          job.minJdSalary === null
                        }
                      >
                        Estimated Salary :&nbsp;&#x24;&nbsp;{job.minJdSalary} -{" "}
                        {job.maxJdSalary} k{" "}
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQByn59sVAEeVrxelC5fH3W4wWq9dPUICfgx_PoI1Xu_w&s"
                          alt=""
                          style={{ height: "15px", width: "15px" }}
                        />
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
                        textAlign: "left",
                        fontWeight: "bold",
                        mb: 1.5,
                      }}
                    >
                      About Company :
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 13,
                        fontWeight: "bold",
                        mb: 1.5,
                        textAlign: "left",
                      }}
                    >
                      About us :
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 13,
                        mb: 1.5,
                        maxHeight: "200px",
                        overflow: "hidden",
                        textAlign: "left",
                      }}
                    >
                      {job.jobDetailsFromCompany}
                    </Typography>
                    <Button>View Job</Button>
                    <Typography
                      variant="body2"
                      hidden={job.minExp !== null}
                      sx={{
                        fontSize: 13,
                        padding: "25px",
                        fontWeight: "bold",
                        mb: 1.5,
                        textAlign: "left",
                      }}
                    ></Typography>
                    <Typography
                      variant="body2"
                      hidden={job.minExp === null}
                      sx={{
                        fontSize: 13,
                        padding: "5px",
                        fontWeight: "bold",
                        mb: 1.5,
                        textAlign: "left",
                      }}
                    >
                      Minimum Experience:
                      <br /> {job.minExp}
                    </Typography>
                  </CardContent>
                  <CardContent sx={{ paddingBottom: 0 }}>
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
          <div
            style={{ padding: "50px" }}
            hidden={filteredJobListings.length > 0}
          >
            Sorry! No Jobs Found
          </div>
        </Grid>
        </InfiniteScroll>
      </Container>
    </div>
  );
}
