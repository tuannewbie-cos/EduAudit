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
import { MOCK_STUDENTS, StudentSubmission } from '../../data/mockStudents';
import { computeClassAnalytics } from '../../services/omrGrader';
import { OmrScannerModal } from '../../components/OmrScannerModal';
import { AnalyticsCharts } from '../../components/AnalyticsCharts';

export default function SmartOmrScreen() {
  const [students, setStudents] = useState<StudentSubmission[]>(MOCK_STUDENTS);
  const [showScanner, setShowScanner] = useState(false);
  const [activeTab, setActiveTab] = useState<'analytics' | 'gradebook'>('analytics');

  const analytics = computeClassAnalytics(students);

  const handleScanComplete = (newStudent: StudentSubmission) => {
    setStudents((prev) => [newStudent, ...prev]);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <View style={styles.headerBadge}>
              <Text style={styles.headerBadgeText}>MODULE 4</Text>
            </View>
            <Text style={styles.headerTitle}>Smart OMR Camera Scanner</Text>
            <Text style={styles.headerSubtitle}>
              Chấm phiếu thi tự động 1s/bài & Báo cáo lỗ hổng kiến thức
            </Text>
          </View>

          {/* Quick Camera Trigger */}
          <TouchableOpacity
            style={styles.scanTriggerBtn}
            onPress={() => setShowScanner(true)}
            activeOpacity={0.8}
          >
            <Ionicons name="camera" size={16} color="#FFFFFF" />
            <Text style={styles.scanTriggerBtnText}>Quét bài</Text>
          </TouchableOpacity>
        </View>

        {/* Tab switcher: Deficit Analytics vs Gradebook */}
        <View style={styles.tabSwitcher}>
          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'analytics' && styles.activeTabBtn]}
            onPress={() => setActiveTab('analytics')}
          >
            <Ionicons
              name="analytics"
              size={14}
              color={activeTab === 'analytics' ? '#2563EB' : '#DBEAFE'}
            />
            <Text
              style={[
                styles.tabBtnText,
                activeTab === 'analytics' && styles.activeTabBtnText,
              ]}
            >
              Phân tích Lỗ hổng Ma trận
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'gradebook' && styles.activeTabBtn]}
            onPress={() => setActiveTab('gradebook')}
          >
            <Ionicons
              name="list"
              size={14}
              color={activeTab === 'gradebook' ? '#2563EB' : '#DBEAFE'}
            />
            <Text
              style={[
                styles.tabBtnText,
                activeTab === 'gradebook' && styles.activeTabBtnText,
              ]}
            >
              Bảng điểm lớp ({students.length})
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.body}>
        {/* View 1: Deficit Analytics Dashboard */}
        {activeTab === 'analytics' && (
          <AnalyticsCharts analytics={analytics} />
        )}

        {/* View 2: Electronic Class Gradebook */}
        {activeTab === 'gradebook' && (
          <View style={styles.gradebookCard}>
            <View style={styles.gradebookHeader}>
              <Text style={styles.gradebookTitle}>BẢNG ĐIỂM ĐIỆN TỬ LỚP 12A1</Text>
              <Text style={styles.gradebookSub}>
                Chấm bằng mã QR định danh trên phôi đề (101 - 104)
              </Text>
            </View>

            <View style={styles.studentList}>
              {students.map((st, idx) => (
                <View key={st.id} style={styles.studentRow}>
                  <View style={styles.stIndexBox}>
                    <Text style={styles.stIndexText}>{idx + 1}</Text>
                  </View>
                  <View style={styles.stInfo}>
                    <Text style={styles.stName}>{st.name}</Text>
                    <Text style={styles.stMeta}>
                      SBD: {st.sbd} | Đề: {st.examCode} | {st.timestamp}
                    </Text>
                  </View>
                  <View style={styles.stScoresCol}>
                    <Text
                      style={[
                        styles.stTotalScore,
                        st.totalScore >= 8.5
                          ? styles.scoreGreen
                          : st.totalScore >= 6.5
                          ? styles.scoreBlue
                          : styles.scoreOrange,
                      ]}
                    >
                      {st.totalScore}đ
                    </Text>
                    <Text style={styles.stBreakdown}>
                      {st.scorePart1} / {st.scorePart2} / {st.scorePart3}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}
      </View>

      {/* Camera OMR Scanner Modal */}
      <OmrScannerModal
        visible={showScanner}
        onClose={() => setShowScanner(false)}
        onScanComplete={handleScanComplete}
      />
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
    paddingBottom: 14,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  headerBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginBottom: 4,
  },
  headerBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 11,
    color: '#DBEAFE',
    marginTop: 2,
  },
  scanTriggerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#D97706',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  scanTriggerBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  tabSwitcher: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 8,
    padding: 3,
    gap: 4,
  },
  tabBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 7,
    borderRadius: 6,
  },
  activeTabBtn: {
    backgroundColor: '#FFFFFF',
  },
  tabBtnText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#DBEAFE',
  },
  activeTabBtnText: {
    color: '#2563EB',
    fontWeight: 'bold',
  },
  body: {
    padding: 16,
    paddingBottom: 40,
  },
  gradebookCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  gradebookHeader: {
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    marginBottom: 10,
  },
  gradebookTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  gradebookSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  studentList: {
    gap: 8,
  },
  studentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  stIndexBox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  stIndexText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#475569',
  },
  stInfo: {
    flex: 1,
  },
  stName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  stMeta: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 2,
  },
  stScoresCol: {
    alignItems: 'flex-end',
  },
  stTotalScore: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  scoreGreen: {
    color: '#059669',
  },
  scoreBlue: {
    color: '#2563EB',
  },
  scoreOrange: {
    color: '#D97706',
  },
  stBreakdown: {
    fontSize: 9,
    color: '#64748B',
    marginTop: 2,
  },
});
