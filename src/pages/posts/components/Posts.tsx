import { AgGridReact } from 'ag-grid-react';
import { useAsync } from '../../../common/hooks/useAsync.ts';
import { useEffect, useState } from 'react';
import { getMockPostsApi } from '../postsApi.ts';
import type { PostResponse } from '../interfaces/addPostTypes.ts';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { updateColDeps } from '../utils.ts';
import Loading from '../../../common/components/Loading.tsx';
import { type PostLabels, postLabels } from '../consts/postLabels.ts';
import { useDimension } from '../../../common/hooks/useDimention.ts';
import { type CatOpt, initCatOpts } from '../consts/catOpts.ts';
import type { Category } from '../postsConsts.ts';

try {
  ModuleRegistry.registerModules([AllCommunityModule]);
} catch (e) {
  console.error(e);
}

const Posts = () => {
  const { winHeight } = useDimension();
  const [posts, setPosts] = useState<PostResponse[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  // const [params, setParams] = useState<PostsParams>(initialPostsParams);
  const [showCols, setShowCols] = useState<PostLabels[]>(postLabels); // 특정 컬럼 숨김/보기 제어
  const [showCatOpts, setShowCatOpts] = useState<CatOpt[]>(initCatOpts); // 특정 카테고리 숨김/보임 제어

  const [colDefs, setColDefs] = useState<any>([]);

  const isShowCol = (key: keyof PostResponse): boolean =>
    showCols
      .filter((e) => e.isShow)
      .map((e) => e.key)
      .includes(key);

  const onChangeShowCol = (key: keyof PostResponse) => {
    setShowCols(showCols.map((e) => ({ ...e, isShow: e.key === key ? !e.isShow : e.isShow })));
  };

  const isShowCat = (key: Category): boolean =>
    showCatOpts
      .filter((e) => e.isShow)
      .map((e) => e.key)
      .includes(key);

  const onChangeShowCat = (key: Category) => {
    setShowCatOpts(showCatOpts.map((e) => ({ ...e, isShow: e.key === key ? !e.isShow : e.isShow })));
  };

  useAsync(async () => {
    setLoading(true);
    try {
      const res = await getMockPostsApi(100);
      setPosts(res.items);
      if (res.items.length > 0) setColDefs(updateColDeps(showCols));
    } catch (e) {
      console.error('API 호출 중 오류 발생', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // posts 데이터가 로드되고 showCols 상태가 변경될 때 컬럼 정의 업데이트
    if (posts && posts.length > 0) {
      setColDefs(updateColDeps(showCols));
    }
    console.log(showCols);
  }, [showCols, posts]);

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <input type="text" placeholder="제목 또는 내용 입력" className="input" />
        <div className="dropdown dropdown-hover">
          <div tabIndex={0} role="button" className="btn m-1">
            컬럼 보기 <span className="text-xs">▼</span>
          </div>
          <ul tabIndex={-1} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
            {postLabels
              .filter((x) => x.key !== 'id')
              .map((e) => (
                <li className="flex gap-2" key={`col-${e.key}`}>
                  <label className="label">
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={isShowCol(e.key)}
                      onChange={() => onChangeShowCol(e.key)}
                    />
                    {e.label}
                  </label>
                </li>
              ))}
          </ul>
        </div>
        <div className="dropdown dropdown-hover">
          <div tabIndex={0} role="button" className="btn m-1">
            분류 필터 <span className="text-xs">▼</span>
          </div>
          <ul tabIndex={-1} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
            {showCatOpts.map((e) => (
              <li className="flex gap-2" key={`cat-${e.key}`}>
                <label className="label">
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={isShowCat(e.key)}
                    onChange={() => onChangeShowCat(e.key)}
                  />
                  {e.key}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-80">
          <Loading />
        </div>
      ) : posts && posts.length > 0 ? (
        <div className="z-0" style={{ height: winHeight - 180 }}>
          <AgGridReact
            rowData={posts.filter((post) =>
              showCatOpts
                .filter((opt) => opt.isShow)
                .map((e) => e.key)
                .includes(post.category),
            )}
            columnDefs={colDefs}
          />
        </div>
      ) : (
        <div className="flex justify-center items-center h-48 p-2 border rounded-2xl">게시글이 존재하지 않습니다.</div>
      )}
    </div>
  );
};

export default Posts;
