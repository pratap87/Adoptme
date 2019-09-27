import React, { Component } from 'react';
import pet from "@frontendmasters/pet";
import Carousel from "./carousel";
import ErrorBoundary from "./error";
import ThemeContext from "./themecontext";
import { navigate } from "@reach/router";
import Modal from "./modal";
class Details extends Component {
    state = { loading: true, showModal: false };
    componentDidMount() {

        pet.animal(this.props.id).then(({ animal }) => {
            this.setState({
                url: animal.url,
                name: animal.name,
                animal: animal.type,
                location: `${animal.contact.address.city}, ${
                    animal.contact.address.state
                    }`,
                description: animal.description,
                media: animal.photos,
                breed: animal.breeds.primary,
                loading: false
            });
        }, console.error);
    }
    toggleModal = () => this.setState({ showModal: !this.state.showModal })
    adopt = () => navigate(this.state.url)
    render() {


        const { animal, breed, location, description, media, name, showModal } = this.state;

        return (
            <div className="details">
                <Carousel media={media} />
                <div>
                    <h1>{name}</h1>
                    <h2>{`${animal} — ${breed} — ${location}`}</h2>
                    <ThemeContext.Consumer>
                        {([theme]) => (
                            <button
                                onClick={this.toggleModal}
                                style={{ backgroundColor: theme }}> Adopt {name}</button>
                        )}
                    </ThemeContext.Consumer>

                    <p>{description}</p>
                    {
                        showModal ? (
                            <Modal>
                                <div>
                                    <h1>Would you like to adopt {name}?</h1>
                                    <div className="buttons">
                                        <button onClick={this.adopt}>Yes</button>
                                        <button onClick={this.toggleModal}>No, I am a monster</button>
                                    </div>
                                </div>
                            </Modal>
                        ) : null}

                </div>
            </div>
        );
    }
}
export default function DetailsErrorBoundary(props) {
    return (
        <ErrorBoundary>
            <Details {...props} />
        </ErrorBoundary>
    );
}