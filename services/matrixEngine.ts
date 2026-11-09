import { HIGH_SCHOOL_MATH_CURRICULUM, CurriculumTopic } from '../data/curriculum';
import { QuestionItem } from '../data/mockQuestions';

export interface MatrixSummary {
  totalQuestions: number;
  totalPoints: number;
  counts: {
    nb: number;
    th: number;
    vd: number;
  };
  points: {
    nb: number;
    th: number;
    vd: number;
  };
  percentages: {
    nb: number;
    th: number;
    vd: number;
  };
  is7991Compliant: boolean;
  warnings: string[];
}

export function calculateMatrixSummary(questions: QuestionItem[]): MatrixSummary {
  let nbCount = 0;
  let thCount = 0;
  let vdCount = 0;

  let nbPoints = 0;
  let thPoints = 0;
  let vdPoints = 0;

  questions.forEach((q) => {
    if (q.level === 'NB') {
      nbCount++;
      nbPoints += q.points;
    } else if (q.level === 'TH') {
      thCount++;
      thPoints += q.points;
    } else if (q.level === 'VD') {
      vdCount++;
      vdPoints += q.points;
    }
  });

  const totalPoints = nbPoints + thPoints + vdPoints;
  const safeTotalPoints = totalPoints > 0 ? totalPoints : 1;

  const nbPercent = Math.round((nbPoints / safeTotalPoints) * 100);
  const thPercent = Math.round((thPoints / safeTotalPoints) * 100);
  const vdPercent = Math.round((vdPoints / safeTotalPoints) * 100);

  const warnings: string[] = [];

  // Chuẩn CV 7991: 40% NB - 30% TH - 30% VD (cho phép dung sai ±5% trong đề mẫu)
  const isNbValid = Math.abs(nbPercent - 40) <= 8;
  const isThValid = Math.abs(thPercent - 30) <= 8;
  const isVdValid = Math.abs(vdPercent - 30) <= 8;

  if (!isNbValid) {
    warnings.push(`Tỷ lệ Nhận biết hiện là ${nbPercent}% (Chuẩn CV 7991 là 40%).`);
  }
  if (!isThValid) {
    warnings.push(`Tỷ lệ Thông hiểu hiện là ${thPercent}% (Chuẩn CV 7991 là 30%).`);
  }
  if (!isVdValid) {
    warnings.push(`Tỷ lệ Vận dụng hiện là ${vdPercent}% (Chuẩn CV 7991 là 30%).`);
  }

  return {
    totalQuestions: questions.length,
    totalPoints: Number(totalPoints.toFixed(2)),
    counts: { nb: nbCount, th: thCount, vd: vdCount },
    points: {
      nb: Number(nbPoints.toFixed(2)),
      th: Number(thPoints.toFixed(2)),
      vd: Number(vdPoints.toFixed(2)),
    },
    percentages: { nb: nbPercent, th: thPercent, vd: vdPercent },
    is7991Compliant: warnings.length === 0,
    warnings,
  };
}

export interface MatrixRowItem {
  topicName: string;
  part1: { nb: number; th: number; vd: number };
  part2: { nb: number; th: number; vd: number };
  part3: { nb: number; th: number; vd: number };
  totalScore: number;
}

export function generateMatrixTableRows(questions: QuestionItem[]): MatrixRowItem[] {
  const rowMap: Record<string, MatrixRowItem> = {};

  questions.forEach((q) => {
    if (!rowMap[q.topicName]) {
      rowMap[q.topicName] = {
        topicName: q.topicName,
        part1: { nb: 0, th: 0, vd: 0 },
        part2: { nb: 0, th: 0, vd: 0 },
        part3: { nb: 0, th: 0, vd: 0 },
        totalScore: 0,
      };
    }

    const row = rowMap[q.topicName];
    const lvlKey = q.level === 'NB' ? 'nb' : q.level === 'TH' ? 'th' : 'vd';

    if (q.part === 1) {
      row.part1[lvlKey]++;
    } else if (q.part === 2) {
      row.part2[lvlKey]++;
    } else if (q.part === 3) {
      row.part3[lvlKey]++;
    }

    row.totalScore += q.points;
  });

  return Object.values(rowMap).map((r) => ({
    ...r,
    totalScore: Number(r.totalScore.toFixed(2)),
  }));
}
