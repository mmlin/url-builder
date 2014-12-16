define(['react', 'components/core'], function (React, Core) {

  var UrlPart = React.createClass({
    render: function () {
      return <div className="url-builder-part">
        <label>
          <h3>{this.props.title}</h3>
          <p>{this.props.description}</p>
          <Core.TextInput placeholder={this.props.placeholder} />
        </label>
      </div>
    }
  });

  // This is the top-level component.
  var UrlBuilder = React.createClass({
    render: function () {
      return <div className="url-builder-content">

        <h2>Fill out the form to build your link.</h2>
        <div className="url-builder-form">
          <UrlPart title="What URL do you want to send people to?*"
                   description="This will be the base of your URL."
                   placeholder="Enter URL" />
          <UrlPart title="Campaign Medium*"
                   description="This is the channel the link is being used in.
                     Use broad categories like email, social, or ppc."
                   placeholder="Campaign Medium" />
          <UrlPart title="Campaign Source*"
                   description="What's the specific place that you'll be using
                     this link? For example, email is too broad for this one.
                     Use the name of your email list like newsletter or
                     customer list."
                   placeholder="Campaign Source" />
          <UrlPart title="Campaign Name*"
                   description="Use any name you want. It should be the name of
                     your entire marketing campaign. This way, you can look at
                     all the links from this campaign even if you use them in
                     different places and channels."
                   placeholder="Campaign Name" />
          <UrlPart title="Campaign Content (optional)"
                   description="If you use a bunch of links all in the same
                     spot and all the fields above are identical, you can use
                     this field to add more detail. For example, one link might
                     be header while your second link is footer."
                   placeholder="Campaign Content" />
          <UrlPart title="Campaign Term (optional)"
                   description="If you're using this link for search ads and
                     also want to track the search term you're running your ad
                     on, add a campaign term."
                   placeholder="Campaign Term" />
          <div className="url-builder-form-actions">
            <span>*Required field.</span>
            <button>Build my link!</button>
          </div>
        </div>

        <div className="url-builder-result">
          <h2>Copy and paste your campaign link!</h2>
          <Core.TextInput placeholder=
            "http://pattycreates.com/utm-referral=email%2Fnewsletter" />
          <button>Copy link to clipboard</button>
        </div>

      </div>;
    }
  });

  return UrlBuilder;

});
