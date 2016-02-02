
'use strict';

const fs = require('fs');
const path = require('path');

const type = require('./lib/get-type');



exports = module.exports = function pager(options){

  if (!options.collection){
    throw new Error('The "collection" setting must be specified')
  }

  if (!options.layoutName){
    throw new Error('The "layoutName" setting must be specified');
  }

  if (!options.paginationTemplatePath){
    throw new Error('The "paginationTemplatePath" setting must be specified');
  }

  if (type(options.elementsPerPage) != 'number'){
    throw new Error('The "elementsPerPage" setting must be specified as a number');
  }


  return function(files, metalsmith, done){

    const pagePattern = options.pagePattern || 'page/:PAGE/index.html';
    const elementsPerPage = options.elementsPerPage || 5;
    const pageLabel = options.pageLabel || ':PAGE';


    const metadata = metalsmith.metadata();


    const template = fs.readFileSync(path.join(metalsmith._source, options.paginationTemplatePath));


    let groupedPosts;

    if (metadata.collections && metadata.collections[options.collection]){
      groupedPosts = metadata.collections[options.collection];
    }
    else {
      throw new Error(`The collection ${options.collection} does not exist.`);
    }



    const pageKeys = new Set();

    //
    // enrich the metalsmith "files" collection with the pages
    // which contain the "paginated list of pages"
    groupedPosts.reduce(function(fileList, collectionEntry, index) {

      const currentPage = Math.floor(index / elementsPerPage) + 1;
      const pageDist = pagePattern.replace(/:PAGE/, currentPage);

      if (fileList[pageDist] == null){
        fileList[pageDist] = {
          canonical: pageDist,
          contents: template,
          layout: options.layoutName,
          pagination: {
            current: currentPage,
            files: []
          }
        }
      }

      pageKeys.add(pageDist);
      fileList[pageDist].pagination.files.push(collectionEntry);

      return fileList;

    }, files);


    const pagesInfo = [...pageKeys].map((el, i) => ({ path: el, index: i+1, label: pageLabel.replace(/:PAGE/, i+1) }));

    pagesInfo.forEach(function(el, i, all){
      files[el.path].pages = all;
      files[el.path].pagination.prev = i > 0 ? all[i-1].path : null;
      files[el.path].pagination.next = i < all.length-1 ? all[i+1].path : null;
    });

    if (options.index && type(files[options.index]) == 'object'){
      files[options.index].pagination = files[pagePattern.replace(/:PAGE/, 1)].pagination;
      files[options.index].pages = pagesInfo;
    }


    done();

  };

};
