import { changeFilter, selectNameFilter } from '../../redux/filtersSlice';
import css from './SearchBox.module.css';
import { useDispatch, useSelector } from 'react-redux';

const SearchBox = () => {
  const statusFilter = useSelector(selectNameFilter);
  const dispatch = useDispatch();

  return (
    <div className={css.thumb}>
      <label htmlFor="inputFilter">Find contact by name</label>
      <input
        value={statusFilter}
        id="inputFilter"
        className={css.input}
        type="text"
        onChange={evt => {
          dispatch(changeFilter(evt.target.value));
        }}
      />
    </div>
  );
};

export default SearchBox;
