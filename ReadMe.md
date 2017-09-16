# CompX - Still in active development

[![Greenkeeper badge](https://badges.greenkeeper.io/kristinn93/CompX.svg)](https://greenkeeper.io/)
Very simple react state management library that uses react setState to populate a global state accessible to other components
## Usage
### Provider
```javascript
import { Provider } from 'compx';
...
render() {
    return (
      <Provider>
        <ComponentA />
        <ComponentB />
      </Provider>
    );
}
```
### Connect
 - ComponentA
```javascript
import React, { Component } from 'react';
import {Connect} from 'compx';

class ComponentA extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number: 0;
        }
    }
    render() {
        <button>Counter: {this.state.number}</button>
    }
}
export default Connect()(ComponentA);
```
 - ComponentB
```javascript
import React, { Component } from 'react';
import {Connect} from 'compx';

class ComponentB extends Component {
    render() {
        <p>ComponentA counter is {this.props.CompX.ComponentA} </p>
    }
}
export default Connect({subscribeTo: ['ComponentA']})(ComponentB);
```