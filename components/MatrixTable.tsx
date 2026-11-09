import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MatrixSummary, MatrixRowItem } from '../services/matrixEngine';
import { THEME } from '../constants/theme';

interface MatrixTableProps {
  summary: MatrixSummary;
  rows: MatrixRowItem[];
}

export const MatrixTable: React.FC<MatrixTableProps> = ({ summary, rows }) => {
  return (
    <View style={styles.container}>
      {/* 7991 Compliance Banner */}
      <View
        style={[
          styles.complianceBanner,
          summary.is7991Compliant ? styles.compliantBg : styles.warningBg,
        ]}
      >
        <Ionicons
          name={summary.is7991Compliant ? 'shield-checkmark' : 'warning'}
          size={18}
          color={summary.is7991Compliant ? '#059669' : '#D97706'}
        />
        <View style={styles.complianceTextWrap}>
          <Text
            style={[
              styles.complianceTitle,
              summary.is7991Compliant ? styles.compliantText : styles.warningText,
            ]}
          >
            {summary.is7991Compliant
              ? 'Khóa cứng Ma trận theo Công văn 7991 / BGDĐT'
              : 'Cảnh báo lệch Ma trận chuẩn 7991'}
          </Text>
          <Text style={styles.complianceDesc}>
            Phân bổ tỷ lệ chuẩn: 40% Nhận biết (NB) - 30% Thông hiểu (TH) - 30% Vận dụng (VD).
          </Text>
        </View>
      </View>

      {/* Metric Ratio Cards */}
      <View style={styles.ratioRow}>
        <View style={[styles.ratioCard, { backgroundColor: '#EFF6FF', borderColor: '#BFDBFE' }]}>
          <Text style={styles.ratioLabel}>Nhận biết (NB)</Text>
          <Text style={[styles.ratioValue, { color: '#2563EB' }]}>
            {summary.percentages.nb}%
          </Text>
          <Text style={styles.ratioSub}>
            {summary.counts.nb} câu ({summary.points.nb}đ) / Chuẩn 40%
          </Text>
        </View>

        <View style={[styles.ratioCard, { backgroundColor: '#ECFDF5', borderColor: '#A7F3D0' }]}>
          <Text style={styles.ratioLabel}>Thông hiểu (TH)</Text>
          <Text style={[styles.ratioValue, { color: '#059669' }]}>
            {summary.percentages.th}%
          </Text>
          <Text style={styles.ratioSub}>
            {summary.counts.th} câu ({summary.points.th}đ) / Chuẩn 30%
          </Text>
        </View>

        <View style={[styles.ratioCard, { backgroundColor: '#FFFBEB', borderColor: '#FDE68A' }]}>
          <Text style={styles.ratioLabel}>Vận dụng (VD)</Text>
          <Text style={[styles.ratioValue, { color: '#D97706' }]}>
            {summary.percentages.vd}%
          </Text>
          <Text style={styles.ratioSub}>
            {summary.counts.vd} câu ({summary.points.vd}đ) / Chuẩn 30%
          </Text>
        </View>
      </View>

      {/* Matrix Specification Table */}
      <View style={styles.tableCard}>
        <Text style={styles.tableTitle}>BẢNG ĐẶC TẢ CHI TIẾT MA TRẬN ĐỀ THI</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.tableGrid}>
            {/* Table Header Row 1 */}
            <View style={styles.tableHeaderRow}>
              <Text style={[styles.headerCell, styles.topicCol]}>Chuyên đề kiến thức</Text>
              <Text style={[styles.headerCell, styles.partCol]}>Phần I (TN 4 LC)</Text>
              <Text style={[styles.headerCell, styles.partCol]}>Phần II (Đúng/Sai)</Text>
              <Text style={[styles.headerCell, styles.partCol]}>Phần III (Trả lời ngắn)</Text>
              <Text style={[styles.headerCell, styles.scoreCol]}>Tổng điểm</Text>
            </View>

            {/* Sub-header row for cognitive levels */}
            <View style={styles.subHeaderRow}>
              <Text style={[styles.subHeaderCell, styles.topicCol]}>Mạch nội dung GDPT 2018</Text>
              <Text style={styles.miniCol}>NB</Text>
              <Text style={styles.miniCol}>TH</Text>
              <Text style={styles.miniCol}>VD</Text>
              <Text style={styles.miniCol}>NB</Text>
              <Text style={styles.miniCol}>TH</Text>
              <Text style={styles.miniCol}>VD</Text>
              <Text style={styles.miniCol}>NB</Text>
              <Text style={styles.miniCol}>TH</Text>
              <Text style={styles.miniCol}>VD</Text>
              <Text style={[styles.subHeaderCell, styles.scoreCol]}>10.0đ</Text>
            </View>

            {/* Rows */}
            {rows.map((row, idx) => (
              <View
                key={idx}
                style={[
                  styles.dataRow,
                  idx % 2 === 1 && { backgroundColor: '#F8FAFC' },
                ]}
              >
                <Text style={[styles.dataCell, styles.topicCol, { fontWeight: '600' }]}>
                  {row.topicName}
                </Text>
                {/* Part 1 */}
                <Text style={styles.miniData}>{row.part1.nb || '-'}</Text>
                <Text style={styles.miniData}>{row.part1.th || '-'}</Text>
                <Text style={styles.miniData}>{row.part1.vd || '-'}</Text>
                {/* Part 2 */}
                <Text style={styles.miniData}>{row.part2.nb || '-'}</Text>
                <Text style={styles.miniData}>{row.part2.th || '-'}</Text>
                <Text style={styles.miniData}>{row.part2.vd || '-'}</Text>
                {/* Part 3 */}
                <Text style={styles.miniData}>{row.part3.nb || '-'}</Text>
                <Text style={styles.miniData}>{row.part3.th || '-'}</Text>
                <Text style={styles.miniData}>{row.part3.vd || '-'}</Text>
                {/* Total */}
                <Text style={[styles.dataCell, styles.scoreCol, { fontWeight: 'bold', color: '#2563EB' }]}>
                  {row.totalScore}đ
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  complianceBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 12,
    gap: 10,
  },
  compliantBg: {
    backgroundColor: '#ECFDF5',
    borderColor: '#A7F3D0',
  },
  warningBg: {
    backgroundColor: '#FFFBEB',
    borderColor: '#FDE68A',
  },
  complianceTextWrap: {
    flex: 1,
  },
  complianceTitle: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  compliantText: {
    color: '#065F46',
  },
  warningText: {
    color: '#92400E',
  },
  complianceDesc: {
    fontSize: 11,
    color: '#475569',
    marginTop: 2,
  },
  ratioRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  ratioCard: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  ratioLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#475569',
  },
  ratioValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 2,
  },
  ratioSub: {
    fontSize: 9,
    color: '#64748B',
    textAlign: 'center',
  },
  tableCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  tableTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 10,
    textAlign: 'center',
  },
  tableGrid: {
    minWidth: 560,
  },
  tableHeaderRow: {
    flexDirection: 'row',
    backgroundColor: '#2563EB',
    paddingVertical: 8,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  headerCell: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 11,
    textAlign: 'center',
  },
  subHeaderRow: {
    flexDirection: 'row',
    backgroundColor: '#DBEAFE',
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#BFDBFE',
  },
  subHeaderCell: {
    fontSize: 10,
    fontWeight: '700',
    color: '#1E40AF',
    textAlign: 'center',
  },
  topicCol: {
    width: 170,
    textAlign: 'left',
    paddingLeft: 6,
  },
  partCol: {
    width: 96,
  },
  scoreCol: {
    width: 60,
  },
  miniCol: {
    width: 32,
    fontSize: 9,
    fontWeight: '700',
    color: '#1E40AF',
    textAlign: 'center',
  },
  dataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  dataCell: {
    fontSize: 11,
    color: '#334155',
  },
  miniData: {
    width: 32,
    fontSize: 11,
    textAlign: 'center',
    color: '#475569',
  },
});
