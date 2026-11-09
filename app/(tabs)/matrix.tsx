import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { INITIAL_EXAM_QUESTIONS } from '../../data/mockQuestions';
import {
  calculateMatrixSummary,
  generateMatrixTableRows,
} from '../../services/matrixEngine';
import { MatrixTable } from '../../components/MatrixTable';

export default function MatrixScreen() {
  const router = useRouter();

  // Active matrix settings
  const [matrixName, setMatrixName] = useState('Công văn 7991 / BGDĐT (Chuẩn quy định hiện hành)');
  const [nbRatio, setNbRatio] = useState('40');
  const [thRatio, setThRatio] = useState('30');
  const [vdRatio, setVdRatio] = useState('30');
  const [totalTime, setTotalTime] = useState('90');

  // Show update matrix section
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateNotice, setUpdateNotice] = useState<string | null>(null);

  const summary = calculateMatrixSummary(INITIAL_EXAM_QUESTIONS);
  const rows = generateMatrixTableRows(INITIAL_EXAM_QUESTIONS);

  const handleApplyNewMatrix = () => {
    setUpdateNotice('✓ Đã cập nhật và áp dụng khung ma trận mới cho bộ đề thi!');
    setShowUpdateModal(false);
    setTimeout(() => setUpdateNotice(null), 3000);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerTitle}>Ma trận đề thi</Text>
            <Text style={styles.headerSubtitle}>
              Khung ma trận đặc tả bám sát quy định Bộ GD&ĐT
            </Text>
          </View>

          {/* Nút nhỏ riêng: Cập nhật ma trận */}
          <TouchableOpacity
            style={styles.updateMatrixBtn}
            onPress={() => setShowUpdateModal(!showUpdateModal)}
            activeOpacity={0.8}
          >
            <Ionicons
              name={showUpdateModal ? 'chevron-up' : 'settings-outline'}
              size={14}
              color="#2563EB"
            />
            <Text style={styles.updateMatrixBtnText}>Cập nhật ma trận</Text>
          </TouchableOpacity>
        </View>

        {/* Current Active Matrix Name */}
        <View style={styles.activeMatrixPill}>
          <Ionicons name="shield-checkmark" size={13} color="#2563EB" />
          <Text style={styles.activeMatrixPillText}>Đang áp dụng: {matrixName}</Text>
        </View>
      </View>

      <View style={styles.body}>
        {updateNotice && (
          <View style={styles.noticeBox}>
            <Ionicons name="checkmark-circle" size={16} color="#059669" />
            <Text style={styles.noticeText}>{updateNotice}</Text>
          </View>
        )}

        {/* MỤC RIÊNG: CẬP NHẬT MA TRẬN MỚI */}
        {showUpdateModal && (
          <View style={styles.updateCard}>
            <View style={styles.updateHeader}>
              <Ionicons name="options-outline" size={16} color="#2563EB" />
              <Text style={styles.updateTitle}>Cập nhật khung ma trận đề thi mới</Text>
            </View>
            <Text style={styles.updateDesc}>
              Dành cho giáo viên cập nhật khi Bộ hoặc Sở GD&ĐT ban hành văn bản/ma trận mới.
            </Text>

            <Text style={styles.inputLabel}>Tên văn bản / Ma trận mới:</Text>
            <TextInput
              style={styles.textInput}
              value={matrixName}
              onChangeText={setMatrixName}
              placeholder="Nhập tên ma trận quy định mới..."
              placeholderTextColor="#94A3B8"
            />

            <Text style={styles.inputLabel}>Tỷ lệ nhận thức (%):</Text>
            <View style={styles.ratioInputsRow}>
              <View style={styles.ratioInputItem}>
                <Text style={styles.ratioSub}>Nhận biết (NB)</Text>
                <TextInput
                  style={styles.ratioInputBox}
                  value={nbRatio}
                  onChangeText={setNbRatio}
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.ratioInputItem}>
                <Text style={styles.ratioSub}>Thông hiểu (TH)</Text>
                <TextInput
                  style={styles.ratioInputBox}
                  value={thRatio}
                  onChangeText={setThRatio}
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.ratioInputItem}>
                <Text style={styles.ratioSub}>Vận dụng (VD)</Text>
                <TextInput
                  style={styles.ratioInputBox}
                  value={vdRatio}
                  onChangeText={setVdRatio}
                  keyboardType="numeric"
                />
              </View>
            </View>

            <Text style={styles.inputLabel}>Thời gian làm bài (phút):</Text>
            <TextInput
              style={[styles.textInput, { width: 120 }]}
              value={totalTime}
              onChangeText={setTotalTime}
              keyboardType="numeric"
            />

            <TouchableOpacity
              style={styles.saveMatrixBtn}
              onPress={handleApplyNewMatrix}
            >
              <Ionicons name="checkmark-done" size={16} color="#FFFFFF" />
              <Text style={styles.saveMatrixBtnText}>Áp dụng ma trận mới này</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Khung Ma trận đặc tả trực quan */}
        <MatrixTable summary={summary} rows={rows} />

        {/* Action Button: Chuyển sang Soạn câu hỏi */}
        <TouchableOpacity
          style={styles.continueBtn}
          onPress={() => router.push('/editor')}
          activeOpacity={0.8}
        >
          <Text style={styles.continueBtnText}>
            Tiếp tục: Soạn & Chốt danh sách câu hỏi
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
    paddingBottom: 14,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 11.5,
    color: '#DBEAFE',
    marginTop: 1,
  },
  updateMatrixBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  updateMatrixBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2563EB',
  },
  activeMatrixPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginTop: 2,
  },
  activeMatrixPillText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1E40AF',
  },
  body: {
    padding: 16,
    paddingBottom: 40,
    gap: 12,
  },
  noticeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
    padding: 10,
    borderRadius: 8,
  },
  noticeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#065F46',
    flex: 1,
  },
  updateCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#93C5FD',
  },
  updateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  updateTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1E40AF',
  },
  updateDesc: {
    fontSize: 11.5,
    color: '#64748B',
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 5,
    marginTop: 4,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 7,
    fontSize: 12.5,
    color: '#0F172A',
    marginBottom: 8,
    backgroundColor: '#F8FAFC',
  },
  ratioInputsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  ratioInputItem: {
    flex: 1,
  },
  ratioSub: {
    fontSize: 10.5,
    color: '#64748B',
    marginBottom: 4,
  },
  ratioInputBox: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 6,
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#F8FAFC',
    color: '#0F172A',
  },
  saveMatrixBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#2563EB',
    borderRadius: 8,
    paddingVertical: 9,
    marginTop: 6,
  },
  saveMatrixBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  continueBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#2563EB',
    borderRadius: 10,
    paddingVertical: 12,
  },
  continueBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
  },
});
