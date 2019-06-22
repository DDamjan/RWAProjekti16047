import React from 'react';
import PropTypes, { any, string } from 'prop-types';
import { searchInputValue, searchSubmit } from '../../actions/controlsAction';
import { option } from '../../models/option';
import { connect } from 'react-redux';

interface Props {
    autocompleteOptions: option[],
    searchInputAction: searchInputValue,
    searchSubmitAction: searchSubmit
}

interface State {
    inputValue: string;
}

class Controls extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props);
        this.state = {
            inputValue: ""
        };
    }

    inputChange(event: any) {
        this.state = {
            inputValue: event.target.value
        }
        if (this.props.autocompleteOptions.length > 0) {
            let suggestions = document.getElementsByClassName("suggestions")[0] as HTMLElement;
            suggestions.style.top = 'calc(10vh + 60px)';
        }
    }

    inputSelect = (id: number) => {
        const {searchSubmit} = this.props.autocompleteOptions;
        if (typeof searchSubmit === "function"){
            this.props.searchSubmitAction(id);
        }
        
        let suggestions = document.getElementsByClassName("suggestions")[0] as HTMLElement;
        suggestions.style.top = '-1000px';
        const selectedOption = this.props.autocompleteOptions.find(option => {
            option.id === id
        });
        if (selectedOption){
            this.state = {
                inputValue: selectedOption.name
            };
        }
    }

    handleSubmit () {
        const searchInput = document.getElementById('search-bar-input') as HTMLInputElement;
        const selected = searchInput.value;
        const selectedObject = this.props.autocompleteOptions.find(option => option.name.toLowerCase() === selected.toLowerCase());
        if (selectedObject){
            const selectedId = selectedObject.id;
        this.props.searchSubmitAction(selectedId);
        }
        const suggestion = document.getElementsByClassName("suggestions")[0] as HTMLElement;
        suggestion.style.top = '-1000px';
    }

    render() {
        if (this.state.inputValue.length >= 3) {
            this.props.searchInputAction(this.state.inputValue)
        }
        return (
            <div className="search-bar">
                <input
                    id="search-bar-input"
                    type="text"
                    placeholder="Search here"
                    onChange={this.inputChange}
                />
                {
                    this.props.autocompleteOptions.length > 0 &&
                    <ul className="suggestions">
                        <li>Search Results</li>
                        {
                            this.props.autocompleteOptions.map(option => (
                                <li
                                    className="autocomplete-option"
                                    onClick={() => this.inputSelect(option.id)}
                                >
                                    {option.name}
                                </li>
                            ))
                        }
                    </ul>
                }
                <button onClick={this.handleSubmit}>Submit</button>
            </div>
        )
    }

};

const mapStateToProps = store => ({
    autocompleteOptions: store.autocompleteOptions,
});

const mapDispatchToProps = dispatch => {
    return {
        searchInputAction: (inputValue) => dispatch(searchInputValue(inputValue)),
        searchSubmitAction: (artistId) => dispatch(searchSubmit(artistId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Controls)

Controls.propTypes = {
    autocompleteOptions: PropTypes.arrayOf(PropTypes.string),
    searchInputAction: PropTypes.func,
    searchSubmitAction: PropTypes.func,
};
    
}