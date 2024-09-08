// YouTubeのURLリストを定義
const videoLinks = [
    { url: 'https://www.youtube.com/watch?v=T_zbxgbtzow' },
    { url: 'https://www.youtube.com/watch?v=i5glIXjx0UQ' },
    { url: 'https://www.youtube.com/watch?v=U3aUTLdFaGs&t=9826s' }
];

// ページが読み込まれたら動画を表示
document.addEventListener('DOMContentLoaded', function() {
    videoLinks.forEach(video => {
        const videoId = getYouTubeVideoId(video.url);
        if (videoId) {
            displayVideo(videoId, video.url);
        }
    });
});

// YouTubeのURLから動画IDを抽出する関数
function getYouTubeVideoId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

// サムネイルとタイトルを表示する関数
function displayVideo(videoId, videoUrl) {
    const videoList = document.getElementById('videoList');

    // サムネイルのURL
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;

    // 動画タイトル取得用のAPI URL
    const apiUrl = `https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoId}`;

    // サムネイルとタイトルを表示するdiv要素を作成
    const videoItem = document.createElement('div');
    videoItem.className = 'video-item';

    // サムネイル画像をリンクに追加
    const link = document.createElement('a');
    link.href = videoUrl;
    link.target = '_blank'; // 新しいタブで開く

    const img = document.createElement('img');
    img.src = thumbnailUrl;
    img.alt = 'YouTubeサムネイル';

    link.appendChild(img); // リンク内に画像を追加

    // タイトルを取得してリンクの下に表示
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const titleLink = document.createElement('a');
            titleLink.href = videoUrl;
            titleLink.target = '_blank'; // 新しいタブで開く
            titleLink.textContent = data.title || '動画タイトル';

            videoItem.appendChild(link);    // サムネイルリンクを追加
            videoItem.appendChild(titleLink); // タイトルリンクを追加
            videoList.appendChild(videoItem);
        })
        .catch(error => console.error('Error fetching video title:', error));
}
