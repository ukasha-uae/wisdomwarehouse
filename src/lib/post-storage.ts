import { MOCK_POSTS, type Post } from "@/app/lib/mock-data";

const POSTS_STORAGE_KEY = "wisdom-warehouse-posts-v1";

export function loadPosts(): Post[] {
  if (typeof window === "undefined") return MOCK_POSTS;

  try {
    const raw = window.localStorage.getItem(POSTS_STORAGE_KEY);
    if (!raw) return MOCK_POSTS;
    const parsed = JSON.parse(raw) as Post[];
    if (!Array.isArray(parsed) || parsed.length === 0) return MOCK_POSTS;
    return parsed;
  } catch {
    return MOCK_POSTS;
  }
}

export function savePosts(posts: Post[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(posts));
}
