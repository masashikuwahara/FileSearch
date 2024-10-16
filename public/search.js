document.getElementById('searchForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const keyword = document.getElementById('searchInput').value;

  fetch(`http://localhost:3000/api/videos?keyword=${encodeURIComponent(keyword)}`)
    .then(response => response.json())
    .then(files => {
      const videoList = document.getElementById('videoList');
      videoList.innerHTML = '';

      if (files.length === 0) {
        videoList.textContent = '該当する動画が見つかりませんでした。';
      } else {
        files.forEach(file => {
          const li = document.createElement('li');
          const a = document.createElement('a');
          // クエリパラメータとしてファイル名を渡す
          a.href = `/video.html?file=${encodeURIComponent(file)}`;
          a.textContent = file;
          li.appendChild(a);
          videoList.appendChild(li);
        });
      }
    })
    .catch(error => {
      console.error('エラー:', error);
    });
});