import * as actionTypes from '../constants/actionTypes';
import { Action } from 'redux';
import { album } from '../models/album';

export interface searchInputValue extends Action<string>{
    inputValue: string
}

export interface searchSubmit extends Action<string>{
    artistId:number
}

export interface autocompleteResults extends Action<String>{

}

export interface albums extends Action<string>{
    albums: album[]
}

export function searchInputValue(inputValue: string) {
    return {
        type: actionTypes.INPUT_VALUE,
        inputValue,
    }
}

export function searchSubmit(artistId:number){
    return {
        type: actionTypes.ARTIST_ID,
        artistId,
    }
}

export function autocompleteResults (){
    return{
        type: actionTypes.AUTOCOMPLETE_RESULTS
    }
}

export function albums(){
    return{
        type: actionTypes.ALBUM_RESULTS,
        albums
    }
}

export type controlsActions = searchInputValue | searchSubmit | autocompleteResults;