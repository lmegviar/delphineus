var multer  = require('multer');
var upload = multer({dest: './uploads/' }).any(); ////stores file temporarily in uploads folder, boom!
var Storage = require('@google-cloud/storage'); //Don't forget to npm install to get this badboy and multer on line uno
var storage = Storage({
  projectId: 'hacksource',
  keyFilename: './google-cloud-storage-key.json' //make a file in project root of this name and either create your own google cloud storage db and key, or ask Simon for his key.
});

var bucket = storage.bucket('hacksource'); //name of bucket in the google cloud storage

module.exports = {
  uploadTheFile: function(req, res, next) {
    console.log('hello again __________');
    if (!req.file) {
      console.log('problem', req.fieldname);
      return next();
    }
    bucket.upload(req.file.path, function(err, file) {
      if (err) {
        console.log('uploading error', err)
;      }
      if (!err) {
        console.log('success uploading');
      }
    });
  },

  addFile: function(req, res, next) {
    console.log('HELLO MAN _______________');
    upload(req, res, function(err) {
      if (err) {
        console.log(err);
        return res.end('Error uploading the file.');
      } else {
            //controllerfile.sendUploadToGCS(req, res, next);
        console.log('rbody', req.body);
        var rponse;

        req.files.forEach(function(item) {
          console.log('item',item);
          rponse = item.filename;
          req.file = item;
          module.exports.uploadTheFile(req, res, next);
        })

      }
      res.end(rponse)

    });
  }
};


