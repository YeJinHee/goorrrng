const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "../test.txt";
const input = fs.readFileSync(filePath).toString();

const [N, C, ...data] = input
  .trim()
  .split(/\s/)
  .filter((e) => e) // 이건 백준에서는 넣지 않아도 성공, 로컬에서는 실패
  .map(Number);
data.sort((a, b) => a - b);

let start = 1;
let end = data[data.length - 1];

while (start <= end) {
  const mid = Math.floor((start + end) / 2);

  let count = 1;
  let prev = data[0];
  for (const cur of data) {
    if (cur - prev < mid) continue;
    prev = cur;
    count += 1;
  }

  if (count < C) end = mid - 1;
  else start = mid + 1;
}

console.log(end);

// 입력 데이터를 읽어와서 숫자로 변환하고 정렬
// 이진 탐색을 통해 가능한 거리의 범위를 좁힘
// 공유기를 설치하면서 최소 거리 조건을 만족하는 최대 거리를 찾음
// 최종적으로 찾은 최대 거리를 출력