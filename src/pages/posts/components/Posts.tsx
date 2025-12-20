import { AgGridReact } from 'ag-grid-react';
import { useCallback, useState } from 'react';
import { addPostApi, getPostsApi } from '../postsApi.ts';
import { initPostParams, type PostCreateRequest, type PostResponse } from '../interfaces/addPostTypes.ts';
import { AllCommunityModule, InfiniteRowModelModule, ModuleRegistry } from 'ag-grid-community';
import { updateColDeps } from '../utils.ts';
import { type PostLabels, postLabels } from '../consts/postLabels.ts';
import { useDimension } from '../../../common/hooks/useDimention.ts';
import { type CatOpt, initCatOpts } from '../consts/catOpts.ts';
import type { Category } from '../postsConsts.ts';
import { useModal } from '../../../common/hooks/useModal.ts';
import TableHeader from './TableHeader.tsx';
import PostForm from './PostForm.tsx';
import { initialPostsParams, type PostsParams } from '../interfaces/getPostsTypes.ts';
import { useAsync } from '../../../common/hooks/useAsync.ts';

try {
  ModuleRegistry.registerModules([AllCommunityModule, InfiniteRowModelModule]);
} catch (e) {
  console.error(e);
}

const Posts = () => {
  const { winHeight } = useDimension();
  const { openModal } = useModal();
  const [post] = useState<PostCreateRequest>(initPostParams);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [params] = useState<PostsParams>(initialPostsParams);
  const [showCols, setShowCols] = useState<PostLabels[]>(postLabels); // 특정 컬럼 숨김/보기 제어
  const [showCatOpts, setShowCatOpts] = useState<CatOpt[]>(initCatOpts); // 특정 카테고리 숨김/보임 제어
  const [colDefs, setColDefs] = useState<any>([]);
  const [, setGridApi] = useState<any>(null);

  const fetchPosts = async (postsParams: PostsParams) => await getPostsApi(postsParams);

  const addPost = async (post: PostCreateRequest) => {
    try {
      const response = await addPostApi(post);
      console.log(`등록글: ${response.id}`);
    } catch (e) {
      console.error('API 호출 중 오류 발생', e);
    }
  };

  const openPostForm = () =>
    openModal({
      title: '포스트 상세 조회',
      body: <PostForm />,
      confirm: true,
      action: () => addPost(post),
    });

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

  // 샘플 데이터 입력
  // const addSamplePosts = () => {
  //   testPosts.forEach(async (testPost) => {
  //     try {
  //       await addPost(testPost);
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   });
  // };

  const onGridReady = useCallback(
    async (p: any) => {
      setGridApi(p.api); // Grid API 저장
      let currentNextCursor: string | undefined = undefined;

      // Ag-Grid Datasource 객체 정의
      const dataSource = {
        rowCount: undefined, // 총 행수 정보 없음

        // 그리드가 다음 데이터 블록을 요청할 때마다 호출
        getRows: async (getRowsParams: any) => {
          try {
            setLoading(true);

            // Todo: 나머지 파라미터 추가하기(인풋 포함)
            const reqParams: PostsParams = {
              ...params,
              nextCursor: currentNextCursor,
            };
            console.log('reqParams: ', reqParams);

            const res = await fetchPosts(reqParams);
            const rowsThisPage = res.items;
            currentNextCursor = res.nextCursor ?? undefined;
            console.log('currentNextCursor: ', currentNextCursor);

            let lastRow = -1; //  -1 설정 시 AG GRID가 다음 블록 계속 요청
            if (!res.nextCursor) {
              // 현재 페이지까지 총 행 수
              lastRow = getRowsParams.startRow + rowsThisPage.length;
            }

            // 그리드에 데이터 및 최종 행 번호 전달
            getRowsParams.successCallback(rowsThisPage, lastRow);

            // 최초 컬럼 정의 설정 (한 번만 실행)
            if (rowsThisPage.length > 0) {
              setColDefs(updateColDeps(showCols));
            }
          } catch (error) {
            console.error('데이터 로딩 중 오류 발생:', error);
            // 실패 시 콜백 호출
            getRowsParams.failCallback();
          } finally {
            setLoading(false); // 로딩 종료
          }
        },
      };

      // Datasource를 그리드에 설정
      p.api.setGridOption('datasource', dataSource);
    },
    [showCols, params],
  );

  useAsync(async () => {
    setColDefs(updateColDeps(showCols));
  }, [showCols]);

  return (
    <div className="w-full flex flex-col gap-2">
      <TableHeader
        isShowCat={isShowCat}
        onChangeShowCol={onChangeShowCol}
        showCatOpts={showCatOpts}
        isShowCol={isShowCol}
        onChangeShowCat={onChangeShowCat}
      />
      {
        <div className="z-0" style={{ height: winHeight - 220 }}>
          <AgGridReact
            columnDefs={colDefs}
            rowBuffer={0}
            rowModelType={'infinite'}
            cacheBlockSize={10}
            cacheOverflowSize={2}
            maxConcurrentDatasourceRequests={1}
            infiniteInitialRowCount={1000}
            maxBlocksInCache={10}
            onGridReady={onGridReady}
            loading={isLoading}
          />
        </div>
      }
      <div className="mt-2 flex flex-row gap-2">
        <button className="btn btn-primary" onClick={openPostForm}>
          새 글 쓰기
        </button>
        {/*<button className="btn btn-primary" onClick={addSamplePosts}>*/}
        {/*  샘플 글 500개 등록하기*/}
        {/*</button>*/}
      </div>
    </div>
  );
};

export default Posts;
