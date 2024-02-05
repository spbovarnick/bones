# Next/Sanity Project Template

This repo is a project template for Next/Sanity projects. The two features that I find myself re-using project-to-project are the tag-based revalidation on the `api/revalidate` route and the `ClientImg.jsx`.

Please plunder this resource (and share any issues). If you've never built a Next/Sanity project, follow the steps to get going.

### End Result:

![Gif of the project in action.](/public/images/result.gif)

## Table of Contents

- [Setup](sanity-setup)
  - [Setting Up Sanity](sanity-setup)
  - [Installing localtunnel](localtunnel)
  - [Creating the Revalidation Webhook](webhook)
- [Explanation](explanation)
  - [On-Demand Revalidation](explanation)
  - [ClientImg Component](clientImg)
- [Dependencies](dependencies)

## Setting Up Sanity

Create a Sanity project at [https://www.sanity.io](https://www.sanity.io). If you haven't made a Sanity account already, do that first. The free tier will work for all this.

Create a `.env` file at the root level of your project. Paste in the following:
```
NEXT_PUBLIC_SANITY_PROJECT_ID="<>YOUR_SANITY_PROJECT_ID<>"
NEXT_PUBLIC_SANITY_DATASET="<>YOUR_SANITY_DATASET_TITLE<>"
```

Make sure to replace `YOUR_SANITY_PROJECT` and `YOUR_SANITY_DATASET_TITLE` with those actual values!

![Image of the Sanity console, highlighting the project title and ID.](/public/images/id_and_title.png)

## Installing localtunnel

Install [localtunnel](https://github.com/localtunnel/localtunnel#readme). It can be installed globally or as a local dependency. I recommend global install, because you're likely to continue using it and there's no need to bloat a project with something only used in development.

localtunnel will allow us to use a revalidation webhook that rebuilds our refreshes the site when new content is loaded to the content lake. Having the site hot-reload when content is uploaded speeds up the development process.

## Creating the Revalidation Webhook

Start your dev server with `npm run dev`. In another terminal at project-level, run `lt -p 3000`. This is going to expose our localhost so that we can test out, and work with, the revalidation hook we're about to create. Copy the url localtunnel spits out.

![Image of the localtunnel url.](/public/images/lt_url.png)

Back in your Sanity project console, navigate to API

![Image of the API navigation in the Sanity console.](/public/images/API_Nav.png)

Select the appropriate dataset from the dropdown menu (*(all datasets) will also work). Otherwise, match your webhook config to the following:

![Image of the webhook settings in the Sanity console.](/public/images/webhook_settings.png)

Paste that localtunnel URL into the text field labeled **URL** and make sure to append it with `/api/revalidate`. Now, every time you do a Create, Update, or Delete action in this Sanity dataset, the webhook will ping your application's `/api/revalidate` route and tell it revalidate the data you've specified with when calling `sanityFetch`.

We want the hook to trigger on Create, Update and Delete actions. To work, the webhook should also be enabled, so make sure that box is checked. And the HTTP method we'll be using is POST.

Before clicking "Save", create a secret and copy it.

Back in your `.env` file, add the following:
```
SANITY_WEBHOOK_SECRET="<>YOUR_WEBHOOK_SECRET<>"
```

## On-Demand Revalidation

The first thing we did in configuring out Sanity project was to create a webhook for revalidation. Every time we do a Create, Update, or Delete action within our project's dataset our webhook is triggered and sends a POST request to our `/api/revalidate` route.

Inside our `POST` function, Next-Sanity's `parseBody` function validates the request using the the `SANITY_WEBHOOK_SECRET` we pasted from the Sanity console and copied into our `.env`.

If the request is valid, Next's `revalidateTag` function will take `body._type` as an argument and then purge the tag specified by `body._type`. Feel free to throw some `console.log`s in there. The tag you'll see returned in this case is `post`.

Over in our `sanityFetch` function in `src/utils/api`, the last accepted argument is `tags`. You'll notice that in the `return` block, which is just a `fetch` call to our dataset, we pass the `tags` argument. Setting these cache tags, tells `fetch` where to look in the cache for stored resource. However, if we've made any changes, our `POST` in `/api/revalidate` will have purged the cache, forcing the fetch to hit up our remote Sanity dataset. Boom, fresh content!

## ClientImg Component

Sanity and Next do many wonderful things together. In particular, I'm a fan of how they handle image media and I'm sure I've only just scratched the surface.

`ClientImg` accepts three arguments: `img`, `sizes` and `classes`. `sizes` accepts a string in accordance with the [sizes attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-sizes) of the `img` tag in order to render responsive images. `classes` accepts a string of classes, which is especially handy if you're using a class-based CSS framework like [Tailwind](https://tailwindcss.com/) or CSS modules.

The `img` argument of `ClientImg` is where the magic happens. Firstly, it depends on a query projection like the one found in `src/app/posts/page.js`:
```
*[_type == "post"] {
  title,
  mainImage{
    alt,
    asset -> {
      ...,
      metadata
    }
  }
}
```

This projection passes us not only `alt`, which is a required, though not breaking property of Next's `Image` component, but all of the metadata associated with the asset. We need that metadata to pass to `useNextSanityImage`, which will produce the props we need to render our image!

The third, optional argument, `imageBuilder: urlForImage`, is a handy way to transform images. Though it's not the case in this repo, image transformations are crucial when you are using the `hotspot` and `crop` options on your Sanity image schemas.

## Dependencies

- [next-sanity](https://github.com/sanity-io/next-sanity)
- [next-sanity-image](https://github.com/lorenzodejong/next-sanity-image#readme)

