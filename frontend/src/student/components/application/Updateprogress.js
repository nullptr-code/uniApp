import React from "react";
import server from "../../../server/server";
import { Progress, Card, Button, Icon, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default class UpdateProgress extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pcount: 0,
            fcount: 0,
            acount: 0,
        };
    }

    updatePersonalinfo = async () => {
        let data;
        let personalcount = 0;
        try {
            const response = await server.get(
                "/student/application/personalInfo"
            );
            data = response.data;
            //  console.log(data.gender,"gender")

            if (data.gender !== "") {
                personalcount = personalcount + 10;
                // console.log(data.gender,"gender")
            }
            if (data.name !== "") {
                personalcount = personalcount + 10;
            }
            if (data.email !== "") {
                personalcount = personalcount + 10;
            }
            if (data.phoneNumber !== "") {
                personalcount = personalcount + 10;
            }
            if (data.dateOfBirth !== "") {
                personalcount = personalcount + 10;
            }
            if (data.cnic !== "") {
                personalcount = personalcount + 10;
            }
            if (data.maritalStatus !== "") {
                personalcount = personalcount + 10;
            }
            if (data.currentAddress !== "") {
                personalcount = personalcount + 10;
            }
            if (data.permanentAddress !== "") {
                personalcount = personalcount + 10;
            }
            if (data.Progname !== "") {
                personalcount = personalcount + 10;
            }
            //console.log(data.gender,"GENDER")
            // console.log(personalcount,"p count")
            this.setState({ pcount: Math.ceil(personalcount) });

            // return personalcount;
        } catch (err) {
            console.log(err.response.data);
            this.setState({ loading: false, error: err });
        }
    };
    updateFamilyinfo = async () => {
        let data;
        let famcount = 0;
        // const { title } = this.props;
        //console.log(title,"title")
        try {
            const response = await server.get(
                "/student/application/familyInfo"
            );
            data = response.data;
            if (data.relation !== "") {
                famcount = famcount + 16.67;
                console.log(data.relation, "relation");
            }
            if (data.name !== undefined) {
                famcount = famcount + 16.67;
                console.log(data.name, "name");
            }
            if (data.cnic !== "") {
                famcount = famcount + 16.67;
                console.log(data.cnic, "cinc");
            }
            if (data.phoneNumber !== "") {
                famcount = famcount + 16.67;
                console.log(data.phoneNumber, "phno");
            }
            if (data.email !== "") {
                famcount = famcount + 16.67;
                console.log(data.email, "email");
            }
            if (data.occupation !== "") {
                famcount = famcount + 16.67;
                console.log(data.occupation, "ouucpation");
            }
            this.setState({ fcount: Math.ceil(famcount) });
        } catch (err) {
            console.log(err.response.data);
            this.setState({ loading: false, error: err });
        }
    };
    updateAcademicinfo = async () => {
        let data1;
        let personalcount = 0;
        // const { title } = this.props;
        //console.log(title,"title")
        try {
            const response = await server.get(
                "/student/application/academicInfo"
            );
            data1 = response.data;
            if (data1.EducationType !== "") {
                personalcount = personalcount + 16.67;
            }
            if (data1.Status !== "") {
                personalcount = personalcount + 16.67;
            }
            if (data1.startDate !== "") {
                personalcount = personalcount + 16.67;
            }
            if (data1.endDate !== "") {
                personalcount = personalcount + 16.67;
            }
            if (data1.School !== "") {
                personalcount = personalcount + 16.67;
            }
            if (data1.OverallPercentage !== "") {
                personalcount = personalcount + 16.67;
            }

            //console.log(data.gender,"GENDER")
            // console.log(personalcount,"p count")
            this.setState({ acount: Math.ceil(personalcount) });

            // return personalcount;
        } catch (err) {
            console.log(err.response.data);
            this.setState({ loading: false, error: err });
        }
    };

    componentDidMount() {
        this.updateFamilyinfo();
        this.updatePersonalinfo();
        this.updateAcademicinfo();
    }

    render() {
        // let a= this.componentDidMount();
        // this.componentDidMount()
        // this.updatePersonalinfo().then(result => a=(result))
        //console.log(pcount,"p count")
        // const b = this.updatePersonalinfo();

        return (
            <Card align="left" fluid>
                <Card.Content textAlign="center">
                    <Header as="h1">Application Progress</Header>
                </Card.Content>

                <Card.Content>
                    <Progress
                        percent={this.state.pcount}
                        indicating
                        progress
                        label="Personal Info"
                    />
                    <Progress
                        percent={this.state.fcount}
                        indicating
                        progress
                        label="Family Info"
                    />
                    <Progress
                        percent={this.state.acount}
                        indicating
                        progress
                        label="Academic Info"
                    />
                </Card.Content>
                <Card.Content align="center">
                    <Button
                        as={Link}
                        to="/student/application"
                        primary
                        animated
                    >
                        <Button.Content visible>
                            Complete Application
                        </Button.Content>
                        <Button.Content hidden>
                            <Icon name="right arrow" />
                        </Button.Content>
                    </Button>
                </Card.Content>
            </Card>
        );
    }
}
