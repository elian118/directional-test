import { AgGridReact } from 'ag-grid-react';
import { useCallback, useState } from 'react';
import { delAllPostsApi, getPostApi, getPostsApi } from '../postsApi.ts';
import { initPostParams, type PostResponse } from '../interfaces/addPostTypes.ts';
import { AllCommunityModule, InfiniteRowModelModule, ModuleRegistry } from 'ag-grid-community';
import { updateColDeps } from '../utils.ts';
import { type PostLabels, postLabels } from '../consts/postLabels.ts';
import { useDimension } from '../../../common/hooks/useDimention.ts';
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
  const [isLoading, setLoading] = useState<boolean>(false);
  const [params, setParams] = useState<PostsParams>(initialPostsParams);
  const [showCols, setShowCols] = useState<PostLabels[]>(postLabels); // 특정 컬럼 숨김/보기 제어
  const [colDefs, setColDefs] = useState<any>([]);
  const [gridApi, setGridApi] = useState<any>(null);

  const fetchPosts = async (postsParams: PostsParams) => await getPostsApi(postsParams);
  const fetchPost = async (id: string) => await getPostApi(id);

  // 전체 삭제
  const delAllPosts = async () => {
    try {
      await delAllPostsApi();
    } catch (e: any) {
      console.error(e);
    }
  };

  const openPostDetail = async (id?: string) => {
    let res;
    if (id) res = await fetchPost(id);

    openModal({
      title: id ? '포스트 상세 조회' : '새 포스트 작성',
      body: <PostForm />,
      confirm: true,
      noUseBottomSection: true,
      data: id ? res : initPostParams,
    });
  };

  const isShowCol = (key: keyof PostResponse): boolean =>
    showCols
      .filter((e) => e.isShow)
      .map((e) => e.key)
      .includes(key);

  const onChangeShowCol = (key: keyof PostResponse) => {
    setShowCols(showCols.map((e) => ({ ...e, isShow: e.key === key ? !e.isShow : e.isShow })));
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

  // 데이터 소스 로직 분리 → 최신 params 사용
  const getPostsDataSource = useCallback(
    (currentParams: PostsParams) => {
      // getRows 클로저 내부에서 사용할 nextCursor 변수
      let currentNextCursor: string | undefined = undefined;

      return {
        rowCount: undefined,
        getRows: async (getRowsParams: any) => {
          try {
            setLoading(true);

            const reqParams: PostsParams = {
              ...currentParams,
              nextCursor: currentNextCursor,
            };

            const res = await fetchPosts(reqParams);
            const rowsThisPage = res.items;
            currentNextCursor = res.nextCursor ?? undefined;

            let lastRow = -1;
            if (!res.nextCursor) lastRow = getRowsParams.startRow + rowsThisPage.length;

            getRowsParams.successCallback(rowsThisPage, lastRow);

            if (rowsThisPage.length > 0) {
              setColDefs(updateColDeps(showCols));
            }
          } catch (error) {
            console.error('데이터 로딩 중 오류 발생:', error);
            getRowsParams.failCallback();
          } finally {
            setLoading(false);
          }
        },
      };
    },
    [fetchPosts, showCols],
  );

  const onGridReady = useCallback(
    (p: any) => {
      setGridApi(p.api); // Grid API 저장

      // 최초 렌더링 시 데이터 소스 설정
      const dataSource = getPostsDataSource(params);
      p.api.setGridOption('datasource', dataSource);
    },
    [getPostsDataSource, params],
  );

  // 검색 버튼 클릭 시 호출
  const handleSearchSubmit = (newParams: PostsParams) => {
    setParams(newParams);

    if (gridApi) {
      const newDataSource = getPostsDataSource(newParams); // ⭐️ 최신 파라미터 사용
      gridApi.setGridOption('datasource', newDataSource); // Datasource 새로 설정 → AG Grid 강제 재갱신
    }
  };

  useAsync(async () => {
    setColDefs(updateColDeps(showCols));
  }, [showCols, params]);

  return (
    <div className="w-full flex flex-col gap-2">
      <TableHeader isShowCol={isShowCol} onChangeShowCol={onChangeShowCol} onSearchSubmit={handleSearchSubmit} />
      {
        <div className="z-0" style={{ height: winHeight - 260 }}>
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
            onRowClicked={async (e) => await openPostDetail(e.data.id)}
            loading={isLoading}
          />
        </div>
      }
      <div className="mt-2 flex flex-row justify-between items-center gap-2">
        <button className="btn btn-error" onClick={() => delAllPosts()}>
          모두 삭제
        </button>
        <button className="btn btn-primary" onClick={() => openPostDetail()}>
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
