import to from 'to-case';
import { toast } from 'react-toastify';
import { post as postRequest, put as putRequest, fetch, remove as deleteRequest } from './Request';

import {
  ACTION_GET,
  ACTION_LIST,
  ACTION_POST,
  ACTION_PUT,
  ACTION_DELETE,
  ACTION_STARTED,
  ACTION_COMPLETED,
  ACTION_FAILED,
} from './../constants/Common';

const __actionName = (group, method, action, step) => {
  return to.snake(group + ' ' + method + ' ' + (action || '') + ' ' + step).toUpperCase();
};

const __action = (type, path, method, id, params, payload, error) => {
  let action = { type, name: path };

  if (params) {
    action.params = params;
  }

  if (id) {
    action.objectId = id;
  }

  if (payload) {
    action.payload = payload;
  }

  if (error) {
    action.error = error;
  }

  return action;
};

const __dispatch = (group, action, method, params, dispatch, id, path_extras) => {
  let STARTED = __actionName(group, method, action, ACTION_STARTED);
  let COMPLETED = __actionName(group, method, action, ACTION_COMPLETED);
  let FAILED = __actionName(group, method, action, ACTION_FAILED);

  dispatch(__action(STARTED, action, method, id, params));

  let request;
  const PATH = group + (action ? '/' + action : '');

  switch (method) {
    case ACTION_GET:
    case 'CUSTOM_GET':
      request = fetch(PATH, id, params, [], path_extras);
      break;
    case ACTION_LIST:
    case 'CUSTOM_LIST':
      request = fetch(PATH, null, params, [], path_extras);
      break;
    case ACTION_POST:
      request = postRequest(PATH, params, path_extras);
      break;
    case ACTION_PUT:
      request = putRequest(PATH, id, params);
      break;
    case ACTION_DELETE:
      request = deleteRequest(PATH, id, params);
      break;
  }

  if (request) {
    return request.then(
      response => {
        if (response.body.message) {
          toast.success(response.body.message);
        }
        dispatch(__action(COMPLETED, action, method, id, params, response.body));
      },
      error => {
        if (error.status === 401) {
          dispatch(logout());
        } else {
          if (error.response && error.response.body && error.response.body.message) {
            toast.error(error.response.body.message);
          }

          dispatch(__action(FAILED, action, method, id, params, null, error.response.body));
        }
      }
    );
  }

  throw new Error(`Could not find a proper method for action "${method}"`);
};

export const get = (group, action, id, params) => dispatch => {
  return __dispatch(group, action, ACTION_GET, params, dispatch, id);
};

export const list = (group, action, params) => dispatch => {
  return __dispatch(group, action, ACTION_LIST, params, dispatch);
};

export const post = (group, action, params) => dispatch => {
  return __dispatch(group, action, ACTION_POST, params, dispatch);
};

export const put = (group, action, id, params) => dispatch => {
  return __dispatch(group, action, ACTION_PUT, params, dispatch, id);
};

export const remove = (group, action, id, params) => dispatch => {
  return __dispatch(group, action, ACTION_DELETE, params, dispatch, id);
};

export const custom = (method, group, action, id, params, path_extras) => dispatch => {
  const ACTION_CUSTOM = 'CUSTOM_' + method.toUpperCase();
  return __dispatch(group, action, ACTION_CUSTOM, params, dispatch, id);
};
