import React, { Component } from 'react';
import { MDBInput } from "mdbreact";

class RandomImages extends Component {
    constructor(props) {
        super(props);
        this.state = { isActive: false, data: [], search: "", loading: true };
    }

    async componentDidMount() {
        var pageNumber = parseInt(Math.random() * 20);
        const response = await fetch(`https://picsum.photos/v2/list?page=${pageNumber}`);
        const json = await response.json();
        this.setState({ images: json, loading: false });
    }

    renderImage = (image, i) => {
        const { search, isActive } = this.state;

        if (search !== "" && image.author.toLowerCase().indexOf(search.toLowerCase()) === -1) {
            return null
        }

        return (
            <div style={{
                display: "inline-block",
                minHeight: "1px",
                border: "1px solid #ddd",
                overflow: "auto"
            }}
                key={i}>
                <img src={`${image.download_url}`} alt={`${image.id}`} width="300" height="300" className={isActive ? 'filter_on' : null} />
                <br />
                {image.author}
            </div>
        );
    };

    onchange = e => {
        this.setState({ search: e.target.value });
    };


    render() {
        if (this.state.loading) {
            return (
                <div className="App">
                    <h1>Loading...</h1>
                </div>
            )
        }

        const { images, isActive } = this.state;

        function refreshPage() {
            window.location.reload();
        }

        return (
            <div className="App">
                <input type="radio" onClick={() => this.setState({ isActive: !isActive })} />greyscale me<br />
                <button type="button" onClick={refreshPage}> <span>Load new images</span> </button><br />
                <MDBInput
                    hint="Search Author Name"
                    icon="search"
                    onChange={this.onchange}
                />
                <br />

                {images.map((image, i) => {
                    return this.renderImage(image, i);
                })}

            </div>
        );
    }
}

export default RandomImages;
