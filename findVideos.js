const fs = require('fs');
const path = require('path');

// 検索対象のディレクトリを指定
const folderPath = './youtube';

// 動画ファイルの拡張子リスト
const videoExtensions = ['.mp4', '.avi', '.mov', '.mkv'];

fs.readdir(folderPath, (err, files) => {
  if (err) {
    return console.error('フォルダの読み込みエラー:', err);
  }

  // 動画ファイルをフィルタリング
  const videoFiles = files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return videoExtensions.includes(ext);
  });

  // 結果を表示
  if (videoFiles.length > 0) {
    console.log('見つかった動画ファイル:');
    videoFiles.forEach(file => console.log(file));
  } else {
    console.log('動画ファイルが見つかりませんでした。');
  }
});
