import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2563EB',
        tabBarInactiveTintColor: '#64748B',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E2E8F0',
          borderTopWidth: 1,
          height: Platform.OS === 'ios' ? 84 : 62,
          paddingBottom: Platform.OS === 'ios' ? 24 : 8,
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontSize: 10.5,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tạo đề từ SGK',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'sparkles' : 'sparkles-outline'}
              size={21}
              color={focused ? '#2563EB' : '#64748B'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="matrix"
        options={{
          title: 'Ma trận đề',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'grid' : 'grid-outline'}
              size={21}
              color={focused ? '#2563EB' : '#64748B'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="editor"
        options={{
          title: 'Soạn & Chốt câu',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'create' : 'create-outline'}
              size={21}
              color={focused ? '#2563EB' : '#64748B'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="export"
        options={{
          title: 'Xuất Word / PDF',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'document-text' : 'document-text-outline'}
              size={21}
              color={focused ? '#2563EB' : '#64748B'}
            />
          ),
        }}
      />
    </Tabs>
  );
}
