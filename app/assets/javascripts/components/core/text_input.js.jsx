define(['react'], function (React) {
  return React.createClass({
    focus: function() {
      var el = this.refs.input.getDOMNode();

      // I think the render/reconcile happens asynchronously,
      // so it hasn't been done at this point. Insert the command
      // to select the text after the reconcile.
      setTimeout(function(){el.select();}, 0);
    },

    getValue: function () {
      return this.refs.input.getDOMNode().value;
    },

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
      return <input ref="input" className={this.props.className} onChange={this.handleChange} type="text" value={this.props.value} name={this.props.name} placeholder={this.props.placeholder} />;
    }
  });
});
