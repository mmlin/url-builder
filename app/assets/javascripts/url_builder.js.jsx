define(['react', 'components/core'], function (React, Core) {
  return React.createClass({
    render: function () {
      return <div className="url-builder-content">
        <p>Sample paragraph</p>
        <Core.TextInput value="sample text" />
      </div>;
    }
  });
});
