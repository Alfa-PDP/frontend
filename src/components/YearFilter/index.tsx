/* eslint-disable @typescript-eslint/no-explicit-any */

// import { SelectDesktop } from '@alfalab/core-components/select/desktop';
// import { BaseOption } from '@alfalab/core-components/select/shared';

// const OPTIONS = [
//   { key: '1', content: 'Neptunium' },
//   { key: '2', content: 'Plutonium' },
//   { key: '3', content: 'Americium' },
//   { key: '4', content: 'Curium' },
//   { key: '5', content: 'Berkelium' },
//   { key: '6', content: 'Californium' },
//   { key: '7', content: 'Einsteinium' },
//   { key: '8', content: 'Fermium' },
// ];

// export default function YearFilter() {
//   return (
//     <div style={{ width: 320 }}>
//       <SelectDesktop
//         allowUnselect
//         size="m"
//         options={OPTIONS}
//         placeholder="Выберите элемент"
//         label="Одиночный выбор"
//         Option={BaseOption}
//         block
//       />
//     </div>
//   );
// }

import { PeriodSlider } from '@alfalab/core-components/calendar/components/period-slider';
import { useState } from 'react';

export default function YearFilter() {
  const [values, setValues] = useState({
    value: new Date(),
    valueFrom: new Date(),
    valueTo: new Date(),
  });

  const handler = (
    _event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    newValues: any
  ) => setValues(newValues);

  return (
    <div style={{ width: 170, alignSelf: 'flex-end' }}>
      <PeriodSlider
        value={values.value}
        periodType="year"
        onPrevArrowClick={handler}
        onNextArrowClick={handler}
      />
    </div>
  );
}
