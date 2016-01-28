
'use strict';

const fs = require('fs');
const path = require('path');


const fatal = require('./lib/log-fatal-error');
const filterObj = require('./lib/filter-object');




exports = module.exports = function pager(options){

  if (!options.collection){
    throw new TypeError('The "collection" setting must be specified');
  }


  if (!options.paginationTemplatePath){
    throw new TypeError('The "paginationTemplatePath" setting must be specified');
  }

  return function(files, metalsmith, done){

    const pagePattern = options.pagePattern || 'page/:PAGE/index.html';
    const elementsPerPage = options.elementsPerPage || 5;
    const paginationTemplatePath = path.join(metalsmith._source, options.paginationTemplatePath);

    try{
      // check the pagination template exists,
      // and the user has the rights to read its content
      fs.accessSync(paginationTemplatePath, fs.R_OK);
    }
    catch(err){
      return void fatal(err.message);
    }


    const template = fs.readFileSync(paginationTemplatePath);


    var groupedPosts = filterObj(files, function(all, k){
      return Array.isArray(all[k].collection) && all[k].collection.indexOf(options.collection) >= 0;
    });



    groupedPosts.reduce(function(fileList, collectionEntry, index) {

      let pageDist = pagePattern.replace(/:PAGE/, (Math.floor(index / elementsPerPage) + 1));

      if (fileList[pageDist] == null){
        fileList[pageDist] = {
          layout: 'post.html',
          contents: template,
          pagination: {
            files: []
          }
        }
      }

      fileList[pageDist].pagination.files.push(collectionEntry);

      return fileList;

    }, files);



    done();

  };

};
