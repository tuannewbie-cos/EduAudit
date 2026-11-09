export interface StudentSubmission {
  id: string;
  name: string;
  sbd: string; // Số báo danh
  className: string;
  examCode: string; // 101, 102, 103, 104
  timestamp: string;
  status: 'Scanned' | 'Verified';
  scorePart1: number; // Max 1.0 (trong đề mẫu 4 câu)
  scorePart2: number; // Max 2.0 (trong đề mẫu 2 câu)
  scorePart3: number; // Max 1.0 (trong đề mẫu 2 câu)
  totalScore: number; // quy đổi thang 10
  cognitiveScores: {
    nb: number; // Nhận biết
    th: number; // Thông hiểu
    vd: number; // Vận dụng
  };
  deficitTopics: {
    topicId: string;
    topicName: string;
    level: 'NB' | 'TH' | 'VD';
    isPassed: boolean;
    mistakeDetail: string;
  }[];
}

export const MOCK_STUDENTS: StudentSubmission[] = [
  {
    id: 'hs1',
    name: 'Nguyễn Hoàng Long',
    sbd: '120101',
    className: '12A1',
    examCode: '101',
    timestamp: '14:22:10 - 09/11/2026',
    status: 'Verified',
    scorePart1: 1.0,
    scorePart2: 1.75,
    scorePart3: 1.0,
    totalScore: 9.25,
    cognitiveScores: { nb: 100, th: 95, vd: 85 },
    deficitTopics: [
      {
        topicId: 'g12_kntt_c2',
        topicName: 'Tọa độ không gian Oxyz',
        level: 'VD',
        isPassed: false,
        mistakeDetail: 'Sai ý d trong câu Mặt phẳng song song (nhầm hệ số tự do D)',
      },
    ],
  },
  {
    id: 'hs2',
    name: 'Trần Thị Mai Anh',
    sbd: '120102',
    className: '12A1',
    examCode: '102',
    timestamp: '14:22:18 - 09/11/2026',
    status: 'Verified',
    scorePart1: 0.75,
    scorePart2: 1.5,
    scorePart3: 0.5,
    totalScore: 7.75,
    cognitiveScores: { nb: 90, th: 75, vd: 65 },
    deficitTopics: [
      {
        topicId: 'g12_kntt_c1',
        topicName: 'Bài toán tối ưu thực tế',
        level: 'VD',
        isPassed: false,
        mistakeDetail: 'Quên trừ cạnh giáp bờ sông khi lập hàm diện tích S(x)',
      },
      {
        topicId: 'g12_kntt_c1',
        topicName: 'Đồ thị hàm bậc ba',
        level: 'TH',
        isPassed: false,
        mistakeDetail: 'Nhầm dấu hệ số a < 0 với a > 0 ở nhánh vô cùng',
      },
    ],
  },
  {
    id: 'hs3',
    name: 'Lê Minh Tuấn',
    sbd: '120103',
    className: '12A1',
    examCode: '103',
    timestamp: '14:22:25 - 09/11/2026',
    status: 'Verified',
    scorePart1: 0.75,
    scorePart2: 1.25,
    scorePart3: 1.0,
    totalScore: 8.0,
    cognitiveScores: { nb: 100, th: 80, vd: 70 },
    deficitTopics: [
      {
        topicId: 'g12_kntt_c1',
        topicName: 'Khảo sát hàm phân thức',
        level: 'TH',
        isPassed: false,
        mistakeDetail: 'Nhầm kết luận đồng biến trên ℝ \\ {-1} thay vì từng khoảng',
      },
    ],
  },
  {
    id: 'hs4',
    name: 'Phạm Hương Giang',
    sbd: '120104',
    className: '12A1',
    examCode: '104',
    timestamp: '14:22:31 - 09/11/2026',
    status: 'Verified',
    scorePart1: 1.0,
    scorePart2: 2.0,
    scorePart3: 1.0,
    totalScore: 10.0,
    cognitiveScores: { nb: 100, th: 100, vd: 100 },
    deficitTopics: [],
  },
  {
    id: 'hs5',
    name: 'Vũ Đức Thịnh',
    sbd: '120105',
    className: '12A1',
    examCode: '101',
    timestamp: '14:22:42 - 09/11/2026',
    status: 'Verified',
    scorePart1: 0.5,
    scorePart2: 0.85,
    scorePart3: 0.5,
    totalScore: 5.5,
    cognitiveScores: { nb: 70, th: 55, vd: 40 },
    deficitTopics: [
      {
        topicId: 'g12_kntt_c1',
        topicName: 'Khảo sát hàm số & Tiệm cận',
        level: 'TH',
        isPassed: false,
        mistakeDetail: 'Xác định sai tiệm cận đứng x = -1',
      },
      {
        topicId: 'g12_kntt_c1',
        topicName: 'Bài toán tối ưu rào đất',
        level: 'VD',
        isPassed: false,
        mistakeDetail: 'Không tìm được đỉnh parabol, điền sai kết quả',
      },
      {
        topicId: 'g12_kntt_c2',
        topicName: 'Khoảng cách điểm đến mặt phẳng',
        level: 'VD',
        isPassed: false,
        mistakeDetail: 'Áp dụng sai công thức mẫu số căn bậc hai',
      },
    ],
  },
  {
    id: 'hs6',
    name: 'Đỗ Hà My',
    sbd: '120106',
    className: '12A1',
    examCode: '102',
    timestamp: '14:22:50 - 09/11/2026',
    status: 'Verified',
    scorePart1: 1.0,
    scorePart2: 1.6,
    scorePart3: 1.0,
    totalScore: 8.8,
    cognitiveScores: { nb: 100, th: 90, vd: 75 },
    deficitTopics: [
      {
        topicId: 'g12_kntt_c1',
        topicName: 'Đơn điệu hàm phân thức',
        level: 'TH',
        isPassed: false,
        mistakeDetail: 'Mắc bẫy kết luận tập hợp ℝ \\ {-1}',
      },
    ],
  },
];
