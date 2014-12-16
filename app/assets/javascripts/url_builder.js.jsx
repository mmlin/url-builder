define(['react', 'components/core', 'zeroclipboard/ZeroClipboard'], function (React, Core, ZeroClipboard) {

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
          <div className="error {this.props.error ? 'hide' : ''}">{this.props.error}</div>
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

    componentDidMount: function () {
      new ZeroClipboard(document.getElementById('copy-button'));
    },

    handleClick: function () {
      this.setState({
        baseUrl: this.refs.baseUrl.getValue(),
        utmMedium: this.refs.utmMedium.getValue(),
        utmSource: this.refs.utmSource.getValue(),
        utmName: this.refs.utmName.getValue(),
        utmContent: this.refs.utmContent.getValue(),
        utmTerm: this.refs.utmTerm.getValue(),
        handleClick: true
      });
      this.refs.result.focus();
    },

    getInitialState: function () {
      return { baseUrl: '', utmMedium: '', utmSource: '', utmName: '',
        utmContent: '', utmTerm: '', handleClick: false };
    },

    render: function () {
      var baseUrl, url, medium, source, name, content, term, errors;

      // Get the current state.
      baseUrl = this.state.baseUrl;
      medium = this.state.utmMedium;
      source = this.state.utmSource;
      name = this.state.utmName;
      content = this.state.utmContent;
      term = this.state.utmTerm;

      // Check for errors in the values given,
      // unless this is the initial load of the component.
      errors = {};
      if (this.state.handleClick) {
        if (baseUrl === '')
          errors.baseUrl = 'Please type in the base URL.';
        else if (!/^\s*https?:\/\/[\w-]+\.[\w-]+/.test(baseUrl))
          errors.baseUrl = 'That does not look like a valid URL.'
        if (medium === '')
          errors.utmMedium = 'Please enter the campaign medium.';
        if (medium === '')
          errors.utmSource = 'Please enter the campaign source.';
        if (medium === '')
          errors.utmName = 'Please enter the campaign name.';
      }

      // Build the URL if there are no errors.
      url = '';
      if (!Object.keys(errors).length) {
        url = this.buildUrl(baseUrl, {
          utm_medium: medium, utm_source: source, utm_name: name,
          utm_content: content, utm_term: term
        });
      }

      return <div className="url-builder-content">
        <div className="url-builder-form">

          <UrlPart ref="baseUrl"
                   title="What URL do you want to send people to?*"
                   description="This will be the base of your URL."
                   placeholder="Enter URL"
                   error={errors.baseUrl} />
          
          <UrlPart ref="utmMedium"
                   title="Campaign Medium*"
                   description="This is the channel the link is being used in.
                     Use broad categories like email, social, or ppc."
                   placeholder="Campaign Medium"
                   error={errors.utmMedium} />
          
          <UrlPart ref="utmSource"
                   title="Campaign Source*"
                   description="What's the specific place that you'll be using
                     this link? For example, email is too broad for this one.
                     Use the name of your email list like newsletter or
                     customer list."
                   placeholder="Campaign Source"
                   error={errors.utmSource} />
          
          <UrlPart ref="utmName"
                   title="Campaign Name*"
                   description="Use any name you want. It should be the name of
                     your entire marketing campaign. This way, you can look at
                     all the links from this campaign even if you use them in
                     different places and channels."
                   placeholder="Campaign Name"
                   error={errors.utmName} />

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
            <Core.TextInput ref="result" className="copy" value={url} placeholder="http://example.com/utm_source=..." />
            <button id="copy-button" data-clipboard-text={url} className="btn">Copy link to clipboard</button>
          </div>
        </div>

      </div>;
    }
  });

  return UrlBuilder;

});
