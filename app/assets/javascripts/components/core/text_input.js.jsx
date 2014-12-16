define(['react'], function (React) {
  return React.createClass({
    getInitialState: function () {
      return {
        value: this.props.value
      }
    },

    handleChange: function (event) {
      this.setState({value: event.target.value});

      if (this.props.onChange) {
        this.props.onChange(event.target.value);
      }
    },

    render: function () {
      return <input className={this.props.className} onChange={this.handleChange} type="text" value={this.state.value} name={this.props.name} />;
    }
  });
});
