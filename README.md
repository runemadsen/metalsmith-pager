# metalsmith-pager

A Metalsmith plugin for paginating collections of file.

It's meant to be used with [metalsmith-collections](https://github.com/segmentio/metalsmith-collections).

## setup

[Metalsmith](http://www.metalsmith.io/) is pluggable static site generator. All of the logic in Metalsmith is handled by plugins.

`metalsmith-pager` is a metalsmith plugin that allows to paginate collections of file; it can be installed via NPM:

```
npm i -s metalsmith-pager
```

## demo

Take a look at the file build-collection-pagination.js to have a demo of the correct usage.

## options

`metalsmith-pager` accepts the following settings:

```

collection
---
The name of the collection the files belong

elementsPerPage
---
The maximum number of element that could be displayed in the same page.

pagePattern
---
The pattern for the path at which the page trunk should be available.
It must contain the :PAGE placeholder, that will be replaced with the page number.

pageLabel
---
The format in which the page number should be displayed in the page navigation bar.
It must contain the :PAGE placeholder.
Default value is simply :PAGE.

paginationTemplatePath
---
The path where the pagination template is located.
It should be relative to the path configured as "source" for metalsmith.

layoutName
---
The name of the layout that should be used to create the page.
```
