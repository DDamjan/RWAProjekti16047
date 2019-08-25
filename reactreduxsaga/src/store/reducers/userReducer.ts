import { User } from "../../models/user";
import { Action } from "redux";
import { REGISTER_USER_SUCCESS, AUTH_USER_SUCCESS, GET_USER_BY_ID_SUCCESS, ADD_PLAYLIST_SUCCESS, REGISTER_USER_FAIL } from "../actions/types";
import { AuthUserSuccess, RegisterUserSuccess, GetUserByIDSuccess, RegisterUserFail } from "../actions/userActions";
import { AddPlaylist } from "../actions/playlistActions";
import { userInfo } from "os";

export interface userState {
  user?: User;
  error?: string;
}

const initialState: userState = {
  user: undefined,
  error: ""
}

export default function (state = initialState, action: Action): userState {
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
      console.log(action);
      return {
        ...state,
        user: user
      }
    }
    case REGISTER_USER_FAIL: {
      const { error } = action as RegisterUserFail;
      console.log(action);
      return {
        ...state,
        error
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