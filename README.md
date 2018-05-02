This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Thanks To: [Ali Alizada](https://github.com/prince1456)

```
I seriously looked everywhere for junior-senior levels to quickly start off a project with 
react, redux and the latest webpack. 
I know I wanted something like this so I can minimize the project setup time. 
I just decided to make it! It was all thanks to Ali! 
```
Don't forget to run `npm install` before `npm start`!

### I bring you...

# ReactDuxPack! (React + Redux + Webpack)

- [Folder Structure](#folder-structure)
- [Why this structure?](#why-this-structure-)
- [Making a Component](#creating-component-with-action-reducer)

## Folder Structure

The project looks like this:
```
my-app/
  src/
    components/
      Component1
        |-> Component1.js(or jsx)
        |-> style.scss
      index.js
    containers/
      Container1/
        |-> Container1.js 
      index.js
    redux/
      actions/
        |-> index.js
        |-> action1.js
      reducers/
        |-> index.js
        |-> reducer1.js
      store/
        |-> index.js
      types/
        |-> index.js
    router/
      Root.js
  public/
    |-> index.html
    |-> favicon.ico
  package.json
  node_modules/
  README.md
  -- setup files --
  .babelrc
  .eslintrc
  .prettierrc
  webpack.common / dev / prod.config
```

## Why this structure?

You might be wondering why so many `index.js`!?

sample `index.js` code:

```javascript
/*components/index.js*/

//from the component directory
import Button from './Button/Button.js';
export { Button };
```

If you have `n` amount of components, you `import` each into the `index.js` file 
and `export` the components accordingly...
for example:

```javascript
/*components/index.js*/

//n number of components
import Component1 from './Component1/Component1.js';
import Component2 from './Component2/Component2.js';
import Component3 from './Component3/Component3.js';
//...

export { Component1, Component2, Component3, ...}

```

To access these files from anywhere all you have to do is:

```javascript 
/*Container1.js*/
import { Component1, Component2, Component3 } from 'path/to/component/directory'
//You also don't have to import the index.js physically!!
```

instead of when you don't have index.js:

```javascript
import { Component1 } from 'path/to/component1/directory';
import { Component2 } from 'path/to/component2/directory';
import { Component3 } from 'path/to/component3/directory';
```

Number of importing is too ~~damn~~ high!!


## Creating Component with Action + Reducer

Redux is a hard concept to master, especially when there's too much to set up to
get one state changed (e.g. button click).

To summarize. `Redux` is a `HOC` (Higher order Component) that takes care of all states in 
an app. Think of it as a `parent component` that has all possible states and the children (component) just pick and choose which state applies to them. 

The  `pick and choose` factor would be the `mapStateToProps()` function:

```javascript
// connect to store
const mapStateToProps = state => ({
  buttonToggle: state.toggle,
});
```
The `state` variable in the  `mapStateToProps()` function contains all of the states in the 
app. In this case we chose the `toggle` to be used into our component. We now assign it to a variable `buttonToggle` and will used like `this.props.buttonToggle`.

### Process

If we go through this step by step, redux isn't as hard as you think!

1. We create a Component directory, name it for whatever purpose you'll be using this for. 


### Actions + Reducer beauty

Now that we got the basic idea out of the way, let's move on to the concept of changing the state when something happens!

In a normal `React App` we would do something like :

```javascript
this.setState({blah: blah});
```

to set the state. But this will only set the state for that component and the children associated with it `ONLY` if we gave this state to those children.

What `Redux` does is similar in that it changes the `state` but in a way where any component can `dispatch` an `action` to change the state of that app. `Reducers` would then listen for these `actions` and change according to the payload `dispatched` with the action.

#### `To Summarize...` 

* `Action:` Let's do this "Action!", Hey Reducer! Change this state! I'll give you the information to change it appropriately!

* `Reducer:` Okay Action! I got your `action details` I'll change it accordingly!

*Cheesy, but yeah.. That's the idea...*

So how is it like in `code`?

Let us look at an example of a button toggle. We're going to set the state everytime a button is pressed!

#### Reducer

```javascript
// 1
import * as types from '../types';

//2
const initialState = {
  isToggle: false,
  status: 'disabled',
};

//3
const toggle = (state = initialState, action) => {
  switch (action.type) {
    case types.BUTTON_ACTIVE:
      return {
        isToggle: action.payload,
        status: action.status,
      };

    case types.BUTTON_DISABLED:
      return {
        isToggle: action.payload,
        status: action.status,
      };
    default:
      return state;
  }
};

export default toggle;
```
* `//1` this is the type of action being sent, we preset the types of actions

* `//2` this is the initial state so when no actions are being called, we set it to these specific attributes

* `//3` this is the *case* statement to do certain state changing based off of the action type called... This is the part where the `Reducer` says: Okay Action! I got your `action details` I'll change it accordingly!

In this case our `action details` would be the `action.payload` and `action.status` these are completely up to what the dispatch sends, this will ultimately be what your `states` will be changed to!

#### Action

This is where things get tricky. Not becuase the code is hard to implement, but the fact that things are essentially `blackboxed`; you don't really know how this action is dispatched to the reducer. But we don't really need to know why *as long as it works* If you really want to know `google.com` is your best bet. 

```javascript
//1
import * as types from '../types';

//2
const toggle = (isToggle, status) => dispatch => {
  return dispatch({
    type: isToggle ? types.BUTTON_DISABLED : types.BUTTON_ACTIVE,
    payload: !isToggle,
    status: isToggle ? 'Active' : 'Disabled',
  });
};

export default toggle;

```
* `//1` Again, we get the type constants (the actions being called)

* `//2` This is where we `dispatch` the information. The important thing here is the type being
dispatched. Based off of this dispatch, the `Reducer` does the sets the state. 

Remember? we have the `payload:` and `status:`!! this is the `action details` I mentioned earlier!

#### Action Type Constants

```javascript
export const BUTTON_ACTIVE = 'BUTTON_ACTIVE';
export const BUTTON_DISABLED = 'BUTTON_DISABLED';
```






