const SHAPE_A = [500, 800];
const SHAPE_B = [800, 500];

const ROW = SHAPE_A[0];
const COL = SHAPE_B[1];

function generateA() {
  const metric = [];
  for (let r = 1; r <= SHAPE_A[0]; r++) {
    const data = [];
    for (let c = 1; c <= SHAPE_A[1]; c++) {
      const value = 6.6 * r - 3.3 * c;
      data.push(value);
    }
    metric.push(data);
  }
  return metric;
}

function generateB() {
  const metric = [];
  for (let r = 1; r <= SHAPE_B[0]; r++) {
    const data = [];
    for (let c = 1; c <= SHAPE_B[1]; c++) {
      const value = 100 + 2.2 * r - 5.5 * c;
      data.push(value);
    }
    metric.push(data);
  }
  return metric;
}

function initMetric() {
  const metric = [];
  for (let i = 0; i < ROW; i++) {
    const data = [];
    for (let j = 0; j < COL; j++) data.push(0);
    metric.push(data);
  }
  return metric;
}

function calculateArray(a1, a2) {
  let rtn = 0;
  for (let i = 0; i < a1.length; i++) rtn += a1[i] * a2[i];
  return rtn;
}

async function execJob(a, b, output, start, end) {
  for (let r = start; r < end; r++) {
    for (let c = 0; c < b[0].length; c++) {
      const a1 = a[r];
      const a2 = b.map((element) => element[r]);
      const value = calculateArray(a1, a2);
      output[r][c] = value;
    }
  }
}

async function exec(a, b, output, thread) {
  const jobs = [];
  const rowEachThread = ROW / thread;
  for (let i = 0; i < ROW; i += rowEachThread)
    jobs.push(execJob(a, b, output, i, i + rowEachThread));
  await Promise.all(jobs);
}

async function main() {
  const A = generateA();
  const B = generateB();

  const jobName = process.argv[2];
  let metric = initMetric();

  switch (jobName) {
    case "A":
      await exec(A, B, metric, 1);
      break;
    case "B1":
      await exec(A, B, metric, 50);
      break;
    case "B2":
      await exec(A, B, metric, 10);
      break;
    default:
      throw new Error(`No job: ${jobName} found!`);
  }
}

main();
