import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { INITIAL_EXAM_QUESTIONS, QuestionItem } from '../../data/mockQuestions';
import {
  calculateMatrixSummary,
  generateMatrixTableRows,
} from '../../services/matrixEngine';
import { MatrixTable } from '../../components/MatrixTable';

export default function MatrixEngineScreen() {
  const router = useRouter();
  const [questions] = useState<QuestionItem[]>(INITIAL_EXAM_QUESTIONS);

  const summary = calculateMatrixSummary(questions);
  const rows = generateMatrixTableRows(questions);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerBadge}>
          <Text style={styles.headerBadgeText}>MODULE 2</Text>
        </View>
        <Text style={styles.headerTitle}>Hybrid Processing & Matrix Engine</Text>
        <Text style={styles.headerSubtitle}>
          Khóa cứng chuẩn Bộ GD&ĐT Công văn 7991 & Kiểm toán toán học SymPy
        </Text>
      </View>

      <View style={styles.body}>
        {/* CV 7991 Interactive Matrix Table Component */}
        <MatrixTable summary={summary} rows={rows} />

        {/* SymPy Math Audit Section */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.cardHeaderLeft}>
              <Ionicons name="shield-checkmark" size={18} color="#059669" />
              <Text style={styles.cardTitle}>Tầng kiểm toán toán học SymPy ngầm</Text>
            </View>
            <View style={styles.zeroHallucinationBadge}>
              <Text style={styles.zeroHallucinationText}>0% Ảo giác số học AI</Text>
            </View>
          </View>

          <Text style={styles.auditIntro}>
            Khác với ChatGPT thông thường dễ mắc lỗi tính toán số học, EduAudit kích hoạt engine giải toán SymPy chạy ngầm để xác thực độc lập 100% đáp án trước khi phát hành đề.
          </Text>

          {/* Audit Verification Log Cards */}
          <View style={styles.logList}>
            {questions.slice(0, 4).map((q) => (
              <View key={q.id} style={styles.logItem}>
                <View style={styles.logItemTop}>
                  <Text style={styles.logItemCode}>{q.code} - {q.topicName}</Text>
                  <View style={styles.logTimePill}>
                    <Text style={styles.logTimeText}>{q.sympyAudit.executionTimeMs}ms</Text>
                  </View>
                </View>
                <Text style={styles.logFormula}>
                  $ {q.sympyAudit.verificationFormula}
                </Text>
                <Text style={styles.logText}>
                  ✓ Kết quả: {q.sympyAudit.computedResult}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Duplicate Guard Card */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.cardHeaderLeft}>
              <Ionicons name="copy-outline" size={18} color="#2563EB" />
              <Text style={styles.cardTitle}>Chống trùng lặp đề (Duplicate Guard)</Text>
            </View>
            <View style={[styles.zeroHallucinationBadge, { backgroundColor: '#EFF6FF', borderColor: '#BFDBFE' }]}>
              <Text style={[styles.zeroHallucinationText, { color: '#2563EB' }]}>Trùng 0%</Text>
            </View>
          </View>
          <Text style={styles.auditIntro}>
            Lưu vết lịch sử khảo thí theo từng lớp và ca thi. Tự động hoán vị tham số để các lớp thi lệch giờ (12A1, 12A2, 12A3) không thể chép bài nhau nhưng vẫn bảo đảm đồng nhất 100% độ khó Ma trận 7991.
          </Text>
        </View>

        {/* Action Button to Module 3 */}
        <TouchableOpacity
          style={styles.nextBtn}
          onPress={() => router.push('/editor')}
          activeOpacity={0.8}
        >
          <Text style={styles.nextBtnText}>
            Tiếp tục sang Module 3: Tinh chỉnh Thẻ & Xuất bản 1-chạm
          </Text>
          <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    backgroundColor: '#2563EB',
    paddingTop: Platform.OS === 'ios' ? 56 : 36,
    paddingBottom: 20,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginBottom: 6,
  },
  headerBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#DBEAFE',
    marginTop: 2,
  },
  body: {
    padding: 16,
    gap: 14,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#0F172A',
    flex: 1,
  },
  zeroHallucinationBadge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  zeroHallucinationText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#059669',
  },
  auditIntro: {
    fontSize: 12,
    color: '#475569',
    lineHeight: 18,
    marginBottom: 12,
  },
  logList: {
    gap: 8,
  },
  logItem: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  logItemTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  logItemCode: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  logTimePill: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
  },
  logTimeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#2563EB',
  },
  logFormula: {
    fontSize: 11,
    fontFamily: Platform.select({ ios: 'Courier', default: 'monospace' }),
    color: '#475569',
    marginBottom: 2,
  },
  logText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#059669',
  },
  nextBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#2563EB',
    borderRadius: 10,
    paddingVertical: 12,
  },
  nextBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12.5,
  },
});
