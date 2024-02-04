import { SelectDesktop } from '@alfalab/core-components/select/desktop';
import {
  BaseOption,
  BaseSelectChangePayload,
} from '@alfalab/core-components/select/shared';

import { useGetYearsQuery } from '../../store/alfa/alfa.api';
import { useActions } from '../../hooks/actions';

export default function YearFilter() {
  const { data } = useGetYearsQuery({});
  const { setYear } = useActions();

  // Устанавливаем год для фильтрации
  const handleYearChange = (year: string) => {
    setYear({ filteredYear: Number(year) });
  };

  return (
    <div style={{ width: 150, alignSelf: 'flex-end' }}>
      {data && (
        <SelectDesktop
          size="s"
          options={data.map((el) => ({ key: el, content: el }))}
          label="Период"
          Option={BaseOption}
          block
          onChange={(payload: BaseSelectChangePayload) =>
            handleYearChange(payload?.selected?.key || '')
          }
        />
      )}
    </div>
  );
}
