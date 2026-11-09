import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { INITIAL_EXAM_QUESTIONS, QuestionItem } from '../../data/mockQuestions';
import { MathCard } from '../../components/MathCard';
import { solveQuestionWithAi } from '../../services/aiSolverEngine';

export default function ExamEditorScreen() {
  const router = useRouter();
  const [questions, setQuestions] = useState<QuestionItem[]>(INITIAL_EXAM_QUESTIONS);
  const [activePartFilter, setActivePartFilter] = useState<0 | 1 | 2 | 3>(0);
  const [notice, setNotice] = useState<string | null>(null);

  // Modal: Thêm câu hỏi mới thủ công
  const [showAddModal, setShowAddModal] = useState(false);
  const [newQuestionContent, setNewQuestionContent] = useState('');
  const [newQuestionPart, setNewQuestionPart] = useState<1 | 2 | 3>(1);
  const [newQuestionLevel, setNewQuestionLevel] = useState<'NB' | 'TH' | 'VD'>('TH');
  const [isAiSolvingNew, setIsAiSolvingNew] = useState(false);

  const filteredQuestions =
    activePartFilter === 0
      ? questions
      : questions.filter((q) => q.part === activePartFilter);

  const handleUpdateQuestion = (updated: QuestionItem) => {
    setQuestions((prev) => prev.map((q) => (q.id === updated.id ? updated : q)));
    showNoticeMessage(`✓ Đã cập nhật đáp án và lời giải cho ${updated.code}!`);
  };

  const handleRegenerateData = (questionId: string) => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id !== questionId || !q.hasVariants || q.variants.length === 0) return q;
        const nextIndex = (q.activeVariantIndex + 1) % q.variants.length;
        const newVar = q.variants[nextIndex];
        return {
          ...q,
          activeVariantIndex: nextIndex,
          content: newVar.content,
          options: newVar.options || q.options,
          subQuestions: newVar.subQuestions || q.subQuestions,
          shortAnswer: newVar.shortAnswer || q.shortAnswer,
          solutionSteps: newVar.solutionSteps,
        };
      })
    );
    showNoticeMessage(`✓ Đã đổi số liệu câu hỏi thành công!`);
  };

  const handleAddNewQuestion = async () => {
    if (!newQuestionContent.trim()) return;

    setIsAiSolvingNew(true);
    try {
      const aiResult = await solveQuestionWithAi(newQuestionContent, newQuestionPart);
      const newCode = `Câu ${questions.length + 1}`;
      const newId = `q_custom_${Date.now()}`;

      const newQ: QuestionItem = {
        id: newId,
        code: newCode,
        part: newQuestionPart,
        partName:
          newQuestionPart === 1
            ? 'Phần I: Trắc nghiệm 4 lựa chọn'
            : newQuestionPart === 2
            ? 'Phần II: Câu hỏi Đúng / Sai'
            : 'Phần III: Câu hỏi Trả lời ngắn',
        level: newQuestionLevel,
        levelName:
          newQuestionLevel === 'NB'
            ? 'Nhận biết'
            : newQuestionLevel === 'TH'
            ? 'Thông hiểu'
            : 'Vận dụng',
        grade: 12,
        topicId: 'g12_kntt_c1',
        topicName: 'Khảo sát hàm số & Tọa độ',
        content: newQuestionContent.trim(),
        options: aiResult.options,
        subQuestions: aiResult.subQuestions,
        shortAnswer: aiResult.shortAnswer,
        points: newQuestionPart === 1 ? 0.25 : newQuestionPart === 2 ? 1.0 : 0.5,
        solutionSteps: aiResult.solutionSteps,
        sympyAudit: {
          isVerified: true,
          verificationFormula: 'AI Solve',
          computedResult: aiResult.computedAnswer,
          executionTimeMs: 15,
          auditLog: `Đã sinh lời giải tự động cho câu mới.`,
        },
        hasVariants: false,
        activeVariantIndex: 0,
        variants: [],
      };

      setQuestions((prev) => [...prev, newQ]);
      setNewQuestionContent('');
      setShowAddModal(false);
      showNoticeMessage(`✓ Đã thêm ${newCode} và AI đã sinh đáp án + lời giải thành công!`);
    } finally {
      setIsAiSolvingNew(false);
    }
  };

  const showNoticeMessage = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 3000);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerTitle}>Soạn đề thi & Đáp án</Text>
            <Text style={styles.headerSubtitle}>
              Đáp án tích hợp liền câu hỏi | AI sinh lời giải khi chốt câu
            </Text>
          </View>

          <View style={styles.headerBtnGroup}>
            <TouchableOpacity
              style={styles.addBtn}
              onPress={() => setShowAddModal(true)}
              activeOpacity={0.8}
            >
              <Ionicons name="add" size={16} color="#2563EB" />
              <Text style={styles.addBtnText}>Thêm câu</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.exportNavBtn}
              onPress={() => router.push('/export')}
              activeOpacity={0.8}
            >
              <Ionicons name="download-outline" size={15} color="#FFFFFF" />
              <Text style={styles.exportNavBtnText}>Xuất bản</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Filter Tabs by Part */}
        <View style={styles.filterRow}>
          <TouchableOpacity
            style={[styles.filterTab, activePartFilter === 0 && styles.activeFilterTab]}
            onPress={() => setActivePartFilter(0)}
          >
            <Text
              style={[
                styles.filterTabText,
                activePartFilter === 0 && styles.activeFilterTabText,
              ]}
            >
              Tất cả ({questions.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterTab, activePartFilter === 1 && styles.activeFilterTab]}
            onPress={() => setActivePartFilter(1)}
          >
            <Text
              style={[
                styles.filterTabText,
                activePartFilter === 1 && styles.activeFilterTabText,
              ]}
            >
              Phần I (TN)
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterTab, activePartFilter === 2 && styles.activeFilterTab]}
            onPress={() => setActivePartFilter(2)}
          >
            <Text
              style={[
                styles.filterTabText,
                activePartFilter === 2 && styles.activeFilterTabText,
              ]}
            >
              Phần II (Đ/S)
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterTab, activePartFilter === 3 && styles.activeFilterTab]}
            onPress={() => setActivePartFilter(3)}
          >
            <Text
              style={[
                styles.filterTabText,
                activePartFilter === 3 && styles.activeFilterTabText,
              ]}
            >
              Phần III (TLN)
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Floating Notice */}
      {notice && (
        <View style={styles.noticeBar}>
          <Ionicons name="checkmark-circle" size={16} color="#059669" />
          <Text style={styles.noticeBarText}>{notice}</Text>
        </View>
      )}

      {/* Question Cards List */}
      <ScrollView style={styles.cardList} showsVerticalScrollIndicator={false}>
        <View style={styles.cardListContent}>
          {filteredQuestions.map((q) => (
            <MathCard
              key={q.id}
              question={q}
              onUpdateQuestion={handleUpdateQuestion}
              onRegenerateData={handleRegenerateData}
            />
          ))}
        </View>
      </ScrollView>

      {/* Modal: Thêm câu hỏi mới */}
      <Modal visible={showAddModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Thêm câu hỏi mới vào đề thi</Text>
              <TouchableOpacity onPress={() => setShowAddModal(false)}>
                <Ionicons name="close" size={20} color="#64748B" />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalHint}>
              Giáo viên viết nội dung câu hỏi. Khi bấm "Chốt câu hỏi", AI sẽ tự động giải toán và tạo đầy đủ đáp án & lời giải chi tiết.
            </Text>

            {/* Chọn dạng câu hỏi */}
            <Text style={styles.inputTitle}>Dạng câu hỏi:</Text>
            <View style={styles.partSelectRow}>
              <TouchableOpacity
                style={[styles.partSelectBtn, newQuestionPart === 1 && styles.activePartSelectBtn]}
                onPress={() => setNewQuestionPart(1)}
              >
                <Text style={[styles.partSelectText, newQuestionPart === 1 && styles.activePartSelectText]}>
                  Phần I (TN 4 LC)
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.partSelectBtn, newQuestionPart === 2 && styles.activePartSelectBtn]}
                onPress={() => setNewQuestionPart(2)}
              >
                <Text style={[styles.partSelectText, newQuestionPart === 2 && styles.activePartSelectText]}>
                  Phần II (Đúng/Sai)
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.partSelectBtn, newQuestionPart === 3 && styles.activePartSelectBtn]}
                onPress={() => setNewQuestionPart(3)}
              >
                <Text style={[styles.partSelectText, newQuestionPart === 3 && styles.activePartSelectText]}>
                  Phần III (Trả lời ngắn)
                </Text>
              </TouchableOpacity>
            </View>

            {/* Input nội dung */}
            <Text style={styles.inputTitle}>Nội dung câu hỏi:</Text>
            <TextInput
              style={styles.modalInput}
              multiline
              value={newQuestionContent}
              onChangeText={setNewQuestionContent}
              placeholder="Nhập đề bài câu hỏi tại đây..."
              placeholderTextColor="#94A3B8"
            />

            {isAiSolvingNew && (
              <View style={styles.loadingRow}>
                <ActivityIndicator size="small" color="#2563EB" />
                <Text style={styles.loadingText}>
                  AI đang tự động giải toán và sinh lời giải từng bước...
                </Text>
              </View>
            )}

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setShowAddModal(false)}
                disabled={isAiSolvingNew}
              >
                <Text style={styles.cancelBtnText}>Hủy</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.confirmBtn, isAiSolvingNew && styles.confirmBtnDisabled]}
                onPress={handleAddNewQuestion}
                disabled={isAiSolvingNew || !newQuestionContent.trim()}
              >
                <Ionicons name="checkmark-done" size={16} color="#FFFFFF" />
                <Text style={styles.confirmBtnText}>
                  {isAiSolvingNew ? 'Đang giải...' : 'Chốt câu hỏi (AI tự sinh lời giải)'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
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
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 11,
    color: '#DBEAFE',
    marginTop: 1,
  },
  headerBtnGroup: {
    flexDirection: 'row',
    gap: 8,
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 6,
  },
  addBtnText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#2563EB',
  },
  exportNavBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#10B981',
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 6,
  },
  exportNavBtnText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  filterRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 8,
    padding: 3,
    gap: 4,
  },
  filterTab: {
    flex: 1,
    paddingVertical: 6,
    borderRadius: 6,
    alignItems: 'center',
  },
  activeFilterTab: {
    backgroundColor: '#FFFFFF',
  },
  filterTabText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#DBEAFE',
  },
  activeFilterTabText: {
    color: '#2563EB',
    fontWeight: 'bold',
  },
  noticeBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
    marginHorizontal: 16,
    marginTop: 10,
    padding: 9,
    borderRadius: 8,
  },
  noticeBarText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#065F46',
    flex: 1,
  },
  cardList: {
    flex: 1,
  },
  cardListContent: {
    padding: 16,
    paddingBottom: 40,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 16,
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  modalTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  modalHint: {
    fontSize: 11.5,
    color: '#64748B',
    marginBottom: 10,
    lineHeight: 16,
  },
  inputTitle: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 6,
  },
  partSelectRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 10,
  },
  partSelectBtn: {
    flex: 1,
    paddingVertical: 7,
    borderRadius: 6,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  activePartSelectBtn: {
    backgroundColor: '#EFF6FF',
    borderColor: '#2563EB',
  },
  partSelectText: {
    fontSize: 10.5,
    fontWeight: '600',
    color: '#64748B',
  },
  activePartSelectText: {
    color: '#2563EB',
    fontWeight: 'bold',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    padding: 10,
    fontSize: 13.5,
    height: 100,
    textAlignVertical: 'top',
    color: '#0F172A',
    marginBottom: 10,
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#EFF6FF',
    padding: 8,
    borderRadius: 6,
    marginBottom: 10,
  },
  loadingText: {
    fontSize: 11,
    color: '#2563EB',
    fontWeight: '500',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  cancelBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#F1F5F9',
  },
  cancelBtnText: {
    fontSize: 12.5,
    color: '#475569',
    fontWeight: '600',
  },
  confirmBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#2563EB',
  },
  confirmBtnDisabled: {
    backgroundColor: '#93C5FD',
  },
  confirmBtnText: {
    fontSize: 12.5,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
