# next-preview-button

Strapi 5 plugin that adds a preview button to the edit view.

`config/plugins.ts`
```javascript
'next-preview-button': {
    enabled: true,
    config: {
      contentTypes: [
        {
          model: 'api::post.post',
          draftUrl: `http://localhost:3000/api/preview?secret=mysecret&slug=/post/:slug`,
          publishedUrl: `http://localhost:3000/post/:slug`,
          slug: 'linkPost',
        },
        {
          model: 'api::home.home',
          draftUrl: `http://localhost:3000/api/preview?secret=mysecret&slug=/home`,
          publishedUrl: `http://localhost:3000/home`,
        },
      ]
    }
  }
```
