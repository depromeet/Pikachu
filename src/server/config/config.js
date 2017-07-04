export default {
  // Authentication
  auth: {
    jwt: { secret: process.env.JWT_SECRET || 'depromeet' },

    // https://developers.facebook.com/
    facebook: {
      id: process.env.FACEBOOK_APP_ID || '186244551745631',
      secret: process.env.FACEBOOK_APP_SECRET || 'a970ae3240ab4b9b8aae0f9f0661c6fc',
    },

    // https://cloud.google.com/console/project
    google: {
      id: process.env.GOOGLE_CLIENT_ID || '251410730550-ahcg0ou5mgfhl8hlui1urru7jn5s12km.apps.googleusercontent.com',
      secret: process.env.GOOGLE_CLIENT_SECRET || 'Y8yR9yZAhm9jQ8FKAL8QIEcd',
    },

    // https://apps.twitter.com/
    twitter: {
      key: process.env.TWITTER_CONSUMER_KEY || 'Ie20AZvLJI2lQD5Dsgxgjauns',
      secret: process.env.TWITTER_CONSUMER_SECRET || 'KTZ6cxoKnEakQCeSpZlaUCJWGAlTEBJj0y2EMkUBujA7zWSvaQ',
    },

    kakao: {
      native: process.env.KAKAO_NATIVE_APP,
      rest: process.env.KAKAO_REST_API,
      javascript: process.env.KAKAO_JAVASCRIPT,
      admin: process.env.KAKAO_ADMIN,
    },
  },

  aws: {
    s3: {
      region: process.env.AWS_S3_REGION,
    },
  },

  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    secret: process.env.REDIS_PASS,
  },
};
