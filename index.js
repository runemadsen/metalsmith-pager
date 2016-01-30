
'use strict';

const fs = require('fs');
const path = require('path');

const filterObj = require('./lib/filter-object');
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


    const template = fs.readFileSync(path.join(metalsmith._source, options.paginationTemplatePath));


    const groupedPosts = filterObj(files, function(all, k){
      return Array.isArray(all[k].collection) && all[k].collection.indexOf(options.collection) >= 0;
    });


    const pageKeys = new Set();

    //
    // enrich the metalsmith "files" collections with the pages
    // which contains the "paginated list of pages"
    groupedPosts.reduce(function(fileList, collectionEntry, index) {

      const currentPage = Math.floor(index / elementsPerPage) + 1;
      const pageDist = pagePattern.replace(/:PAGE/, currentPage);

      if (fileList[pageDist] == null){
        fileList[pageDist] = {
          contents: template,
          layout: options.layoutName,
          pagination: { current: currentPage, files: [] }
        }
      }

      pageKeys.add(pageDist);
      fileList[pageDist].pagination.files.push(collectionEntry);

      return fileList;

    }, files);


    const pagesInfo = [...pageKeys].map((el, i) => ({ path: el, index: i+1, label: pageLabel.replace(/:PAGE/, i+1) }));
    for (let key of pageKeys.values()){
      files[key].pages = pagesInfo;
    }


    done();

  };

};
