export const trigger = (action, props) => dispatch => {
  props = props || {};
  props.type = action;
  return dispatch(props);
};
