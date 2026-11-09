export const THEME = {
  primary: '#2563EB', // Xanh dương giáo dục
  primaryDark: '#1D4ED8',
  primaryLight: '#3B82F6',
  primaryMuted: '#EFF6FF',
  primarySurface: '#DBEAFE',
  secondary: '#0D9488', // Teal
  secondaryMuted: '#F0FDFA',
  success: '#10B981',
  successLight: '#D1FAE5',
  warning: '#F59E0B',
  warningLight: '#FEF3C7',
  danger: '#EF4444',
  dangerLight: '#FEE2E2',
  background: '#F8FAFC',
  card: '#FFFFFF',
  textPrimary: '#0F172A',
  textSecondary: '#475569',
  textMuted: '#94A3B8',
  border: '#E2E8F0',
  borderLight: '#F1F5F9',
  accent: '#8B5CF6',
  accentLight: '#EDE9FE',
  shadow: 'rgba(0, 0, 0, 0.05)',
  shadowMedium: 'rgba(37, 99, 235, 0.08)',
};

export const SGK_BOOKS = [
  { id: 'kntt', name: 'Kết nối tri thức', short: 'KNTT', color: '#2563EB' },
  { id: 'cd', name: 'Cánh diều', short: 'CD', color: '#0D9488' },
  { id: 'ctst', name: 'Chân trời sáng tạo', short: 'CTST', color: '#D97706' },
];

export const GRADES = [
  { id: 12, name: 'Lớp 12', subtitle: 'Chuẩn tốt nghiệp THPT mới' },
  { id: 11, name: 'Lớp 11', subtitle: 'Chương trình GDPT 2018' },
  { id: 10, name: 'Lớp 10', subtitle: 'Chương trình GDPT 2018' },
];

export const EXAM_FORMATS = [
  {
    id: 'thpt_new',
    name: 'Đề tốt nghiệp THPT chuẩn quy định mới (Bộ GD&ĐT)',
    structure: '3 phần: 12 câu TN (3đ) + 4 câu Đ/S (4đ) + 6 câu Trả lời ngắn (3đ)',
    time: '90 phút',
    points: 10,
    parts: 3,
  },
  {
    id: 'dinh_ky',
    name: 'Đề kiểm tra định kỳ (Giữa kỳ / Cuối kỳ)',
    structure: 'Theo ma trận đặc tả Công văn 7991 (40% NB - 30% TH - 30% VD)',
    time: '60 phút',
    points: 10,
    parts: 3,
  },
];
