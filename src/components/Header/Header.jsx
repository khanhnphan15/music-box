import {Header, Segment, Image, Icon} from "semantic-ui-react";
import {Link} from "react-router-dom";
import './Header.css'; // Import the CSS file

export default function PageHeader({user, handleLogout}) {

    return (

        <Segment clearing className="main-header">
            <Header as="h1" floated="left">
                Music Box .
            </Header>
            <Header className="header-title" as="h2" floated="right">
                <Link to="/" className="black-text">
                    <Icon name="home"/>
                </Link>
                <Link to="/songs" className="black-text">
                    <span>Songs</span>
                </Link>
                <Link to="" onClick={handleLogout} className="black-text">
                    <span>Logout</span>
                </Link>
                {user && (
                    <Header as="h2" floated="left">
                        <Link to={`/${user?.username}`}>
                            <Image
                                src={
                                    user?.photoUrl
                                        ? user?.photoUrl
                                        : "https://react.semantic-ui.com/images/wireframe/square-image.png"
                                }
                                avatar
                            />
                        </Link>
                    </Header>
                )}
            </Header>
        </Segment>
    );
}
