import React, { useEffect } from "react";
import { Grid, Header, Image, Segment, Message, Button } from "semantic-ui-react";
import { Link, useNavigate } from "react-router-dom";
import userService from "../../utils/userService";

export default function LogoutPage({ handleLogout }) {
    const navigate = useNavigate();

    useEffect(() => {
        // Call the logout function when the component mounts
        handleLogout();
        navigate("/login"); // Redirect to the login page after logging out
    }, [handleLogout, navigate]);

    return (
        <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as="h2" color="purple" textAlign="center">
                    <Image src="https://i.imgur.com/TM4eA5g.jpg" /> Logout
                </Header>
                <Segment stacked>
                    <Message>You have been successfully logged out.</Message>
                    <Button as={Link} to="/login" className="logout-button">
                        Login
                    </Button>
                </Segment>
            </Grid.Column>
        </Grid>
    );
}
