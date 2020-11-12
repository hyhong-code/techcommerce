import React from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

const SEOHead = ({
  title = process.env.REACT_APP_APP_NAME,
  description = "Your one stop shop for all tech products.",
}) => {
  const location = useLocation();

  return (
    <Helmet>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#fff" />

      {/* Title Description */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={`${process.env.REACT_APP_PUBLIC_DOMAIN}${location.pathname}`} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content={`${process.env.REACT_APP_PUBLIC_DOMAIN}${location.pathname}`}
      />
      <meta property="og:site_name" content={process.env.REACT_APP_APP_NAME} />

      {/* Open Graph Image */}
      <meta property="og:image" content={process.env.REACT_APP_OG_IMAGE_URL} />
      <meta property="og:image:secure_url" content={process.env.REACT_APP_OG_IMAGE_URL} />
      <meta property="og:image:type" content="image/jpg" />
      {/* <meta property="fb:app_id" content={process.env.REACT_APP_FACEBOOK_APP_ID} /> */}
    </Helmet>
  );
};

export default SEOHead;
