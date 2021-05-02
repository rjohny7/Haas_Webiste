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
      </div>
    </>
  );
}

export default Home;
