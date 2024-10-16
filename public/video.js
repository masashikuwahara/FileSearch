    // URLからファイル名を取得
    const urlParams = new URLSearchParams(window.location.search);
    const videoFile = urlParams.get('file');

    // 動画ファイルのURLを設定
    if (videoFile) {
      document.getElementById('videoSource').src = `/videos/${videoFile}`;
      document.getElementById('videoPlayer').load();
    }