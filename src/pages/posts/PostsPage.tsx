import { useState } from 'react';
import { initialPostsParams, type PostsParams, type PostsResponse } from './interfaces/getPostsTypes.ts';
import { getPostsApi } from './postsApi.ts';
import { useAsync } from '../../common/hooks/useAsync.ts';

const PostsPage = () => {
  const [posts, setPosts] = useState<PostsResponse | null>(null);
  const [, setLoading] = useState<boolean>(false);
  const [params] = useState<PostsParams>(initialPostsParams);

  useAsync(async () => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // 💡 파라미터를 객체로 전달합니다. (토큰 헤더는 common.ts에서 자동 적용)
        const res = await getPostsApi(params);
        setPosts(res);
      } catch (e) {
        console.error('API 호출 중 오류 발생', e);
      } finally {
        setLoading(false);
      }
    };
    await fetchData();
  }, []);

  const getPostTo = () => {};

  return (
    <div>
      {posts?.items?.map((item) => (
        <div key={item.id} className="p-2 border-b">
          <strong>[{item.category}]</strong> {item.title} (작성일: {item.createdAt})
        </div>
      ))}
      <button onClick={getPostTo} className="btn btn-sm mt-4 btn-secondary">
        다음 페이지
      </button>
    </div>
  );
};

export default PostsPage;
