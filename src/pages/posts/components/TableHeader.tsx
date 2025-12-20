import { postLabels } from '../consts/postLabels.ts';
import type { PostResponse } from '../interfaces/addPostTypes.ts';
import type { Category } from '../postsConsts.ts';
import type { CatOpt } from '../consts/catOpts.ts';

interface TableHeaderProps {
  isShowCol: (key: keyof PostResponse) => boolean;
  onChangeShowCol: (key: keyof PostResponse) => void;
  showCatOpts: CatOpt[];
  isShowCat: (key: Category) => boolean;
  onChangeShowCat: (key: Category) => void;
}

const TableHeader = ({ isShowCol, onChangeShowCol, showCatOpts, isShowCat, onChangeShowCat }: TableHeaderProps) => {
  return (
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
  );
};

export default TableHeader;
