const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// 動画ファイルを検索するディレクトリ
const folderPath = './videos';

// 動画ファイルの拡張子リスト
const videoExtensions = ['.mp4', '.avi', '.mov', '.mkv'];

// 静的ファイル（HTML, CSS, JSなど）を提供
app.use(express.static(path.join(__dirname, 'public')));

// 動画ファイルのリストを返すAPIエンドポイント
app.get('/api/videos', (req, res) => {
  const keyword = req.query.keyword ? req.query.keyword.toLowerCase() : '';

  fs.readdir(folderPath, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'フォルダの読み込みエラー' });
    }

    // 動画ファイルをフィルタリング（キーワードにマッチするファイル名のみ）
    const videoFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return videoExtensions.includes(ext) && file.toLowerCase().includes(keyword);
    });

    // 結果をJSONで返す
    res.json(videoFiles);
  });
});

// サーバーを起動
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get('/video/:filename', (req, res) => {
  const filename = req.params.filename;
  res.sendFile(path.join(__dirname, 'public', 'video.html'));
});

app.use('/videos', express.static(path.join(__dirname, 'videos')));