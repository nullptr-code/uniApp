import React from "react";
import { Container, Pagination, Icon, Segment } from "semantic-ui-react";

import server from "../../server/server";

import Navbar from "../components/navbar/Navbar";
import UniGrid from "../components/unigrid/UniGrid";
import NoUni from "../components/unigrid/NoUni";

export default class MyUnis extends React.Component {
    constructor(props) {
        super(props);
        this.state = { pageNo: 1, loading: false, totalPages: 0, uniList: [] };
        this.limit = 12;
        this.ref = React.createRef();
    }

    async componentDidMount() {
        const skip = 0;
        try {
            const { data } = await server.get(
                `/student/myUnis?limit=${this.limit}&skip=${skip}`
            );
            this.setState({ ...data });
        } catch (err) {
            console.log(err);
        }
    }

    paginationHandler = async (e, { activePage }) => {
        const skip = activePage - 1;
        try {
            const { data } = await server.get(
                `/student/myUnis?limit=${this.limit}&skip=${skip}`
            );
            this.setState({ uniList: data.uniList, pageNo: activePage });
            this.ref.current.setState({ uniList: data.uniList });

            window.scrollTo(0, 0);
        } catch (err) {
            console.log(err);
        }
    };

    reload = async () => {
        const skip = this.state.pageNo - 1;
        try {
            const { data } = await server.get(
                `/student/myUnis?limit=${this.limit}&skip=${skip}`
            );
            this.setState({ ...data });
            this.ref?.current?.setState({ uniList: data.uniList });
        } catch (err) {
            console.log(err);
        }
    };

    render() {
        const { pageNo, totalPages, uniList } = this.state;
        return (
            <div>
                <header>
                    <Navbar />
                </header>
                <Container style={{ padding: "20px" }}>
                    <Segment raised>
                        {uniList.length > 0 ? (
                            <UniGrid
                                reload={this.reload}
                                unis={uniList}
                                ref={this.ref}
                            />
                        ) : (
                            <NoUni
                                header="No Universities Selected"
                                content="You do not have any universities selected at the moment. Click
                            the button below to select a university"
                                button="Find Universities"
                                redirect="/student/findUnis"
                            />
                        )}
                    </Segment>
                    {totalPages > 1 && (
                        <Container textAlign="center">
                            <Pagination
                                onPageChange={this.paginationHandler}
                                activePage={pageNo}
                                totalPages={totalPages}
                                size="small"
                                siblingRange={1}
                                boundaryRange={0}
                                firstItem={{
                                    content: <Icon name="angle double left" />,
                                    icon: true,
                                }}
                                prevItem={{
                                    content: <Icon name="angle left" />,
                                    icon: true,
                                }}
                                nextItem={{
                                    content: <Icon name="angle right" />,
                                    icon: true,
                                }}
                                lastItem={{
                                    content: <Icon name="angle double right" />,
                                    icon: true,
                                }}
                            />
                        </Container>
                    )}
                </Container>
            </div>
        );
    }
}
