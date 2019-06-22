import { option } from "../models/option";
import { controlsActions, autocompleteResults, albums, searchInputValue } from "../actions/controlsAction";
import * as actionTypes from '../constants/actionTypes';

const initialState: option[] = [
 { id: 0,
  name: ''
 }
]

export function autocompleteOptions(state: option[], action: controlsActions) {
    switch (action.type) {
      case actionTypes.AUTOCOMPLETE_RESULTS:{
        return action as autocompleteResults;
      }
        
      default:
        return state;
    }
  }
  
  export function albumResults(state = [], action: controlsActions) {
    switch (action.type) {
      case actionTypes.ALBUM_RESULTS:
        return action as albums;
      default:
        return state;
    }
  }
  
  export function searchTerm(state = '', action: controlsActions) {
    switch (action.type) {
      case actionTypes.INPUT_VALUE:
        return action as searchInputValue;
      default:
        return state;
    }
  }
  