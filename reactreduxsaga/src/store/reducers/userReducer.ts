import { User } from "../../models/user";
import { Action } from "redux";
import { REGISTER_USER_SUCCESS, AUTH_USER_SUCCESS, GET_USER_BY_ID_SUCCESS, ADD_PLAYLIST_SUCCESS } from "../actions/types";
import { AuthUserSuccess, RegisterUserSuccess, GetUserByIDSuccess } from "../actions/userActions";
import { AddPlaylist } from "../actions/playlistActions";
import { userInfo } from "os";

interface userState {
  user?: User;
}

const initialState: userState = {
  user: undefined
}

export default function (state = initialState, action: Action) {
  switch (action.type) {
    case AUTH_USER_SUCCESS: {
      const { user } = action as AuthUserSuccess;
      return {
        ...state,
        user: user
      };
    }
    case REGISTER_USER_SUCCESS: {
      const { user } = action as RegisterUserSuccess;
      return {
        ...state,
        user: user
      }
    }
    case GET_USER_BY_ID_SUCCESS:{
      const {user} = action as GetUserByIDSuccess;
      return {
        ...state,
        user: user
      }
    }
    default: return state;
  }
}