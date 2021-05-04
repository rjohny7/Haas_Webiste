import { CardContent, CardMedia } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import "./Home.css";

// Home page code
function Home() {
  return (
    <>
      <div className="home">
        {/* Cards for displaying information and paragraphs. Welcoming message and some sample text as well */}
        <Card className="layout">
          <CardContent className="text">
            <Typography className="heading" variant={"h5"}>
              Welcome to our Website!
            </Typography>
            <Typography className="body" variant={"body1"}>
              Please log in or sign up at the top right or by clicking
              <Link to="/login"> here</Link>
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography className="hardware-header" variant={"h5"}>
              Hardware Resources
            </Typography>
            <Typography className="hardware" variant={"body1"}>
            You can view our hardware resources in the 'Our Hardware' tab. 
            After signing in, you can checkout or checkin resources in the 'Computing Resources' tab. 
            10 free credits will be awarded to your account upon signing up. 
            Each credit gives you access to one hardware unit. 
            Credits are returned upon checking in units. 
            Note that you cannot check out more units than are available in each hardware set.
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant={"h5"}>
              Projects
            </Typography>
            <Typography variant={"body1"}>
            You can create projects or manage existing ones by navigating to the 'Create or Manage Projects' tab. 
            Here, you can create a project by entering a name, unique ID, and project description and clicking on 'Create Project'. 
            In order to view an existing project, enter its unique ID and click 'View Project.'
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant={"h5"}>
              Datasets
            </Typography>
            <Typography variant={"body1"}>
            You can acess and download datasets by navigating to the 'Downloads' tab. 
            Here, you can view all the datasets that are avialable along with their descriptions. 
            Clicking on a dataset will download it as a zip file to your computer.
            </Typography>
            
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default Home;
