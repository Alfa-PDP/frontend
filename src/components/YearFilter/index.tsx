import { SelectDesktop } from '@alfalab/core-components/select/desktop';
import {
  BaseOption,
  BaseSelectChangePayload,
} from '@alfalab/core-components/select/shared';

import { useEffect, useState } from 'react';
import { useGetYearsQuery } from '../../store/alfa/alfa.api';
import { useActions } from '../../hooks/actions';
import { useAppSelector } from '../../hooks/redux';

export default function YearFilter() {
  const { data } = useGetYearsQuery();
  const { setYear } = useActions();
  const { filteredYear } = useAppSelector((state) => state.filteredYear);

  const [filteredInputYear, setFilteredInputYear] = useState({
    key: '',
    content: '',
  });

  // Устанавливаем год для фильтрации
  const handleYearChange = (year: string) => {
    setYear({ filteredYear: Number(year) });
    setFilteredInputYear({
      key: year,
      content: year,
    });
  };

  useEffect(() => {
    if (filteredYear)
      setFilteredInputYear({
        key: filteredYear.toString(),
        content: filteredYear.toString(),
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div style={{ width: 150, alignSelf: 'flex-end' }}>
      {data && (
        <SelectDesktop
          size="s"
          options={data.map((el) => ({ key: el, content: el }))}
          label="Период"
          selected={filteredInputYear || ''}
          Option={BaseOption}
          block
          onChange={(payload: BaseSelectChangePayload) => {
            handleYearChange(payload?.selected?.key || '');
          }}
        />
      )}
    </div>
  );
}
