import { Component, Children } from 'react';
import PropTypes from 'prop-types';

export default class Provider extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.subscriptions = [];
  }

  getChildContext() {
    return {
      globalState: this.state,
      registerComponent: (name, state, subscription) =>
        this.registerComponent(name, state, subscription),
      updateComponentState: (name, state) => this.updateComponentState(name, state),
      unRegisterComponent: id => this.unRegisterComponent(id),
    };
  }

  registerComponent(name, state, subscription) {
    const newState = this.state;
    newState[name] = state;
    this.setState(...this.state, newState);
    if (subscription) {
      this.subscriptions.push(subscription);
    }
    if (subscription && subscription.subscribeTo) {
      this.emitFullStateForSubscription(subscription);
    }
    this.emitPartialState(name, state);
  }
  unRegisterComponent(id, name) {
    this.subscriptions.splice(this.subscriptions.findIndex(item => item.id === id), 1);
    const newState = this.state;
    delete newState[name];
    this.setState(newState), this.emitPartialState(name);
  }

  updateComponentState(name, state) {
    const newState = this.state;
    newState[name] = state;
    this.setState(newState);
    this.emitPartialState(name, state);
  }

  emitFullStateForSubscription(subscription) {
    if (subscription.subscribeTo.length) {
      const fullState = {};
      subscription.subscribeTo.forEach(key => {
        if (this.state[key]) {
          fullState[key] = this.state[key];
        }
      });
      if (fullState !== {}) {
        subscription.callback(fullState);
      }
    }
  }

  emitPartialState(name, state) {
    this.subscriptions.forEach(item => {
      if (item.subscribeTo.includes(name)) {
        const partial = {};
        partial[name] = state;
        item.callback(partial);
      }
    });
  }

  render() {
    return Children.only(this.props.children);
  }
}

Provider.childContextTypes = {
  globalState: PropTypes.object.isRequired,
  registerComponent: PropTypes.func.isRequired,
  updateComponentState: PropTypes.func.isRequired,
  unRegisterComponent: PropTypes.func.isRequired,
};
