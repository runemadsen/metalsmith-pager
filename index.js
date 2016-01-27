
'use strict';

const fs = require('fs');

const filterObj = require('./lib/filter-object');




exports = module.exports = function pager(options){

  if (!options.collection){
    throw new TypeError('The "collection" setting must be specified');
  }

  return function(files, metalsmith, done){

    const template = fs.readFileSync('./sample/src/__partials/pagination.html');

    var groupedPosts = filterObj(files, function(all, k){
      return Array.isArray(all[k].collection) && all[k].collection.indexOf(options.collection) >= 0;
    });


    let currPage = 1;

    groupedPosts.reduce(function(fileList, currentPost) {

      if (fileList['page/'+currPage+'/index.html'] == null){

        fileList['page/'+currPage+'/index.html'] = {
          layout: 'post.html',
          contents: template,
          pagination: {
            files: []
          }
        }

      }

      fileList['page/'+currPage+'/index.html'].pagination.files.push(currentPost);

      if (fileList['page/'+currPage+'/index.html'].pagination.files.length >= 4){
        currPage++;
      }

      return fileList;

    }, files);



    done();

  };

};
