import React, { Component } from 'react';
import PropTypes from 'prop-types';
function Connect(options = {}) {
  return ComponentToWrap => {
    const ExtentedComponent = class Extends extends ComponentToWrap {
      static propTypes = {
        CompX: PropTypes.shape({
          internal: PropTypes.shape({
            setState: PropTypes.func.isRequired,
          }).isRequired,
        }).isRequired,
      };
      getDisplayName() {
        const defaultName = ComponentToWrap.displayName || ComponentToWrap.name;
        const displayName = options && options.name ? options.name : defaultName || defaultName;
        return displayName;
      }
      setState(state = {}, cb = () => {}) {
        super.setState(state, cb);
        this.props.CompX.internal.setState(this.getDisplayName(), state);
      }
      componentWillMount() {
        if (super.componentWillMount) {
          super.componentWillMount();
        }
        this.props.CompX.internal.registerComponent(this.getDisplayName(), this.state);
      }
      componentWillUnmount() {
        if (super.componentWillUnmount) {
          super.componentWillUnmount();
        }
        this.props.CompX.internal.unRegisterComponent();
      }
    };

    return class ConnectedToGlobalState extends Component {
      static contextTypes = {
        globalState: PropTypes.object.isRequired,
        registerComponent: PropTypes.func.isRequired,
        updateComponentState: PropTypes.func.isRequired,
        unRegisterComponent: PropTypes.func.isRequired,
      };

      sendStateChange(name, state) {
        this.context.updateComponentState(name, state);
      }

      reciveStateChanges(stateObject) {
        const newState = {
          ...this.state,
          ...stateObject,
        };
        this.setState(newState);
      }

      registerComponent(name, state) {
        this.is = name + Math.floor(Math.random() * (10000000 - 1 + 1)) + 1;
        let subscription = null;
        if (options && options.subscribeTo && options.subscribeTo.length) {
          subscription = {
            subscribeTo: options.subscribeTo,
            callback: stateObject => this.reciveStateChanges(stateObject),
            id,
          };
        }
        this.context.registerComponent(name, state, subscription);
      }

      unRegisterComponent() {
        // which one recives component will unmount ? this or the extended one 🤔
        this.context.unRegisterComponent(this.id);
      }
      render() {
        const params = {
          ...this.state,
          internal: {
            setState: (name, state) => this.sendStateChange(name, state),
            registerComponent: (name, state) => this.registerComponent(name, state),
            unRegisterComponent: () => this.unRegisterComponent(),
          },
        };
        return <ExtentedComponent {...this.props} CompX={params} />;
      }
    };
  };
}
export default Connect;
