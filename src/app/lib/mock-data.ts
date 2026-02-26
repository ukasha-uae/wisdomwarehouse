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
  mediaUrls?: string[];
  program?: 'Tutoring' | 'Enrichment' | 'Workshops' | 'Camp';
  learningHighlight?: string;
  parentSeenAt?: string | null;
  parentAcknowledgedAt?: string | null;
  taggedStudentIds: string[];
  createdAt: string;
};

export const MOCK_STUDENTS: Student[] = [
  { id: 's1', name: 'Alice Smith', className: 'Art Studio A', avatarUrl: 'https://picsum.photos/seed/alice/100/100' },
  { id: 's2', name: 'Bob Johnson', className: 'Art Studio A', avatarUrl: 'https://picsum.photos/seed/bob/100/100' },
  { id: 's3', name: 'Charlie Brown', className: 'Discovery Lab B', avatarUrl: 'https://picsum.photos/seed/charlie/100/100' },
  { id: 's4', name: 'Daisy Miller', className: 'Discovery Lab B', avatarUrl: 'https://picsum.photos/seed/daisy/100/100' },
];

export const MOCK_POSTS: Post[] = [
  {
    id: 'p1',
    teacherId: 't1',
    teacherName: 'Ms. Sarah',
    content: 'Today we explored the colors of the rainbow through finger painting! The children were so creative and focused on their masterpieces.',
    mediaUrl: 'https://picsum.photos/seed/paint/800/600',
    mediaUrls: [
      'https://picsum.photos/seed/paint/800/600',
      'https://picsum.photos/seed/paint-detail/800/600',
    ],
    program: 'Workshops',
    learningHighlight: 'Creativity, sensory exploration, and collaborative expression.',
    parentSeenAt: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
    parentAcknowledgedAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    taggedStudentIds: ['s1', 's2'],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'p2',
    teacherId: 't1',
    teacherName: 'Ms. Sarah',
    content: 'Our workshop on "Simple Machines" was a huge hit. The children built their own pulleys today!',
    mediaUrl: 'https://picsum.photos/seed/build/800/600',
    mediaUrls: [
      'https://picsum.photos/seed/build/800/600',
      'https://picsum.photos/seed/build-team/800/600',
      'https://picsum.photos/seed/build-model/800/600',
    ],
    program: 'Enrichment',
    learningHighlight: 'Problem-solving and foundational engineering thinking.',
    parentSeenAt: null,
    parentAcknowledgedAt: null,
    taggedStudentIds: ['s1', 's3'],
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  }
];

export const MOCK_TEACHER = {
  id: 't1',
  name: 'Sarah Mentor',
  email: 'admin@wisdomwarehousedubai.com',
  role: 'teacher'
};

export const MOCK_PARENT = {
  id: 'parent1',
  name: 'John Smith',
  email: 'john@gmail.com',
  role: 'parent',
  childIds: ['s1'] // John is Alice's father
};