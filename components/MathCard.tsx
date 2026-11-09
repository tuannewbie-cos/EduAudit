import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  ActivityIndicator,
  ScrollView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { QuestionItem } from '../data/mockQuestions';
import { SvgDiagram } from './SvgDiagram';
import { solveQuestionWithAi } from '../services/aiSolverEngine';

interface MathCardProps {
  question: QuestionItem;
  onUpdateQuestion: (updated: QuestionItem) => void;
  onRegenerateData?: (questionId: string) => void;
}

export const MathCard: React.FC<MathCardProps> = ({
  question,
  onUpdateQuestion,
  onRegenerateData,
}) => {
  const [showSolution, setShowSolution] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // Edit form states
  const [editContent, setEditContent] = useState(question.content);
  const [editShortAnswer, setEditShortAnswer] = useState(question.shortAnswer || '');
  const [editSolutionSummary, setEditSolutionSummary] = useState(
    question.solutionSteps.map((s) => s.step).join('\n')
  );
  const [isAiSolving, setIsAiSolving] = useState(false);

  const levelColor =
    question.level === 'NB'
      ? { bg: '#EFF6FF', text: '#2563EB', border: '#BFDBFE' }
      : question.level === 'TH'
      ? { bg: '#ECFDF5', text: '#059669', border: '#A7F3D0' }
      : { bg: '#FFFBEB', text: '#D97706', border: '#FDE68A' };

  // AI tự động giải toán và cập nhật form
  const handleAiAutoSolve = async () => {
    setIsAiSolving(true);
    try {
      const aiResult = await solveQuestionWithAi(
        editContent,
        question.part,
        question.options,
        question.subQuestions,
        editShortAnswer
      );

      if (aiResult.shortAnswer) {
        setEditShortAnswer(aiResult.shortAnswer);
      }
      setEditSolutionSummary(aiResult.solutionSteps.map((s) => s.step).join('\n'));
    } finally {
      setIsAiSolving(false);
    }
  };

  // Giáo viên bấm "Chốt câu hỏi" -> lưu vào đề thi
  const handleFinalizeQuestion = async () => {
    setIsAiSolving(true);
    try {
      // Nếu chưa có lời giải hoặc muốn AI tự tính luôn
      let aiResult = await solveQuestionWithAi(
        editContent,
        question.part,
        question.options,
        question.subQuestions,
        editShortAnswer
      );

      // Nếu giáo viên đã tự sửa đáp án trong ô input, ưu tiên đáp án của giáo viên
      const finalShortAnswer = editShortAnswer.trim() || aiResult.shortAnswer || question.shortAnswer;

      // Xây dựng các bước giải
      let finalSteps = aiResult.solutionSteps;
      if (editSolutionSummary.trim() && editSolutionSummary !== question.solutionSteps.map((s) => s.step).join('\n')) {
        const lines = editSolutionSummary.split('\n').filter((l) => l.trim().length > 0);
        finalSteps = lines.map((line, idx) => ({
          step: line,
          score: idx === lines.length - 1 ? '0,10đ' : '0,15đ',
        }));
      }

      const updatedQuestion: QuestionItem = {
        ...question,
        content: editContent,
        options: aiResult.options || question.options,
        subQuestions: aiResult.subQuestions || question.subQuestions,
        shortAnswer: finalShortAnswer,
        solutionSteps: finalSteps,
        sympyAudit: {
          ...question.sympyAudit,
          computedResult: finalShortAnswer || aiResult.computedAnswer,
          auditLog: `Đã cập nhật câu hỏi và lời giải chi tiết.`,
        },
      };

      onUpdateQuestion(updatedQuestion);
      setShowSolution(true);
      setShowEditModal(false);
    } finally {
      setIsAiSolving(false);
    }
  };

  const openEditModal = () => {
    setEditContent(question.content);
    setEditShortAnswer(question.shortAnswer || '');
    setEditSolutionSummary(question.solutionSteps.map((s) => s.step).join('\n'));
    setShowEditModal(true);
  };

  return (
    <View style={styles.card}>
      {/* Top Header Row */}
      <View style={styles.headerRow}>
        <View style={styles.codeAndPart}>
          <Text style={styles.questionCode}>{question.code}</Text>
          <View
            style={[
              styles.badge,
              { backgroundColor: levelColor.bg, borderColor: levelColor.border },
            ]}
          >
            <Text style={[styles.badgeText, { color: levelColor.text }]}>
              {question.levelName}
            </Text>
          </View>
          <View style={styles.pointsBadge}>
            <Text style={styles.pointsText}>{question.points}đ</Text>
          </View>
        </View>

        <Text style={styles.topicText}>
          <Ionicons name="book-outline" size={12} color="#64748B" /> {question.topicName}
        </Text>
      </View>

      {/* Question Content */}
      <Text style={styles.questionContent}>{question.content}</Text>

      {/* Diagram if present */}
      {question.diagramType && question.diagramType !== 'none' && (
        <SvgDiagram type={question.diagramType} data={question.diagramData} />
      )}

      {/* Part 1 Options with Integrated Answer */}
      {question.part === 1 && question.options && (
        <View style={styles.optionsContainer}>
          {question.options.map((opt) => (
            <View
              key={opt.key}
              style={[
                styles.optionRow,
                opt.isCorrect && styles.correctOptionRow,
              ]}
            >
              <View
                style={[
                  styles.optionCircle,
                  opt.isCorrect && styles.correctOptionCircle,
                ]}
              >
                <Text
                  style={[
                    styles.optionKey,
                    opt.isCorrect && styles.correctOptionKey,
                  ]}
                >
                  {opt.key}
                </Text>
              </View>
              <Text
                style={[
                  styles.optionText,
                  opt.isCorrect && styles.correctOptionText,
                ]}
              >
                {opt.text}
              </Text>
              {opt.isCorrect && (
                <View style={styles.correctLabelWrap}>
                  <Ionicons name="checkmark-circle" size={14} color="#166534" />
                  <Text style={styles.correctLabelText}>Đáp án đúng</Text>
                </View>
              )}
            </View>
          ))}
        </View>
      )}

      {/* Part 2 Sub-questions with Integrated Answer (Đúng / Sai) */}
      {question.part === 2 && question.subQuestions && (
        <View style={styles.subQuestionsContainer}>
          <View style={styles.subQuestionHeader}>
            <Text style={styles.subQuestionHeaderCol}>Mệnh đề</Text>
            <Text style={styles.subQuestionHeaderAns}>Đáp án</Text>
          </View>
          {question.subQuestions.map((sub) => (
            <View key={sub.label} style={styles.subQuestionRow}>
              <Text style={styles.subQuestionLabel}>{sub.label})</Text>
              <Text style={styles.subQuestionText}>{sub.text}</Text>
              <View
                style={[
                  styles.tfBadge,
                  sub.isCorrect ? styles.trueBadge : styles.falseBadge,
                ]}
              >
                <Text
                  style={[
                    styles.tfBadgeText,
                    sub.isCorrect ? styles.trueBadgeText : styles.falseBadgeText,
                  ]}
                >
                  {sub.isCorrect ? 'ĐÚNG' : 'SAI'}
                </Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Part 3 Short Answer with Integrated Result */}
      {question.part === 3 && (
        <View style={styles.shortAnswerContainer}>
          <Text style={styles.shortAnswerLabel}>Đáp số:</Text>
          <View style={styles.shortAnswerBox}>
            <Text style={styles.shortAnswerValue}>{question.shortAnswer}</Text>
            <Ionicons name="checkmark-circle" size={16} color="#059669" />
          </View>
        </View>
      )}

      {/* Action Buttons: Sửa câu hỏi & Xem lời giải */}
      <View style={styles.actionButtonsRow}>
        <TouchableOpacity
          style={styles.editBtn}
          onPress={openEditModal}
          activeOpacity={0.7}
        >
          <Ionicons name="create-outline" size={14} color="#2563EB" />
          <Text style={styles.editBtnText}>Sửa câu hỏi</Text>
        </TouchableOpacity>

        {onRegenerateData && question.hasVariants && (
          <TouchableOpacity
            style={styles.regenBtn}
            onPress={() => onRegenerateData(question.id)}
            activeOpacity={0.7}
          >
            <Ionicons name="refresh" size={13} color="#475569" />
            <Text style={styles.regenBtnText}>Đổi số liệu</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.solutionBtn}
          onPress={() => setShowSolution(!showSolution)}
          activeOpacity={0.7}
        >
          <Ionicons
            name={showSolution ? 'chevron-up' : 'chevron-down'}
            size={14}
            color="#059669"
          />
          <Text style={styles.solutionBtnText}>
            {showSolution ? 'Thu gọn' : 'Xem lời giải chi tiết'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Step-by-Step Solution */}
      {showSolution && (
        <View style={styles.solutionContainer}>
          <View style={styles.solutionHeader}>
            <Ionicons name="document-text-outline" size={15} color="#059669" />
            <Text style={styles.solutionTitle}>
              Hướng dẫn chấm & Lời giải chi tiết từng bước:
            </Text>
          </View>

          {question.solutionSteps.map((s, index) => (
            <View key={index} style={styles.solutionStepRow}>
              <View style={styles.stepBullet}>
                <Text style={styles.stepBulletText}>{index + 1}</Text>
              </View>
              <Text style={styles.stepText}>{s.step}</Text>
              <Text style={styles.stepScore}>[{s.score}]</Text>
            </View>
          ))}
        </View>
      )}

      {/* Enhanced Edit Question Modal */}
      <Modal visible={showEditModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View style={styles.modalTitleWrap}>
                <Ionicons name="create-outline" size={18} color="#2563EB" />
                <Text style={styles.modalTitle}>Sửa câu hỏi ({question.code})</Text>
              </View>
              <TouchableOpacity onPress={() => setShowEditModal(false)}>
                <Ionicons name="close" size={20} color="#64748B" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalScroll} showsVerticalScrollIndicator={false}>
              {/* Nội dung đề bài */}
              <Text style={styles.inputSectionLabel}>Nội dung câu hỏi:</Text>
              <TextInput
                style={styles.modalTextInput}
                multiline
                value={editContent}
                onChangeText={setEditContent}
                placeholder="Nhập đề bài câu hỏi..."
                placeholderTextColor="#94A3B8"
              />

              {/* Ô nhập / hiển thị đáp số (Dành cho câu trả lời ngắn) */}
              {question.part === 3 && (
                <View style={styles.answerInputWrap}>
                  <Text style={styles.inputSectionLabel}>Đáp số cần điền:</Text>
                  <TextInput
                    style={styles.answerTextInput}
                    value={editShortAnswer}
                    onChangeText={setEditShortAnswer}
                    placeholder="Ví dụ: 13, 4.5, -2..."
                    placeholderTextColor="#94A3B8"
                  />
                </View>
              )}

              {/* Lời giải chi tiết */}
              <View style={styles.solutionInputHeader}>
                <Text style={styles.inputSectionLabel}>Lời giải chi tiết từng bước:</Text>
                <TouchableOpacity
                  style={styles.aiSolveQuickBtn}
                  onPress={handleAiAutoSolve}
                  disabled={isAiSolving}
                >
                  <Ionicons name="sparkles" size={12} color="#2563EB" />
                  <Text style={styles.aiSolveQuickBtnText}>
                    {isAiSolving ? 'Đang giải...' : 'AI tự giải lại'}
                  </Text>
                </TouchableOpacity>
              </View>

              <TextInput
                style={styles.modalSolutionInput}
                multiline
                value={editSolutionSummary}
                onChangeText={setEditSolutionSummary}
                placeholder="Nhập hoặc để AI tự động sinh lời giải..."
                placeholderTextColor="#94A3B8"
              />

              {isAiSolving && (
                <View style={styles.aiLoadingRow}>
                  <ActivityIndicator size="small" color="#2563EB" />
                  <Text style={styles.aiLoadingText}>
                    AI đang tính toán chính xác đáp số và sinh lời giải từng bước...
                  </Text>
                </View>
              )}
            </ScrollView>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.modalCancelBtn}
                onPress={() => setShowEditModal(false)}
                disabled={isAiSolving}
              >
                <Text style={styles.modalCancelText}>Hủy</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalSaveBtn, isAiSolving && styles.modalSaveBtnDisabled]}
                onPress={handleFinalizeQuestion}
                disabled={isAiSolving}
              >
                <Ionicons name="checkmark-done" size={15} color="#FFFFFF" />
                <Text style={styles.modalSaveText}>
                  {isAiSolving ? 'Đang xử lý...' : 'Chốt câu hỏi & Lưu'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1.5 },
        shadowOpacity: 0.04,
        shadowRadius: 3,
      },
      android: {
        elevation: 1.5,
      },
    }),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  codeAndPart: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  questionCode: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  badge: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  pointsBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  pointsText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#475569',
  },
  topicText: {
    fontSize: 11.5,
    color: '#64748B',
  },
  questionContent: {
    fontSize: 14,
    lineHeight: 21,
    color: '#1E293B',
    marginBottom: 10,
  },
  optionsContainer: {
    gap: 6,
    marginBottom: 10,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  correctOptionRow: {
    backgroundColor: '#F0FDF4',
    borderColor: '#86EFAC',
  },
  optionCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  correctOptionCircle: {
    backgroundColor: '#22C55E',
  },
  optionKey: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#475569',
  },
  correctOptionKey: {
    color: '#FFFFFF',
  },
  optionText: {
    fontSize: 13,
    color: '#334155',
    flex: 1,
  },
  correctOptionText: {
    fontWeight: '600',
    color: '#166534',
  },
  correctLabelWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  correctLabelText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#166534',
  },
  subQuestionsContainer: {
    backgroundColor: '#F8FAFC',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 10,
  },
  subQuestionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#CBD5E1',
    marginBottom: 6,
  },
  subQuestionHeaderCol: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
  },
  subQuestionHeaderAns: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
  },
  subQuestionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  subQuestionLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2563EB',
    width: 20,
  },
  subQuestionText: {
    fontSize: 12.5,
    color: '#334155',
    flex: 1,
  },
  tfBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 6,
  },
  trueBadge: {
    backgroundColor: '#DCFCE7',
  },
  falseBadge: {
    backgroundColor: '#FEE2E2',
  },
  tfBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  trueBadgeText: {
    color: '#16A34A',
  },
  falseBadgeText: {
    color: '#DC2626',
  },
  shortAnswerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#BBF7D0',
    marginBottom: 10,
    gap: 8,
  },
  shortAnswerLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#166534',
  },
  shortAnswerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#86EFAC',
  },
  shortAnswerValue: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#166534',
  },
  actionButtonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 10,
  },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#EFF6FF',
    borderColor: '#BFDBFE',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  editBtnText: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#2563EB',
  },
  regenBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F8FAFC',
    borderColor: '#E2E8F0',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  regenBtnText: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#475569',
  },
  solutionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F0FDF4',
    borderColor: '#BBF7D0',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    marginLeft: 'auto',
  },
  solutionBtnText: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#059669',
  },
  solutionContainer: {
    marginTop: 10,
    backgroundColor: '#F8FAFC',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  solutionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  solutionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#059669',
  },
  solutionStepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    marginBottom: 6,
  },
  stepBullet: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  stepBulletText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#475569',
  },
  stepText: {
    fontSize: 12,
    color: '#334155',
    flex: 1,
    lineHeight: 18,
  },
  stepScore: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2563EB',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 16,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    maxHeight: '85%',
  },
  modalScroll: {
    marginVertical: 4,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalTitleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  modalTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  inputSectionLabel: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 4,
    marginTop: 6,
  },
  modalTextInput: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    padding: 10,
    fontSize: 13.5,
    height: 80,
    textAlignVertical: 'top',
    color: '#0F172A',
    marginBottom: 8,
    backgroundColor: '#F8FAFC',
  },
  answerInputWrap: {
    marginBottom: 8,
  },
  answerTextInput: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 7,
    fontSize: 13.5,
    fontWeight: 'bold',
    color: '#166534',
    backgroundColor: '#F0FDF4',
  },
  solutionInputHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  aiSolveQuickBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  aiSolveQuickBtnText: {
    fontSize: 10.5,
    fontWeight: '600',
    color: '#2563EB',
  },
  modalSolutionInput: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    padding: 10,
    fontSize: 12.5,
    height: 90,
    textAlignVertical: 'top',
    color: '#334155',
    backgroundColor: '#F8FAFC',
    lineHeight: 18,
    marginBottom: 8,
  },
  aiLoadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#EFF6FF',
    padding: 8,
    borderRadius: 6,
    marginBottom: 8,
  },
  aiLoadingText: {
    fontSize: 11,
    color: '#2563EB',
    fontWeight: '500',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  modalCancelBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#F1F5F9',
  },
  modalCancelText: {
    fontSize: 13,
    color: '#475569',
    fontWeight: '600',
  },
  modalSaveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#2563EB',
  },
  modalSaveBtnDisabled: {
    backgroundColor: '#93C5FD',
  },
  modalSaveText: {
    fontSize: 13,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
