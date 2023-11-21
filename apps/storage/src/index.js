const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 32070;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

//
// Registers a HTTP GET route for video streaming.
//

app.get('/video', async (req, res) => {
  // Route for streaming video.
  console.log('Request received! ');
  res.redirect('/video-streaming');
});

app.get('/video-streaming', async (req, res) => {
  // Route for streaming video.
  const videoPath = 'video.mp4';
  const stat = fs.statSync(videoPath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (!range) {
    console.log('no range');
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(200, head);
    // fs.createReadStream(videoPath).pipe(res);
    res.send();
  } else {
    console.log('range=', range);
    const CHUNK_SIZE = 10 ** 6;
    const start = Number(range.replace(/\D/g, ''));
    const end = Math.min(start + CHUNK_SIZE, fileSize - 1);
    const contentLength = end - start + 1;
    const headers = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': contentLength,
      'Content-Type': 'video/mp4',
    };
    console.log('start=', start, 'end=', end, 'contentLength=', contentLength);
    res.writeHead(206, headers);
    const videoStream = fs.createReadStream(videoPath, { start, end });
    // const videoStream = fs.createReadStream(videoPath);

    // 1. stream 생성
    // 2. 잘게 쪼개진 stream 이 몇번 전송되는지 확인하기 위한 count
    var count = 0;
    let sum = 0;

    // 3. 잘게 쪼개진 data를 전송할 수 있으면 data 이벤트 발생
    videoStream.on('data', function (data) {
      count = count + 1;
      sum += data.length;
      console.log('data count=', count, data.length, sum);
      // 3.1. data 이벤트가 발생되면 해당 data를 클라이언트로 전송
      res.write(data);
    });

    // 4. 데이터 전송이 완료되면 end 이벤트 발생
    videoStream.on('end', function () {
      console.log('end streaming');
      // 4.1. 클라이언트에 전송완료를 알림
      videoStream.pipe(res);
      res.end();
    });

    // 5. 스트림도중 에러 발생시 error 이벤트 발생
    videoStream.on('error', function (err) {
      console.log(err);
      // 5.2. 클라이언트로 에러메시지를 전달하고 전송완료
      res.end('500 Internal Server ' + err);
    });
  }
});

//
// Starts the HTTP server.
//
app.listen(PORT, () => {
  console.log(
    `Microservice listening on port ${PORT}, point your browser at http://localhost:${PORT} http://localhost:${PORT}/video`,
  );
});
