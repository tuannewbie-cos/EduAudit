import { StudentSubmission } from '../data/mockStudents';

/**
 * Thang điểm lũy tiến chuẩn của Bộ GD&ĐT dành cho câu trắc nghiệm Đúng / Sai (Phần II)
 */
export function calculateProgressiveScore(correctCount: number): number {
  switch (correctCount) {
    case 1:
      return 0.1;
    case 2:
      return 0.25;
    case 3:
      return 0.5;
    case 4:
      return 1.0;
    default:
      return 0.0;
  }
}

export interface ClassAnalyticsSummary {
  totalStudents: number;
  averageScore: number;
  highestScore: number;
  lowestScore: number;
  gradeDistribution: {
    excellent: number; // >= 8.5
    good: number; // 7.0 - 8.4
    average: number; // 5.0 - 6.9
    poor: number; // < 5.0
  };
  cognitiveMastery: {
    nb: number; // % trung bình
    th: number;
    vd: number;
  };
  deficitAlerts: {
    topic: string;
    level: string;
    failureRate: number; // % học sinh làm sai
    recommendation: string;
  }[];
}

export function computeClassAnalytics(students: StudentSubmission[]): ClassAnalyticsSummary {
  if (students.length === 0) {
    return {
      totalStudents: 0,
      averageScore: 0,
      highestScore: 0,
      lowestScore: 0,
      gradeDistribution: { excellent: 0, good: 0, average: 0, poor: 0 },
      cognitiveMastery: { nb: 0, th: 0, vd: 0 },
      deficitAlerts: [],
    };
  }

  let totalScoreSum = 0;
  let highest = -1;
  let lowest = 999;

  let exc = 0;
  let gd = 0;
  let avg = 0;
  let pr = 0;

  let sumNb = 0;
  let sumTh = 0;
  let sumVd = 0;

  const mistakeFrequency: Record<string, { count: number; level: string }> = {};

  students.forEach((s) => {
    totalScoreSum += s.totalScore;
    if (s.totalScore > highest) highest = s.totalScore;
    if (s.totalScore < lowest) lowest = s.totalScore;

    if (s.totalScore >= 8.5) exc++;
    else if (s.totalScore >= 7.0) gd++;
    else if (s.totalScore >= 5.0) avg++;
    else pr++;

    sumNb += s.cognitiveScores.nb;
    sumTh += s.cognitiveScores.th;
    sumVd += s.cognitiveScores.vd;

    s.deficitTopics.forEach((t) => {
      if (!t.isPassed) {
        if (!mistakeFrequency[t.topicName]) {
          mistakeFrequency[t.topicName] = { count: 0, level: t.level };
        }
        mistakeFrequency[t.topicName].count++;
      }
    });
  });

  const n = students.length;

  const deficitAlerts = Object.entries(mistakeFrequency)
    .map(([topic, data]) => {
      const rate = Math.round((data.count / n) * 100);
      let recommendation = '';
      if (topic.includes('phân thức') || topic.includes('đơn điệu')) {
        recommendation = 'Nhắc nhở học sinh: Kết luận khoảng đồng biến trên từng khoảng rời nhau, không dùng ký hiệu hợp hoặc hiệu tập hợp.';
      } else if (topic.includes('tối ưu') || topic.includes('thực tế')) {
        recommendation = 'Luyện tập thêm dạng bài mô hình hóa hình học và tìm cực trị tam thức bậc hai theo ngữ cảnh thực tế.';
      } else if (topic.includes('Oxyz') || topic.includes('mặt phẳng')) {
        recommendation = 'Ôn tập công thức khoảng cách từ điểm đến mặt phẳng và điều kiện song song giữa hai mặt phẳng.';
      } else {
        recommendation = 'Cần giao thêm 5 câu luyện tập bổ trợ trên phiếu học tập tuần tới.';
      }

      return {
        topic,
        level: data.level === 'NB' ? 'Nhận biết' : data.level === 'TH' ? 'Thông hiểu' : 'Vận dụng',
        failureRate: rate,
        recommendation,
      };
    })
    .sort((a, b) => b.failureRate - a.failureRate);

  return {
    totalStudents: n,
    averageScore: Number((totalScoreSum / n).toFixed(2)),
    highestScore: highest,
    lowestScore: lowest,
    gradeDistribution: {
      excellent: exc,
      good: gd,
      average: avg,
      poor: pr,
    },
    cognitiveMastery: {
      nb: Math.round(sumNb / n),
      th: Math.round(sumTh / n),
      vd: Math.round(sumVd / n),
    },
    deficitAlerts,
  };
}
