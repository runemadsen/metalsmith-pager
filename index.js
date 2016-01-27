
'use strict';

const fs = require('fs');

const filterObj = require('./lib/filter-object');




exports = module.exports = function pager(options){

  if (!options.collection){
    throw new TypeError('The "collection" setting must be specified');
  }

  return function(files, metalsmith, done){

    const template = fs.readFileSync('./sample/src/__partials/pagination.html');
    const pagePattern = options.pagePattern || 'page/:PAGE/index.html';
    const elementsPerPage = options.elementsPerPage || 5;

    var groupedPosts = filterObj(files, function(all, k){
      return Array.isArray(all[k].collection) && all[k].collection.indexOf(options.collection) >= 0;
    });


    let currentPageIndex = 1;

    groupedPosts.reduce(function(fileList, collectionEntry) {

      let pageDist = pagePattern.replace(/:PAGE/, currentPageIndex);

      if (fileList[pageDist] == null){

        fileList[pageDist] = {
          layout: 'post.html',
          contents: template,
          pagination: {
            files: []
          }
        }

      }

      let elementsInPageCount = fileList[pageDist].pagination.files.push(collectionEntry);

      if (elementsInPageCount >= elementsPerPage){
        currentPageIndex++;
      }

      return fileList;

    }, files);



    done();

  };

};
