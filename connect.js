import React, { Component } from 'react';
import PropTypes from 'prop-types';
function connect(options) {
  return ComponentToWrap => {
    const ExtentedComponent = class Extends extends ComponentToWrap {
      static propTypes = {
        globalState: PropTypes.shape({
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
        this.props.globalState.internal.setState(this.getDisplayName(), state);
      }
      componentWillMount() {
        if (super.componentWillMount) {
          super.componentWillMount();
        }
        this.props.globalState.internal.registerComponent(this.getDisplayName(), this.state);
      }
    };

    return class ConnectedToGlobalState extends Component {
      static contextTypes = {
        globalState: PropTypes.object.isRequired,
        registerComponent: PropTypes.func.isRequired,
        updateComponentState: PropTypes.func.isRequired,
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
        let subscription = null;
        if (options.subscribeTo && options.subscribeTo.length) {
          subscription = {
            subscribeTo: options.subscribeTo,
            callback: stateObject => this.reciveStateChanges(stateObject),
          };
        }
        this.context.registerComponent(name, state, subscription);
      }
      render() {
        const params = {
          internal: {
            ...this.state,
            setState: (name, state) => this.sendStateChange(name, state),
            registerComponent: (name, state) => this.registerComponent(name, state),
          },
        };
        return <ExtentedComponent {...this.props} globalState={params} />;
      }
    };
  };
}
export default connect;
