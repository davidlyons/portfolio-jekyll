const imagemin = require('imagemin');
const webp = require('imagemin-webp');

(async () => {
  await imagemin(['projects/**/*-thumb.{jpg,png}'], {
    destination: 'projects/thumbs',
    plugins: [webp({ quality: 75 })],
  });

  console.log('Images optimized');
})();
