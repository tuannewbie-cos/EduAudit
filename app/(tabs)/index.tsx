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
import { SGK_BOOKS, GRADES } from '../../constants/theme';
import { HIGH_SCHOOL_MATH_CURRICULUM } from '../../data/curriculum';

export default function ExamGeneratorScreen() {
  const router = useRouter();

  // Active section: 'generate' | 'upload_sgk'
  const [activeSection, setActiveSection] = useState<'generate' | 'upload_sgk'>('generate');

  // Generate settings
  const [selectedGrade, setSelectedGrade] = useState(12);
  const [selectedBook, setSelectedBook] = useState('kntt');
  const [customBooks, setCustomBooks] = useState<
    { id: string; name: string; grade: number; fileName: string }[]
  >([]);

  // Selected topics in SGK
  const availableTopics = HIGH_SCHOOL_MATH_CURRICULUM.filter(
    (t) => t.grade === selectedGrade && (t.bookId === selectedBook || selectedBook.startsWith('custom_'))
  );

  const [selectedTopicIds, setSelectedTopicIds] = useState<string[]>(
    availableTopics.slice(0, 3).map((t) => t.id)
  );

  // Upload SGK form state
  const [newSgkName, setNewSgkName] = useState('');
  const [newSgkGrade, setNewSgkGrade] = useState(12);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [uploadNotice, setUploadNotice] = useState<string | null>(null);

  const toggleTopic = (topicId: string) => {
    setSelectedTopicIds((prev) =>
      prev.includes(topicId) ? prev.filter((id) => id !== topicId) : [...prev, topicId]
    );
  };

  const handleSimulateSelectFile = (name: string) => {
    setUploadedFileName(name);
    if (!newSgkName) {
      setNewSgkName(name.replace(/\.[^/.]+$/, ''));
    }
  };

  const handleSaveCustomSgk = () => {
    if (!newSgkName.trim()) return;

    const newId = `custom_${Date.now()}`;
    const newEntry = {
      id: newId,
      name: newSgkName.trim(),
      grade: newSgkGrade,
      fileName: uploadedFileName || 'Tai_lieu_SGK_bo_tro.pdf',
    };

    setCustomBooks((prev) => [newEntry, ...prev]);
    setSelectedBook(newId);
    setSelectedGrade(newSgkGrade);
    setNewSgkName('');
    setUploadedFileName(null);
    setUploadNotice('✓ Đã nạp thành công bộ tài liệu/SGK mới vào thư viện tạo đề!');
    setTimeout(() => {
      setUploadNotice(null);
      setActiveSection('generate');
    }, 1500);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Clean Top Header */}
      <View style={styles.header}>
        <View style={styles.headerTitleRow}>
          <Ionicons name="document-text" size={24} color="#FFFFFF" />
          <View>
            <Text style={styles.headerTitle}>EduAudit</Text>
            <Text style={styles.headerSubtitle}>Tạo đề thi bám sát Sách giáo khoa & Ma trận</Text>
          </View>
        </View>

        {/* 2 Main Tabs */}
        <View style={styles.tabRow}>
          <TouchableOpacity
            style={[styles.tabBtn, activeSection === 'generate' && styles.activeTabBtn]}
            onPress={() => setActiveSection('generate')}
          >
            <Ionicons
              name="sparkles"
              size={15}
              color={activeSection === 'generate' ? '#2563EB' : '#DBEAFE'}
            />
            <Text
              style={[
                styles.tabBtnText,
                activeSection === 'generate' && styles.activeTabBtnText,
              ]}
            >
              1. Tạo đề từ SGK
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabBtn, activeSection === 'upload_sgk' && styles.activeTabBtn]}
            onPress={() => setActiveSection('upload_sgk')}
          >
            <Ionicons
              name="cloud-upload"
              size={15}
              color={activeSection === 'upload_sgk' ? '#2563EB' : '#DBEAFE'}
            />
            <Text
              style={[
                styles.tabBtnText,
                activeSection === 'upload_sgk' && styles.activeTabBtnText,
              ]}
            >
              2. Tải lên SGK mới
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.body}>
        {/* SECTION 1: TẠO ĐỀ TỪ SÁCH GIÁO KHOA */}
        {activeSection === 'generate' && (
          <View style={styles.contentWrap}>
            {/* Step 1: Chọn Khối Lớp */}
            <View style={styles.card}>
              <Text style={styles.sectionLabel}>Khối lớp:</Text>
              <View style={styles.chipRow}>
                {GRADES.map((g) => (
                  <TouchableOpacity
                    key={g.id}
                    style={[
                      styles.gradeChip,
                      selectedGrade === g.id && styles.activeGradeChip,
                    ]}
                    onPress={() => setSelectedGrade(g.id)}
                  >
                    <Text
                      style={[
                        styles.gradeChipText,
                        selectedGrade === g.id && styles.activeGradeChipText,
                      ]}
                    >
                      {g.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Step 2: Chọn Bộ Sách Giáo Khoa */}
              <Text style={styles.sectionLabel}>Bộ sách giáo khoa môn Toán:</Text>
              <View style={styles.bookRow}>
                {SGK_BOOKS.map((b) => (
                  <TouchableOpacity
                    key={b.id}
                    style={[
                      styles.bookChip,
                      selectedBook === b.id && styles.activeBookChip,
                    ]}
                    onPress={() => setSelectedBook(b.id)}
                  >
                    <Ionicons
                      name={selectedBook === b.id ? 'checkmark-circle' : 'book-outline'}
                      size={15}
                      color={selectedBook === b.id ? '#2563EB' : '#64748B'}
                    />
                    <Text
                      style={[
                        styles.bookChipText,
                        selectedBook === b.id && styles.activeBookChipText,
                      ]}
                    >
                      {b.name}
                    </Text>
                  </TouchableOpacity>
                ))}

                {/* Custom uploaded SGK books */}
                {customBooks
                  .filter((cb) => cb.grade === selectedGrade)
                  .map((cb) => (
                    <TouchableOpacity
                      key={cb.id}
                      style={[
                        styles.bookChip,
                        selectedBook === cb.id && styles.activeBookChip,
                      ]}
                      onPress={() => setSelectedBook(cb.id)}
                    >
                      <Ionicons
                        name={selectedBook === cb.id ? 'checkmark-circle' : 'document-attach'}
                        size={15}
                        color={selectedBook === cb.id ? '#2563EB' : '#64748B'}
                      />
                      <Text
                        style={[
                          styles.bookChipText,
                          selectedBook === cb.id && styles.activeBookChipText,
                        ]}
                      >
                        {cb.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
              </View>
            </View>

            {/* Step 3: Chọn Bài học / Chuyên đề trong SGK */}
            <View style={styles.card}>
              <View style={styles.cardTitleRow}>
                <Ionicons name="list" size={16} color="#2563EB" />
                <Text style={styles.cardTitle}>
                  Chọn bài học trong SGK để tạo câu hỏi:
                </Text>
              </View>

              {availableTopics.length === 0 ? (
                <Text style={styles.emptyTopicText}>
                  Chuyên đề kiến thức bám sát chương trình chuẩn GDPT 2018 môn Toán.
                </Text>
              ) : (
                <View style={styles.topicList}>
                  {availableTopics.map((topic) => {
                    const isChecked = selectedTopicIds.includes(topic.id);
                    return (
                      <TouchableOpacity
                        key={topic.id}
                        style={[styles.topicItem, isChecked && styles.activeTopicItem]}
                        onPress={() => toggleTopic(topic.id)}
                      >
                        <Ionicons
                          name={isChecked ? 'checkbox' : 'square-outline'}
                          size={18}
                          color={isChecked ? '#2563EB' : '#94A3B8'}
                        />
                        <View style={styles.topicInfo}>
                          <Text style={styles.topicChapter}>{topic.chapterName}</Text>
                          <Text
                            style={[
                              styles.topicTitle,
                              isChecked && styles.activeTopicTitle,
                            ]}
                          >
                            {topic.topicName}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}
            </View>

            {/* Action Button: Tạo Đề */}
            <TouchableOpacity
              style={styles.generateBtn}
              onPress={() => router.push('/editor')}
              activeOpacity={0.8}
            >
              <Ionicons name="sparkles" size={18} color="#FFFFFF" />
              <Text style={styles.generateBtnText}>
                Tạo đề thi & Xem danh sách câu hỏi
              </Text>
              <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        )}

        {/* SECTION 2: TẢI LÊN SÁCH GIÁO KHOA / TÀI LIỆU RIÊNG */}
        {activeSection === 'upload_sgk' && (
          <View style={styles.contentWrap}>
            <View style={styles.card}>
              <View style={styles.cardTitleRow}>
                <Ionicons name="cloud-upload" size={17} color="#2563EB" />
                <Text style={styles.cardTitle}>
                  Tải lên Sách giáo khoa hoặc Tài liệu chuyên môn
                </Text>
              </View>
              <Text style={styles.cardDesc}>
                Giáo viên có thể nạp thêm SGK mới, chuyên đề tự chọn hoặc tài liệu riêng của trường để tạo đề thi phù hợp với lớp học.
              </Text>

              {/* Upload Dropzone */}
              <View style={styles.dropzone}>
                <Ionicons name="document-attach-outline" size={36} color="#2563EB" />
                <Text style={styles.dropzoneText}>
                  {uploadedFileName ? `Đã chọn: ${uploadedFileName}` : 'Chọn file tài liệu SGK (PDF hoặc Word)'}
                </Text>

                <View style={styles.sampleFileRow}>
                  <TouchableOpacity
                    style={styles.sampleFileBtn}
                    onPress={() => handleSimulateSelectFile('SGK_Toan_12_ChuyenDe_KNTT.pdf')}
                  >
                    <Text style={styles.sampleFileText}>📄 SGK_Toan_12_KNTT.pdf</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.sampleFileBtn}
                    onPress={() => handleSimulateSelectFile('Chuyen_De_Toan_12_CanhDieu.docx')}
                  >
                    <Text style={styles.sampleFileText}>📄 ChuyenDe_CanhDieu.docx</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Form Input: Tên SGK & Khối lớp */}
              <Text style={styles.inputLabel}>Tên bộ sách / Tài liệu:</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Ví dụ: SGK Chuyên đề Toán 12 - Tự chọn"
                value={newSgkName}
                onChangeText={setNewSgkName}
                placeholderTextColor="#94A3B8"
              />

              <Text style={styles.inputLabel}>Khối lớp áp dụng:</Text>
              <View style={styles.chipRow}>
                {GRADES.map((g) => (
                  <TouchableOpacity
                    key={g.id}
                    style={[
                      styles.gradeChip,
                      newSgkGrade === g.id && styles.activeGradeChip,
                    ]}
                    onPress={() => setNewSgkGrade(g.id)}
                  >
                    <Text
                      style={[
                        styles.gradeChipText,
                        newSgkGrade === g.id && styles.activeGradeChipText,
                      ]}
                    >
                      {g.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {uploadNotice && (
                <View style={styles.noticeBox}>
                  <Ionicons name="checkmark-circle" size={16} color="#059669" />
                  <Text style={styles.noticeText}>{uploadNotice}</Text>
                </View>
              )}

              {/* Button Save */}
              <TouchableOpacity
                style={[styles.saveBtn, !newSgkName.trim() && styles.saveBtnDisabled]}
                onPress={handleSaveCustomSgk}
                disabled={!newSgkName.trim()}
              >
                <Ionicons name="save-outline" size={16} color="#FFFFFF" />
                <Text style={styles.saveBtnText}>Lưu vào Thư viện Sách giáo khoa</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
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
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 11.5,
    color: '#DBEAFE',
    marginTop: 1,
  },
  tabRow: {
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
    fontSize: 11.5,
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
  contentWrap: {
    gap: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
    marginBottom: 8,
    marginTop: 2,
  },
  chipRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  gradeChip: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  activeGradeChip: {
    backgroundColor: '#EFF6FF',
    borderColor: '#2563EB',
  },
  gradeChipText: {
    fontSize: 12.5,
    fontWeight: '600',
    color: '#475569',
  },
  activeGradeChipText: {
    color: '#2563EB',
    fontWeight: 'bold',
  },
  bookRow: {
    gap: 8,
  },
  bookChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  activeBookChip: {
    backgroundColor: '#EFF6FF',
    borderColor: '#93C5FD',
  },
  bookChipText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#334155',
  },
  activeBookChipText: {
    color: '#1E40AF',
    fontWeight: 'bold',
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  cardDesc: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 17,
    marginBottom: 12,
  },
  topicList: {
    gap: 8,
  },
  topicItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  activeTopicItem: {
    backgroundColor: '#EFF6FF',
    borderColor: '#BFDBFE',
  },
  topicInfo: {
    flex: 1,
  },
  topicChapter: {
    fontSize: 10.5,
    color: '#64748B',
  },
  topicTitle: {
    fontSize: 12.5,
    color: '#334155',
    fontWeight: '500',
    marginTop: 2,
  },
  activeTopicTitle: {
    color: '#1E40AF',
    fontWeight: 'bold',
  },
  emptyTopicText: {
    fontSize: 12,
    color: '#64748B',
    fontStyle: 'italic',
  },
  generateBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#2563EB',
    borderRadius: 10,
    paddingVertical: 13,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  generateBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13.5,
  },
  dropzone: {
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#93C5FD',
    backgroundColor: '#F0F7FF',
    borderRadius: 10,
    padding: 18,
    alignItems: 'center',
    marginBottom: 14,
  },
  dropzoneText: {
    fontSize: 12.5,
    fontWeight: '600',
    color: '#1E40AF',
    marginTop: 8,
    textAlign: 'center',
  },
  sampleFileRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
  },
  sampleFileBtn: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  sampleFileText: {
    fontSize: 10.5,
    color: '#475569',
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 6,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 9,
    fontSize: 13,
    color: '#0F172A',
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
  },
  noticeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#ECFDF5',
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  noticeText: {
    fontSize: 11.5,
    color: '#065F46',
    fontWeight: '600',
  },
  saveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#2563EB',
    borderRadius: 8,
    paddingVertical: 11,
  },
  saveBtnDisabled: {
    backgroundColor: '#93C5FD',
  },
  saveBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
  },
});
