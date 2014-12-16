define(['react', 'components/core'], function (React, Core) {

  var UrlPart = React.createClass({
    getValue: function () {
      return this.refs.textinput.getValue();
    },

    render: function () {

      return <div className="url-builder-part">
        <label>
          <h3>{this.props.title}</h3>
          <p>{this.props.description}</p>
          <Core.TextInput ref="textinput" value={this.props.value} placeholder={this.props.placeholder} />
        </label>
      </div>
    }
  });

  // This is the top-level component.
  var UrlBuilder = React.createClass({
    
    // Helper method to add new parameters onto a base URL.
    // TODO: Don't accept relative paths.
    // TODO: Handle silly search strings like ?hi&&=&=there&
    buildUrl: function (baseUrl, newParams) {
      var a, pairs, params, search;

      if (!baseUrl)
        return '';

      // Parse the base URL.
      a = document.createElement('a');
      a.href = baseUrl;
      search = a.search.slice(1);

      // Save the query parameters into a hash.
      params = {};
      pairs = search.split('&');
      for (var i = 0, len = pairs.length; i < len; i++) {
        var pair = pairs[i];
        if (pair === '')
          continue;
        pair = pair.split('=');
        if (pair.length == 2)
          params[pair[0]] = decodeURI(pair[1]);
        else
          params[pair[0]] = undefined;
      }

      // Upsert the new (UTM/tracking) parameters.
      for (var key in newParams)
        params[key] = newParams[key];

      pairs = [];
      for (var key in params) {
        if (params[key] === undefined)
          pairs.push(key)
        else
          pairs.push(key + '=' + encodeURI(params[key]));
      }

      search = '?' + pairs.join('&');
      return a.origin + a.pathname + search + a.hash;
    },

    handleClick: function () {
      this.setState({
        baseUrl: this.refs.baseUrl.getValue(),
        utmMedium: this.refs.utmMedium.getValue(),
        utmSource: this.refs.utmSource.getValue(),
        utmName: this.refs.utmName.getValue(),
        utmContent: this.refs.utmContent.getValue(),
        utmTerm: this.refs.utmTerm.getValue()
      });
    },

    getInitialState: function () {
      return { baseUrl: '', utmMedium: '', utmSource: '',
               utmName: '', utmContent: '', utmTerm: '' };
    },

    render: function () {
      var url = this.buildUrl(this.state.baseUrl, {
        utm_medium: this.state.utmMedium,
        utm_source: this.state.utmSource,
        utm_name: this.state.utmName,
        utm_content: this.state.utmContent,
        utm_term: this.state.utmTerm
      });

      return <div className="url-builder-content">
        <div className="url-builder-form">

          <UrlPart ref="baseUrl"
                   title="What URL do you want to send people to?*"
                   description="This will be the base of your URL."
                   placeholder="Enter URL" />
          
          <UrlPart ref="utmMedium"
                   title="Campaign Medium*"
                   description="This is the channel the link is being used in.
                     Use broad categories like email, social, or ppc."
                   placeholder="Campaign Medium" />
          
          <UrlPart ref="utmSource"
                   title="Campaign Source*"
                   description="What's the specific place that you'll be using
                     this link? For example, email is too broad for this one.
                     Use the name of your email list like newsletter or
                     customer list."
                   placeholder="Campaign Source" />
          
          <UrlPart ref="utmName"
                   title="Campaign Name*"
                   description="Use any name you want. It should be the name of
                     your entire marketing campaign. This way, you can look at
                     all the links from this campaign even if you use them in
                     different places and channels."
                   placeholder="Campaign Name" />

          <hr />
          
          <UrlPart ref="utmContent"
                   title="Campaign Content (optional)"
                   description="If you use a bunch of links all in the same
                     spot and all the fields above are identical, you can use
                     this field to add more detail. For example, one link might
                     be header while your second link is footer."
                   placeholder="Campaign Content" />
          
          <UrlPart ref="utmTerm"
                   title="Campaign Term (optional)"
                   description="If you're using this link for search ads and
                     also want to track the search term you're running your ad
                     on, add a campaign term."
                   placeholder="Campaign Term" />
          
          <div className="url-builder-form-actions">
            <span>*Required field.</span>
            <button className="btn" onClick={this.handleClick}>Build my link!</button>
          </div>
        
        </div>

        <div className="url-builder-result">
          <div className="url-builder-result-content">
            <h2>Copy and paste your campaign link!</h2>
            <Core.TextInput value={url} placeholder="http://example.com/utm_source=..." />
            <button className="btn">Copy link to clipboard</button>
          </div>
        </div>

      </div>;
    }
  });

  return UrlBuilder;

});
