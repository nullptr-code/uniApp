import React from "react";
import { Progress, Card, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

const ProgressCard = (props) => {
    {
    const { title, children, active, index, onClick } = props;
    console.log(props,"props")
    }
    return (
        <Card align="left" width={10}>
            <Card.Content>
                <Card.Header>Application Progress</Card.Header>
            </Card.Content>

            <Card.Content>
                <Progress percent="90" indicating progress label="Personal Info" />
                <Progress percent="20" indicating progress label="Family Info" />
                <Progress percent="60" indicating progress label="Academic Info" />
            </Card.Content>
            <Button as={Link} to="/student/application" basic>
                Fill Application
            </Button>
        </Card>
    );
};

export default ProgressCard;
