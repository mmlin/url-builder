require(['jquery', 'react', 'url_builder'], function ($, React, UrlBuilder) {
  React.render(React.createElement(UrlBuilder), document.getElementById('url-builder'));
});
