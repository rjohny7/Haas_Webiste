import { CardContent, CardMedia } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import './Home.css';
function Home() {
    return(
        <>
            <div className = "home">
                <Card className="layout">
                    <CardContent className="text">
                        <Typography
                            className="heading"
                            variant={"h5"}>
                            Welcome to our Website!
                        </Typography>
                        <Typography
                            className="body"
                            variant={"body1"}>
                            Lorem ipsum dolor sit amet, consectetur 
                            adipiscing elit. Vestibulum pulvinar lacinia 
                            dui, sit amet finibus purus rutrum ut. Morbi
                             iaculis finibus purus id convallis. Ut ac 
                             congue arcu. Nulla faucibus nisl et accumsan 
                             maximus. Fusce ultrices nisl vitae magna consequat 
                             semper. Pellentesque id accumsan dui, id ultricies 
                             magna. Cras tempus vehicula fermentum. Nam rhoncus 
                             imperdiet consectetur. Proin sit amet lacus semper, 
                             sagittis dui in, molestie augue.
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </>
    );   
}

export default Home;