import { type PostLabels, postLabels } from './consts/postLabels.ts';
import { format } from 'date-fns';

export const updateColDeps = (showCols: PostLabels[]) => {
  return postLabels.map((item) => ({
    field: item.key,
    headerName: item.label,
    sortable: item.key === 'title' || item.key === 'createdAt', // 제목, 작성일시만 정렬기능 사용
    resizable: true, // 컬럼 넓이 조절 가능
    minWidth: 180,
    filter: true,
    flex: item.key === 'title' ? 2 : item.key === 'body' ? 3 : 1, // body 컬럼 더 넓게
    hide: showCols
      .filter((e) => !e.isShow)
      .map((e) => e.key)
      .includes(item.key),
    valueFormatter: (params: any) => {
      if (params.value && item.key === 'createdAt') {
        return format(new Date(params.value), 'yyyy.MM.dd HH:mm:ss');
      }
      return params.value;
    },
  }));
};
