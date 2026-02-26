export type Student = {
  id: string;
  name: string;
  className: string;
  avatarUrl?: string;
};

export type Post = {
  id: string;
  teacherId: string;
  teacherName: string;
  content: string;
  mediaUrl: string;
  taggedStudentIds: string[];
  createdAt: string;
};

export const MOCK_STUDENTS: Student[] = [
  { id: 's1', name: 'Alice Smith', className: 'Nursery A', avatarUrl: 'https://picsum.photos/seed/alice/100/100' },
  { id: 's2', name: 'Bob Johnson', className: 'Nursery A', avatarUrl: 'https://picsum.photos/seed/bob/100/100' },
  { id: 's3', name: 'Charlie Brown', className: 'Reception B', avatarUrl: 'https://picsum.photos/seed/charlie/100/100' },
  { id: 's4', name: 'Daisy Miller', className: 'Reception B', avatarUrl: 'https://picsum.photos/seed/daisy/100/100' },
];

export const MOCK_POSTS: Post[] = [
  {
    id: 'p1',
    teacherId: 't1',
    teacherName: 'Ms. Sarah',
    content: 'Today we explored the colors of the rainbow through finger painting! The children were so creative and focused.',
    mediaUrl: 'https://picsum.photos/seed/paint/800/600',
    taggedStudentIds: ['s1', 's2'],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'p2',
    teacherId: 't1',
    teacherName: 'Ms. Sarah',
    content: 'Our morning circle time was full of songs and stories. We learned about different animal sounds today!',
    mediaUrl: 'https://picsum.photos/seed/read/800/600',
    taggedStudentIds: ['s1', 's3'],
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  }
];

export const MOCK_TEACHER = {
  id: 't1',
  name: 'Sarah Teacher',
  email: 'sarah@dailyglimpse.com',
  role: 'teacher'
};

export const MOCK_PARENT = {
  id: 'parent1',
  name: 'John Smith',
  email: 'john@gmail.com',
  role: 'parent',
  childIds: ['s1'] // John is Alice's father
};
