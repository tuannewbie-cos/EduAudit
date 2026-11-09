import { Tabs } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
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
          height: Platform.OS === 'ios' ? 86 : 64,
          paddingBottom: Platform.OS === 'ios' ? 26 : 8,
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tổng quan',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'grid' : 'grid-outline'}
              size={20}
              color={focused ? '#2563EB' : '#64748B'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="parser"
        options={{
          title: 'M1: Nhập đề',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'cloud-upload' : 'cloud-upload-outline'}
              size={21}
              color={focused ? '#2563EB' : '#64748B'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="matrix"
        options={{
          title: 'M2: Ma trận 7991',
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name={focused ? 'matrix' : 'grid'}
              size={21}
              color={focused ? '#2563EB' : '#64748B'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="editor"
        options={{
          title: 'M3: Đề & Xuất bản',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'document-text' : 'document-text-outline'}
              size={20}
              color={focused ? '#2563EB' : '#64748B'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="omr"
        options={{
          title: 'M4: Chấm OMR',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'scan-circle' : 'scan-circle-outline'}
              size={22}
              color={focused ? '#2563EB' : '#64748B'}
            />
          ),
        }}
      />
    </Tabs>
  );
}
